import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "default"
}: {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone?: "default" | "positive" | "negative" | "ai";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        <div
          className={cn(
            "rounded-lg p-2",
            tone === "positive" && "bg-emerald-500/12 text-emerald-600",
            tone === "negative" && "bg-red-500/12 text-red-600",
            tone === "ai" && "bg-indigo-500/12 text-indigo-600",
            tone === "default" && "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{change}</p>
    </Card>
  );
}
