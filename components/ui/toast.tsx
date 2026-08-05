import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Toast({ message }: { message: string }) {
  return (
    <Card className="fixed bottom-4 right-4 flex items-center gap-3 p-4">
      <CheckCircle2 className="h-5 w-5 text-success" />
      <span className="text-sm font-medium">{message}</span>
    </Card>
  );
}
