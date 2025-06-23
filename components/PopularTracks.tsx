import { Play, Download } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { popularTracks } from "./data/Items";

export function PopularTracks() {
  return (
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
                      <h4 className="text-white font-semibold">
                        {track.title}
                      </h4>
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
  );
}
