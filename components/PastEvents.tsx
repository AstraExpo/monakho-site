import { Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from './ui/card'
import { pastEvents } from './data/Items'

export function PastEvents() {
  return (
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
      </section>  )
}
