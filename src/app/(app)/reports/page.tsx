import { CalendarDays, Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sections = [
  "Executive Summary",
  "Overall Sentiment",
  "Top Customer Themes",
  "Emerging Trends",
  "Notable Customer Quotes",
  "Recommended Actions"
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Voice of Customer"
        title="Generate executive-ready reports"
        description="Reports are precomputed from workspace feedback and then summarized with Claude into a saved narrative."
        action={<Button>Generate Report</Button>}
      />
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="p-5">
          <h2 className="font-semibold">Saved reports</h2>
          <div className="mt-4 space-y-3">
            {["July Product Signals", "Q2 Enterprise Feedback", "Mobile Experience Review"].map((report, index) => (
              <div key={report} className="rounded-lg border bg-background/70 p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">{report}</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Generated {index + 1} week{index === 0 ? "" : "s"} ago
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge tone="ai">Generated report preview</Badge>
              <h2 className="mt-3 text-xl font-bold">July Product Signals</h2>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <CalendarDays className="h-4 w-4" />
                Date range
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="space-y-5">
            {sections.map((section) => (
              <section key={section} className="rounded-xl border bg-background/70 p-4">
                <h3 className="font-semibold">{section}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  LOOP will compute source metrics, select evidence, and ask Claude to
                  write this section in a clear executive voice while preserving
                  traceable customer quotes.
                </p>
              </section>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
