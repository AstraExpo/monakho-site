"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, ArrowRight } from "lucide-react";
import { getErrorMessage } from "@/utils/error";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/client";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, redirect: redirectPath }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to sign in");

      router.push(data.redirectTo);
    } catch (error: unknown) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[hsl(var(--card)/0.1)] dark:bg-[hsl(var(--card)/0.2)] backdrop-blur-md border border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <LogIn className="w-8 h-8 text-[hsl(var(--primary-foreground))]" />
        </div>
        <div className="animate-bounce">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </div>
        <CardDescription className="text-[hsl(var(--muted-foreground))]">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[hsl(var(--foreground))]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[hsl(var(--foreground))]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-[hsl(var(--primary-foreground))] shadow-lg shadow-blue-500/25"
          >
            {loading ? "Signing In..." : "Sign In"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <Link
            href="/auth/forgot-password"
            className="text-blue-400 dark:text-blue-300 hover:underline"
          >
            Forgot your password?
          </Link>
          <div className="text-[hsl(var(--muted-foreground))] text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-purple-400 dark:text-purple-300 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
