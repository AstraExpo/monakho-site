import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";

export async function verifyUserSession() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  if (!session) return null;

  try {
    // Verify the session token using Firebase Admin SDK
    const decodedToken = await adminAuth.verifySessionCookie(session, true);
    
    // Return user data if verification is successful
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      displayName: decodedToken.name || null,
    };
  } catch {
    return null;
  }
}
