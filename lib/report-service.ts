import "server-only";
import { prisma } from "@/lib/db";

export async function createVoiceOfCustomerReport({
  workspaceId,
  userId,
  periodStart,
  periodEnd
}: {
  workspaceId: string;
  userId: string;
  periodStart: Date;
  periodEnd: Date;
}) {
  const [totalFeedback, topThemes, negativeCount] = await Promise.all([
    prisma.feedback.count({
      where: { workspaceId, createdAt: { gte: periodStart, lte: periodEnd } }
    }),
    prisma.feedbackTheme.groupBy({
      by: ["themeId"],
      where: {
        feedback: { workspaceId, createdAt: { gte: periodStart, lte: periodEnd } }
      },
      _count: { themeId: true },
      orderBy: { _count: { themeId: "desc" } },
      take: 5
    }),
    prisma.feedback.count({
      where: {
        workspaceId,
        sentiment: "NEGATIVE",
        createdAt: { gte: periodStart, lte: periodEnd }
      }
    })
  ]);

  return prisma.report.create({
    data: {
      title: `Voice of Customer Report ${periodStart.toLocaleDateString()} - ${periodEnd.toLocaleDateString()}`,
      periodStart,
      periodEnd,
      workspaceId,
      generatedBy: userId,
      contentJson: {
        totalFeedback,
        negativeCount,
        topThemes,
        sections: {
          executiveSummary: "AI narrative is generated here after Claude is configured.",
          recommendedActions: [
            "Review rising negative themes.",
            "Assign owners to top product gaps.",
            "Share evidence-backed quotes with leadership."
          ]
        }
      }
    }
  });
}
