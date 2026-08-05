import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Modal({
  title,
  children,
  open
}: {
  title: string;
  children: ReactNode;
  open: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
      <Card className="w-full max-w-lg p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">{title}</h2>
          <Button variant="ghost" className="h-8 w-8 px-0" aria-label="Close modal">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </Card>
    </div>
  );
}
