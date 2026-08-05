import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  totalPages
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button variant="secondary" disabled={page <= 1}>
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button variant="secondary" disabled={page >= totalPages}>
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
