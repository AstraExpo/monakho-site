import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function Connect() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Connect with Monakho Ministry
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Take the first step in your journey of faith, worship, and
          transformation with <strong>Monakho Ministry</strong>. Whether you&apos;re
          looking to join our events, serve, grow spiritually, or just explore
          what we&apos;re all about—we&apos;d love to hear from you.
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white glow"
          >
            Get Connected
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
