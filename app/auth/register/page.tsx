"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Loader2 } from "lucide-react";
import Image from "next/image";

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

import { getErrorMessage } from "@/utils/error";
import { useSignup } from "../hooks/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { signupWithEmail, signupWithGoogle, loading } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await signupWithEmail(email, password, "/client");
      router.push("/client");
    } catch (error) {
      alert(getErrorMessage(error) || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signupWithGoogle("/client");
      router.push("/client");
    } catch (error) {
      alert(getErrorMessage(error) || "Google signup failed");
    }
  };

  return (
    <Card className="bg-[hsl(var(--card)/0.1)] dark:bg-[hsl(var(--card)/0.2)] backdrop-blur-xl border border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-[hsl(var(--primary-foreground))]" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Create an Account
        </CardTitle>
        <CardDescription className="text-[hsl(var(--muted-foreground))] text-center">
          Sign up with your email or continue with Google
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[hsl(var(--foreground))]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-[hsl(var(--foreground))]"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-[hsl(var(--primary-foreground))] shadow-lg shadow-blue-500/25"
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)]"></div>
          <span className="mx-2 text-sm text-[hsl(var(--muted-foreground))]">
            or
          </span>
          <div className="flex-grow border-t border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)]"></div>
        </div>

        {/* Google Button */}
        <div className="mt-4">
          <Button
            onClick={handleGoogleSignup}
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

        {/* Login link */}
        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
