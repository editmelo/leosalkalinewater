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
import { NEW_CUSTOMER_DEPOSIT_CENTS, PUMP_CENTS, FREQUENCY_NAMES } from "@/lib/order/products";
import type { SimpleFrequency } from "@/lib/order/types";

const FREQUENCIES: SimpleFrequency[] = ["One-Time", "Weekly", "Biweekly"];

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
  const [addDeposit, setAddDeposit] = useState(true);
  const [addPump, setAddPump] = useState(true);
  const [zip, setZip] = useState("");
  const [confirming, setConfirming] = useState(false);
  const ready = isInServiceArea(zip);

  const selection = { kind: "simple" as const, jugCount: jugs, frequency, zip, firstTime, addDeposit, addPump };
  const totals = computeTotals(selection);
  const { amountCents, recurring, perDeliveryCents, perDeliveryUnit, cadenceNote } = billingDisplay(selection);
  const depositCents = totals.depositCents;
  const pumpCents = totals.pumpCents;
  const dueToday = amountCents + depositCents + pumpCents;

  function confirmOrder() {
    addItem(selection);
    router.push("/cart");
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
        Alkaline Water Delivery
      </p>
      <h1 className="mt-1 text-3xl font-extrabold text-brand-navy sm:text-4xl">Build Your Delivery</h1>
      <p className="mt-2 text-brand-text/70">Pick your jugs and how often — your price updates below.</p>

      {/* Marketing headline: the low per-delivery number */}
      <p className="mt-4">
        <span className="text-4xl font-extrabold text-brand-blue">{formatUsd(perDeliveryCents)}</span>
        {perDeliveryUnit ? (
          <span className="text-lg font-semibold text-brand-text/60">{perDeliveryUnit}</span>
        ) : (
          <span className="text-lg font-semibold text-brand-text/60"> one-time</span>
        )}
      </p>
      {recurring && <p className="mt-1 text-sm text-brand-text/60">{cadenceNote} · cancel anytime</p>}

      <div className="mt-6">
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
          💧 Not sure how much? We recommend about <b>1 gallon of water per day, per person</b> — a 5-gallon jug lasts
          one person about 5 days.
        </p>
      </div>

      <div className="mt-6">
        <Field label="Delivery frequency">
          <div className="mt-2 space-y-2">
            {FREQUENCIES.map((f) => {
              const d = billingDisplay({ kind: "simple", jugCount: jugs, frequency: f, zip, firstTime, addDeposit, addPump });
              return (
                <button key={f} className={pill(frequency === f, "w-full px-4 py-3 text-sm")} aria-pressed={frequency === f} onClick={() => setFrequency(f)}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-left">
                      <span className="block font-bold">{FREQUENCY_NAMES[f]}</span>
                      <span className="block text-xs opacity-75">
                        {f === "One-Time" ? "One-time delivery" : `${f} delivery`}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className={`block font-bold ${frequency === f ? "opacity-95" : "text-brand-blue"}`}>
                        {formatUsd(d.perDeliveryCents)}
                        {d.perDeliveryUnit || (f === "One-Time" ? "" : "")}
                      </span>
                      {d.recurring && (
                        <span className="block text-[11px] opacity-70">{formatUsd(d.amountCents)} / 4 wks</span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <div className="mt-6">
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
          <div className="mt-3 space-y-2 rounded-xl border border-black/10 bg-white p-3">
            <p className="text-xs font-semibold text-brand-text/60">Getting started (optional)</p>
            <label className="flex cursor-pointer items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-black/20 text-brand-blue focus-visible:ring-2 focus-visible:ring-brand-aqua/50"
                  checked={addDeposit}
                  onChange={(e) => setAddDeposit(e.target.checked)}
                />
                Refundable jug deposit <span className="text-xs text-brand-text/50">(returned with your jugs)</span>
              </span>
              <span className="font-semibold">{formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)}</span>
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-black/20 text-brand-blue focus-visible:ring-2 focus-visible:ring-brand-aqua/50"
                  checked={addPump}
                  onChange={(e) => setAddPump(e.target.checked)}
                />
                Rechargeable pump <span className="text-xs text-brand-text/50">(yours to keep)</span>
              </span>
              <span className="font-semibold">{formatUsd(PUMP_CENTS)}</span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-6">
        <ServiceAreaCheck zip={zip} onZip={setZip} />
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
            {recurring ? "Subscription" : "Total"}
          </span>
          <span className="text-right">
            <span className="block text-xl font-extrabold text-brand-blue">{formatUsd(amountCents)}</span>
            {recurring && <span className="block text-xs text-brand-text/60">every 4 weeks</span>}
          </span>
        </div>

        {firstTime && (depositCents > 0 || pumpCents > 0) && (
          <div className="mt-3 space-y-1 border-t border-black/5 pt-3 text-sm text-brand-text/70">
            {depositCents > 0 && (
              <div className="flex items-center justify-between">
                <span>+ Refundable jug deposit (one-time)</span>
                <span className="font-semibold">{formatUsd(depositCents)}</span>
              </div>
            )}
            {pumpCents > 0 && (
              <div className="flex items-center justify-between">
                <span>+ Rechargeable pump (yours to keep)</span>
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
            This is a <b>recurring subscription</b> — you&apos;ll be charged {formatUsd(amountCents)} today and again every
            4 weeks. Cancel anytime.
          </p>
        )}
        <p className="mt-1 text-xs text-brand-text/50">Delivery days are assigned by your ZIP route.</p>

        <Button variant="primary" className="mt-4 w-full" disabled={!ready} onClick={() => setConfirming(true)}>
          {ready ? "Add to cart →" : "Enter a serviced ZIP"}
        </Button>
      </Card>

      <WaterFamConfirm open={confirming} onCancel={() => setConfirming(false)} onConfirm={confirmOrder}>
        <ul className="space-y-1">
          <li className="font-bold text-brand-navy">{FREQUENCY_NAMES[frequency]}</li>
          <li>
            {jugs} × 5-gallon jug{jugs > 1 ? "s" : ""} · {frequency === "One-Time" ? "One-time" : `${frequency} delivery`} · ZIP {zip}
          </li>
          <li className="pt-1 text-base font-extrabold text-brand-blue">
            {formatUsd(amountCents)}
            {recurring ? <span className="text-sm font-normal text-brand-text/60"> every 4 weeks</span> : null}
          </li>
          {firstTime && (depositCents > 0 || pumpCents > 0) && (
            <li className="text-sm font-normal text-brand-text/70">
              + {formatUsd(depositCents + pumpCents)} one-time starter items
            </li>
          )}
        </ul>
      </WaterFamConfirm>
    </div>
  );
}
