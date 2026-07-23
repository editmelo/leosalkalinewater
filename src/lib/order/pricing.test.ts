import { describe, it, expect } from "vitest";
import { computeTotals, billingDisplay } from "./pricing";
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

describe("computeTotals — build-your-own store (flat $15/jug)", () => {
  it("charges $15 per jug per delivery; subscriptions bill the 4-week cycle amount", () => {
    // Weekly, 3 jugs: $15 × 3 × 4 deliveries = $180 per 4-week cycle
    expect(computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false }).subtotalCents).toBe(18000);
    // Bi-Weekly, 1 jug: $15 × 1 × 2 = $30 per cycle
    expect(computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Biweekly", firstTime: false }).subtotalCents).toBe(3000);
    // One-Time, 2 jugs: $15 × 2 = $30 (single charge)
    expect(computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "One-Time", firstTime: false }).subtotalCents).toBe(3000);
  });

  it("first-time: $15-per-jug deposit + $15 per pump; returning customers add neither", () => {
    const firstTime = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: true });
    expect(firstTime.depositCents).toBe(4500); // $15 × 3 jugs
    expect(firstTime.pumpCents).toBe(1500); // default 1 pump × $15
    const returning = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false });
    expect(returning.depositCents).toBe(0);
    expect(returning.pumpCents).toBe(0);
  });

  it("deposit is $15 per jug (1 jug → $15, 8 jugs → $120)", () => {
    expect(computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Weekly", firstTime: true }).depositCents).toBe(1500);
    expect(computeTotals({ kind: "simple", jugCount: 8, zip: "46204", frequency: "Weekly", firstTime: true }).depositCents).toBe(12000);
  });

  it("pump quantity is selectable at $15 each (0 → none, 2 → $30)", () => {
    expect(computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "Weekly", firstTime: true, pumpQty: 0 }).pumpCents).toBe(0);
    expect(computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "Weekly", firstTime: true, pumpQty: 2 }).pumpCents).toBe(3000);
  });
});

describe("billingDisplay — $15/week shown, full amount billed every 4 weeks", () => {
  it("Weekly 1 jug: shown as $15/week, billed $60 every 4 weeks", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Weekly", firstTime: false });
    expect(d.amountCents).toBe(6000); // $15 × 4 deliveries
    expect(d.perDeliveryCents).toBe(1500); // $15/week
    expect(d.perDeliveryUnit).toBe("/week");
    expect(d.recurring).toBe(true);
    expect(d.cadenceNote).toBe("$60.00 billed every 4 weeks");
  });
  it("Bi-Weekly 1 jug: shown as $15 / 2 weeks, billed $30 every 4 weeks", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Biweekly", firstTime: false });
    expect(d.amountCents).toBe(3000);
    expect(d.perDeliveryCents).toBe(1500);
    expect(d.perDeliveryUnit).toBe(" / 2 weeks");
  });
  it("One-Time 1 jug: single $15 charge, no cadence", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "One-Time", firstTime: false });
    expect(d.amountCents).toBe(1500);
    expect(d.perDeliveryUnit).toBe("");
    expect(d.recurring).toBe(false);
  });
});
