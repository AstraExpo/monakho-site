import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export async function POST(req: Request) {
  try {
    const { idToken, redirect } = await req.json();

    if (!idToken) {
      throw new Error("Missing ID token");
    }

    // 🔑 Create secure session cookie
    const expiresIn = 60 * 60 * 24 * 1000; // 24 hours
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // 🍪 Set cookie (HTTP-only, Secure)
    (await cookies()).set({
      name: "session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    // 👤 Decode token to get user info
    const decoded = await adminAuth.verifyIdToken(idToken);
    const isAdmin =
      decoded.email?.trim().toLowerCase() ===
      "monakhoministry@gmail.com".toLowerCase();

    // 🚦 Decide redirect
    let redirectTo = "/client";
    if (redirect) {
      if (redirect.startsWith("/admin") && !isAdmin) {
        redirectTo = "/unauthorized?reason=admin";
      } else {
        redirectTo = redirect;
      }
    } else if (isAdmin) {
      redirectTo = "/admin";
    }

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email,
      displayName: decoded.name || null,
      redirectTo,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 401 }
    );
  }
}
