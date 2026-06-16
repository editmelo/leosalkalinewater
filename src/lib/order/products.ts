import type { Frequency } from "./types";

export const JUG_PRICE_CENTS = 1500;          // $15 per 5-gal jug, delivered
export const JUG_DEPOSIT_CENTS = 1500;        // refundable $15 jug deposit
// PLACEHOLDER: confirm real dispenser price with Leo before launch.
export const STARTER_DISPENSER_CENTS = 0;     // dispenser price TBD
export const QUICK_QUANTITIES = [2, 4, 6, 8, 10] as const;

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
  "one-time": "One-time",
};
