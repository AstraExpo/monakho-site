import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    await adminDb.collection("products").doc(id).delete();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
