"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="max-w-md p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-danger" />
        <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          LOOP caught an unexpected error. Try again, and check the server logs
          if this keeps happening.
        </p>
        <Button className="mt-6" onClick={() => reset()}>
          Try again
        </Button>
      </Card>
    </main>
  );
}
