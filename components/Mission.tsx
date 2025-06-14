import { Users, Music, Heart } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";

export function Mission() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To worship God in Truth And Spirit and leading souls into His
            Glorious presence by the Holy Spirit, Sacred music and holy inspired
            writings and books that transform hearts and nations by Gods Word.
            Giving LOVE & Life meaning in the world: <strong>John 3:16</strong>
          </p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Vission
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To see generations across nations awakened to a lifestyle of true
            worship where sacred music, truth, and the Glorious presence of God
            that brings healing, revival, and intimacy with Christ in order to
            satisfy Gods Pleasure. Doing the impossible with GOD <strong>John 14:12-14</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Community</h3>
              <p className="text-gray-300">
                Building meaningful connections through shared worship and
                authentic relationships.
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
                Contemporary worship that speaks to the heart and elevates the
                spirit.
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
                Discovering and living out your unique calling in a supportive
                environment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
