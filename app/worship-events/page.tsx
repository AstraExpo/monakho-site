import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Music, Heart, Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Worship Events - Monakho Ministry",
  description: "Join us for upcoming worship events, services, and community gatherings.",
}

export default function WorshipEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Sunday Worship Experience",
      date: "Every Sunday",
      time: "10:00 AM - 11:30 AM",
      location: "Online & In-Person",
      description:
        "Join us for our weekly worship service featuring contemporary music, inspiring messages, and community connection.",
      type: "Weekly Service",
      icon: Heart,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Acoustic Worship Night",
      date: "Friday, Dec 15",
      time: "7:00 PM - 9:00 PM",
      location: "Community Center",
      description: "An intimate evening of acoustic worship, testimonies, and fellowship in a cozy, candlelit setting.",
      type: "Special Event",
      icon: Music,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Youth Worship Gathering",
      date: "Saturday, Dec 16",
      time: "6:00 PM - 8:30 PM",
      location: "Youth Center",
      description:
        "High-energy worship designed for teens and young adults with contemporary music and relevant messages.",
      type: "Youth Event",
      icon: Star,
      gradient: "from-pink-500 to-red-500",
    },
    {
      id: 4,
      title: "Christmas Eve Service",
      date: "Sunday, Dec 24",
      time: "7:00 PM - 8:30 PM",
      location: "Main Sanctuary",
      description:
        "Celebrate the birth of Christ with a special candlelight service featuring carols, communion, and reflection.",
      type: "Holiday Service",
      icon: Heart,
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "New Year Prayer & Worship",
      date: "Sunday, Dec 31",
      time: "11:00 PM - 12:30 AM",
      location: "Online & In-Person",
      description: "Welcome the new year with prayer, worship, and setting intentions for the year ahead.",
      type: "Special Service",
      icon: Star,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 6,
      title: "Community Outreach Day",
      date: "Saturday, Jan 6",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description: "Join us as we serve our local community through various outreach projects and acts of kindness.",
      type: "Community Service",
      icon: Users,
      gradient: "from-green-500 to-blue-500",
    },
  ]

  const pastEvents = [
    {
      title: "Thanksgiving Gratitude Service",
      date: "November 23, 2023",
      description: "A beautiful service focused on gratitude and thanksgiving.",
      attendees: 150,
    },
    {
      title: "Fall Worship Festival",
      date: "October 15, 2023",
      description: "Outdoor worship celebration with multiple bands and speakers.",
      attendees: 300,
    },
    {
      title: "Back to School Blessing",
      date: "August 27, 2023",
      description: "Special service blessing students and educators for the new school year.",
      attendees: 200,
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Worship Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for transformative worship experiences, community gatherings, and special celebrations throughout
            the year.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${event.gradient} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <event.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">{event.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-6">{event.description}</p>

                  <Button className={`w-full bg-gradient-to-r ${event.gradient} hover:opacity-90 text-white`}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Recent Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-blue-400 font-semibold mb-3">{event.date}</p>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Do not Miss Out
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stay connected with our community and never miss an upcoming event or special service.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white glow"
          >
            Subscribe to Updates
          </Button>
        </div>
      </section>
    </div>
  )
}
