import { AdminNavbar } from "@/components/AdminNavBar";
import { ToastProvider } from "@radix-ui/react-toast";
import type React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      <ToastProvider>
        <AdminNavbar />
        <main className="container mx-auto px-4 py-8 relative">{children}</main>
      </ToastProvider>
    </div>
  );
}
