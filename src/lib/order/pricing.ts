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
    // First-time customers get the starter add-ons: a single flat refundable jug deposit
    // (one $15 charge regardless of jug count) + a rechargeable pump.
    const depositCents = sel.firstTime ? NEW_CUSTOMER_DEPOSIT_CENTS : 0;
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

// How to present the water price. Subscriptions are charged the full cycle amount
// (Weekly $55, Biweekly $30 — plus any extra jugs) once every 4 weeks. That's
// effectively "monthly", but on a 4-week cycle so short months don't cost a billing
// period. One-time orders are a single charge.
export function billingDisplay(sel: OrderSelection): {
  amountCents: number; // charged per cycle (or once, for one-time)
  recurring: boolean;
  cadenceLabel: string; // "/month" | ""
  cadenceNote: string; // "Billed every 4 weeks" | ""
} {
  const { subtotalCents } = computeTotals(sel);
  const recurring =
    sel.kind === "simple" ? sel.frequency !== "One-Time" : getPlan(sel.planId).billing === "monthly";
  return {
    amountCents: subtotalCents,
    recurring,
    cadenceLabel: recurring ? "/month" : "",
    cadenceNote: recurring ? "Billed every 4 weeks" : "",
  };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
