import type { Metadata } from "next";
import { FeaturedAlbums } from "@/components/FeaturedAlbums";
import { PopularTracks } from "@/components/PopularTracks";
import { LiveRecording } from "@/components/LiveRecording";
import { StreamingPlatforms } from "@/components/StreamingPlatforms";

export const metadata: Metadata = {
  title: "Music - Monakho Ministry",
  description:
    "Listen to our latest worship music, albums, and live recordings. Experience the power of worship through music and reading.",
};

export default function MusicPage() {
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
            Experience our collection of contemporary worship music, live
            recordings, Book reading, and acoustic sessions that inspire and
            uplift the soul.
          </p>
        </div>
      </section>

      {/* Featured Albums */}
      <FeaturedAlbums />

      {/* Popular Tracks */}
      {/* <PopularTracks /> */}

      {/* Live Recordings */}
      {/* <LiveRecording /> */}

      {/* Streaming Platforms */}
      <StreamingPlatforms />
    </div>
  );
}
