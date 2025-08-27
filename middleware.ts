import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_EMAIL = "monakhoministry@gmail.com";

export const config = {
  matcher: ["/client/:path*", "/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;

  // If no session cookie → redirect to login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }


  if (req.nextUrl.pathname.startsWith("/admin")) {
  }

  return NextResponse.next();
}
