import { Play, Share } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { liveRecordings } from "./data/Items";
import Image from "next/image";

export function LiveRecording() {
  return (
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

                <h3 className="text-lg font-bold text-white mb-2">
                  {recording.title}
                </h3>

                <div className="flex justify-between text-gray-400 text-sm mb-4">
                  <span>{recording.views} views</span>
                  <span>{recording.duration}</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white">
                    <Play className="mr-2 h-4 w-4" />
                    Watch
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
