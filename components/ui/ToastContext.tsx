"use client";

import { createContext, useContext } from "react";

type ToastType = "success" | "error" | "warning" | "info";

export const ToastContext = createContext<{
  showToast: (msg: string, type?: ToastType) => void;
} | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
