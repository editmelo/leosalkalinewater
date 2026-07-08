import { describe, it, expect } from "vitest";
import { computeTotals } from "./pricing";
import type { PlanId } from "./types";

describe("computeTotals — named plans (Store 1)", () => {
  const one = (planId: PlanId) =>
    computeTotals({ kind: "plan", planId, jugCount: 1, zip: "46204", customerType: "residential" }).subtotalCents;

  it("base price includes 1 jug (biweekly $30, weekly $55, payg $20, starter $45)", () => {
    expect(one("biweekly")).toBe(3000);
    expect(one("weekly")).toBe(5500);
    expect(one("payg")).toBe(2000);
    expect(one("starter")).toBe(4500);
  });

  it("adds $10 per additional jug beyond the 1 included", () => {
    const t = computeTotals({ kind: "plan", planId: "biweekly", jugCount: 3, zip: "46204", customerType: "residential" });
    expect(t.subtotalCents).toBe(5000); // 3000 + 2 × 1000
    expect(t.lines).toHaveLength(2);
    expect(t.lines[1].qty).toBe(2);
    expect(t.lines[1].unitPriceCents).toBe(1000);
  });

  it("single jug has no additional-jugs line", () => {
    const t = computeTotals({ kind: "plan", planId: "weekly", jugCount: 1, zip: "46204", customerType: "residential" });
    expect(t.lines).toHaveLength(1);
  });
});

describe("computeTotals — build-your-own (Store 2)", () => {
  it("base price varies by frequency, +$10 per additional jug", () => {
    // Weekly base $55 + 2 extra jugs × $10 = $75
    expect(computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false }).subtotalCents).toBe(7500);
    // Biweekly base $30, 1 jug
    expect(computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Biweekly", firstTime: false }).subtotalCents).toBe(3000);
    // One-Time base $20 + 1 extra jug × $10 = $30
    expect(computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "One-Time", firstTime: false }).subtotalCents).toBe(3000);
    // Monthly base $15
    expect(computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Monthly", firstTime: false }).subtotalCents).toBe(1500);
  });

  it("first-time customers pay a $15/jug refundable deposit, separate from the subtotal", () => {
    const firstTime = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: true });
    expect(firstTime.depositCents).toBe(4500); // 3 jugs × $15
    expect(firstTime.subtotalCents).toBe(7500); // water price unchanged by deposit
    const returning = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false });
    expect(returning.depositCents).toBe(0);
  });
});
