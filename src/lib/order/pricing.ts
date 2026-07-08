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
    // First-time customers get the starter add-ons: refundable deposit per jug + a rechargeable pump.
    const depositCents = sel.firstTime ? qty * NEW_CUSTOMER_DEPOSIT_CENTS : 0;
    const pumpCents = sel.firstTime ? PUMP_CENTS : 0;
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

// How to present the water price: subscriptions bill every 4 weeks but display as a
// per-week (Weekly) or per-delivery (Biweekly) rate. One-time is a single charge.
export function billingDisplay(sel: OrderSelection): {
  rateCents: number; // headline amount
  unit: string; // "/week" | "/bi-weekly" | ""
  recurring: boolean;
  billedCents: number; // amount charged per 4-week cycle
} {
  const { subtotalCents } = computeTotals(sel);
  if (sel.kind === "simple" && sel.frequency === "Weekly") {
    return { rateCents: Math.round(subtotalCents / 4), unit: "/week", recurring: true, billedCents: subtotalCents };
  }
  if (sel.kind === "simple" && sel.frequency === "Biweekly") {
    return { rateCents: Math.round(subtotalCents / 2), unit: "/bi-weekly", recurring: true, billedCents: subtotalCents };
  }
  return { rateCents: subtotalCents, unit: "", recurring: false, billedCents: subtotalCents };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
