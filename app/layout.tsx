import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monakho Ministry - Modern Worship Experience",
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Join us for a transformative worship experience. Discover our mission, upcoming events, and connect with our community.",
  keywords: "worship, ministry, church, music, events, community, faith",
  openGraph: {
    title: "Monakho Ministry - Modern Worship Experience",
    description: "Join us for a transformative worship experience",
    type: "website",
  },
  other: {
    "data-gramm": "false",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen`}
      >
        <div className="relative min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.05) 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div className="relative z-10">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
