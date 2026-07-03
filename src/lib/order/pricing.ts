import { getPlan, ADDON_JUG_CENTS, SIMPLE_JUG_CENTS } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const qty = Math.max(1, sel.jugCount);

  // Store 2 (build-your-own): flat per-jug price.
  if (sel.kind === "simple") {
    return {
      lines: [{ label: "Alkaline Water Delivery — 5-gallon jug", qty, unitPriceCents: SIMPLE_JUG_CENTS }],
      subtotalCents: qty * SIMPLE_JUG_CENTS,
    };
  }

  // Store 1 (named plans): base price includes 1 jug; every additional jug adds $10.
  const plan = getPlan(sel.planId);
  const extraJugs = qty - 1;
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
