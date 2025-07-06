import { Calendar, Clock, MapPin } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { upcomingEvents } from './data/Items'

export function UpcomingEvents() {
  return (
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
      </section>  )
}
