import { describe, it, expect } from "vitest";
import { computeTotals } from "./pricing";

describe("computeTotals", () => {
  it("payg: prices jugs per-jug at $20 each (qty 3 = $60)", () => {
    const t = computeTotals({ planId: "payg", jugCount: 3, zip: "46204" });
    expect(t.subtotalCents).toBe(6000);
    expect(t.lines).toHaveLength(1);
    expect(t.lines[0].qty).toBe(3);
  });

  it("weekly: fixed $55/mo regardless of jugCount", () => {
    const t = computeTotals({ planId: "weekly", jugCount: 5, zip: "46204" });
    expect(t.subtotalCents).toBe(5500);
    expect(t.lines).toHaveLength(1);
    expect(t.lines[0].qty).toBe(1);
  });

  it("biweekly: fixed $30/mo", () => {
    const t = computeTotals({ planId: "biweekly", jugCount: 1, zip: "46204" });
    expect(t.subtotalCents).toBe(3000);
  });

  it("starter: fixed $45 one-time", () => {
    const t = computeTotals({ planId: "starter", jugCount: 1, zip: "46204" });
    expect(t.subtotalCents).toBe(4500);
  });
});
