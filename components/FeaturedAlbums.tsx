import React from 'react'
import { featuredAlbums } from './data/Items'
import { Play, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'

export function FeaturedAlbums() {
  return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Featured Albums
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAlbums.map((album) => (
              <Card
                key={album.id}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <Image
                      src={album.image || "/placeholder.svg"}
                      alt={album.title}
                      width={300}
                      height={300}
                      className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${album.gradient} opacity-20 rounded-lg`}></div>
                    <Button
                      size="icon"
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r ${album.gradient} hover:scale-110 transition-transform rounded-full w-16 h-16 opacity-0 group-hover:opacity-100`}
                    >
                      <Play className="h-8 w-8 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{album.title}</h3>
                  <p className="text-blue-400 font-semibold mb-2">{album.artist}</p>
                  <p className="text-gray-400 text-sm mb-4">{album.year}</p>
                  <p className="text-gray-300 text-sm mb-4">{album.description}</p>

                  <div className="flex justify-between text-gray-400 text-sm mb-6">
                    <span>{album.tracks} tracks</span>
                    <span>{album.duration}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className={`flex-1 bg-gradient-to-r ${album.gradient} hover:opacity-90 text-white`}>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                    <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>  )
}

