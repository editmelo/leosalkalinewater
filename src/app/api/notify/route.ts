import { NextRequest, NextResponse } from "next/server";
import { CONTACT } from "@/lib/brand";
import { sendEmail } from "@/lib/email";

// Out-of-area "notify me when you reach my area" capture.
export async function POST(req: NextRequest) {
  const { email, zip } = await req.json().catch(() => ({}));
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const { sent, error } = await sendEmail({
    to: CONTACT.email,
    replyTo: email,
    subject: `Service-area waitlist: ${zip || "unknown ZIP"}`,
    text: `Someone outside the current service area wants delivery.\n\nEmail: ${email}\nZIP: ${zip || "(not provided)"}`,
  });

  console.log("[notify-me]", { email, zip, emailSent: sent, error, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
