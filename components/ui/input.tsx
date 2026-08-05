import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
