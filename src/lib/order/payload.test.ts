import { describe, it, expect } from "vitest";
import { buildOrderPayload } from "./payload";

describe("buildOrderPayload — named plans (Store 1)", () => {
  it("biweekly: recurring=true, cadence MONTHLY, deliveryFrequency biweekly", () => {
    const p = buildOrderPayload({ kind: "plan", planId: "biweekly", jugCount: 1, zip: "46204", customerType: "residential" });
    expect(p.recurring).toBe(true);
    expect(p.cadence).toBe("MONTHLY");
    expect(p.deliveryFrequency).toBe("biweekly");
    expect(p.customerType).toBe("residential");
  });

  it("payg: recurring=false, cadence null, subtotal $20 for 1 jug", () => {
    const p = buildOrderPayload({ kind: "plan", planId: "payg", jugCount: 1, zip: "46204", customerType: "business" });
    expect(p.recurring).toBe(false);
    expect(p.cadence).toBeNull();
    expect(p.totals.subtotalCents).toBe(2000);
    expect(p.customerType).toBe("business");
  });
});

describe("buildOrderPayload — build-your-own (Store 2)", () => {
  it("One-Time: one-time order, no customer type", () => {
    const p = buildOrderPayload({ kind: "simple", jugCount: 2, zip: "46204", frequency: "One-Time" });
    expect(p.recurring).toBe(false);
    expect(p.planName).toBe("Alkaline Water Delivery");
    expect(p.deliveryFrequency).toBe("One-Time");
    expect(p.customerType).toBeNull();
    expect(p.totals.subtotalCents).toBe(3000); // One-Time base $20 + 1 extra jug × $10
  });

  it("Weekly: recurring subscription", () => {
    const p = buildOrderPayload({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Weekly" });
    expect(p.recurring).toBe(true);
    expect(p.cadence).toBe("MONTHLY");
  });
});
