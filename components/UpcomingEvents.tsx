"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/Skeleton";
import { useEvents } from "@/app/client/hooks/useEvents";
import { BaseEvent } from "@/lib/types/events";
import Image from "next/image";

export function UpcomingEvents() {
  const { upcomingEvents, isLoading } = useEvents();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, idx) => (
                  <Card
                    key={idx}
                    className="bg-white/5 backdrop-blur-md border-white/10 p-6"
                  >
                    <Skeleton className="h-5 w-32 mb-4" />
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </Card>
                ))
            : upcomingEvents.map((event: BaseEvent) => (
                <Card
                  key={event.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                        {event.category}
                      </span>
                    </div>
                    <div>
                      <Image
                        src={
                          event.posterUrl
                            ? event.posterUrl
                            : "/images/event-placeholder.jpg"
                        }
                        alt={event.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                        width={400}
                        height={200}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="h-4 w-4 mr-2 text-purple-400" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-pink-400" />
                        <span className="text-sm">{event.venueName}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-6">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
