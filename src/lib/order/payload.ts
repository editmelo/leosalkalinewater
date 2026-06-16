import type { Frequency, OrderSelection } from "./types";
import { computeTotals } from "./pricing";

// Square Subscriptions cadence mapping (used when we connect the real API later).
const CADENCE: Record<Frequency, string | null> = {
  weekly: "WEEKLY",
  biweekly: "EVERY_TWO_WEEKS",
  monthly: "MONTHLY",
  "one-time": null,
};

export interface OrderPayload {
  selection: OrderSelection;
  recurring: boolean;
  cadence: string | null;
  totals: ReturnType<typeof computeTotals>;
}

export function buildOrderPayload(sel: OrderSelection): OrderPayload {
  const cadence = CADENCE[sel.frequency];
  return {
    selection: sel,
    recurring: sel.frequency !== "one-time",
    cadence,
    totals: computeTotals(sel),
  };
}
