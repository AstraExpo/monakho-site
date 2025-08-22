"use client";

import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";
import { ToastContext } from "./ToastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "info"
  );

  const showToast = (msg: string, variant: typeof type = "info") => {
    setMessage(msg);
    setType(variant);
    setOpen(true);
  };

  const bgClass = {
    success: "bg-green-600 dark:bg-green-500",
    error: "bg-red-600 dark:bg-red-500",
    warning: "bg-yellow-500 text-black dark:bg-yellow-600 dark:text-black",
    info: "bg-blue-600 dark:bg-blue-500",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}

        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`rounded-lg px-4 py-3 shadow-lg text-white ${bgClass[type]}`}
        >
          <Toast.Title className="font-medium">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Toast.Title>
          {message && <Toast.Description>{message}</Toast.Description>}
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-4 right-4 w-80 z-[100]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
