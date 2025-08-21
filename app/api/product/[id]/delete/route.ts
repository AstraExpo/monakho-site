import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await adminDb.collection("products").doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
