// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { auth, db } from "@/lib/server/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, phone, newsletter } = body;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      firstName,
      lastName,
      email,
      phone,
      newsletter,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, uid: user.uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
