export type PlanId = "biweekly" | "weekly" | "payg" | "starter";
export type DeliveryFrequency = "weekly" | "biweekly" | "one-time";
export type CustomerType = "residential" | "business";
export type SimpleFrequency = "One-Time" | "Weekly" | "Biweekly";

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
  firstTime: boolean; // returning (jug exchange) customers skip the starter items
  addPump?: boolean; // first-time only; OPTIONAL rechargeable pump. undefined → included by default
}

export type OrderSelection = PlanSelection | SimpleSelection;

export interface OrderLine {
  label: string;
  qty: number;
  unitPriceCents: number;
}

export interface OrderTotals {
  lines: OrderLine[];
  subtotalCents: number; // price of the water per billing cycle (charged every 4 weeks) or one-time
  depositCents: number; // one-time refundable jug deposit (first-time customers only)
  pumpCents: number; // one-time rechargeable pump, yours to keep (first-time customers only)
}
