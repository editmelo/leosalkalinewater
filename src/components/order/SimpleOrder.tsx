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
import { NEW_CUSTOMER_DEPOSIT_CENTS, PUMP_CENTS, FREQUENCY_NAMES } from "@/lib/order/products";
import { Check } from "lucide-react";
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

            {/* First Pour — a real add-on you choose, not fine print */}
            <div className="mt-6">
              <div
                className={`rounded-xl border-2 p-4 transition ${
                  firstTime ? "border-brand-green bg-brand-green/5" : "border-black/10 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
                      First Pour — Starter Kit
                    </p>
                    <p className="mt-0.5 text-sm text-brand-text/70">New to Leo&apos;s? Everything you need to get started.</p>
                    <ul className="mt-2 space-y-1 text-sm text-brand-text/70">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                        Refundable {formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} jug deposit
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                        Rechargeable pump — yours to keep!
                      </li>
                    </ul>
                  </div>
                  <p className="shrink-0 text-xl font-extrabold text-brand-blue">
                    +{formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS + PUMP_CENTS)}
                  </p>
                </div>

                <Button
                  variant={firstTime ? "green" : "primary"}
                  className="mt-3 w-full"
                  onClick={() => setFirstTime(!firstTime)}
                >
                  {firstTime
                    ? "✓ Added to your order"
                    : `Add First Pour  +${formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS + PUMP_CENTS)}`}
                </Button>
                <p className="mt-2 text-xs text-brand-text/50">
                  Already have your jug &amp; pump? Leave this off — we&apos;ll just exchange your empties on delivery.
                </p>
              </div>
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
                <div className="mt-2 flex items-center justify-between border-t border-black/5 pt-2 text-sm text-brand-text/70">
                  <span>+ First Pour — Starter Kit (one-time)</span>
                  <span className="font-semibold">{formatUsd(depositCents + pumpCents)}</span>
                </div>
              )}
              <p className="mt-3 text-xs text-brand-text/60">
                {firstTime
                  ? `Includes a refundable ${formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} jug deposit — a one-time flat charge, returned when your jugs come back in good condition. `
                  : ""}
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
          <li>{FREQUENCY_NAMES[frequency]} · ZIP {zip}</li>
          <li className="pt-1 text-base font-extrabold text-brand-blue">
            {formatUsd(amountCents)}
            {cadenceLabel}{" "}
            {recurring ? (
              <span className="text-sm font-normal text-brand-text/60">(billed every 4 weeks)</span>
            ) : null}
          </li>
          {firstTime && (
            <li className="text-sm font-normal text-brand-text/70">
              + {formatUsd(depositCents + pumpCents)} First Pour Starter Kit (one-time)
            </li>
          )}
        </ul>
      </WaterFamConfirm>
    </div>
  );
}
