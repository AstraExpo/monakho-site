import { ArrowRight, Calendar, Music } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

export function Events() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Monakho Ministry Events
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event 1: Tehilla Worship */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-semibold">
                  Every Monday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tehilla Worship – Hosted by Monakho Ministry
              </h3>
              <p className="text-gray-300 mb-4">
                Join <strong>Monakho Ministry</strong> every Monday for{" "}
                <em>Tehilla Worship</em>—an immersive experience of live praise,
                music, and messages that uplift and ignite faith. Streaming live
                on
                <strong> YouTube</strong>, <strong> Tiktok</strong> and <strong>Facebook</strong>.
              </p>
              <p className="text-sm text-gray-400">6:00 PM – 8:00 PM (EAT)</p>
            </CardContent>
          </Card>

          {/* Event 2: Night Prayer Session */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-md border-white/10 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Music className="h-5 w-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-semibold">
                  Every Tuesday
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Night Prayer Session – By Monakho
              </h3>
              <p className="text-gray-300 mb-4">
                A powerful hour of prayer, worship, and reflection hosted by{" "}
                <strong>Monakho Ministry</strong>. Recharge your spirit and
                align with God’s heart in a quiet, focused environment.
              </p>
              <p className="text-sm text-gray-400">9:00 PM – 10:00 PM (EAT)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
