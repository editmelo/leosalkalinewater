import { NextRequest, NextResponse } from "next/server";
import { CONTACT } from "@/lib/brand";
import { sendEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
  }

  // Delivered to Leo; hitting "reply" replies straight to the customer.
  const { sent, error } = await sendEmail({
    to: CONTACT.email,
    replyTo: email,
    subject: `New website inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  // Always log as a backup (visible in server logs) and never fail the visitor on an email hiccup.
  console.log("[contact]", { to: CONTACT.email, name, email, emailSent: sent, error, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
