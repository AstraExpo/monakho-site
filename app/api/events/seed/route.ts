import { NextResponse } from "next/server";
import { adminDb, admin } from "@/lib/server/firebase-admin";

export async function POST() {
  try {
    const batch = adminDb.batch();
    const eventsRef = adminDb.collection("events");

    const now = new Date();
    for (let i = 1; i <= 30; i++) {
      const futureDate = new Date();
      futureDate.setDate(now.getDate() + i); // i days from now

      const newEventRef = eventsRef.doc();

      batch.set(newEventRef, {
        title: `Dummy Event ${i}`,
        description: `This is the description for Dummy Event ${i}.`,
        category: i % 2 === 0 ? "Conference" : "Workshop",
        location: `Venue ${i}`,
        date: futureDate.toISOString(), // or Timestamp if you prefer
        time: "10:00 AM",
        attendees: Math.floor(Math.random() * 100),
        status: "Published",
        isPublic: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();

    return NextResponse.json({ success: true, message: "30 dummy events created" });
  } catch (error: any) {
    console.error("Error seeding events:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
