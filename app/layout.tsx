import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monakho Ministry – Worship, Music & Faith",
  description:
    "Experience Monakho Ministry – a worship movement devoted to sacred music, fellowship, and the transforming power of faith.",
  keywords:
    "Monakho Ministry, worship, music, church, ministry, Christian events, gospel, faith, community, praise, sacred music, spiritual growth, online worship, Christian fellowship, gospel music, prayer, Bible study, Christian community",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Monakho Ministry – Worship, Music & Faith",
    description:
      "Join Monakho Ministry for immersive worship, sacred music, and spirit-led community. Discover events, content, and a deeper faith.",
    url: "https://monakhoministry.com",
    type: "website",
    images: [
      {
        url: "https://monakhoministry.com/MonakhoMinistry.png",
        width: 1200,
        height: 630,
        alt: "Monakho Ministry Worship Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monakho Ministry – Worship, Music & Faith",
    description:
      "Join Monakho Ministry for a powerful blend of worship, gospel music, and Christ-centered connection.",
    images: ["https://monakhoministry.com/MonakhoMinistry.png"],
    creator: "@KisiviiRichard",
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
