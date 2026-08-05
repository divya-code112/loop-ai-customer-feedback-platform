import { Plus, Upload } from "lucide-react";
import { FeedbackTable } from "@/components/feedback/feedback-table";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function InboxPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Feedback Inbox"
        title="Review every customer signal in one place"
        description="Search, filter, triage, and update feedback status while keeping every query scoped to the user's workspace."
        action={
          <div className="flex gap-2">
            <Button variant="secondary">
              <Upload className="h-4 w-4" />
              Upload CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4" />
              Add Feedback
            </Button>
          </div>
        }
      />
      <FeedbackTable />
    </div>
  );
}
