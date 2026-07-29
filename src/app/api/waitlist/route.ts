import { NextRequest, NextResponse } from "next/server";

// Out-of-area lead capture → Leo's "Delivery Waitlist" Google Form → its linked Google Sheet.
// Posting straight to the form's formResponse endpoint needs no API keys, no OAuth, and no
// Vercel config. The field IDs below are public (they're in the form's own HTML).
const FORM_ACTION =
  "https://docs.google.com/forms/d/17o2cz3vBZETj3y0mQh1esPxTg1fTxlM4LXdAY9J1WcQ/formResponse";
const FIELD = {
  name: "entry.1620910098",
  email: "entry.2122908167",
  phone: "entry.126270403",
  zip: "entry.203208242",
} as const;

export async function POST(req: NextRequest) {
  const { name, email, phone, zip } = await req.json().catch(() => ({}));

  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const body = new URLSearchParams();
  body.set(FIELD.name, name || "");
  body.set(FIELD.email, email);
  body.set(FIELD.phone, phone || "");
  body.set(FIELD.zip, zip || "");
  body.set("fvv", "1");
  body.set("pageHistory", "0");

  try {
    const res = await fetch(FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) console.error("[waitlist] Google Form responded", res.status);
  } catch (err) {
    console.error("[waitlist] submission failed", err);
    return NextResponse.json({ ok: false, error: "Could not submit. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
