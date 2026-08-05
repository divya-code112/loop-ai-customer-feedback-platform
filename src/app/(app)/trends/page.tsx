import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { themeInsights } from "@/lib/demo-data";

export default function TrendsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Theme Clustering"
        title="Find growing, declining, and stable customer themes"
        description="LOOP compares the current period against the previous period and highlights spikes that need product attention."
      />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {themeInsights.map((theme) => {
          const Icon = theme.trend === "Growing" ? ArrowUp : theme.trend === "Declining" ? ArrowDown : Minus;
          return (
            <Card key={theme.name} className="p-5">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="font-semibold">{theme.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{theme.count} mentions</p>
                </div>
                <Badge tone={theme.trend === "Growing" ? "warning" : theme.trend === "Declining" ? "negative" : "neutral"}>
                  <Icon className="mr-1 h-3 w-3" />
                  {theme.trend}
                </Badge>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{theme.description}</p>
              <div className="mt-5 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(theme.count * 2, 100)}%`,
                    backgroundColor: theme.color
                  }}
                />
              </div>
              <p className="mt-3 text-sm font-semibold">
                {theme.change > 0 ? "+" : ""}
                {theme.change}% vs previous period
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
