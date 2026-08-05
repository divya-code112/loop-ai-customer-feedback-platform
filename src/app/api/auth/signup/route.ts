import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  workspaceName: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = signupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid signup data", issues: parsed.error.flatten() }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const user = await prisma.$transaction(async (tx) => {
    const workspace = await tx.workspace.create({
      data: { name: parsed.data.workspaceName }
    });

    return tx.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: "ADMIN",
        workspaceId: workspace.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        workspaceId: true
      }
    });
  });

  return NextResponse.json({ user }, { status: 201 });
}
