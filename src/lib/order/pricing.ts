import { JUG_PRICE_CENTS, JUG_DEPOSIT_CENTS, STARTER_DISPENSER_CENTS } from "./products";
import type { OrderSelection, OrderTotals, OrderLine } from "./types";

export function computeTotals(sel: OrderSelection): OrderTotals {
  const lines: OrderLine[] = [
    { label: "5-Gallon Alkaline Water Jug", qty: sel.jugCount, unitPriceCents: JUG_PRICE_CENTS },
  ];
  let refundableCents = 0;
  if (sel.starterPackage) {
    lines.push({ label: "Refundable jug deposit", qty: 1, unitPriceCents: JUG_DEPOSIT_CENTS, refundable: true });
    refundableCents += JUG_DEPOSIT_CENTS;
    if (STARTER_DISPENSER_CENTS > 0) {
      lines.push({ label: "Hand dispenser", qty: 1, unitPriceCents: STARTER_DISPENSER_CENTS });
    }
  }
  const subtotalCents = lines.reduce((sum, l) => sum + l.qty * l.unitPriceCents, 0);
  return { lines, subtotalCents, refundableCents };
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
