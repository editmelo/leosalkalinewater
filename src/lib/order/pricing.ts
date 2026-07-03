import { getPlan, ADDON_JUG_CENTS, SIMPLE_FREQUENCY_BASE_CENTS } from "./products";
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
    return { lines, subtotalCents: base + extraJugs * ADDON_JUG_CENTS };
  }

  // Store 1 (named plans): base price includes 1 jug; every additional jug adds $10.
  const plan = getPlan(sel.planId);
  const lines: OrderLine[] = [
    { label: `${plan.name} (1 jug included)`, qty: 1, unitPriceCents: plan.priceCents },
  ];
  if (extraJugs > 0) {
    lines.push({ label: "Additional jugs", qty: extraJugs, unitPriceCents: ADDON_JUG_CENTS });
  }
  return { lines, subtotalCents: plan.priceCents + extraJugs * ADDON_JUG_CENTS };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
