import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { SquareError } from "square";
import { getSquareClient, getSquareLocationId } from "@/lib/square/client";

// One-time card payment via the Square Payments API.
// Recurring subscriptions are handled separately (Subscriptions API) in a later pass.
export async function POST(req: Request) {
  const client = getSquareClient();
  const locationId = getSquareLocationId();
  if (!client || !locationId) {
    return NextResponse.json({ ok: false, error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { sourceId, amountCents } = (body ?? {}) as { sourceId?: unknown; amountCents?: unknown };
  if (typeof sourceId !== "string" || !sourceId) {
    return NextResponse.json({ ok: false, error: "Missing card token." }, { status: 400 });
  }
  const cents = Number(amountCents);
  if (!Number.isInteger(cents) || cents <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid amount." }, { status: 400 });
  }

  try {
    const resp = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: { amount: BigInt(cents), currency: "USD" },
      locationId,
    });
    return NextResponse.json({
      ok: true,
      paymentId: resp.payment?.id ?? null,
      status: resp.payment?.status ?? "COMPLETED",
    });
  } catch (err) {
    let detail = "Payment could not be processed.";
    if (err instanceof SquareError) {
      const errorBody = (err as unknown as { body?: { errors?: { detail?: string }[] } }).body;
      detail = errorBody?.errors?.[0]?.detail ?? err.message;
    }
    return NextResponse.json({ ok: false, error: detail }, { status: 402 });
  }
}
