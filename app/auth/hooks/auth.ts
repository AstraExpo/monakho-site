"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/server/firebase";
import { useAuth } from "@/app/context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const exchangeTokenForSession = async (
    idToken: string,
    redirect?: string
  ) => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken, redirect }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to sign in");

    return data; 
  };

  /** 🔑 Email + Password Login */
  const loginWithEmail = async (
    email: string,
    password: string,
    redirect?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const data = await exchangeTokenForSession(idToken, redirect);

      setUser({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        isAdmin: data.redirectTo.startsWith("/admin"), // simple admin check
      });

      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /** 🔑 Google Login */
  const loginWithGoogle = async (redirect?: string) => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const data = await exchangeTokenForSession(idToken, redirect);

      setUser({
        uid: data.uid,
        email: data.email,
        displayName: data.displayName,
        isAdmin: data.redirectTo.startsWith("/admin"),
      });

      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithEmail, loginWithGoogle, loading, error };
}
