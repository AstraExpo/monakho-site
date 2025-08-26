import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "monakhoministry@gmail.com";

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
  runtime: "experimental-edge", // ✅ Edge runtime for fast checks
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;

  // If no session → redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Verify session through API
  const res = await fetch(`${req.nextUrl.origin}/api/auth/check-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session: sessionCookie }),
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const user = await res.json(); // expecting { email, uid, ... }

  // If trying to access /admin but not admin email → redirect
  if (req.nextUrl.pathname.startsWith("/admin") && user.email !== ADMIN_EMAIL) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
