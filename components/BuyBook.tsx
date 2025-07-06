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
      <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        Buy Book
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 w-full max-w-lg">
            <CardContent className="p-6 space-y-6 text-white">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text mb-2">
                  MPESA Payment Instructions
                </h2>
                <p className="text-sm text-gray-300">
                  Follow the steps below to complete your book purchase:
                </p>
              </div>

              <ul className="space-y-2 text-sm list-decimal list-inside text-gray-100">
                <li>Open MPESA on your phone</li>
                <li>Choose <strong>Send Money</strong></li>
                <li>Enter Phone Number: <strong className="text-green-300">0711547617</strong></li>
                <li>Amount: <strong className="text-green-300">KES 1000</strong></li>
                <li><strong>"Enter Your MPESA Pin and Click Send"</strong></li>
              </ul>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setOpen(false);
                    router.push("/purchase");
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
                >
                  I Have Paid
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-white/20 text-white hover:bg-white/10"
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
