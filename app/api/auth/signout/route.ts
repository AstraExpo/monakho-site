import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Signed out" });
  res.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return res;
}
