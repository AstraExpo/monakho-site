import { NextRequest, NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { getPayPalClient } from "@/utils/paypal";
import { prisma } from "../../../../lib/server/prisma"; // Adjust path to your Prisma instance
import { PaymentProvider, PaymentStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  console.log("➡️ Hit /api/paypal/create-order");

  try {
    const body = await req.json();
    const { amount, currency = "USD", email, name, message } = body;

    if (!email || !amount) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing email or amount" }, { status: 400 });
    }

    console.log("🧾 Body:", body);

    // 1. 🔍 Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || null,
        },
      });
      console.log("👤 User created:", user.id);
    } else {
      console.log("👤 User found:", user.id);
    }

    // 2. 🎁 Create Donation
    const donation = await prisma.donation.create({
      data: {
        userId: user.id,
        amount: parseFloat(amount),
        message: message || null,
      },
    });
    console.log("🙏 Donation created:", donation.id);

    // 3. 💸 Create Payment with status = PENDING
    const payment = await prisma.payment.create({
      data: {
        provider: PaymentProvider.PAYPAL,
        status: PaymentStatus.PENDING,
        amount: parseFloat(amount),
        currency,
        donationId: donation.id,
      },
    });
    console.log("💳 Payment record created:", payment.id);

    // 4. 🔗 Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
        },
      ],
    });

    const client = getPayPalClient();
    const order = await client.execute(request);

    console.log("✅ PayPal Order Created:", order.result.id);

    return NextResponse.json({ orderID: order.result.id });
  } catch (err: any) {
    console.error("❌ Create Order Error:", err?.message || err);
    return NextResponse.json({ error: "Failed to create PayPal order" }, { status: 500 });
  }
}
