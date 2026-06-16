import type { PlanId, DeliveryFrequency } from "./types";

export interface Plan {
  id: PlanId;
  name: string;
  priceCents: number;
  billing: "monthly" | "one-time";
  billingLabel: string;
  deliveryFrequency: DeliveryFrequency;
  perJug: boolean;
  tagline: string;
  description: string;
  features: string[];
}

export const PLANS: Plan[] = [
  { id: "biweekly", name: "Bi-Weekly Delivery", priceCents: 3000, billing: "monthly", billingLabel: "Every month", deliveryFrequency: "biweekly", perJug: false, tagline: "Perfect for 1 person", description: "Fresh 5-gallon alkaline water delivered every two weeks, billed monthly.", features: ["5 Gallon Alkaline Water", "Bi-Weekly Deliveries", "Billed Monthly", "Cancel Anytime"] },
  { id: "weekly", name: "Weekly Delivery", priceCents: 5500, billing: "monthly", billingLabel: "Every month", deliveryFrequency: "weekly", perJug: false, tagline: "Great for the whole family", description: "Weekly refills of fresh 5-gallon alkaline water, billed monthly.", features: ["5 Gallon Alkaline Water", "Weekly Refills", "Billed Monthly", "Cancel Anytime"] },
  { id: "payg", name: "Pay as You Go", priceCents: 2000, billing: "one-time", billingLabel: "Valid for 7 days", deliveryFrequency: "one-time", perJug: true, tagline: "Hydrate as needed", description: "Hydrate as needed with single payment options for a single delivery of a 5-gallon jug of alkaline water.", features: ["5 Gallon Alkaline Water", "Single Delivery", "No Commitment", "Valid for 7 Days"] },
  { id: "starter", name: "Starter Pack Bundle", priceCents: 4500, billing: "one-time", billingLabel: "Valid for 7 days", deliveryFrequency: "one-time", perJug: false, tagline: "Everything to get started", description: "Includes: Refundable Jug Deposit, First Fill & Delivery, and Rechargeable Pump (yours to keep!). After your first fill & delivery, a subscription will be required to continue deliveries.", features: ["Refundable Jug Deposit", "First Fill & Delivery", "Rechargeable Pump (yours to keep!)", "Valid for 7 Days"] },
];

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export const JUG_QUANTITIES = [1, 2, 3, 4, 6, 8] as const;
