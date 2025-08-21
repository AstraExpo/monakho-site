import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export async function GET() {
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
  } catch (err: unknown) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}
