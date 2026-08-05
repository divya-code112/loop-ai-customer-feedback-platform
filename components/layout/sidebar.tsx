"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Inbox,
  LayoutDashboard,
  LineChart,
  MessageSquareText,
  Settings,
  Sparkles,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { demoUser } from "@/lib/demo-data";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Badge } from "@/components/ui/badge";

const primaryNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/inbox", label: "Feedback Inbox", icon: Inbox },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/trends", label: "Trends", icon: LineChart },
  { href: "/ask", label: "Ask LOOP", icon: MessageSquareText },
  { href: "/reports", label: "Reports", icon: FileText }
];

const workspaceNav = [
  { href: "/members", label: "Members", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r bg-card/75 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-3 border-b px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide">LOOP</div>
          <div className="text-xs text-muted-foreground">Feedback Intelligence</div>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Product
          </p>
          <nav className="mt-2 space-y-1">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          <nav className="mt-2 space-y-1">
            {workspaceNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t p-4">
        <div className="mb-3 rounded-xl border bg-background/70 p-3">
          <div className="text-sm font-semibold">{demoUser.workspace}</div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{demoUser.email}</span>
            <Badge tone="ai">{demoUser.role}</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-bold">
              AS
            </div>
            <div>
              <div className="text-sm font-medium">{demoUser.name}</div>
              <div className="text-xs text-muted-foreground">Workspace admin</div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
