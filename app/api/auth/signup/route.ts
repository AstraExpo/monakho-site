import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, phone, newsletter } =
      await req.json();

    // 1️⃣ Create user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // 2️⃣ Save extra user details to Firestore
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      firstName,
      lastName,
      email,
      phone,
      newsletter,
      createdAt: new Date().toISOString(),
    });

    // 3️⃣ Sign in via Firebase REST API to get idToken
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || "Failed to sign in after signup");
    }

    const idToken = data.idToken;

    // 4️⃣ Create Firebase session cookie (5 days expiry)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // 5️⃣ Set cookie in response
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
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 }
    );
  }
}