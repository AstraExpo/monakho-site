import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, Shield, Heart, ArrowRight, Play } from "lucide-react";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

      {/* Background image */}
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Monakho Ministry Worship Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-bounce">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to Monakho Ministry — The Future of Worship.
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover the heart of Monakho: a worship movement devoted to faith,
          love, music, and community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/client">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Ministry Content
            </Button>
          </Link>
          <Link href="/client/about">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Quick access cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
            <p className="text-gray-300 text-sm mb-4">
              Connect with our vibrant community
            </p>
            <Link href="/client">
              <Button
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 p-0"
              >
                Enter Community →
              </Button>
            </Link>
          </div>

          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Member Portal
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Access exclusive resources
            </p>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-purple-400 hover:text-purple-300 p-0"
              >
                Sign In →
              </Button>
            </Link>
          </div>

          <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Administration
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Ministry management tools
            </p>
            <Link href="/admin">
              <Button
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 p-0"
              >
                Admin Portal →
              </Button>
            </Link>
          </div>
        </div>

        {/* Scripture verse */}
        <div className="mt-16">
          <div className="inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-lg text-gray-300 italic">
              "For where two or three gather in my name, there am I with them."
            </p>
            <p className="text-sm text-gray-400 mt-2">- Matthew 18:20</p>
          </div>
        </div>
      </div>
    </section>
  );
}
