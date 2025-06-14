import { Hero } from "@/components/Hero"
import { Mission } from "@/components/Mission"
import { Events } from "@/components/Events"
import { Connect } from "@/components/Connect"

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero />

      {/* Mission Section */}
      <Mission />

      {/* Upcoming Events Preview */}
      <Events />

      {/* Call to Action */}
      <Connect />
    </div>
  )
}
