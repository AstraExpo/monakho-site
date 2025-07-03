// app/api/paypal/capture-order/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getPayPalClient } from "@/utils/paypal";
import { OrdersCaptureRequest } from "@paypal/checkout-server-sdk";
import { PrismaClient, PaymentProvider, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderID, message } = body;

  if (!orderID) {
    return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
  }

  const request = new OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const client = getPayPalClient();
    const capture = await client.execute(request);
    const result = capture.result;

    if (result.status !== "COMPLETED") {
      return NextResponse.json({ error: "Order not completed" }, { status: 422 });
    }

    // Extract user info from PayPal
    const email = result.payer?.email_address;
    const name = `${result.payer?.name?.given_name ?? ""} ${result.payer?.name?.surname ?? ""}`.trim();
    const amount = parseFloat(result.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value ?? "0");
    const currency = result.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.currency_code ?? "USD";
    const paidAt = result.purchase_units?.[0]?.payments?.captures?.[0]?.create_time;

    // 1. Find or create user
    const user = await prisma.user.upsert({
      where: { email },
      create: { email, name },
      update: { name },
    });

    // 2. Create donation
    const donation = await prisma.donation.create({
      data: {
        userId: user.id,
        amount,
        message,
      },
    });

    // 3. Create payment
    await prisma.payment.create({
      data: {
        provider: PaymentProvider.PAYPAL,
        status: PaymentStatus.PAID,
        amount,
        currency,
        paidAt: new Date(paidAt ?? new Date()),
        paymentIntentId: orderID,
        donationId: donation.id,
      },
    });

    // 4. (Optional) Send email confirmation
    // await sendDonationConfirmationEmail(user.email, amount);

    return NextResponse.json({ success: true, donationId: donation.id });
  } catch (err: any) {
    console.error("❌ PayPal Capture Error:", err);
    return NextResponse.json({ error: "Failed to capture order" }, { status: 500 });
  }
}
