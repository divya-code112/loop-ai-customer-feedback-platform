import { PageHeader } from "@/components/page-header";
import { SentimentChart, ThemeChart, VolumeChart } from "@/components/charts/dashboard-charts";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Analytics"
        title="Feedback analytics"
        description="Track volume, sentiment, and recurring themes from real database-backed feedback records."
      />
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <VolumeChart />
        <SentimentChart />
      </div>
      <div className="mt-5">
        <ThemeChart />
      </div>
    </div>
  );
}
