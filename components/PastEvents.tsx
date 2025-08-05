"use client";

import { Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/Skeleton";
import { useEvents } from "@/app/client/hooks/useEvents";

export function PastEvents() {
  const { pastEvents, isLoading } = useEvents();

  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
          Recent Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, idx) => (
                  <Card
                    key={idx}
                    className="bg-white/5 backdrop-blur-md border-white/10 p-6"
                  >
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </Card>
                ))
            : pastEvents.map((event: any) => (
                <Card
                  key={event.id}
                  className="bg-white/5 backdrop-blur-md border-white/10"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-3">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 text-sm mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {event.attendees || 0} attendees
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
