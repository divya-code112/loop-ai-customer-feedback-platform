import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
