// app/api/events/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";

export async function GET(req: Request) {
  try {
    const snapshot = await adminDb
      .collection("events")
      .orderBy("date", "asc")
      .get();

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(events);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
