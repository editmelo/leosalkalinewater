import { NextRequest, NextResponse } from "next/server";

// Out-of-area lead capture. Forwards to a Google Apps Script Web App (bound to Leo's
// sheet) set via WAITLIST_WEBHOOK_URL. No URL set → still succeeds for the visitor and
// logs the lead server-side, so nothing breaks before it's wired up.
export async function POST(req: NextRequest) {
  const { name, email, phone, zip } = await req.json().catch(() => ({}));

  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "", email, phone: phone || "", zip: zip || "" }),
      });
    } catch (err) {
      console.error("[waitlist] webhook failed", err);
    }
  }

  console.log("[waitlist]", { name, email, phone, zip, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
