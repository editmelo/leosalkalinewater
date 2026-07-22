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

describe("computeTotals — build-your-own (Store 2)", () => {
  it("base price varies by frequency, +$10 per additional jug", () => {
    // Weekly base $55 + 2 extra jugs × $10 = $75
    expect(computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false }).subtotalCents).toBe(7500);
    // Biweekly base $30, 1 jug
    expect(computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Biweekly", firstTime: false }).subtotalCents).toBe(3000);
    // One-Time base $20 + 1 extra jug × $10 = $30
    expect(computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "One-Time", firstTime: false }).subtotalCents).toBe(3000);
  });

  it("first-time customers add a $15-PER-JUG refundable deposit + a $10 pump, separate from the subtotal", () => {
    const firstTime = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: true });
    expect(firstTime.depositCents).toBe(4500); // $15 × 3 jugs
    expect(firstTime.pumpCents).toBe(1000); // one $10 rechargeable pump
    expect(firstTime.subtotalCents).toBe(7500); // water price unchanged by add-ons
    const returning = computeTotals({ kind: "simple", jugCount: 3, zip: "46204", frequency: "Weekly", firstTime: false });
    expect(returning.depositCents).toBe(0);
    expect(returning.pumpCents).toBe(0);
  });

  it("deposit is $15 per jug (1 jug → $15, 8 jugs → $120)", () => {
    const one = computeTotals({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Weekly", firstTime: true });
    const many = computeTotals({ kind: "simple", jugCount: 8, zip: "46204", frequency: "Weekly", firstTime: true });
    expect(one.depositCents).toBe(1500);
    expect(many.depositCents).toBe(12000);
  });

  it("the pump is optional (addPump: false removes only the pump)", () => {
    const noPump = computeTotals({ kind: "simple", jugCount: 2, zip: "46204", frequency: "Weekly", firstTime: true, addPump: false });
    expect(noPump.pumpCents).toBe(0);
    expect(noPump.depositCents).toBe(3000); // deposit still applies ($15 × 2)
  });
});

describe("billingDisplay — weekly-forward marketing, full charge every 4 weeks", () => {
  it("Weekly: charges the full $55 cycle amount, shown as $13.75/week", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Weekly", firstTime: false });
    expect(d.amountCents).toBe(5500); // real charge every 4 weeks
    expect(d.perDeliveryCents).toBe(1375); // marketing headline: $13.75/week
    expect(d.perDeliveryUnit).toBe("/week");
    expect(d.recurring).toBe(true);
    expect(d.cadenceNote).toBe("$55.00 billed every 4 weeks");
  });
  it("Biweekly: charges the full $30 cycle amount, shown as $15 per delivery", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "Biweekly", firstTime: false });
    expect(d.amountCents).toBe(3000);
    expect(d.perDeliveryCents).toBe(1500); // $15 per 2-week delivery
    expect(d.perDeliveryUnit).toBe(" / 2 weeks");
    expect(d.recurring).toBe(true);
  });
  it("One-Time is a single charge with no per-delivery unit", () => {
    const d = billingDisplay({ kind: "simple", jugCount: 1, zip: "46204", frequency: "One-Time", firstTime: false });
    expect(d.amountCents).toBe(2000);
    expect(d.perDeliveryCents).toBe(2000);
    expect(d.perDeliveryUnit).toBe("");
    expect(d.recurring).toBe(false);
  });
});
