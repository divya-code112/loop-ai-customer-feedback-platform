import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "positive" | "negative" | "warning" | "info" | "ai";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  positive: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  negative: "bg-red-500/12 text-red-700 dark:text-red-300",
  warning: "bg-amber-500/14 text-amber-700 dark:text-amber-300",
  info: "bg-blue-500/12 text-blue-700 dark:text-blue-300",
  ai: "bg-indigo-500/12 text-indigo-700 dark:text-indigo-300"
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
