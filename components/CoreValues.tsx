import React from "react";
import { values } from "./data/Items";
import { Card, CardContent } from "./ui/card";

export function CoreValues() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These core values guide everything we do and shape the culture of
            our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: value.description }}/>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
