"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { WaterFamConfirm } from "./WaterFamConfirm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { computeTotals, billingDisplay, formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS, PUMP_CENTS, JUG_PRICE_CENTS } from "@/lib/order/products";
import type { SimpleFrequency } from "@/lib/order/types";

const FREQUENCIES: SimpleFrequency[] = ["One-Time", "Weekly", "Biweekly"];
const FREQUENCY_LABEL: Record<SimpleFrequency, string> = {
  "One-Time": "One-Time Delivery",
  Weekly: "Weekly Delivery",
  Biweekly: "Bi-Weekly Delivery",
};
// Short labels for the pill buttons (the full labels are used in the cart/summary).
const FREQUENCY_SHORT: Record<SimpleFrequency, string> = {
  "One-Time": "One-Time",
  Weekly: "Weekly",
  Biweekly: "Bi-Weekly",
};

const pillBase =
  "rounded-lg border font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/50";
function pill(active: boolean, extra: string) {
  return `${pillBase} ${extra} ${
    active
      ? "border-brand-blue bg-brand-blue text-white"
      : "border-black/10 bg-white text-brand-text hover:border-brand-aqua"
  }`;
}

export function SimpleOrder() {
  const router = useRouter();
  const { addItem } = useCart();
  const [jugs, setJugs] = useState(2);
  const [frequency, setFrequency] = useState<SimpleFrequency>("Weekly");
  const [firstTime, setFirstTime] = useState(true);
  const [pumpQty, setPumpQty] = useState(1);
  const [zip, setZip] = useState("");
  const [confirming, setConfirming] = useState(false);
  const ready = isInServiceArea(zip);

  const selection = { kind: "simple" as const, jugCount: jugs, frequency, zip, firstTime, pumpQty };
  const totals = computeTotals(selection);
  const { amountCents, recurring, perDeliveryCents, perDeliveryUnit } = billingDisplay(selection);
  const depositCents = totals.depositCents;
  const pumpCents = totals.pumpCents;
  const dueToday = amountCents + depositCents + pumpCents;

  function confirmOrder() {
    addItem(selection);
    router.push("/cart");
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
        Alkaline Water Delivery
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-brand-navy sm:text-4xl">Build Your Delivery</h1>
      <p className="mt-2 text-brand-text/70">
        Just <b>{formatUsd(JUG_PRICE_CENTS)} per jug</b> — pick how many and how often.
      </p>

      {/* Headline: per-delivery price */}
      <p className="mt-4">
        <span className="text-4xl font-extrabold text-brand-blue">{formatUsd(perDeliveryCents)}</span>
        <span className="text-lg font-semibold text-brand-text/60">
          {perDeliveryUnit || " one-time"}
        </span>
      </p>

      <div className="mt-6 text-left">
        <Field label="Number of jugs">
          <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
              <button key={n} className={pill(jugs === n, "h-11 text-sm")} aria-pressed={jugs === n} onClick={() => setJugs(n)}>
                {n}
              </button>
            ))}
          </div>
        </Field>
        <p className="mt-2 text-xs text-brand-text/60">
          💧 Not sure how much water you need? We recommend up to <b>1 gallon of water per day, per person</b>. A
          5-gallon jug should last one adult 5–7 days.
        </p>
      </div>

      <div className="mt-6 text-left">
        <Field label="Delivery frequency">
          <div className="mt-2 grid grid-cols-3 gap-2">
            {FREQUENCIES.map((f) => (
              <button key={f} className={pill(frequency === f, "py-3 text-sm")} aria-pressed={frequency === f} onClick={() => setFrequency(f)}>
                {FREQUENCY_SHORT[f]}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-6 text-left">
        <Field label="Are you a first-time customer?">
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button className={pill(firstTime, "py-3 text-sm")} aria-pressed={firstTime} onClick={() => setFirstTime(true)}>
              First-time
            </button>
            <button className={pill(!firstTime, "py-3 text-sm")} aria-pressed={!firstTime} onClick={() => setFirstTime(false)}>
              Returning (jug exchange)
            </button>
          </div>
        </Field>

        {firstTime && (
          <div className="mt-3 space-y-3 rounded-xl border border-black/10 bg-white p-3">
            <p className="text-xs font-semibold text-brand-text/60">Getting started</p>
            {/* Deposit — required, $15/jug */}
            <div className="flex items-center justify-between gap-2 text-sm">
              <span>
                Refundable jug deposit{" "}
                <span className="text-xs text-brand-text/50">
                  ({formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)}/jug × {jugs}, returned with your jugs)
                </span>
              </span>
              <span className="font-semibold">{formatUsd(depositCents)}</span>
            </div>
            {/* Pump — optional, quantity selectable at $15 each */}
            <div className="flex items-center justify-between gap-2 text-sm">
              <span>
                Rechargeable pump <span className="text-xs text-brand-text/50">({formatUsd(PUMP_CENTS)} each, yours to keep)</span>
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Fewer pumps"
                  className="h-7 w-7 rounded-md border border-black/15 font-bold text-brand-blue disabled:opacity-30"
                  onClick={() => setPumpQty((q) => Math.max(0, q - 1))}
                  disabled={pumpQty <= 0}
                >
                  −
                </button>
                <span className="w-5 text-center font-semibold">{pumpQty}</span>
                <button
                  type="button"
                  aria-label="More pumps"
                  className="h-7 w-7 rounded-md border border-black/15 font-bold text-brand-blue"
                  onClick={() => setPumpQty((q) => q + 1)}
                >
                  +
                </button>
                <span className="ml-1 w-14 text-right font-semibold">{formatUsd(pumpCents)}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-left">
        <ServiceAreaCheck zip={zip} onZip={setZip} />
      </div>

      <Card className="mt-6 text-left">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
            {recurring ? "Per month*" : "Total"}
          </span>
          <span className="text-xl font-extrabold text-brand-blue">{formatUsd(amountCents)}</span>
        </div>

        {firstTime && (
          <div className="mt-3 space-y-1 border-t border-black/5 pt-3 text-sm text-brand-text/70">
            <div className="flex items-center justify-between">
              <span>+ Refundable jug deposit (one-time)</span>
              <span className="font-semibold">{formatUsd(depositCents)}</span>
            </div>
            {pumpCents > 0 && (
              <div className="flex items-center justify-between">
                <span>+ Rechargeable pump{pumpQty > 1 ? ` × ${pumpQty}` : ""} (one-time)</span>
                <span className="font-semibold">{formatUsd(pumpCents)}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
          <span className="font-bold text-brand-navy">Due today</span>
          <span className="text-lg font-extrabold text-brand-blue">{formatUsd(dueToday)}</span>
        </div>

        {recurring && (
          <p className="mt-2 text-xs text-brand-text/60">
            *&ldquo;Per month&rdquo; means billed every 4 weeks. This subscription renews automatically — cancel anytime.
          </p>
        )}
        <p className="mt-1 text-xs text-brand-text/50">Delivery days are assigned by your ZIP route.</p>

        <Button variant="primary" className="mt-4 w-full" disabled={!ready} onClick={() => setConfirming(true)}>
          {ready ? "Add to cart →" : "Enter a serviced ZIP"}
        </Button>
      </Card>

      <WaterFamConfirm open={confirming} onCancel={() => setConfirming(false)} onConfirm={confirmOrder}>
        <ul className="space-y-1">
          <li className="font-bold text-brand-navy">{FREQUENCY_LABEL[frequency]}</li>
          <li>
            {jugs} × 5-gallon jug{jugs > 1 ? "s" : ""} · ZIP {zip}
          </li>
          <li className="pt-1 text-base font-extrabold text-brand-blue">
            {formatUsd(amountCents)}
            {recurring ? <span className="text-sm font-normal text-brand-text/60"> / month (every 4 weeks)</span> : null}
          </li>
          {firstTime && (
            <li className="text-sm font-normal text-brand-text/70">
              + {formatUsd(depositCents + pumpCents)} one-time starter items
            </li>
          )}
        </ul>
      </WaterFamConfirm>
    </div>
  );
}
