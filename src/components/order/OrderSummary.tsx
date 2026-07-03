"use client";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { buildOrderPayload } from "@/lib/order/payload";
import { Card } from "@/components/ui/Card";

export function OrderSummary() {
  const { items, removeItem } = useCart();
  if (!items.length)
    return <p className="text-brand-text/70">Your cart is empty. Head to the Store to build an order.</p>;
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const payload = buildOrderPayload(it);
        const t = computeTotals(it);
        return (
          <Card key={i}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">
                  {payload.planName}
                </p>
                <p className="text-sm text-brand-text/70">
                  {it.jugCount} × 5-Gallon Jug
                  {" · "}
                  {payload.deliveryFrequency}
                  {payload.customerType
                    ? ` · ${payload.customerType.charAt(0).toUpperCase()}${payload.customerType.slice(1)}`
                    : ""}
                  {" · ZIP "}
                  {it.zip}
                </p>
                <p className="mt-1 text-xs text-brand-text/50">
                  {payload.recurring ? "Monthly subscription · cancel anytime" : "One-time order"}
                </p>
              </div>
              <button
                onClick={() => removeItem(i)}
                aria-label={`Remove ${payload.planName} from cart`}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <p className="mt-2 font-bold">
              {formatUsd(t.subtotalCents)}
              {payload.recurring ? "/mo" : ""}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
