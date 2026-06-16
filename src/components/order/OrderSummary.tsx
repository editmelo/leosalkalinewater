"use client";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { FREQUENCY_LABELS } from "@/lib/order/products";
import { Card } from "@/components/ui/Card";

export function OrderSummary() {
  const { items, removeItem } = useCart();
  if (!items.length) return <p className="text-brand-text/70">Your cart is empty. Head to the Store to build an order.</p>;
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const t = computeTotals(it);
        return (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">{it.jugCount} × 5-Gallon Alkaline Water Jug</p>
                <p className="text-sm text-brand-text/70">{FREQUENCY_LABELS[it.frequency]} · {it.customerType} · ZIP {it.zip}{it.starterPackage ? " · + Starter Package" : ""}</p>
              </div>
              <button onClick={() => removeItem(i)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
            <p className="mt-2 font-bold">{formatUsd(t.subtotalCents)}{it.frequency !== "one-time" ? " / delivery" : ""}{t.refundableCents ? ` (incl. ${formatUsd(t.refundableCents)} refundable deposit)` : ""}</p>
          </Card>
        );
      })}
    </div>
  );
}
