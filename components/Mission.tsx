import { Users, Music, Heart } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";

export function Mission() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At <strong>Monakho Ministry</strong>, our mission is to worship God
            in spirit and in truth— leading souls into His glorious presence
            through sacred music, Holy Spirit–inspired writings, and
            life-transforming teachings grounded in the Word of God. We exist to
            spread love and give life deeper meaning to the world, as reflected
            in
            <strong> John 3:16</strong>.
          </p>
        </div>

        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Vision
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We envision generations across nations awakened to a lifestyle of
            true worship— where sacred music, truth, and the manifest presence
            of God bring healing, revival, and intimacy with Christ.{" "}
            <strong>Monakho Ministry</strong> seeks to satisfy God&apos;s heart by
            equipping believers to live boldly and do the impossible with God (
            <strong>John 14:12–14</strong>).
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
              <p className="text-gray-300">
                <strong>Monakho Ministry</strong> builds authentic connections
                rooted in shared worship, discipleship, and spirit-led
                fellowship.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Music className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Worship</h3>
              <p className="text-gray-300">
                We embrace passionate, spirit-filled worship that touches hearts
                and exalts Jesus—central to everything at{" "}
                <strong>Monakho</strong>.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Purpose</h3>
              <p className="text-gray-300">
                We help individuals discover their God-given calling and walk in
                divine purpose through the spiritual journey offered by{" "}
                <strong>Monakho Ministry</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
