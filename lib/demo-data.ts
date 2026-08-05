import type { FeedbackItem, ThemeInsight } from "@/types";

export const demoUser = {
  name: "Ms.Divya Lawand",
  email: "admin@loop.demo",
  role: "ADMIN",
  workspace: "Acme Cloud"
};

export const themeInsights: ThemeInsight[] = [
  {
    name: "Onboarding",
    description: "Users want faster setup, clearer first-run guidance, and fewer activation steps.",
    color: "#4f46e5",
    count: 43,
    change: 60,
    trend: "Growing"
  },
  {
    name: "Mobile Experience",
    description: "Mobile users report slow loading, missing filters, and cramped review workflows.",
    color: "#0ea5e9",
    count: 31,
    change: 24,
    trend: "Growing"
  },
  {
    name: "Pricing",
    description: "Teams ask for more flexible seats and clearer plan limits before upgrading.",
    color: "#f59e0b",
    count: 26,
    change: -8,
    trend: "Declining"
  },
  {
    name: "Reporting",
    description: "Customers want scheduled exports, quote libraries, and executive-ready summaries.",
    color: "#10b981",
    count: 22,
    change: 5,
    trend: "Stable"
  },
  {
    name: "SSO",
    description: "Enterprise buyers repeatedly ask for SAML setup guides and SCIM provisioning.",
    color: "#8b5cf6",
    count: 18,
    change: 41,
    trend: "Growing"
  }
];

export const feedbackItems: FeedbackItem[] = [
  {
    id: "FB-102",
    content:
      "The guided setup helped, but our team still needed support to understand workspace roles and SSO configuration.",
    channel: "Support Ticket",
    sourceRef: "ZD-2190",
    customerLabel: "Enterprise admin",
    sentiment: "NEGATIVE",
    sentimentScore: -0.62,
    featureArea: "Authentication",
    status: "NEW",
    createdAt: "2026-07-22",
    themes: ["Onboarding", "SSO"],
    rationale: "The user is blocked by setup complexity and admin configuration uncertainty."
  },
  {
    id: "FB-101",
    content:
      "Dashboard filters are fast and the trend cards finally make weekly product reviews easier for leadership.",
    channel: "NPS Survey",
    sourceRef: "NPS-887",
    customerLabel: "Product lead",
    sentiment: "POSITIVE",
    sentimentScore: 0.82,
    featureArea: "Dashboard",
    status: "REVIEWED",
    createdAt: "2026-07-21",
    themes: ["Reporting", "Dashboard"],
    rationale: "The customer praises speed, filtering, and executive review usefulness."
  },
  {
    id: "FB-100",
    content:
      "The mobile view works, but reviewing long feedback threads on a phone feels cramped and slow.",
    channel: "App Store Review",
    sourceRef: "APP-442",
    customerLabel: "Mobile reviewer",
    sentiment: "NEGATIVE",
    sentimentScore: -0.48,
    featureArea: "Mobile",
    status: "NEW",
    createdAt: "2026-07-20",
    themes: ["Mobile Experience", "UX"],
    rationale: "The main complaint is usability on smaller screens."
  },
  {
    id: "FB-099",
    content:
      "We need scheduled PDF exports for our monthly Voice of Customer meeting instead of manually copying charts.",
    channel: "Sales Call",
    sourceRef: "GONG-108",
    customerLabel: "Revenue operations",
    sentiment: "NEUTRAL",
    sentimentScore: 0.04,
    featureArea: "Reports",
    status: "ACTIONED",
    createdAt: "2026-07-18",
    themes: ["Reporting", "Export"],
    rationale: "This is a feature request rather than a strong complaint."
  },
  {
    id: "FB-098",
    content:
      "Pricing is understandable, but the jump from starter to growth is too steep for a five-person support team.",
    channel: "CSAT Survey",
    sourceRef: "CSAT-531",
    customerLabel: "Support manager",
    sentiment: "NEGATIVE",
    sentimentScore: -0.36,
    featureArea: "Billing",
    status: "REVIEWED",
    createdAt: "2026-07-17",
    themes: ["Pricing", "Billing"],
    rationale: "The user understands the plans but objects to upgrade economics."
  },
  {
    id: "FB-097",
    content:
      "Search found exactly the comments we needed for our roadmap discussion. Evidence links were a big win.",
    channel: "Community Post",
    sourceRef: "COMM-73",
    customerLabel: "PM community user",
    sentiment: "POSITIVE",
    sentimentScore: 0.74,
    featureArea: "Search",
    status: "ACTIONED",
    createdAt: "2026-07-16",
    themes: ["Search", "Reporting"],
    rationale: "The customer values semantic retrieval and traceable evidence."
  }
];

export const volumeData = [
  { date: "Jul 1", feedback: 18, negative: 6 },
  { date: "Jul 5", feedback: 25, negative: 8 },
  { date: "Jul 9", feedback: 31, negative: 13 },
  { date: "Jul 13", feedback: 27, negative: 10 },
  { date: "Jul 17", feedback: 36, negative: 16 },
  { date: "Jul 21", feedback: 42, negative: 19 },
  { date: "Jul 25", feedback: 38, negative: 14 }
];

export const sentimentData = [
  { name: "Positive", value: 42 },
  { name: "Neutral", value: 27 },
  { name: "Negative", value: 31 }
];
