// app/admin/layout.tsx
import { AdminNavbar } from "@/components/AdminNavBar";
import { ToastProvider } from "@radix-ui/react-toast";
import type React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/server/firebase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

async function verifyAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/auth/login");
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

    if (decoded.email !== ADMIN_EMAIL) {
      redirect("/unauthorized");
    }

    return decoded;
  } catch {
    redirect("/auth/login");
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifyAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <ToastProvider>
        <AdminNavbar />
        <main className="container mx-auto px-4 py-8 relative">
          {children}
        </main>
      </ToastProvider>
    </div>
  );
}
