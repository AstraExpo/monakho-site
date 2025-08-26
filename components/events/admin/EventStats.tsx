import { StatCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/Skeleton";
import { BaseEvent } from "@/lib/types/events";
import { Calendar, Users, MapPin } from "lucide-react";
import React from "react";

export default function EventStats({
  loading,
  events,
}: {
  loading: boolean;
  events: BaseEvent[];
}) {
    const totalEvents = events.length;
  const thisMonthEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return (
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);
  const locationsCount = new Set(
    events.map((e) => (e.venueType === "Physical" ? e.venueName : e.venueUrl))
  ).size;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        Array(4)
          .fill(0)
          .map((_, idx) => (
            <Card
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4"
            >
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))
      ) : (
        <>
          <StatCard
            title="Total Events"
            value={totalEvents}
            icon={<Calendar />}
            note="+2 from last month"
          />
          <StatCard
            title="This Month"
            value={thisMonthEvents}
            icon={<Calendar />}
            note="Scheduled events"
          />
          <StatCard
            title="Total Attendees"
            value={totalAttendees}
            icon={<Users />}
            note="+15% from last month"
          />
          <StatCard
            title="Locations"
            value={locationsCount}
            icon={<MapPin />}
            note="Active venues"
          />
        </>
      )}
    </div>
  );
}
