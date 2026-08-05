import { z } from "zod";

export const channelSchema = z.enum([
  "SUPPORT_TICKET",
  "APP_STORE_REVIEW",
  "NPS_SURVEY",
  "CSAT_SURVEY",
  "SALES_CALL",
  "COMMUNITY_POST"
]);

export const feedbackCreateSchema = z.object({
  content: z.string().min(10, "Feedback must be at least 10 characters."),
  channel: channelSchema,
  customerLabel: z.string().max(120).optional(),
  sourceRef: z.string().max(120).optional(),
  createdAt: z.coerce.date().optional()
});

export const feedbackStatusSchema = z.object({
  status: z.enum(["NEW", "REVIEWED", "ACTIONED"])
});

export const aiClassificationSchema = z.object({
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
  sentimentScore: z.number().min(-1).max(1),
  themes: z.array(z.string().min(1)).min(1).max(5),
  featureArea: z.string().min(1),
  rationale: z.string().min(1)
});

export type FeedbackCreateInput = z.infer<typeof feedbackCreateSchema>;
export type AiClassification = z.infer<typeof aiClassificationSchema>;
