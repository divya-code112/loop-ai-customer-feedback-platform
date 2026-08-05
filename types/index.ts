export type Role = "ADMIN" | "ANALYST" | "VIEWER";
export type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";
export type FeedbackStatus = "NEW" | "REVIEWED" | "ACTIONED";

export type FeedbackItem = {
  id: string;
  content: string;
  channel: string;
  sourceRef: string;
  customerLabel: string;
  sentiment: Sentiment;
  sentimentScore: number;
  featureArea: string;
  status: FeedbackStatus;
  createdAt: string;
  themes: string[];
  rationale: string;
};

export type ThemeInsight = {
  name: string;
  description: string;
  color: string;
  count: number;
  change: number;
  trend: "Growing" | "Stable" | "Declining";
};
