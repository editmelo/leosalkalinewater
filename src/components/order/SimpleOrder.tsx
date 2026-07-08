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
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS } from "@/lib/order/products";
import type { SimpleFrequency } from "@/lib/order/types";

// Simple "build your delivery" model (no fixed packages): flat per-jug price.
const FREQUENCIES: SimpleFrequency[] = ["One-Time", "Weekly", "Biweekly", "Monthly"];

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
  const recurring = frequency !== "One-Time";
  const totals = computeTotals({ kind: "simple", jugCount: jugs, frequency, zip, firstTime });
  const totalCents = totals.subtotalCents;
  const depositCents = totals.depositCents;

  function confirmOrder() {
    addItem({ kind: "simple", jugCount: jugs, frequency, zip, firstTime });
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
          {formatUsd(totalCents)}
          {recurring ? <span className="text-lg font-semibold text-brand-text/60"> /mo</span> : null}
        </p>

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
                  {FREQUENCIES.map((f) => (
                    <button key={f} className={pill(frequency === f, "w-full py-3 text-sm")} aria-pressed={frequency === f} onClick={() => setFrequency(f)}>
                      {f === "One-Time" ? "One-Time (single delivery)" : `${f} Delivery`}
                    </button>
                  ))}
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
                  {recurring ? "Per month" : "Total"}
                </span>
                <span className="text-xl font-extrabold text-brand-blue">
                  {formatUsd(totalCents)}
                  {recurring ? "/mo" : ""}
                </span>
              </div>
              {depositCents > 0 && (
                <div className="mt-2 flex items-center justify-between text-sm text-brand-text/70">
                  <span>+ Refundable jug deposit (one-time)</span>
                  <span className="font-semibold">{formatUsd(depositCents)}</span>
                </div>
              )}
              <p className="mt-2 text-xs text-brand-text/60">
                {depositCents > 0
                  ? `First-time customers pay a one-time ${formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)}/jug refundable deposit, returned when jugs come back in good condition. `
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
            {formatUsd(totalCents)}
            {recurring ? "/mo" : ""}
          </li>
          {depositCents > 0 && (
            <li className="text-sm font-normal text-brand-text/70">
              + {formatUsd(depositCents)} refundable jug deposit (one-time)
            </li>
          )}
        </ul>
      </WaterFamConfirm>
    </div>
  );
}
