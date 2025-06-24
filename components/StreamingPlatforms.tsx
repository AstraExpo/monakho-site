import { Headphones } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export function StreamingPlatforms() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Listen Everywhere
        </h2>
        <p className="text-xl text-gray-300 mb-12">
          Find our music on all major streaming platforms and never miss a new
          release.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Spotify", "Apple Music", "YouTube Music", "SoundCloud"].map(
            (platform) => (
              <Button
                key={platform}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-16 text-lg"
              >
                <Headphones className="mr-2 h-5 w-5" />
                {platform}
              </Button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
