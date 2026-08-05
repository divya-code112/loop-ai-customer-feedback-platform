import { NextResponse } from "next/server";
import { z } from "zod";
import { answerQuestionWithEvidence } from "@/lib/ai";
import { requireWorkspace } from "@/lib/auth-context";
import { prisma } from "@/lib/db";

const askSchema = z.object({
  question: z.string().min(5)
});

export async function POST(request: Request) {
  const context = await requireWorkspace("ai.use");
  if (!context.ok) return NextResponse.json({ error: context.error }, { status: context.status });

  const body = await request.json();
  const parsed = askSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid question", issues: parsed.error.flatten() }, { status: 400 });
  }

  const relevantFeedback = await prisma.feedback.findMany({
    where: { workspaceId: context.workspaceId },
    select: { id: true, content: true, channel: true },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  if (relevantFeedback.length === 0) {
    return NextResponse.json({
      answer: "I couldn't find enough evidence in your feedback data to answer that.",
      evidence: []
    });
  }

  const evidence = relevantFeedback.map((item) => `${item.id} (${item.channel}): ${item.content}`);
  const answer = await answerQuestionWithEvidence(parsed.data.question, evidence);

  return NextResponse.json(answer);
}
