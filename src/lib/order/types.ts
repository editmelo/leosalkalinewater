export type PlanId = "biweekly" | "weekly" | "payg" | "starter";
export type DeliveryFrequency = "weekly" | "biweekly" | "one-time";
export type CustomerType = "residential" | "business";
export type SimpleFrequency = "One-Time" | "Weekly" | "Biweekly" | "Monthly";

// A cart item is either a named-plan order (Store 1) or a build-your-own order (Store 2).
export interface PlanSelection {
  kind: "plan";
  planId: PlanId;
  jugCount: number; // 5-gallon jugs per delivery/order
  zip: string;
  customerType: CustomerType;
}

export interface SimpleSelection {
  kind: "simple";
  jugCount: number;
  zip: string;
  frequency: SimpleFrequency;
}

export type OrderSelection = PlanSelection | SimpleSelection;

export interface OrderLine {
  label: string;
  qty: number;
  unitPriceCents: number;
}

export interface OrderTotals {
  lines: OrderLine[];
  subtotalCents: number;
}
