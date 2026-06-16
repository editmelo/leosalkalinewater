"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PlanId, OrderSelection, CustomerType } from "@/lib/order/types";
import { PLANS, JUG_QUANTITIES } from "@/lib/order/products";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { PlanCard } from "./PlanCard";
import { Field, inputClass } from "@/components/ui/Field";

export function OrderBuilder() {
  const router = useRouter();
  const { addItem } = useCart();
  const [jugCount, setJugCount] = useState(1);
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [zip, setZip] = useState("");
  const ready = isInServiceArea(zip);

  function handleSelect(planId: PlanId) {
    const sel: OrderSelection = { planId, jugCount, customerType, zip };
    addItem(sel);
    router.push("/cart");
  }

  const pillBase =
    "rounded-full px-4 py-2 text-sm font-semibold transition border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/50";
  function pill(active: boolean) {
    return `${pillBase} ${
      active
        ? "border-brand-blue bg-brand-blue text-white"
        : "border-black/10 bg-white text-brand-text hover:border-brand-aqua"
    }`;
  }

  return (
    <div className="space-y-8">
      {/* ZIP check at top */}
      <ServiceAreaCheck zip={zip} onZip={setZip} />

      {/* Jug quantity stepper */}
      <div>
        <Field label="5-gallon jugs per delivery">
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {JUG_QUANTITIES.map((q) => (
              <button key={q} className={pill(jugCount === q)} onClick={() => setJugCount(q)}>
                {q}
              </button>
            ))}
            <input
              type="number"
              min={1}
              value={jugCount}
              onChange={(e) => setJugCount(Math.max(1, Number(e.target.value) || 1))}
              className={`${inputClass} w-24`}
              aria-label="Custom jug quantity"
            />
          </div>
        </Field>
      </div>

      {/* Delivery type selector */}
      <div>
        <Field label="Delivery type">
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {(["residential", "business"] as CustomerType[]).map((type) => (
              <button
                key={type}
                className={pill(customerType === type)}
                onClick={() => setCustomerType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </Field>
      </div>

      {/* Plan cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const isSubscription = plan.billing === "monthly";
          return (
            <div key={plan.id} className="flex flex-col gap-2">
              <PlanCard
                plan={plan}
                jugCount={jugCount}
                onSelect={() => handleSelect(plan.id)}
                disabled={!ready}
                disabledReason="Enter a serviced ZIP"
              />
              {isSubscription && ready && (
                <p className="text-center text-xs text-brand-text/50">
                  Jugs per delivery: {jugCount}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
