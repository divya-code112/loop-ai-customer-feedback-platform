"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = () => {
    console.log("Workspace created");
    router.push("/dashboard");
  };

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Create your workspace</h1>
            <p className="text-sm text-muted-foreground">Start with a secure admin account.</p>
          </div>
        </div>
        <form className="space-y-4">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Work email" />
          <Input type="password" placeholder="Password" />
          <Input placeholder="Workspace name" />
          <Button className="w-full" type="button" onClick={handleSignup}>
            Create workspace
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
