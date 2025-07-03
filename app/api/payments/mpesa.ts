// pages/api/payments/mpesa.ts

import type { NextApiRequest, NextApiResponse } from "next";
import africastalking from "africastalking";

const at = africastalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { phoneNumber, amount } = req.body;

  try {
    const result = await at.PAYMENTS.mobileCheckout({
      productName: process.env.AT_PRODUCT_NAME!,
      phoneNumber,
      currencyCode: "KES",
      amount,
    });

    res.status(200).json({ success: true, response: result });
  } catch (error) {
    console.error("M-Pesa payment failed", error);
    res.status(500).json({ success: false, message: "Payment failed", error });
  }
}
