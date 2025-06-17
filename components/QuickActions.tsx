import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { quickActions } from "./data/Items";
import Link from "next/link";

export function QuickActions() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {action.title}
                </h3>
                <p className="text-gray-300 mb-6">{action.description}</p>
                <Link href={action.url} target="_blank">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    {action.action}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
