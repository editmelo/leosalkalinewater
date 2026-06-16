export type PlanId = "biweekly" | "weekly" | "payg" | "starter";
export type DeliveryFrequency = "weekly" | "biweekly" | "one-time";

export interface OrderSelection {
  planId: PlanId;
  jugCount: number; // 5-gallon jugs per delivery/order
  zip: string;
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
