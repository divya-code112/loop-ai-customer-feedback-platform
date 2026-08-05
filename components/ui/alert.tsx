import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Alert({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border bg-card p-4 text-sm shadow-soft", className)}
      {...props}
    />
  );
}
