import { getPlan, ADDON_JUG_CENTS } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

// Each plan's base price includes 1 jug; every additional jug adds $10.
export function computeTotals(sel: OrderSelection): OrderTotals {
  const plan = getPlan(sel.planId);
  const qty = Math.max(1, sel.jugCount);
  const extraJugs = qty - 1;
  const lines: OrderLine[] = [
    { label: `${plan.name} (1 jug included)`, qty: 1, unitPriceCents: plan.priceCents },
  ];
  if (extraJugs > 0) {
    lines.push({ label: "Additional jugs", qty: extraJugs, unitPriceCents: ADDON_JUG_CENTS });
  }
  const subtotalCents = plan.priceCents + extraJugs * ADDON_JUG_CENTS;
  return { lines, subtotalCents };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
