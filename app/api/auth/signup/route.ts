import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export async function POST(req: Request) {
  try {
    const { idToken, email } = await req.json();

    if (!idToken || !email) {
      return NextResponse.json(
        { error: "idToken and email are required" },
        { status: 400 }
      );
    }

    // 1️⃣ Verify token
    const decoded = await adminAuth.verifyIdToken(idToken);

    // 2️⃣ Save user to Firestore if not exists
    const userRef = adminDb.collection("users").doc(decoded.uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      await userRef.set({
        uid: decoded.uid,
        email,
        createdAt: new Date().toISOString(),
      });
    }

    // 3️⃣ Create session cookie
    const expiresIn = 60 * 60 * 24 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    (await cookies()).set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      uid: decoded.uid,
      email,
    });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 }
    );
  }
}
