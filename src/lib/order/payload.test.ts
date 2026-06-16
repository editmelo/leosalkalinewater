import { describe, it, expect } from "vitest";
import { buildOrderPayload } from "./payload";

describe("buildOrderPayload", () => {
  it("biweekly: recurring=true, cadence MONTHLY, deliveryFrequency biweekly", () => {
    const p = buildOrderPayload({ planId: "biweekly", jugCount: 1, zip: "46204" });
    expect(p.recurring).toBe(true);
    expect(p.cadence).toBe("MONTHLY");
    expect(p.deliveryFrequency).toBe("biweekly");
  });

  it("payg: recurring=false, cadence null, subtotal $20 for 1 jug", () => {
    const p = buildOrderPayload({ planId: "payg", jugCount: 1, zip: "46204" });
    expect(p.recurring).toBe(false);
    expect(p.cadence).toBeNull();
    expect(p.totals.subtotalCents).toBe(2000);
  });
});
