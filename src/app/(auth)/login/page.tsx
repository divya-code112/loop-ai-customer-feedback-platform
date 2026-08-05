"use client";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {

const router = useRouter();

  const handleLogin = () => {
    console.log("Clicked");
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
            <h1 className="text-xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your LOOP workspace.</p>
          </div>
        </div>
        <form className="space-y-4">
          <Input type="email" placeholder="Email" defaultValue="admin@loop.demo" />
          <Input type="password" placeholder="Password" defaultValue="password123" />
         <Button
  className="w-full"
  type="button"
  onClick={handleLogin}
>
  Sign in
</Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          New to LOOP?{" "}
          <Link href="/signup" className="font-semibold text-primary">
            Create an account
          </Link>
        </p>
      </Card>
    </main>
  );
}
