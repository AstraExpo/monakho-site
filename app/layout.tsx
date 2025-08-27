import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { JSX } from "react";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monakho Ministry",
  description:
    "Welcome to Monakho Ministry - Serving our community with faith and love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              {children}
            </ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
