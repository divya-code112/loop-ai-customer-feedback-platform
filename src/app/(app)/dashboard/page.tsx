import { Activity, AlertTriangle, MessageSquare, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { SentimentChart, ThemeChart, VolumeChart } from "@/components/charts/dashboard-charts";
import { demoUser, feedbackItems, themeInsights } from "@/lib/demo-data";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={`Good morning, ${demoUser.name.split(" ")[0]}`}
        description="Here's what your customers are saying across support, reviews, surveys, sales calls, and community posts."
        action={
          <div className="flex gap-2">
            <Button variant="secondary">Upload CSV</Button>
            <Button>Ask LOOP</Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Feedback" value="1,284" change="+18% from previous period" icon={MessageSquare} tone="ai" />
        <StatCard title="Negative Feedback" value="31%" change="+6 points this week" icon={AlertTriangle} tone="negative" />
        <StatCard title="New This Week" value="186" change="42 need review" icon={Activity} tone="positive" />
        <StatCard title="Top Theme" value="Onboarding" change="43 mentions, growing fast" icon={Sparkles} tone="ai" />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <VolumeChart />
        <SentimentChart />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <ThemeChart />
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">AI insight card</h2>
            <Badge tone="ai">Claude-ready</Badge>
          </div>
          <p className="leading-7 text-muted-foreground">
            Onboarding and SSO mentions are increasing together. The recommended
            action is to create a first-run admin checklist and improve enterprise
            setup documentation before the next sales cycle.
          </p>
          <div className="mt-5 space-y-3">
            {themeInsights.slice(0, 3).map((theme) => (
              <div key={theme.name} className="flex items-center justify-between rounded-lg border bg-background/70 p-3">
                <div>
                  <p className="font-medium">{theme.name}</p>
                  <p className="text-xs text-muted-foreground">{theme.count} mentions</p>
                </div>
                <Badge tone={theme.change > 20 ? "warning" : "neutral"}>
                  {theme.change > 0 ? "+" : ""}
                  {theme.change}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent feedback</h2>
          <Button variant="ghost">View inbox</Button>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {feedbackItems.slice(0, 3).map((item) => (
            <div key={item.id} className="rounded-lg border bg-background/70 p-4">
              <Badge tone={item.sentiment === "NEGATIVE" ? "negative" : item.sentiment === "POSITIVE" ? "positive" : "neutral"}>
                {item.sentiment}
              </Badge>
              <p className="mt-3 text-sm leading-6">{item.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
