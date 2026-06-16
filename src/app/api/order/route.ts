import { NextRequest, NextResponse } from "next/server";
import { buildOrderPayload } from "@/lib/order/payload";
import type { OrderSelection } from "@/lib/order/types";
import { isInServiceArea } from "@/lib/service-area";

// TODO(Square): replace the stub with a Square Subscriptions/Payments call once
// credentials exist. The payload below is already shaped for that handoff.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as { items?: OrderSelection[] } | null;
  if (!body?.items?.length) return NextResponse.json({ ok: false, error: "Empty order" }, { status: 400 });
  if (body.items.some(item => !isInServiceArea(item.zip))) {
    return NextResponse.json({ ok: false, error: "Out of service area" }, { status: 422 });
  }
  const payloads = body.items.map(buildOrderPayload);
  console.log("[order:stub]", JSON.stringify(payloads));
  return NextResponse.json({ ok: true, stub: true });
}
