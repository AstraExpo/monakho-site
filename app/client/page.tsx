import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Events } from "@/components/Events";
import { Connect } from "@/components/Connect";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Monakho Ministry – Worship, Music & Faith</title>
        <meta
          name="description"
          content="Welcome to the official website of Monakho Ministry – a worship movement devoted to spreading the gospel through music and fellowship."
        />
      </Head>
      <div className="pt-16">
        {/* Hero Section */}
        <Hero />

        {/* Mission Section */}
        <Mission />

        {/* Upcoming Events Preview */}
        <Events />

        {/* Call to Action */}
        <Connect />
      </div>
    </>
  );
}
