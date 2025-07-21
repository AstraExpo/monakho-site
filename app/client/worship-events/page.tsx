import type { Metadata } from "next";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { PastEvents } from "@/components/PastEvents";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "Worship Events - Monakho Ministry",
  description:
    "Join us for upcoming worship events, services, and community gatherings.",
};

export default function WorshipEvents() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Worship Events
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join us for transformative worship experiences, community
            gatherings, and special celebrations throughout the year.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Past Events */}
      <PastEvents />

      {/* Call to Action */}
      <CallToAction />
    </div>
  );
}
