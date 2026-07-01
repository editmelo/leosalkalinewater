import { describe, it, expect } from "vitest";
import { computeTotals } from "./pricing";

describe("computeTotals", () => {
  it("base price includes 1 jug (biweekly $30, weekly $55, payg $20, starter $45)", () => {
    const one = (planId: "biweekly" | "weekly" | "payg" | "starter") =>
      computeTotals({ planId, jugCount: 1, zip: "46204", customerType: "residential" }).subtotalCents;
    expect(one("biweekly")).toBe(3000);
    expect(one("weekly")).toBe(5500);
    expect(one("payg")).toBe(2000);
    expect(one("starter")).toBe(4500);
  });

  it("adds $10 per additional jug beyond the 1 included", () => {
    const t = computeTotals({ planId: "biweekly", jugCount: 3, zip: "46204", customerType: "residential" });
    expect(t.subtotalCents).toBe(5000); // 3000 + 2 × 1000
    expect(t.lines).toHaveLength(2);
    expect(t.lines[1].qty).toBe(2);
    expect(t.lines[1].unitPriceCents).toBe(1000);
  });

  it("pay as you go: $20 first jug + $10 each additional (3 jugs = $40)", () => {
    const t = computeTotals({ planId: "payg", jugCount: 3, zip: "46204", customerType: "residential" });
    expect(t.subtotalCents).toBe(4000);
  });

  it("single jug has no additional-jugs line", () => {
    const t = computeTotals({ planId: "weekly", jugCount: 1, zip: "46204", customerType: "residential" });
    expect(t.lines).toHaveLength(1);
  });
});
