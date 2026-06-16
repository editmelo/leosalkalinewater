export type Frequency = "weekly" | "biweekly" | "monthly" | "one-time";
export type CustomerType = "residential" | "business";

export interface OrderSelection {
  jugCount: number;            // 1-10+ (custom allowed)
  frequency: Frequency;
  customerType: CustomerType;
  starterPackage: boolean;     // optional add-on
  zip: string;
}

export interface OrderLine {
  label: string;
  qty: number;
  unitPriceCents: number;
  refundable?: boolean;
}

export interface OrderTotals {
  lines: OrderLine[];
  subtotalCents: number;       // includes refundable deposit
  refundableCents: number;     // deposit portion (informational)
}
