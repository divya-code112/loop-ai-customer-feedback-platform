import type { Role } from "@/types";

export type Permission =
  | "workspace.manage"
  | "members.manage"
  | "feedback.read"
  | "feedback.create"
  | "feedback.update"
  | "themes.manage"
  | "analytics.read"
  | "ai.use"
  | "reports.generate";

const permissionsByRole: Record<Role, Permission[]> = {
  ADMIN: [
    "workspace.manage",
    "members.manage",
    "feedback.read",
    "feedback.create",
    "feedback.update",
    "themes.manage",
    "analytics.read",
    "ai.use",
    "reports.generate"
  ],
  ANALYST: [
    "feedback.read",
    "feedback.create",
    "feedback.update",
    "themes.manage",
    "analytics.read",
    "ai.use",
    "reports.generate"
  ],
  VIEWER: ["feedback.read", "analytics.read", "ai.use"]
};

export function can(role: Role, permission: Permission) {
  return permissionsByRole[role].includes(permission);
}

export function assertCan(role: Role, permission: Permission) {
  if (!can(role, permission)) {
    const error = new Error("Forbidden");
    error.name = "ForbiddenError";
    throw error;
  }
}
