"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, LogIn, ShieldAlert } from "lucide-react";

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const getReasonMessage = () => {
    switch (reason) {
      case "admin":
        return "This section is restricted to administrators only.";
      case "login":
        return "You must be logged in to access this page.";
      case "role":
        return "You do not have the required role to view this content.";
      default:
        return "You don’t have permission to access this page.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900/30 via-black/40 to-red-900/30 p-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-300 mb-6">{getReasonMessage()}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 w-full sm:w-auto">
              <LogIn className="w-4 h-4 mr-2" />
              Login Again
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If you believe this is an error, please contact the site
          administrator.
        </p>
      </div>
    </div>
  );
}

export default function UnauthorizedPage() {
  return (
    <Suspense
      fallback={<div className="text-center text-gray-400">Loading...</div>}
    >
      <UnauthorizedContent />
    </Suspense>
  );
}
