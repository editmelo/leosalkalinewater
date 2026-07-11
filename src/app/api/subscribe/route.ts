import { NextResponse } from "next/server";
import { SquareError } from "square";
import { isInServiceArea } from "@/lib/service-area";
import { areSubscriptionsReady, createSubscription, isRecurring } from "@/lib/square/subscriptions";
import type { SimpleSelection } from "@/lib/order/types";

// Recurring delivery enrollment (Square Subscriptions API).
//
// NOT yet wired into checkout — the live checkout still takes a one-time payment via
// /api/checkout so the demo keeps working. Once Leo signs off on the billing cadence,
// the cart will route recurring items here instead.
export async function POST(req: Request) {
  if (!areSubscriptionsReady()) {
    return NextResponse.json(
      { ok: false, error: "Subscriptions aren't set up yet." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { sourceId, selection, givenName, familyName, email, phone } = (body ?? {}) as {
    sourceId?: unknown;
    selection?: SimpleSelection;
    givenName?: unknown;
    familyName?: unknown;
    email?: unknown;
    phone?: unknown;
  };

  if (typeof sourceId !== "string" || !sourceId) {
    return NextResponse.json({ ok: false, error: "Missing card token." }, { status: 400 });
  }
  if (typeof givenName !== "string" || typeof familyName !== "string" || typeof email !== "string" || !email) {
    return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
  }
  if (!selection || selection.kind !== "simple" || !isRecurring(selection)) {
    return NextResponse.json({ ok: false, error: "That plan isn't a recurring delivery." }, { status: 400 });
  }
  if (!isInServiceArea(selection.zip)) {
    return NextResponse.json({ ok: false, error: "Out of service area" }, { status: 422 });
  }

  try {
    const result = await createSubscription({
      sourceId,
      selection,
      givenName,
      familyName,
      email,
      phone: typeof phone === "string" ? phone : undefined,
    });
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const detail =
      err instanceof SquareError
        ? ((err as unknown as { body?: { errors?: { detail?: string }[] } }).body?.errors?.[0]?.detail ?? err.message)
        : err instanceof Error
          ? err.message
          : "Could not start the subscription.";
    return NextResponse.json({ ok: false, error: detail }, { status: 402 });
  }
}
