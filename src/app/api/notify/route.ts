import { NextRequest, NextResponse } from "next/server";

// TODO(Square/email): wire to Resend or a list provider; for now we validate + log.
export async function POST(req: NextRequest) {
  const { email, zip } = await req.json().catch(() => ({}));
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  console.log("[notify-me]", { email, zip, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
