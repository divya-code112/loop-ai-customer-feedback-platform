"use client";

import { useMemo, useState } from "react";
import { Calendar, MessageSquare, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { feedbackItems } from "@/lib/demo-data";
import type { Sentiment } from "@/types";

function sentimentTone(sentiment: Sentiment) {
  if (sentiment === "POSITIVE") return "positive";
  if (sentiment === "NEGATIVE") return "negative";
  return "neutral";
}

export function FeedbackTable() {
  const [query, setQuery] = useState("");
  const [sentiment, setSentiment] = useState("ALL");

  const rows = useMemo(() => {
    return feedbackItems.filter((item) => {
      const matchesSearch =
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.customerLabel.toLowerCase().includes(query.toLowerCase()) ||
        item.themes.join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesSentiment = sentiment === "ALL" || item.sentiment === sentiment;
      return matchesSearch && matchesSentiment;
    });
  }, [query, sentiment]);

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-3 border-b p-4 md:grid-cols-[1fr_180px_180px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search feedback, themes, customers..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Select value={sentiment} onChange={(event) => setSentiment(event.target.value)}>
          <option value="ALL">All sentiment</option>
          <option value="POSITIVE">Positive</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="NEGATIVE">Negative</option>
        </Select>
        <Select defaultValue="newest">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="score">Sentiment score</option>
        </Select>
      </div>

      <div className="divide-y">
        {rows.map((item) => (
          <article key={item.id} className="grid gap-4 p-4 transition hover:bg-muted/45 lg:grid-cols-[1fr_160px_140px]">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone={sentimentTone(item.sentiment)}>{item.sentiment}</Badge>
                <Badge tone="info">{item.channel}</Badge>
                <Badge>{item.status}</Badge>
              </div>
              <p className="font-medium leading-6">{item.content}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.themes.map((theme) => (
                  <Badge key={theme} tone="ai">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              {item.customerLabel}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {item.createdAt}
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
