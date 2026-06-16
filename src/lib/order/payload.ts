import type { OrderSelection } from "./types";
import { getPlan } from "./products";
import { computeTotals } from "./pricing";

export interface OrderPayload {
  selection: OrderSelection;
  planName: string;
  recurring: boolean;
  cadence: string | null;
  deliveryFrequency: string;
  totals: ReturnType<typeof computeTotals>;
}

export function buildOrderPayload(sel: OrderSelection): OrderPayload {
  const plan = getPlan(sel.planId);
  const recurring = plan.billing === "monthly";
  return { selection: sel, planName: plan.name, recurring, cadence: recurring ? "MONTHLY" : null, deliveryFrequency: plan.deliveryFrequency, totals: computeTotals(sel) };
}
