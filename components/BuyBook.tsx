"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export function MpesaPaymentDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-green-500 to-blue-500 text-primary-foreground"
      >
        Buy Book
      </Button>

      {open && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mpesa-instructions-title"
        >
          <Card className="bg-card border border-border w-full max-w-lg">
            <CardContent className="p-6 space-y-6 text-foreground">
              <div>
                <h2
                  id="mpesa-instructions-title"
                  className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text mb-2"
                >
                  MPESA Payment Instructions
                </h2>
                <p className="text-sm text-muted-foreground">
                  Follow the steps below to complete your book purchase:
                </p>
              </div>

              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li>Open MPESA on your phone</li>
                <li>
                  Select <strong>Send Money</strong>
                </li>
                <li>
                  Enter Phone Number:{" "}
                  <strong className="text-green-600 dark:text-green-300">
                    0711547617
                  </strong>
                </li>
                <li>
                  Amount:{" "}
                  <strong className="text-green-600 dark:text-green-300">
                    KES 1000
                  </strong>
                </li>
                <li>
                  <strong>
                    &quot;Enter your MPESA PIN and click Send&quot;
                  </strong>
                </li>
              </ol>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push("/purchase");
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-primary-foreground hover:from-green-600 hover:to-blue-600"
                >
                  I Have Paid
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
