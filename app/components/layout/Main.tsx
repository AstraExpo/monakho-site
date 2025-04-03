import { Card } from "../ui/card";
import { Button } from "../ui/button";

// Feature Card Component (Reusable)
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
}

// Call-to-Action Component
function CallToAction() {
  return (
    <div className="flex justify-center mt-6">
      <Button className="mr-4">Join Our Community</Button>
      <Button>Support Our Ministry</Button>
    </div>
  );
}

// Inspirational Quote Component
function InspirationalQuote() {
  return (
    <blockquote className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500 text-gray-700 italic">
      "Let everything that has breath praise the Lord. - Psalm 150:6"
    </blockquote>
  );
}

// Upcoming Events Component
function UpcomingEvents() {
  const events = [
    "Sunday Worship Service - Every Sunday at 10 AM",
    "Worship Night - April 20, 2025",
    "Community Outreach - May 5, 2025",
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Upcoming Events</h3>
      <ul className="list-disc ml-6 text-gray-600">
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

// Main Component
export function Main() {
  const features = [
    {
      title: "Worship Services",
      description:
        "Join us every Sunday for a powerful time of worship and fellowship.",
    },
    {
      title: "Community Outreach",
      description:
        "Making a difference through charity, mentorship, and support programs.",
    },
    {
      title: "Music & Worship",
      description:
        "Experience the power of gospel music that uplifts and inspires.",
    },
  ];

  return (
    <main className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to Monakho Ministry</h2>
        <p className="text-gray-600 mt-2">
          We are dedicated to spreading the message of faith, love, and worship
          through music and community service.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      {/* Call to Action */}
      <CallToAction />

      {/* Inspirational Quote */}
      <InspirationalQuote />

      {/* Upcoming Events */}
      <UpcomingEvents />
    </main>
  );
}
