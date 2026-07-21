"use client";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, billingDisplay, formatUsd } from "@/lib/order/pricing";
import { buildOrderPayload } from "@/lib/order/payload";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BottleIcon } from "@/components/ui/BottleIcon";

export function OrderSummary() {
  const { items, removeItem } = useCart();
  if (!items.length)
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <BottleIcon className="h-14 w-14 text-brand-blue/40" />
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-brand-navy">
          Your jug is empty
        </p>
        <p className="text-sm text-brand-text/70">Head to the Store and let&apos;s fill it up.</p>
        <Button href="/store" variant="primary" className="mt-2">
          Keep your glass full
        </Button>
      </div>
    );
  return (
    <div className="space-y-4">
      {items.map((it, i) => {
        const payload = buildOrderPayload(it);
        const t = computeTotals(it);
        const d = billingDisplay(it);
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
                  {payload.recurring ? "Subscription · billed every 4 weeks · cancel anytime" : "One-time order"}
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
              {formatUsd(d.amountCents)}
              {d.recurring ? (
                <span className="text-sm font-normal text-brand-text/60"> every 4 weeks</span>
              ) : null}
            </p>
            {(t.depositCents > 0 || t.pumpCents > 0) && (
              <p className="text-sm text-brand-text/70">
                {[
                  t.depositCents > 0 ? `${formatUsd(t.depositCents)} refundable deposit` : null,
                  t.pumpCents > 0 ? `${formatUsd(t.pumpCents)} rechargeable pump` : null,
                ]
                  .filter(Boolean)
                  .map((s) => `+ ${s}`)
                  .join("  ")}{" "}
                <span className="text-brand-text/50">(one-time)</span>
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
