"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { WaterFamConfirm } from "./WaterFamConfirm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { computeTotals, billingDisplay, formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS, FREQUENCY_NAMES } from "@/lib/order/products";
import type { SimpleFrequency } from "@/lib/order/types";

// Build-your-own model: pick jugs + frequency. Subscriptions bill every 4 weeks,
// shown as a per-week (Weekly) / per-delivery (Biweekly) rate.
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
  const [zip, setZip] = useState("");
  const [confirming, setConfirming] = useState(false);
  const ready = isInServiceArea(zip);

  const selection = { kind: "simple" as const, jugCount: jugs, frequency, zip, firstTime };
  const totals = computeTotals(selection);
  const { amountCents, recurring, cadenceLabel, cadenceNote } = billingDisplay(selection);
  const depositCents = totals.depositCents;
  const pumpCents = totals.pumpCents;

  function confirmOrder() {
    addItem(selection);
    router.push("/cart");
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-start">
      {/* Left — the water */}
      <div className="relative aspect-square overflow-hidden rounded-3xl shadow-xl md:sticky md:top-28">
        <Image
          src="/media/waterfam.jpg"
          alt="Leo delivering a 5-gallon jug of alkaline water"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45vw"
          priority
        />
      </div>

      {/* Right — everything the customer picks */}
      <div>
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
          Alkaline Water Delivery
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-brand-navy">Build Your Delivery</h1>
        <p className="mt-2 text-brand-text/70">Pick your jugs and how often — your price updates below.</p>

        <p className="mt-4 text-4xl font-extrabold text-brand-blue">
          {formatUsd(amountCents)}
          {cadenceLabel ? (
            <span className="text-lg font-semibold text-brand-text/60">{cadenceLabel}</span>
          ) : null}
        </p>
        {recurring && <p className="mt-1 text-sm text-brand-text/60">{cadenceNote}</p>}

        <div>
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
            </div>

            <div className="mt-6">
              <Field label="Delivery frequency">
                <div className="mt-2 space-y-2">
                  {FREQUENCIES.map((f) => {
                    const d = billingDisplay({ kind: "simple", jugCount: jugs, frequency: f, zip, firstTime });
                    return (
                      <button key={f} className={pill(frequency === f, "w-full px-4 py-3 text-sm")} aria-pressed={frequency === f} onClick={() => setFrequency(f)}>
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-left">
                            <span className="block font-bold">{FREQUENCY_NAMES[f]}</span>
                            <span className="block text-xs opacity-75">
                              {f === "One-Time" ? "One-time delivery" : `${f} delivery`}
                            </span>
                          </span>
                          <span className={frequency === f ? "opacity-90" : "text-brand-blue"}>
                            {formatUsd(d.amountCents)}
                            {d.cadenceLabel}
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
            </div>

            <div className="mt-6">
              <ServiceAreaCheck zip={zip} onZip={setZip} />
            </div>

            <Card className="mt-6">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
                  {recurring ? "Per month (every 4 weeks)" : "Total"}
                </span>
                <span className="text-xl font-extrabold text-brand-blue">{formatUsd(amountCents)}</span>
              </div>
              {firstTime && (
                <div className="mt-3 border-t border-black/5 pt-3">
                  <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-green">
                    First Pour — Starter Kit (added to your first order)
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-brand-text/70">
                    <div className="flex items-center justify-between">
                      <span>First Fill &amp; Delivery</span>
                      <span className="font-semibold text-brand-green">Included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Refundable jug deposit</span>
                      <span className="font-semibold">{formatUsd(depositCents)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rechargeable pump — yours to keep!</span>
                      <span className="font-semibold">{formatUsd(pumpCents)}</span>
                    </div>
                  </div>
                </div>
              )}
              <p className="mt-3 text-xs text-brand-text/60">
                {firstTime
                  ? `The ${formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} deposit is a one-time flat charge (any number of jugs) and is returned when your jugs come back in good condition. `
                  : "Returning customers exchange empty jugs on delivery — no new deposit. "}
                Delivery days are assigned by your ZIP route.
              </p>
              <Button variant="primary" className="mt-4 w-full" disabled={!ready} onClick={() => setConfirming(true)}>
                {ready ? "Add to cart →" : "Enter a serviced ZIP"}
              </Button>
            </Card>
        </div>
      </div>

      <WaterFamConfirm open={confirming} onCancel={() => setConfirming(false)} onConfirm={confirmOrder}>
        <ul className="space-y-1">
          <li className="font-bold text-brand-navy">Alkaline Water Delivery</li>
          <li>
            {jugs} × 5-gallon jug{jugs > 1 ? "s" : ""} · {frequency}
          </li>
          <li>{firstTime ? "First-time customer" : "Returning customer (jug exchange)"} · ZIP {zip}</li>
          <li className="pt-1 text-base font-extrabold text-brand-blue">
            {formatUsd(amountCents)}
            {cadenceLabel}{" "}
            {recurring ? (
              <span className="text-sm font-normal text-brand-text/60">(billed every 4 weeks)</span>
            ) : null}
          </li>
          {firstTime && (
            <li className="text-sm font-normal text-brand-text/70">
              + {formatUsd(depositCents)} refundable deposit &amp; {formatUsd(pumpCents)} rechargeable pump (one-time)
            </li>
          )}
        </ul>
      </WaterFamConfirm>
    </div>
  );
}
