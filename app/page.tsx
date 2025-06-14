import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Play, Users, Music, Calendar, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/Hero"

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero />

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To create authentic worship experiences that bridge the gap between traditional faith and modern
              expression, fostering a community where everyone can encounter the divine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
                <p className="text-gray-300">
                  Building meaningful connections through shared worship and authentic relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Worship</h3>
                <p className="text-gray-300">Contemporary worship that speaks to the heart and elevates the spirit.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Purpose</h3>
                <p className="text-gray-300">
                  Discovering and living out your unique calling in a supportive environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <Link href="/worship-events">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-semibold">This Sunday</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Sunday Worship Experience</h3>
                <p className="text-gray-300 mb-4">
                  Join us for an immersive worship experience featuring live music, inspiring messages, and community
                  connection.
                </p>
                <p className="text-sm text-gray-400">10:00 AM - 11:30 AM</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Music className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 font-semibold">Next Friday</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Acoustic Night</h3>
                <p className="text-gray-300 mb-4">
                  An intimate evening of acoustic worship, testimonies, and fellowship in a cozy setting.
                </p>
                <p className="text-sm text-gray-400">7:00 PM - 9:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Take the first step towards a transformative worship experience. Connect with us today.
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
    </div>
  )
}
