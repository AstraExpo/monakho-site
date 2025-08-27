import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { valid: false, error: "No session cookie" },
        { status: 401 }
      );
    }

    const decoded = await adminAuth.verifySessionCookie(session, true);

    return NextResponse.json({
      valid: true,
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null,
    });
  } catch (err) {
    return NextResponse.json(
      getErrorMessage(err) || {
        valid: false,
        error: "Invalid or expired session",
      },
      { status: 401 }
    );
  }
}
