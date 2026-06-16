import { getPlan } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const plan = getPlan(sel.planId);
  const qty = Math.max(1, sel.jugCount);
  let lines: OrderLine[];
  let subtotalCents: number;
  if (plan.perJug) {
    lines = [{ label: `${plan.name} — 5-Gallon Jug`, qty, unitPriceCents: plan.priceCents }];
    subtotalCents = qty * plan.priceCents;
  } else {
    lines = [{ label: plan.name, qty: 1, unitPriceCents: plan.priceCents }];
    subtotalCents = plan.priceCents;
  }
  return { lines, subtotalCents };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
