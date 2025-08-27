import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";

export async function POST(req: Request) {
  try {
    const sessionCookie = req.headers.get("cookie")?.match(/session=([^;]+)/)?.[1];

    if (sessionCookie) {
      try {
        const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

        await adminAuth.revokeRefreshTokens(decoded.uid);
      } catch {
      }
    }

    const res = NextResponse.json({ message: "Signed out" });
    res.cookies.set({
      name: "session",
      value: "",
      maxAge: 0,
      path: "/",
    });
    return res;
  } catch (err: unknown) {
    return NextResponse.json(
      getErrorMessage(err) ||
      { error: "Failed to sign out" },
      { status: 500 }
    );
  }
}
