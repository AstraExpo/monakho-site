import React from "react";
import Image from "next/image";
import { leadership } from "./data/Items";
import { Card, CardContent } from "./ui/card";

export default function Leadership() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the passionate leaders who guide our community with wisdom,
            creativity, and heart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((leader, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <Image
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {leader.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-4">
                  {leader.role}
                </p>
                <p className="text-gray-300">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
