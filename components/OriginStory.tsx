import React from "react";
import Image from "next/image";

export function OriginStory() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Where It All Began
            </h2>
            {/* TODO: Replace with actual content */}
            <p className="text-gray-300 mb-6 text-lg">
              In 2020, during a time of global uncertainty, a small group of
              believers came together virtually, seeking authentic connection
              and meaningful worship. What started as weekly online gatherings
              has grown into a thriving community that spans continents.
            </p>
            <p className="text-gray-300 mb-6">
              We recognized that traditional worship formats were not reaching
              everyone, especially younger generations who grew up in the
              digital age. Our mission became clear: create worship experiences
              that are both deeply spiritual and culturally relevant.
            </p>
            <p className="text-gray-300">
              Today, Monakho Ministry continues to innovate in worship,
              community building, and spiritual formation, always staying true
              to our core belief that everyone deserves to experience the
              transformative power of authentic worship.
            </p>
          </div>
          <div className="relative">
            <Image
            // TODO: Replace with actual image URL
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
  );
}
