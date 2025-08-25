import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";
import { ApiResponse } from "@/lib/types/api";
import { FieldValue } from "firebase-admin/firestore";
import { BaseEvent, UpdateEventInput } from "@/lib/types/events";

// GET event from the db
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const doc = await adminDb.collection("events").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Event not found" },
        { status: 404 }
      );
    }

    const event = { id: doc.id, ...(doc.data() as Omit<BaseEvent, "id">) };

    return NextResponse.json<ApiResponse<BaseEvent>>({
      success: true,
      data: event,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// UPDATE event
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await req.json()) as UpdateEventInput;

    await adminDb.collection("events").doc(id).update({
      ...body,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: "system",
    });

    const updatedDoc = await adminDb.collection("events").doc(id).get();
    if (!updatedDoc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Event not found" },
        { status: 404 }
      );
    }

    const updatedEvent = {
      id: updatedDoc.id,
      ...(updatedDoc.data() as Omit<BaseEvent, "id">),
    };

    return NextResponse.json<ApiResponse<BaseEvent>>({
      success: true,
      data: updatedEvent,
      error: null,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE event
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const docRef = adminDb.collection("events").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Event not found" },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json<ApiResponse<{ id: string }>>({
      success: true,
      data: { id },
      error: null,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
