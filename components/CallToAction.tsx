"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function CallToAction() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/contact#ContactForm");
  };
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Do not Miss Out
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Stay connected with our community and never miss an upcoming event or
          special service.
        </p>
        <Button
          size="lg"
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white glow"
        >
          Subscribe to Updates
        </Button>
      </div>
    </section>
  );
}
