import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Users, Calendar, FileText, Package, ArrowRight, Play } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>

        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Admin Dashboard Background"
          fill
          className="object-cover opacity-20"
          priority
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-bounce">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Ministry Command Center
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Manage your ministry's content, events, and community with powerful administrative tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/events">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25"
              >
                <Play className="mr-2 h-5 w-5" />
                Manage Events
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                Content Hub
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Events</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-300 mb-3">Upcoming events</p>
              <Link href="/admin/events">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Manage Events
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Content</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-gray-300 mb-3">Published articles</p>
              <Link href="/admin/content">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                >
                  Manage Content
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">About</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">5</div>
              <p className="text-xs text-gray-300 mb-3">Team members</p>
              <Link href="/admin/about">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                >
                  Manage About
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Merchandise</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-300 mb-3">Products available</p>
              <Link href="/admin/merchandise">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
