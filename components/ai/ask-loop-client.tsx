"use client";

import { useState } from "react";
import { ArrowUp, Bot, Sparkles } from "lucide-react";
import { feedbackItems } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const suggestions = [
  "What are customers saying about onboarding?",
  "What are the biggest complaints this month?",
  "Which feature do customers request most often?"
];

export function AskLoopClient() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);

  function submitQuestion(nextQuestion = question) {
    if (!nextQuestion.trim()) return;
    setQuestion(nextQuestion);
    setAsked(true);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <Card className="relative overflow-hidden p-5">
        <div className="absolute inset-x-10 top-0 h-24 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/12 p-2 text-indigo-600">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Evidence-grounded answer</h2>
              <p className="text-sm text-muted-foreground">
                LOOP answers only from feedback in your workspace.
              </p>
            </div>
          </div>

          {!asked ? (
            <div className="rounded-xl border bg-background/70 p-8 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-indigo-500" />
              <h3 className="mt-4 text-lg font-semibold">Ask a customer question</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                The production flow creates an embedding, retrieves similar feedback, sends
                the evidence to Claude, and returns a grounded answer.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="ml-auto max-w-xl rounded-xl bg-primary p-4 text-primary-foreground">
                {question}
              </div>
              <div className="max-w-2xl rounded-xl border bg-background p-4">
                <Badge tone="ai" className="mb-3">
                  Generated from 3 evidence items
                </Badge>
                <p className="leading-7">
                  Customers are mainly concerned about onboarding complexity, mobile
                  review friction, and enterprise setup. The strongest signal is that
                  teams understand LOOP's value, but want faster activation, clearer
                  workspace roles, and better SSO guidance.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary hover:text-foreground"
                  onClick={() => submitQuestion(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask LOOP about feedback, themes, trends, complaints, or feature requests..."
              />
              <Button className="h-auto self-stretch px-4" onClick={() => submitQuestion()}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="font-semibold">Evidence</h2>
        {feedbackItems.slice(0, 3).map((item) => (
          <Card key={item.id} className="p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Badge tone="ai">{item.id}</Badge>
              <span className="text-xs text-muted-foreground">{item.channel}</span>
            </div>
            <p className="text-sm leading-6">{item.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
