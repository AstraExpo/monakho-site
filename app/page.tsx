"use client";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Events } from "@/components/Events";
import { Connect } from "@/components/Connect";
import Head from "next/head";
import { Button } from "@/components/ui/button";

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
        <Button onClick={() => payWithMpesa("254700000000", 100)}>Pay with M-Pesa</Button>

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

async function payWithMpesa(phone: string, amount: number) {
  const res = await fetch("/api/payments/mpesa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber: phone, amount }),
  });

  const data = await res.json();
  console.log(data);
}