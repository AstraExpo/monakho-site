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
import { LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
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
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
          >
            Sign In
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
            Don't have an account?{" "}
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
