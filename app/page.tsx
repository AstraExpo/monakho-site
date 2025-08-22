import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, Shield, ArrowRight, Play } from "lucide-react";
import { QuickAccessCard } from "@/components/QuickAccessCards";
import { HomeBackground } from "@/components/HomeBackground";
import { JSX } from "react";

export default function HomePage(): JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HomeBackground />

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-bounce">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to Monakho Ministry — The Future of Worship.
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
          Discover the Heart and Spirit of God through a worship movement
          devoted to faith, love, music, the Word, intercession, prayer, and the
          unity of His people.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/client">
            <Button
              aria-label="Explore Ministry Content"
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-foreground shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Ministry Content
            </Button>
          </Link>
          <Link href="/client/about">
            <Button
              size="lg"
              variant="outline"
              className="border border-border text-foreground hover:bg-foreground/10 backdrop-blur-sm bg-transparent"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <QuickAccessCard
            icon={Users}
            iconGradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            title="Community"
            description="Connect with our vibrant community"
            linkHref="/auth/login?redirect=/client"
            linkText="Enter Community"
            linkColor="blue"
          />
          <QuickAccessCard
            icon={Shield}
            iconGradient="bg-gradient-to-br from-emerald-500 to-teal-500"
            title="Administration"
            description="Ministry management tools"
            linkHref="/auth/login?redirect=/admin"
            linkText="Admin Portal"
            linkColor="emerald"
          />
        </div>

        <div className="mt-16">
          <div className="inline-block p-6 rounded-2xl bg-card/5 backdrop-blur-sm border border-border">
            <p className="text-lg text-foreground/70 italic">
              "For where two or three gather in my name, there am I with them."
            </p>
            <p className="text-sm text-foreground/50 mt-2">- Matthew 18:20</p>
          </div>
        </div>
      </div>
    </section>
  );
}
