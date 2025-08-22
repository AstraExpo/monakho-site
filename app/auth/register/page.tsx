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
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { getErrorMessage } from "@/utils/error";

interface SignupResponse {
  success?: boolean;
  error?: string;
  [key: string]: unknown;
}

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      alert("You must agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phone,
          newsletter,
        }),
      });

      const contentType = response.headers.get("content-type");
      let data: SignupResponse;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(
          `Server returned non-JSON response: ${text.slice(0, 100)}...`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      router.push("/client");
    } catch (error: unknown) {
      alert(getErrorMessage(error) || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[hsl(var(--card)/0.1)] dark:bg-[hsl(var(--card)/0.2)] backdrop-blur-xl border border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <UserPlus className="w-8 h-8 text-[hsl(var(--primary-foreground))]" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Join Our Community
        </CardTitle>
        <CardDescription className="text-[hsl(var(--muted-foreground))] text-center">
          Create your account to access member resources and stay connected
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-[hsl(var(--foreground))]"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-[hsl(var(--foreground))]"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[hsl(var(--input)/0.1)] dark:bg-[hsl(var(--input)/0.2)] border-[hsl(var(--border)/0.2)] dark:border-[hsl(var(--border)/0.3)] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
              />
            </div>
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[hsl(var(--foreground))]">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={() => setAgreeTerms(!agreeTerms)}
            />
            <Label
              htmlFor="terms"
              className="text-sm text-[hsl(var(--foreground))]"
            >
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={newsletter}
              onCheckedChange={() => setNewsletter(!newsletter)}
            />
            <Label
              htmlFor="newsletter"
              className="text-sm text-[hsl(var(--foreground))]"
            >
              Subscribe to our newsletter for updates and events
            </Label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-[hsl(var(--primary-foreground))] shadow-lg shadow-blue-500/25"
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

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
