import "server-only";
import { Channel, FeedbackStatus, Sentiment } from "@prisma/client";
import { prisma } from "@/lib/db";
import { classifyFeedback } from "@/lib/ai";
import type { FeedbackCreateInput } from "@/lib/validations/feedback";

export async function listFeedback(workspaceId: string, filters?: { q?: string; status?: FeedbackStatus }) {
  return prisma.feedback.findMany({
    where: {
      workspaceId,
      status: filters?.status,
      content: filters?.q ? { contains: filters.q, mode: "insensitive" } : undefined
    },
    include: {
      themes: {
        include: { theme: true }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}

export async function createFeedback(workspaceId: string, input: FeedbackCreateInput) {
  const classification = await classifyFeedback(input.content);

  return prisma.$transaction(async (tx) => {
    const feedback = await tx.feedback.create({
      data: {
        content: input.content,
        channel: input.channel as Channel,
        customerLabel: input.customerLabel,
        sourceRef: input.sourceRef,
        createdAt: input.createdAt,
        sentiment: classification.sentiment as Sentiment,
        sentimentScore: classification.sentimentScore,
        featureArea: classification.featureArea,
        aiRationale: classification.rationale,
        workspaceId
      }
    });

    for (const themeName of classification.themes) {
      const theme = await tx.theme.upsert({
        where: { workspaceId_name: { workspaceId, name: themeName } },
        update: {},
        create: {
          workspaceId,
          name: themeName,
          description: `AI-detected theme related to ${themeName}.`
        }
      });

      await tx.feedbackTheme.create({
        data: {
          feedbackId: feedback.id,
          themeId: theme.id,
          confidence: 0.82
        }
      });
    }

    return feedback;
  });
}

export async function updateFeedbackStatus(workspaceId: string, feedbackId: string, status: FeedbackStatus) {
  return prisma.feedback.update({
    where: { id: feedbackId, workspaceId },
    data: { status }
  });
}
