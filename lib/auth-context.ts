import "server-only";
import { auth } from "@/lib/auth";
import { assertCan, type Permission } from "@/lib/permissions";

export async function requireWorkspace(permission?: Permission) {
  const session = await auth();

  if (!session?.user?.workspaceId) {
    return {
      ok: false as const,
      status: 401,
      error: "Unauthorized"
    };
  }

  try {
    if (permission) {
      assertCan(session.user.role, permission);
    }
  } catch {
    return {
      ok: false as const,
      status: 403,
      error: "Forbidden"
    };
  }

  return {
    ok: true as const,
    userId: session.user.id,
    role: session.user.role,
    workspaceId: session.user.workspaceId
  };
}
