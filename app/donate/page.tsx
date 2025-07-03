"use client";

import { useEffect, useRef } from "react";

// Extend the Window interface to include the 'paypal' property
declare global {
  interface Window {
    paypal?: any;
  }
}

export default function DonatePage() {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPayPalScript = async () => {
      if (typeof window === "undefined" || window.paypal) return;

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => {
        if (paypalRef.current) {
          renderPayPalButtons();
        }
      };
      document.body.appendChild(script);
    };

    const renderPayPalButtons = () => {
      if (!window.paypal || !paypalRef.current) return;

      window.paypal
        .Buttons({
          createOrder: async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: "10.00",
                currency: "USD",
                email: "sb-b9wev44370680@personal.example.com", // <- Replace with sandbox buyer email
                name: "John Doe",
                message: "God bless you!",
              }),
            });
            const data = await res.json();
            return data.orderID;
          },
          onApprove: async (data: any) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            const result = await res.json();
            console.log("Payment Successful:", result);
            alert("Thank you for your donation!");
          },
          onError: (err: any) => {
            console.error("PayPal Button Error:", err);
            alert("Something went wrong during the transaction.");
          },
        })
        .render(paypalRef.current);
    };

    loadPayPalScript();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">Donate</h1>
      <div ref={paypalRef} />
    </div>
  );
}
