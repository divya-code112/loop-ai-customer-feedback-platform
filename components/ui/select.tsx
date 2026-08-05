import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = "Select";
