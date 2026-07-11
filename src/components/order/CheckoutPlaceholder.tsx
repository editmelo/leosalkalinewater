"use client";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS } from "@/lib/order/products";
import { buildOrderPayload } from "@/lib/order/payload";
import { EMPTY_CUSTOMER, isCustomerComplete, type CustomerDetails } from "@/lib/order/customer";
import { isSquareClientConfigured, IS_SQUARE_SANDBOX } from "@/lib/square/config";
import { SquarePaymentForm } from "./SquarePaymentForm";
import { CustomerDetailsForm } from "./CustomerDetailsForm";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function CheckoutPlaceholder({ onComplete }: { onComplete: (confirmationId: string) => void }) {
  const { items, clear } = useCart();

  // Pre-fill the ZIP they already gave us in the store.
  const [customer, setCustomer] = useState<CustomerDetails>({
    ...EMPTY_CUSTOMER,
    zip: items[0]?.zip ?? "",
  });

  const totalCents = useMemo(
    () =>
      items.reduce((sum, it) => {
        const t = computeTotals(it);
        return sum + t.subtotalCents + t.depositCents + t.pumpCents;
      }, 0),
    [items],
  );

  // A human-readable summary that rides along to Square (shows on the payment in Leo's dashboard).
  const note = useMemo(
    () =>
      items
        .map((it) => {
          const p = buildOrderPayload(it);
          return `${it.jugCount} jug(s) · ${p.planName} · ${p.deliveryFrequency}`;
        })
        .join(" | ")
        .slice(0, 480),
    [items],
  );

  const detailsOk = isCustomerComplete(customer);

  function placeDemoOrder() {
    const id = "DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
    onComplete(id);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CustomerDetailsForm value={customer} onChange={setCustomer} />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">Total due today</span>
          <span className="text-xl font-extrabold text-brand-blue">{formatUsd(totalCents)}</span>
        </div>
        <p className="mb-5 text-xs text-brand-text/60">
          First-time orders include a one-time refundable {formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} jug deposit and a
          rechargeable pump. Subscriptions bill automatically every 4 weeks.
        </p>

        {isSquareClientConfigured() && IS_SQUARE_SANDBOX && (
          <p className="mb-4 rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-3 py-2 text-center text-xs font-semibold text-brand-navy">
            🧪 Test mode — Square Sandbox. Use a test card; no real money is charged.
          </p>
        )}

        {!detailsOk && (
          <p className="mb-4 rounded-lg bg-brand-aqua/10 px-3 py-2 text-center text-xs font-semibold text-brand-blue">
            Fill in your delivery details above to continue.
          </p>
        )}

        {isSquareClientConfigured() ? (
          <SquarePaymentForm
            amountCents={totalCents}
            customer={customer}
            note={note}
            disabled={!detailsOk}
            onPaid={(id) => {
              clear();
              onComplete(id ?? "PAID");
            }}
          />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-brand-aqua/60 bg-brand-aqua/5 p-5 text-center">
            <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">Demo checkout</p>
            <p className="mt-1 mb-4 text-sm text-brand-text/70">
              Square isn&apos;t connected yet — use this to walk the full order flow. No card is charged.
            </p>
            <Button variant="primary" className="w-full" onClick={placeDemoOrder} disabled={!detailsOk}>
              Place order (demo)
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
