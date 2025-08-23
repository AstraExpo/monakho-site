"use client";

import { Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/Skeleton";
import { useEvents } from "@/app/client/hooks/useEvents";
import { BaseEvent } from "@/lib/types/events";
import Image from "next/image";

export function PastEvents() {
  const { pastEvents, isLoading } = useEvents();

  return (
    <section className="py-20 px-4 bg-muted">
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
                    className="bg-card border border-border p-6 shadow-sm"
                  >
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </Card>
                ))
            : pastEvents.map((event: BaseEvent) => (
                <Card
                  key={event.id}
                  className="bg-card border border-border shadow-sm"
                >
                  <CardContent className="p-6">
                    <div>
                      {event.posterUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <Image
                          src={event.posterUrl}
                          alt={event.title}
                          className="w-full h-40 object-cover rounded-md mb-4"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-primary font-semibold mb-3">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {event.attendees ?? 0} attendees
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
