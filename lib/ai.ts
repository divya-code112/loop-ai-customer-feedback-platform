import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { aiClassificationSchema, type AiClassification } from "@/lib/validations/feedback";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export async function classifyFeedback(content: string): Promise<AiClassification> {
  if (!anthropic) {
    return localClassificationFallback(content);
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 700,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Classify this customer feedback as strict JSON with keys sentiment, sentimentScore, themes, featureArea, rationale.\n\nFeedback:\n${content}`
      }
    ]
  });

  const text = message.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("");

  return aiClassificationSchema.parse(JSON.parse(text));
}

export async function answerQuestionWithEvidence(question: string, evidence: string[]) {
  if (!anthropic) {
    return {
      answer:
        "Demo answer: the strongest evidence points to onboarding complexity, mobile review friction, and enterprise setup readiness.",
      evidence
    };
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 900,
    temperature: 0.2,
    messages: [
      {
        role: "user",
        content: `Answer only from this evidence. If evidence is insufficient, say so.\n\nQuestion: ${question}\n\nEvidence:\n${evidence.join("\n\n")}`
      }
    ]
  });

  return {
    answer: message.content.map((block) => (block.type === "text" ? block.text : "")).join(""),
    evidence
  };
}

function localClassificationFallback(content: string): AiClassification {
  const lower = content.toLowerCase();
  const negative = ["slow", "hard", "confusing", "cramped", "too noisy", "blocked"].some((word) =>
    lower.includes(word)
  );
  const positive = ["fast", "helped", "valuable", "useful", "easier", "win"].some((word) =>
    lower.includes(word)
  );

  return {
    sentiment: negative ? "NEGATIVE" : positive ? "POSITIVE" : "NEUTRAL",
    sentimentScore: negative ? -0.46 : positive ? 0.72 : 0.05,
    themes: inferThemes(lower),
    featureArea: inferThemes(lower)[0] ?? "General",
    rationale: "Classified by local fallback because ANTHROPIC_API_KEY is not configured."
  };
}

function inferThemes(lower: string) {
  const themes = [
    ["Onboarding", ["setup", "onboarding", "activation"]],
    ["Authentication", ["sso", "login", "scim", "roles"]],
    ["Mobile Experience", ["mobile", "phone"]],
    ["Reporting", ["report", "export", "pdf"]],
    ["Pricing", ["pricing", "plan", "upgrade"]],
    ["Search", ["search", "evidence"]]
  ];

  const matches = themes
    .filter(([, words]) => words.some((word) => lower.includes(word)))
    .map(([name]) => name);

  return matches.length > 0 ? matches : ["UX"];
}
