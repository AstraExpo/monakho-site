"use client";

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
import { KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <Card className="bg-[hsl(var(--card)/0.1)] dark:bg-[hsl(var(--card)/0.2)] backdrop-blur-xl border border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <KeyRound className="w-8 h-8 text-[hsl(var(--primary-foreground))]" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Reset Password
        </CardTitle>
        <CardDescription className="text-center text-[hsl(var(--muted-foreground))]">
          Enter your email address and we&apos;ll send you a link to reset your
          password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[hsl(var(--foreground))]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-[hsl(var(--primary-foreground))] shadow-lg shadow-blue-500/25"
          >
            Send Reset Link
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
