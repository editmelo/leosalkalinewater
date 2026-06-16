export type PlanId = "biweekly" | "weekly" | "payg" | "starter";
export type DeliveryFrequency = "weekly" | "biweekly" | "one-time";
export type CustomerType = "residential" | "business";

export interface OrderSelection {
  planId: PlanId;
  jugCount: number; // 5-gallon jugs per delivery/order
  zip: string;
  customerType: CustomerType;
}

export interface OrderLine {
  label: string;
  qty: number;
  unitPriceCents: number;
}

export interface OrderTotals {
  lines: OrderLine[];
  subtotalCents: number;
}
