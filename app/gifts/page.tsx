import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Heart, Headphones, Share } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Music - Monakho Ministry",
  description: "Listen to our latest worship music, albums, and live recordings.",
}

export default function MusicPage() {
  const featuredAlbums = [
    {
      id: 1,
      title: "Digital Sanctuary",
      artist: "Monakho Worship",
      year: "2023",
      image: "/placeholder.svg?height=300&width=300",
      description: "Our latest album exploring themes of faith in the digital age.",
      tracks: 12,
      duration: "48:32",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Acoustic Sessions",
      artist: "Monakho Collective",
      year: "2023",
      image: "/placeholder.svg?height=300&width=300",
      description: "Intimate acoustic versions of our most beloved worship songs.",
      tracks: 8,
      duration: "32:15",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Live from the Heart",
      artist: "Monakho Ministry",
      year: "2022",
      image: "/placeholder.svg?height=300&width=300",
      description: "Recorded live during our most powerful worship services.",
      tracks: 10,
      duration: "52:18",
      gradient: "from-pink-500 to-red-500",
    },
  ]

  const popularTracks = [
    {
      title: "Future Hope",
      artist: "Monakho Worship",
      duration: "4:23",
      plays: "12.5K",
    },
    {
      title: "Digital Prayers",
      artist: "Sarah Johnson",
      duration: "3:45",
      plays: "8.9K",
    },
    {
      title: "Connected Hearts",
      artist: "Marcus Chen",
      duration: "5:12",
      plays: "15.2K",
    },
    {
      title: "Infinite Grace",
      artist: "Elena Rodriguez",
      duration: "4:01",
      plays: "11.7K",
    },
    {
      title: "Modern Psalms",
      artist: "Monakho Collective",
      duration: "3:58",
      plays: "9.3K",
    },
  ]

  const liveRecordings = [
    {
      title: "Sunday Service - December 3, 2023",
      duration: "1:15:32",
      views: "2.1K",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Acoustic Night - November 24, 2023",
      duration: "45:18",
      views: "1.8K",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Youth Worship - November 18, 2023",
      duration: "52:45",
      views: "3.2K",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Worship Music
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our collection of contemporary worship music, live recordings, and acoustic sessions that inspire
            and uplift the soul.
          </p>
        </div>
      </section>

      {/* Featured Albums */}
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
      </section>

      {/* Popular Tracks */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Popular Tracks
          </h2>

          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                {popularTracks.map((track, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center space-x-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full w-10 h-10"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <div>
                        <h4 className="text-white font-semibold">{track.title}</h4>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                      <span>{track.plays} plays</span>
                      <span>{track.duration}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Live Recordings */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Live Recordings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {liveRecordings.map((recording, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={recording.thumbnail || "/placeholder.svg"}
                      alt={recording.title}
                      width={350}
                      height={200}
                      className="w-full rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 hover:scale-110 transition-transform rounded-full w-12 h-12 opacity-0 group-hover:opacity-100"
                    >
                      <Play className="h-6 w-6 text-white" />
                    </Button>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{recording.title}</h3>

                  <div className="flex justify-between text-gray-400 text-sm mb-4">
                    <span>{recording.views} views</span>
                    <span>{recording.duration}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white">
                      <Play className="mr-2 h-4 w-4" />
                      Watch
                    </Button>
                    <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Listen Everywhere
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Find our music on all major streaming platforms and never miss a new release.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Spotify", "Apple Music", "YouTube Music", "SoundCloud"].map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-16 text-lg"
              >
                <Headphones className="mr-2 h-5 w-5" />
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
