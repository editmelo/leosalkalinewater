import {
  getPlan,
  ADDON_JUG_CENTS,
  JUG_PRICE_CENTS,
  DELIVERY_FEE_CENTS,
  SIMPLE_DELIVERIES_PER_CYCLE,
  NEW_CUSTOMER_DEPOSIT_CENTS,
  PUMP_CENTS,
} from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const qty = Math.max(1, sel.jugCount);
  const extraJugs = qty - 1;

  // The store: flat $15 per jug, per delivery. subtotalCents is what's actually charged
  // per billing event — a single delivery for One-Time, or a full 4-week cycle for
  // Weekly (×4 deliveries) / Bi-Weekly (×2 deliveries).
  if (sel.kind === "simple") {
    const deliveries = SIMPLE_DELIVERIES_PER_CYCLE[sel.frequency];
    const perDelivery = qty * JUG_PRICE_CENTS;
    const subtotalCents = perDelivery * deliveries;
    // $5 delivery fee per delivery — recurs each cycle alongside the water.
    const deliveryCents = DELIVERY_FEE_CENTS * deliveries;
    const lines: OrderLine[] = [
      { label: "5-Gallon Alkaline Water", qty, unitPriceCents: JUG_PRICE_CENTS },
      { label: "Delivery", qty: deliveries, unitPriceCents: DELIVERY_FEE_CENTS },
    ];
    // First-time: refundable $15-per-jug deposit (always), plus optional $15 pumps (default 1).
    const depositCents = sel.firstTime ? qty * NEW_CUSTOMER_DEPOSIT_CENTS : 0;
    const pumpCents = sel.firstTime ? Math.max(0, sel.pumpQty ?? 1) * PUMP_CENTS : 0;
    return { lines, subtotalCents, deliveryCents, depositCents, pumpCents };
  }

  // Store 1 (named plans): base price includes 1 jug; every additional jug adds $10.
  const plan = getPlan(sel.planId);
  const lines: OrderLine[] = [
    { label: `${plan.name} (1 jug included)`, qty: 1, unitPriceCents: plan.priceCents },
  ];
  if (extraJugs > 0) {
    lines.push({ label: "Additional jugs", qty: extraJugs, unitPriceCents: ADDON_JUG_CENTS });
  }
  return { lines, subtotalCents: plan.priceCents + extraJugs * ADDON_JUG_CENTS, deliveryCents: 0, depositCents: 0, pumpCents: 0 };
}

// How to present the water price.
// MARKETING (browse surfaces): lead with the smaller per-delivery figure — Weekly
//   $60/cycle → $15/week, Biweekly $30/cycle → $15 per delivery — so the customer sees
//   a low, cadence-aligned number.
// CHECKOUT (cart/pay): show the real amount charged (the full $60 / $30) per 4-week cycle.
//   Weekly & Bi-Weekly are RECURRING — the cycle amount auto-renews every 4 weeks until
//   the customer contacts us to change or cancel (Weekly = 4 deliveries/cycle, Biweekly = 2).
//   `recurring` = auto-renewing order. One-Time is a single charge that does not renew.
export function billingDisplay(sel: OrderSelection): {
  amountCents: number; // the charge per 4-week cycle (or once, for One-Time) — use at checkout
  recurring: boolean; // true = auto-renews every 4 weeks until cancelled
  perDeliveryCents: number; // marketing headline — per delivery
  perDeliveryUnit: string; // "/week" | " / 2 weeks" | ""
  cadenceNote: string; // e.g. "$60.00 every 4 weeks" | ""
} {
  const { subtotalCents, deliveryCents } = computeTotals(sel);
  // The real per-cycle charge is water + the recurring delivery fee. The headline
  // per-delivery figure stays the water price ($15/jug) — delivery is shown as its own line.
  const cycleCents = subtotalCents + deliveryCents;
  if (sel.kind === "simple" && sel.frequency === "Weekly") {
    return {
      amountCents: cycleCents,
      recurring: true,
      perDeliveryCents: Math.round(subtotalCents / 4),
      perDeliveryUnit: "/week",
      cadenceNote: `${formatUsd(cycleCents)} every 4 weeks`,
    };
  }
  if (sel.kind === "simple" && sel.frequency === "Biweekly") {
    return {
      amountCents: cycleCents,
      recurring: true,
      perDeliveryCents: Math.round(subtotalCents / 2),
      perDeliveryUnit: " / 2 weeks",
      cadenceNote: `${formatUsd(cycleCents)} every 4 weeks`,
    };
  }
  const recurring = sel.kind === "plan" && getPlan(sel.planId).billing === "monthly";
  return {
    amountCents: cycleCents,
    recurring,
    perDeliveryCents: subtotalCents,
    perDeliveryUnit: "",
    cadenceNote: recurring ? `${formatUsd(cycleCents)} every 4 weeks` : "",
  };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
