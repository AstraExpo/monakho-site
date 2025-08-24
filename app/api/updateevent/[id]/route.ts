import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin"; // Firebase Admin SDK init

// DELETE an event
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await adminDb.collection("events").doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

// PATCH to update an event
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    await adminDb.collection("events").doc(params.id).update(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// GET product from the db
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doc = await adminDb.collection("products").doc(params.id).get();
    if (!doc.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
