"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
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
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await res.json()
        : { error: await res.text() };

      if (!res.ok) throw new Error(data.error || "Failed to sign in");
      if (data.redirectTo) {
        router.push(data.redirectTo);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <div className="animate-bounce">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
        </div>
        <CardDescription className="text-center text-gray-300">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
          >
            {loading ? "Signing In..." : "Sign In"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-purple-400 hover:text-purple-300 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
