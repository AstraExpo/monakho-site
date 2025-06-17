import { MapPin, Calendar, Phone } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function Location() {
  return (
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Visit Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Main Campus
                    </h3>
                    <p className="text-gray-300">
                      123 Worship Way
                      <br />
                      Digital City, DC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Service Times
                    </h3>
                    <div className="text-gray-300 space-y-1">
                      <p>Sunday Worship: 10:00 AM - 11:30 AM</p>
                      <p>Wednesday Prayer: 7:00 PM - 8:00 PM</p>
                      <p>Friday Youth: 6:00 PM - 8:30 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-pink-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Office Hours
                    </h3>
                    <div className="text-gray-300 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                      <p>Sunday: By appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Find Us Online
              </h2>
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                    <MapPin className="h-16 w-16 text-blue-400" />
                  </div>
                  <p className="text-gray-300 mb-4">
                    While we have a physical location, we are also a
                    digital-first ministry. Join us online for live streams,
                    virtual events, and community discussions.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    Join Online Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>  )
}
