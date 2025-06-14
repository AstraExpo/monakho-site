import { ArrowRight, Calendar, Music } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export function Events() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <Link href="/worship-events">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-semibold">
                  Every Monday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tehilla Worship
              </h3>
              <p className="text-gray-300 mb-4">
                Join us for an immersive worship experience featuring live
                music, inspiring messages, and community connection live on{" "}
                <strong>YouTube</strong> and <strong>Facebook</strong>.
              </p>
              <p className="text-sm text-gray-400">6:00 PM - 8:00 PM</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Music className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-semibold">
                  Every Tuesday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Night Prayer Session
              </h3>
              <p className="text-gray-300 mb-4">
                An intimate evening of prayer, worship, and reflection.
              </p>
              <p className="text-sm text-gray-400">9:00 PM - 10:00 PM</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
