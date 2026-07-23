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
// First-time customers only: one-time refundable jug deposit, $15 PER JUG (damage / non-return).
export const NEW_CUSTOMER_DEPOSIT_CENTS = 1500;
// Rechargeable pump — $15 each, optional, quantity selectable (first-time only).
export const PUMP_CENTS = 1500;

// The store: flat $15 per 5-gallon jug, per delivery. No tiers, no per-jug add-on math.
export const JUG_PRICE_CENTS = 1500;

// How many deliveries fall in one 4-week billing cycle, by frequency. Used so a Weekly
// customer sees "$15/week" but is billed the full 4-week amount once every 4 weeks.
export const SIMPLE_DELIVERIES_PER_CYCLE: Record<SimpleFrequency, number> = {
  "One-Time": 1,
  Weekly: 4,
  Biweekly: 2,
};
