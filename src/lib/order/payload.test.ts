import { describe, it, expect } from "vitest";
import { buildOrderPayload } from "./payload";

describe("buildOrderPayload", () => {
  it("produces a Square-ready payload with recurrence + totals", () => {
    const p = buildOrderPayload({ jugCount: 4, frequency: "weekly", customerType: "residential", starterPackage: false, zip: "46204" });
    expect(p.recurring).toBe(true);
    expect(p.cadence).toBe("WEEKLY");
    expect(p.totals.subtotalCents).toBe(6000);
    expect(p.selection.jugCount).toBe(4);
  });
  it("marks one-time orders as non-recurring", () => {
    const p = buildOrderPayload({ jugCount: 2, frequency: "one-time", customerType: "business", starterPackage: true, zip: "46220" });
    expect(p.recurring).toBe(false);
    expect(p.cadence).toBeNull();
  });
});
