import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <Image
        src="/logo.png"
        alt="Worship Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to the Future of Worship
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience transformative worship in a digital age. Join our community
          as we explore faith, love, music, and connection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={"/gifts"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white glow"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Ministry Content
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
