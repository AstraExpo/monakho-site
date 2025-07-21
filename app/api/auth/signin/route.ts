// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/server/firebase";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
