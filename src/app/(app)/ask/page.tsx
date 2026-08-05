import { AskLoopClient } from "@/components/ai/ask-loop-client";
import { PageHeader } from "@/components/page-header";

export default function AskPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Ask LOOP"
        title="Ask questions about what your customers are saying"
        description="Ground every answer in feedback evidence so product, support, and leadership teams can trust the result."
      />
      <AskLoopClient />
    </div>
  );
}
