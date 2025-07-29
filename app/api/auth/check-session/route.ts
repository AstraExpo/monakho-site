// app/api/auth/check-session/route.ts
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/server/firebase-admin";

export const runtime = "nodejs"; // ✅ Force Node runtime for Firebase Admin SDK

export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    const decoded = await adminAuth.verifySessionCookie(session, true);

    return NextResponse.json({
      valid: true,
      uid: decoded.uid,
      email: decoded.email, // ✅ Now returning email
      name: decoded.name || null,
    });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
