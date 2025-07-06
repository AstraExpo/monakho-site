import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: 'monakhoministry@gmail.com',
      subject: 'Book Purchase Confirmation',
      html: `
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Location:</strong> ${body.location}</p>
        <p><strong>Transaction Code:</strong> ${body.code}</p>
      `,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
