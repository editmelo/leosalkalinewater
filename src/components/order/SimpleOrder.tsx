"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS, SIMPLE_JUG_CENTS } from "@/lib/order/products";
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
  const [zip, setZip] = useState("");
  const ready = isInServiceArea(zip);
  const totalCents = jugs * SIMPLE_JUG_CENTS;

  function addToCart() {
    addItem({ kind: "simple", jugCount: jugs, frequency, zip });
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
        <p className="mt-2">
          <span className="text-2xl font-extrabold text-brand-blue">{formatUsd(SIMPLE_JUG_CENTS)}</span>
          <span className="text-sm text-brand-text/60"> / 5-gallon jug</span>
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
              <ServiceAreaCheck zip={zip} onZip={setZip} />
            </div>

            <Card className="mt-6">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
                  {frequency === "One-Time" ? "Total" : "Per delivery"}
                </span>
                <span className="text-xl font-extrabold text-brand-blue">{formatUsd(totalCents)}</span>
              </div>
              <p className="mt-2 text-xs text-brand-text/60">
                New customers: a one-time {formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} refundable jug deposit is billed
                separately. Delivery days are assigned by your ZIP route.
              </p>
              <Button variant="primary" className="mt-4 w-full" disabled={!ready} onClick={addToCart}>
                {ready ? "Add to cart →" : "Enter a serviced ZIP"}
              </Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
