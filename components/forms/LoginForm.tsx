"use client";
import { useLogin } from "@/app/auth/hooks/auth";
import { Label } from "../ui/label";
import { LogIn, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import Image from "next/image";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/client";

  const { loginWithEmail, loginWithGoogle, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /** Email login */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginWithEmail(email, password, redirectPath);
      router.push(data.redirectTo);
    } catch {
      /* error handled in hook */
    }
  };

  /** Google login */
  const handleGoogleLogin = async () => {
    try {
      const data = await loginWithGoogle(redirectPath);
      router.push(data.redirectTo);
    } catch {
      /* error handled in hook */
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
          Enter your credentials or continue with Google
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Email/Password Login Form */}
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
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)]"
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
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)]"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-[hsl(var(--primary-foreground))]"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {/* Google Login */}
        <div className="mt-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
            <Image
              width={8}
              height={8}
              src="/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        {/* Links */}
        <div className="mt-4 text-center space-y-2">
          <Link
            href="/auth/forgot-password"
            className="text-blue-400 dark:text-blue-300 hover:underline"
          >
            Forgot your password?
          </Link>
          <div className="text-[hsl(var(--muted-foreground))] text-sm">
            Don&apos;t have an account?
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
