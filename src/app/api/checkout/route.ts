import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { SquareError } from "square";
import { getSquareClient, getSquareLocationId } from "@/lib/square/client";
import { isCustomerComplete, type CustomerDetails } from "@/lib/order/customer";
import { isInServiceArea } from "@/lib/service-area";

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

  const { sourceId, amountCents, customer, note } = (body ?? {}) as {
    sourceId?: unknown;
    amountCents?: unknown;
    customer?: CustomerDetails;
    note?: unknown;
  };
  if (typeof sourceId !== "string" || !sourceId) {
    return NextResponse.json({ ok: false, error: "Missing card token." }, { status: 400 });
  }
  const cents = Number(amountCents);
  if (!Number.isInteger(cents) || cents <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid amount." }, { status: 400 });
  }
  if (!customer || !isCustomerComplete(customer)) {
    return NextResponse.json({ ok: false, error: "Delivery details are incomplete." }, { status: 400 });
  }
  if (!isInServiceArea(customer.zip)) {
    return NextResponse.json({ ok: false, error: "Out of service area" }, { status: 422 });
  }

  // Where the jugs actually go — rides along to Square so Leo sees it on the payment.
  const deliveryAddress = {
    addressLine1: customer.address1,
    addressLine2: customer.address2 || undefined,
    locality: customer.city,
    administrativeDistrictLevel1: customer.state,
    postalCode: customer.zip,
    country: "US" as const,
    firstName: customer.firstName,
    lastName: customer.lastName,
  };

  try {
    const resp = await client.payments.create({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: { amount: BigInt(cents), currency: "USD" },
      locationId,
      buyerEmailAddress: customer.email,
      buyerPhoneNumber: customer.phone || undefined,
      shippingAddress: deliveryAddress,
      billingAddress: deliveryAddress,
      note: typeof note === "string" && note ? note : undefined,
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
