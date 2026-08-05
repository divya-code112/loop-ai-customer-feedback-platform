import { PrismaClient, Channel, FeedbackStatus, Role, Sentiment } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const themeSeed = [
  ["Onboarding", "Setup, activation, and first-run learning curve.", "#4f46e5"],
  ["Performance", "Speed, reliability, page load, and responsiveness.", "#0ea5e9"],
  ["Pricing", "Plans, limits, seats, upgrades, and purchase objections.", "#f59e0b"],
  ["Billing", "Invoices, receipts, taxes, and payment workflows.", "#ef4444"],
  ["Mobile Experience", "Phone and tablet usability.", "#06b6d4"],
  ["Customer Support", "Support response quality and handoff experience.", "#10b981"],
  ["Dashboard", "Analytics overview, filters, and executive visibility.", "#6366f1"],
  ["Notifications", "Email, in-app, and alert preferences.", "#f97316"],
  ["Authentication", "Login, password, SSO, SCIM, and session behavior.", "#8b5cf6"],
  ["Integrations", "Connections with tools like Slack, HubSpot, and Zendesk.", "#14b8a6"],
  ["Reporting", "VoC reports, exports, scheduled summaries, and quotes.", "#22c55e"],
  ["Search", "Keyword and semantic discovery across feedback.", "#3b82f6"],
  ["UX", "Navigation, readability, layout, and workflow clarity.", "#64748b"]
];

const channels = [
  Channel.SUPPORT_TICKET,
  Channel.APP_STORE_REVIEW,
  Channel.NPS_SURVEY,
  Channel.CSAT_SURVEY,
  Channel.SALES_CALL,
  Channel.COMMUNITY_POST
];

const feedbackTemplates = [
  ["The setup checklist is useful, but workspace roles and SSO steps still need clearer guidance.", "Onboarding", "Authentication", Sentiment.NEGATIVE, -0.58],
  ["Dashboard filters made our weekly product review much faster and easier to explain to leadership.", "Dashboard", "Reporting", Sentiment.POSITIVE, 0.84],
  ["The mobile layout is functional, but long feedback threads feel cramped on smaller screens.", "Mobile Experience", "UX", Sentiment.NEGATIVE, -0.42],
  ["We need scheduled PDF exports instead of manually copying screenshots into our VoC deck.", "Reporting", "Export", Sentiment.NEUTRAL, 0.05],
  ["The pricing page is clear, but the jump from starter to growth is hard for a small support team.", "Pricing", "Billing", Sentiment.NEGATIVE, -0.35],
  ["Search helped us find exact quotes for a roadmap discussion in less than five minutes.", "Search", "Reporting", Sentiment.POSITIVE, 0.76],
  ["Notifications are too noisy when many feedback items are imported at once.", "Notifications", "UX", Sentiment.NEGATIVE, -0.31],
  ["The support team resolved our billing question quickly and sent a helpful follow-up.", "Customer Support", "Billing", Sentiment.POSITIVE, 0.69],
  ["HubSpot sync is the integration our sales team asks about before approving the rollout.", "Integrations", "Sales", Sentiment.NEUTRAL, 0.12],
  ["The app feels slow when opening trend pages with a lot of historical feedback.", "Performance", "Trends", Sentiment.NEGATIVE, -0.52],
  ["Ask LOOP is valuable because the evidence links keep the answer trustworthy.", "Search", "AI", Sentiment.POSITIVE, 0.81],
  ["Our security team needs SCIM documentation before we can expand beyond the pilot.", "Authentication", "SSO", Sentiment.NEUTRAL, 0.02]
] as const;

async function main() {
  await prisma.feedbackTheme.deleteMany();
  //await prisma.embedding.deleteMany();
  await prisma.report.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workspace.deleteMany();

  const workspace = await prisma.workspace.create({
    data: { name: "Acme Cloud" }
  });

  const passwordHash = await bcrypt.hash("password123", 12);
  const [admin] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Aarav Sharma",
        email: "admin@loop.demo",
        passwordHash,
        role: Role.ADMIN,
        workspaceId: workspace.id
      }
    }),
    prisma.user.create({
      data: {
        name: "Meera Iyer",
        email: "analyst@loop.demo",
        passwordHash,
        role: Role.ANALYST,
        workspaceId: workspace.id
      }
    }),
    prisma.user.create({
      data: {
        name: "Rohan Das",
        email: "viewer@loop.demo",
        passwordHash,
        role: Role.VIEWER,
        workspaceId: workspace.id
      }
    })
  ]);

  const themes = await Promise.all(
    themeSeed.map(([name, description, color]) =>
      prisma.theme.create({
        data: { name, description, color, workspaceId: workspace.id }
      })
    )
  );

  const themeByName = new Map(themes.map((theme) => [theme.name, theme]));

  for (let index = 0; index < 120; index += 1) {
    const template = feedbackTemplates[index % feedbackTemplates.length];
    const channel = channels[index % channels.length];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - (index % 45));

    const feedback = await prisma.feedback.create({
      data: {
        content: `${template[0]} Context: customer segment ${index % 5 + 1}, rollout wave ${index % 4 + 1}.`,
        channel,
        sourceRef: `${channel}-${1000 + index}`,
        customerLabel: ["Enterprise admin", "Product lead", "Support manager", "Founder", "RevOps lead"][index % 5],
        sentiment: template[3],
        sentimentScore: Number(template[4]),
        featureArea: template[2],
        status: [FeedbackStatus.NEW, FeedbackStatus.REVIEWED, FeedbackStatus.ACTIONED][index % 3],
        aiRationale: "Seeded classification rationale for demo analytics and review workflows.",
        createdAt,
        workspaceId: workspace.id
      }
    });

    const primaryTheme = themeByName.get(template[1]);
    const secondaryTheme = themeByName.get(template[2]) ?? themeByName.get("UX");

    if (primaryTheme) {
      await prisma.feedbackTheme.create({
        data: { feedbackId: feedback.id, themeId: primaryTheme.id, confidence: 0.92 }
      });
    }

    if (secondaryTheme && secondaryTheme.id !== primaryTheme?.id) {
      await prisma.feedbackTheme.create({
        data: { feedbackId: feedback.id, themeId: secondaryTheme.id, confidence: 0.74 }
      });
    }
  }

  await prisma.report.create({
    data: {
      title: "July Product Signals",
      periodStart: new Date("2026-07-01"),
      periodEnd: new Date("2026-07-25"),
      workspaceId: workspace.id,
      generatedBy: admin.id,
      contentJson: {
        executiveSummary: "Onboarding, mobile experience, and SSO readiness are the strongest signals.",
        recommendedActions: [
          "Create an admin onboarding checklist.",
          "Improve mobile feedback review layout.",
          "Publish SSO and SCIM setup documentation."
        ]
      }
    }
  });

  console.log("Seed complete: Acme Cloud workspace with 3 users and 120 feedback items.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
