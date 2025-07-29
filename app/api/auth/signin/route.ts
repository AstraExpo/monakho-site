import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Sign in with Firebase REST API to get idToken
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
      throw new Error(data.error?.message || "Authentication failed");
    }

    const idToken = data.idToken;

    // 2️⃣ Create a secure session cookie (5 days expiry)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // 3️⃣ Set the cookie (HTTP-only, Secure)
    (await cookies()).set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    // 4️⃣ Verify token to get user info
    const decoded = await adminAuth.verifyIdToken(idToken);

    // 5️⃣ Return safe user data
    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      displayName: decoded.name || null,
      redirectTo:
        decoded.email === "monakhoministry@gmail.com" ? "/admin" : "/client",
    });
  } catch (error: any) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
