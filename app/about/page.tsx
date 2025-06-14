import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Star } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Monakho Ministry",
  description: "Learn about our mission, values, and leadership team at Monakho Ministry.",
}

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Authentic Worship",
      description: "We believe in genuine, heartfelt worship that connects people with the divine.",
    },
    {
      icon: Users,
      title: "Inclusive Community",
      description: "Everyone is welcome in our community, regardless of background or journey.",
    },
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "We help individuals discover and pursue their unique calling and purpose.",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from worship to community care.",
    },
  ]

  const leadership = [
    {
      name: "Pastor Sarah Johnson",
      role: "Lead Pastor",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah has been leading worship communities for over 15 years, with a passion for bridging traditional faith with contemporary expression.",
    },
    {
      name: "Marcus Chen",
      role: "Worship Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Marcus brings his background in music production and theology to create immersive worship experiences.",
    },
    {
      name: "Elena Rodriguez",
      role: "Community Pastor",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Elena focuses on building authentic relationships and fostering spiritual growth within our community.",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monakho Ministry was born from a vision to create worship experiences that speak to the modern soul while
            honoring timeless spiritual truths.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Where It All Began
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                In 2020, during a time of global uncertainty, a small group of believers came together virtually,
                seeking authentic connection and meaningful worship. What started as weekly online gatherings has grown
                into a thriving community that spans continents.
              </p>
              <p className="text-gray-300 mb-6">
                We recognized that traditional worship formats weren't reaching everyone, especially younger generations
                who grew up in the digital age. Our mission became clear: create worship experiences that are both
                deeply spiritual and culturally relevant.
              </p>
              <p className="text-gray-300">
                Today, Monakho Ministry continues to innovate in worship, community building, and spiritual formation,
                always staying true to our core belief that everyone deserves to experience the transformative power of
                authentic worship.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Ministry Origin"
                width={600}
                height={500}
                className="rounded-lg opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape the culture of our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the passionate leaders who guide our community with wisdom, creativity, and heart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{leader.role}</p>
                  <p className="text-gray-300">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
