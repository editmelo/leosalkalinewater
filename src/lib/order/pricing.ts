import { getPlan, ADDON_JUG_CENTS, SIMPLE_FREQUENCY_BASE_CENTS, NEW_CUSTOMER_DEPOSIT_CENTS, PUMP_CENTS } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const qty = Math.max(1, sel.jugCount);
  const extraJugs = qty - 1;

  // Store 2 (build-your-own): base price varies by frequency; +$10 per additional jug.
  if (sel.kind === "simple") {
    const base = SIMPLE_FREQUENCY_BASE_CENTS[sel.frequency];
    const lines: OrderLine[] = [
      { label: `Alkaline Water Delivery — ${sel.frequency} (1 jug included)`, qty: 1, unitPriceCents: base },
    ];
    if (extraJugs > 0) {
      lines.push({ label: "Additional jugs", qty: extraJugs, unitPriceCents: ADDON_JUG_CENTS });
    }
    // First-time customers can add the starter items — a single flat refundable jug
    // deposit ($15, any jug count) and/or a rechargeable pump ($10). Both optional;
    // default to included when first-time (addDeposit/addPump undefined → true).
    const depositCents = sel.firstTime && (sel.addDeposit ?? true) ? NEW_CUSTOMER_DEPOSIT_CENTS : 0;
    const pumpCents = sel.firstTime && (sel.addPump ?? true) ? PUMP_CENTS : 0;
    return { lines, subtotalCents: base + extraJugs * ADDON_JUG_CENTS, depositCents, pumpCents };
  }

  // Store 1 (named plans): base price includes 1 jug; every additional jug adds $10.
  const plan = getPlan(sel.planId);
  const lines: OrderLine[] = [
    { label: `${plan.name} (1 jug included)`, qty: 1, unitPriceCents: plan.priceCents },
  ];
  if (extraJugs > 0) {
    lines.push({ label: "Additional jugs", qty: extraJugs, unitPriceCents: ADDON_JUG_CENTS });
  }
  return { lines, subtotalCents: plan.priceCents + extraJugs * ADDON_JUG_CENTS, depositCents: 0, pumpCents: 0 };
}

// How to present the water price.
// MARKETING (browse surfaces): lead with the smaller per-delivery figure — Weekly
//   $55/4wk → $13.75/week, Biweekly $30/4wk → $15 per delivery — so the customer sees
//   a low, cadence-aligned number.
// CHECKOUT (cart/pay): show the real amount charged (the full $55 / $30) every 4 weeks,
//   so it's completely transparent that it's a recurring subscription.
export function billingDisplay(sel: OrderSelection): {
  amountCents: number; // the real charge per cycle (or once) — use at checkout
  recurring: boolean;
  perDeliveryCents: number; // marketing headline — per delivery
  perDeliveryUnit: string; // "/week" | " / 2 weeks" | ""
  cadenceNote: string; // e.g. "$55.00 billed every 4 weeks" | ""
} {
  const { subtotalCents } = computeTotals(sel);
  if (sel.kind === "simple" && sel.frequency === "Weekly") {
    return {
      amountCents: subtotalCents,
      recurring: true,
      perDeliveryCents: Math.round(subtotalCents / 4),
      perDeliveryUnit: "/week",
      cadenceNote: `${formatUsd(subtotalCents)} billed every 4 weeks`,
    };
  }
  if (sel.kind === "simple" && sel.frequency === "Biweekly") {
    return {
      amountCents: subtotalCents,
      recurring: true,
      perDeliveryCents: Math.round(subtotalCents / 2),
      perDeliveryUnit: " / 2 weeks",
      cadenceNote: `${formatUsd(subtotalCents)} billed every 4 weeks`,
    };
  }
  const recurring = sel.kind === "plan" && getPlan(sel.planId).billing === "monthly";
  return {
    amountCents: subtotalCents,
    recurring,
    perDeliveryCents: subtotalCents,
    perDeliveryUnit: "",
    cadenceNote: recurring ? `${formatUsd(subtotalCents)} billed every 4 weeks` : "",
  };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
