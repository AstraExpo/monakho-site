"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/server/firebase";
import { useToast } from "@/components/ui/ToastContext";
import { getErrorMessage } from "@/utils/error";

type User = {
  uid: string;
  email: string;
  displayName?: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // 👇 Auto-load user on refresh using /api/auth/me
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 👇 Logout handler
  const logout = async () => {
    try {
      // 1. Clear server session
      await fetch("/api/auth/logout", { method: "POST" });

      // 2. Clear Firebase client session
      await signOut(auth);

      // 3. Reset user state
      setUser(null);
    } catch (err) {
      showToast(getErrorMessage(err), "error");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
