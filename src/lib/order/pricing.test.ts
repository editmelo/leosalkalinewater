import { describe, it, expect } from "vitest";
import { computeTotals } from "./pricing";

describe("computeTotals", () => {
  it("prices jugs at $15 each", () => {
    const t = computeTotals({ jugCount: 4, frequency: "weekly", customerType: "residential", starterPackage: false, zip: "46204" });
    expect(t.subtotalCents).toBe(6000);
    expect(t.refundableCents).toBe(0);
    expect(t.lines).toHaveLength(1);
  });

  it("adds a refundable deposit + dispenser when the starter package is chosen", () => {
    const t = computeTotals({ jugCount: 2, frequency: "one-time", customerType: "residential", starterPackage: true, zip: "46204" });
    // 2 jugs ($30) + refundable deposit ($15) + dispenser (placeholder $0)
    expect(t.subtotalCents).toBe(4500);
    expect(t.refundableCents).toBe(1500);
    expect(t.lines.some(l => l.refundable)).toBe(true);
  });
});
