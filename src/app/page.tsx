"use client";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Database,
  FileText,
  Lock,
  MessageSquareText,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Sparkles,
    title: "AI classification",
    description: "Claude classifies sentiment, themes, feature areas, and rationale once at ingestion."
  },
  {
    icon: BarChart3,
    title: "Theme analytics",
    description: "Turn scattered support, survey, and review feedback into trend-ready product signals."
  },
  {
    icon: MessageSquareText,
    title: "Ask LOOP",
    description: "Ask natural questions and get evidence-backed answers from workspace feedback."
  },
  {
    icon: FileText,
    title: "VoC reports",
    description: "Generate executive-ready Voice of Customer reports with quotes and next actions."
  },
  {
    icon: Lock,
    title: "Tenant isolation",
    description: "Every workspace-owned query is scoped from the authenticated server session."
  },
  {
    icon: Database,
    title: "Production stack",
    description: "Next.js, Prisma, PostgreSQL, NextAuth/Auth.js, Zod, Recharts, and Claude."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-bold tracking-wide">LOOP</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#product">Product</a>
          <a href="#security">Security</a>
          <a href="#reports">Reports</a>
        </nav>
        <Link href="/login">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-4 pb-12 pt-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <Badge tone="ai" className="mb-5">
            AI Customer Feedback Intelligence
          </Badge>
          <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Turn customer feedback into your next best decision.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            LOOP uses AI to transform scattered customer feedback into themes,
            trends, and evidence-backed insights.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button className="w-full sm:w-auto">
                Open demo workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" className="w-full sm:w-auto">
                Create account
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-indigo-500/20 blur-3xl" />
          <Card className="relative overflow-hidden p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acme Cloud</p>
                <h2 className="text-xl font-bold">Customer signal cockpit</h2>
              </div>
              <Badge tone="ai">Live AI</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["1,284 items", "31% negative", "Onboarding rising"].map((item) => (
                <div key={item} className="rounded-xl border bg-background/75 p-4">
                  <p className="text-sm font-semibold">{item}</p>
                  <div className="mt-4 h-2 rounded-full bg-muted">
                    <div className="h-2 w-2/3 rounded-full bg-primary" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3 rounded-xl border bg-background/75 p-4">
              <p className="text-sm font-semibold">AI insight</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Enterprise onboarding friction is increasing. SSO setup, workspace
                roles, and activation guidance appear together in 43 recent comments.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold">Built like a real SaaS product</h2>
          <p className="mt-3 text-muted-foreground">
            The codebase separates UI, server logic, validation, authentication,
            database access, and AI services.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="p-5">
              <feature.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
