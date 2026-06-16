import { NextRequest, NextResponse } from "next/server";
import { CONTACT } from "@/lib/brand";

// TODO(email): connect Resend to deliver to CONTACT.email. For now: validate + log.
export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please complete all fields." }, { status: 400 });
  }
  console.log("[contact]", { to: CONTACT.email, name, email, message, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
