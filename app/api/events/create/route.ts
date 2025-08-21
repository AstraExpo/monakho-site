import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb, admin } from "@/lib/server/firebase-admin";
import {
  CATEGORIES,
  VENUE_TYPES,
  RECURRENCE_TYPES,
  EventCreateRequest,
  EventDocument,
} from "@/lib/types/events";

/**
 * POST /api/events/create
 * Creates a new event in Firestore
 */
export async function POST(req: Request) {
  try {
    // 🔐 Authenticate admin user
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (decoded.email !== "monakhoministry@gmail.com") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can create events" },
        { status: 403 }
      );
    }

    // 📥 Parse incoming request
    const eventData: EventCreateRequest = await req.json();

    // ✅ Required fields validation
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date ||
      !eventData.time
    ) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, date, time" },
        { status: 400 }
      );
    }

    // ✅ Validate category (fallback to "Other" if invalid)
    if (!CATEGORIES.includes(eventData.category)) {
      eventData.category = "Other";
    }

    // ✅ Validate venue type
    if (!VENUE_TYPES.includes(eventData.venueType)) {
      return NextResponse.json(
        {
          error: `Invalid venueType. Must be one of: ${VENUE_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Venue-specific validation
    if (eventData.venueType === "Physical" && !eventData.venueName) {
      return NextResponse.json(
        { error: "venueName is required for Physical events" },
        { status: 400 }
      );
    }
    if (eventData.venueType === "Online" && !eventData.venueUrl) {
      return NextResponse.json(
        { error: "venueUrl is required for Online events" },
        { status: 400 }
      );
    }

    // ✅ Validate main event date
    const eventDate = new Date(eventData.date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // 🔁 Recurrence validation
    let recurrenceEndDateTimestamp: admin.firestore.Timestamp | null = null;
    if (eventData.isRecurring) {
      if (
        !eventData.recurrenceType ||
        !RECURRENCE_TYPES.includes(eventData.recurrenceType)
      ) {
        return NextResponse.json(
          {
            error: `Invalid recurrenceType. Must be one of: ${RECURRENCE_TYPES.join(
              ", "
            )}`,
          },
          { status: 400 }
        );
      }

      if (!eventData.recurrenceEndDate) {
        return NextResponse.json(
          { error: "recurrenceEndDate is required for recurring events" },
          { status: 400 }
        );
      }

      const recurrenceEnd = new Date(eventData.recurrenceEndDate);
      if (isNaN(recurrenceEnd.getTime())) {
        return NextResponse.json(
          { error: "Invalid recurrenceEndDate format" },
          { status: 400 }
        );
      }

      recurrenceEndDateTimestamp =
        admin.firestore.Timestamp.fromDate(recurrenceEnd);
    }

    // 📝 Prepare document for Firestore
    const newEvent: EventDocument = {
      title: eventData.title,
      description: eventData.description,
      date: admin.firestore.Timestamp.fromDate(eventDate),
      time: eventData.time,

      venueType: eventData.venueType,
      venueName:
        eventData.venueType === "Physical" ? eventData.venueName! : null,
      venueUrl: eventData.venueType === "Online" ? eventData.venueUrl! : null,

      category: eventData.category,
      status: eventData.status || "Draft",
      posterUrl: eventData.posterUrl || "",

      isPublic: eventData.isPublic ?? true,
      attendees: eventData.attendees ?? 0,
      maxAttendees: eventData.maxAttendees ?? null,

      isRecurring: eventData.isRecurring ?? false,
      recurrenceType: eventData.isRecurring ? eventData.recurrenceType! : null,
      recurrenceEndDate: recurrenceEndDateTimestamp,

      createdAt:
        admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      updatedAt:
        admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
      createdBy: decoded.email,
    };

    // 💾 Save to Firestore
    await adminDb.collection("events").add(newEvent);

    return NextResponse.json({ success: true, event: newEvent });
  } catch (err: any) {
    console.error("Error creating event:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create event" },
      { status: 500 }
    );
  }
}
