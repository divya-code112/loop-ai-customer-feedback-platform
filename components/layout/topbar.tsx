"use client";

import Link from "next/link";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <Button variant="ghost" className="h-9 w-9 px-0 lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>
      <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="text-sm font-bold">LOOP</span>
      </Link>
      <div className="relative ml-auto hidden w-full max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search feedback, themes, reports..." />
      </div>
      <Button variant="ghost" className="h-9 w-9 px-0" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>
      <ThemeToggle />
    </header>
  );
}
