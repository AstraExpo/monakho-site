import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export async function GET() {
  try {
    const session = (await cookies()).get("session")?.value;
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(session, true);

    return NextResponse.json({
      user: {
        uid: decoded.uid,
        email: decoded.email,
        displayName: decoded.name || null,
      },
    });
  } catch (err: unknown) {
    getErrorMessage(err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
