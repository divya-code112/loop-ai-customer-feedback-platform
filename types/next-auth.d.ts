import type { Role } from "@/types";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: Role;
    workspaceId: string;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      workspaceId: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    workspaceId: string;
  }
}
