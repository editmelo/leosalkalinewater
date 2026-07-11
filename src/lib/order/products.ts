import type { PlanId, DeliveryFrequency, SimpleFrequency } from "./types";

export interface Plan {
  id: PlanId;
  name: string;
  priceCents: number;
  billing: "monthly" | "one-time";
  billingLabel: string;
  deliveryFrequency: DeliveryFrequency;
  tagline: string;
  description: string;
  image: string;
  features: string[];
}

export const PLANS: Plan[] = [
  { id: "starter", name: "First Pour", priceCents: 4500, billing: "one-time", billingLabel: "Valid for 7 days", deliveryFrequency: "one-time", tagline: "Starter Kit", description: "Includes: Refundable Jug Deposit, First Fill & Delivery, and Rechargeable Pump (yours to keep!). After your first fill & delivery, a subscription will be required to continue deliveries.", image: "/products/starter-pack.jpg", features: ["Refundable Jug Deposit", "First Fill & Delivery", "Rechargeable Pump (yours to keep!)", "Valid for 7 Days"] },
  { id: "biweekly", name: "Stay Balanced", priceCents: 3000, billing: "monthly", billingLabel: "Every month", deliveryFrequency: "biweekly", tagline: "Bi-Weekly · Perfect for 1", description: "Fresh 5-gallon alkaline water delivered every two weeks, billed monthly.", image: "/products/jug-biweekly.jpg", features: ["5 Gallon Alkaline Water", "Bi-Weekly Deliveries", "Billed Monthly", "Cancel Anytime"] },
  { id: "weekly", name: "Fully Hydrated", priceCents: 5500, billing: "monthly", billingLabel: "Every month", deliveryFrequency: "weekly", tagline: "Weekly · For the whole family", description: "Weekly refills of fresh 5-gallon alkaline water, billed monthly.", image: "/products/jug-weekly.jpg", features: ["5 Gallon Alkaline Water", "Weekly Refills", "Billed Monthly", "Cancel Anytime"] },
  { id: "payg", name: "Top Off", priceCents: 2000, billing: "one-time", billingLabel: "Valid for 7 days", deliveryFrequency: "one-time", tagline: "One-Time · No commitment", description: "Hydrate as needed with single payment options for a single delivery of a 5-gallon jug of alkaline water.", image: "/products/jug-payg.jpg", features: ["5 Gallon Alkaline Water", "Single Delivery", "No Commitment", "Valid for 7 Days"] },
];

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export const JUG_QUANTITIES = [1, 2, 3, 4, 6, 8] as const;

// Every plan's base price includes 1 jug; each additional jug is +$10.
export const ADDON_JUG_CENTS = 1000;
// First-time customers only: one-time refundable jug deposit (per jug; covers damage / non-return).
export const NEW_CUSTOMER_DEPOSIT_CENTS = 1500;
// First-time customers only: one-time rechargeable pump — yours to keep.
export const PUMP_CENTS = 1000;
// Store 2 (build-your-own) price per 4-week billing cycle, by frequency; each includes 1 jug,
// then +$10 per additional jug (ADDON_JUG_CENTS). Displayed as a per-week / per-delivery rate:
// Weekly $55/cycle → $13.75/week; Biweekly $30/cycle → $15/bi-weekly; One-Time $20 (single charge).
export const SIMPLE_FREQUENCY_BASE_CENTS: Record<SimpleFrequency, number> = {
  "One-Time": 2000,
  Biweekly: 3000,
  Weekly: 5500,
};

// Leo's branded tier names mapped onto the build-your-own frequencies.
// ("First Pour" is the starter kit auto-included on a first-time customer's first order.)
export const FREQUENCY_NAMES: Record<SimpleFrequency, string> = {
  "One-Time": "Top Off",
  Biweekly: "Stay Balanced",
  Weekly: "Fully Hydrated",
};
