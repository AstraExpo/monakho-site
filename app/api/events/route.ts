import { getErrorMessage } from "@/utils/error";
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";
import type { BaseEvent, CreateEventInput } from "@/lib/types/events";
import { ApiResponse } from "@/lib/types/api";
import { FieldValue } from "firebase-admin/firestore";

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("events")
      .orderBy("date", "asc")
      .get();

    const events: BaseEvent[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<BaseEvent, "id">),
    }));

    return NextResponse.json<ApiResponse<BaseEvent[]>>({
      success: true,
      data: events,
      error: null,
    });
  } catch (err: unknown) {
    console.error("Error fetching events:", err);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: getErrorMessage(err) },
      { status: 500 }
    );
  }
}

// CREATE event
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateEventInput;

    const docRef = await adminDb.collection("events").add({
      ...body,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      createdBy: "system",
      updatedBy: "system",
      attendees: [], // start with no attendees
      views: 0, // optional: track event views
    });

    const doc = await docRef.get();
    const event = { id: doc.id, ...(doc.data() as Omit<BaseEvent, "id">) };

    return NextResponse.json<ApiResponse<BaseEvent>>({
      success: true,
      data: event,
      error: null,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to create event" },
      { status: 500 }
    );
  }
}
