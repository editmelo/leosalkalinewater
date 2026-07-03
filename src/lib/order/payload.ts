import type { OrderSelection, CustomerType } from "./types";
import { getPlan } from "./products";
import { computeTotals } from "./pricing";

export interface OrderPayload {
  selection: OrderSelection;
  planName: string;
  recurring: boolean;
  cadence: string | null;
  deliveryFrequency: string;
  customerType: CustomerType | null;
  totals: ReturnType<typeof computeTotals>;
}

export function buildOrderPayload(sel: OrderSelection): OrderPayload {
  if (sel.kind === "simple") {
    const recurring = sel.frequency !== "One-Time";
    return {
      selection: sel,
      planName: "Alkaline Water Delivery",
      recurring,
      cadence: recurring ? "MONTHLY" : null,
      deliveryFrequency: sel.frequency,
      customerType: null,
      totals: computeTotals(sel),
    };
  }

  const plan = getPlan(sel.planId);
  const recurring = plan.billing === "monthly";
  return {
    selection: sel,
    planName: plan.name,
    recurring,
    cadence: recurring ? "MONTHLY" : null,
    deliveryFrequency: plan.deliveryFrequency,
    customerType: sel.customerType,
    totals: computeTotals(sel),
  };
}
