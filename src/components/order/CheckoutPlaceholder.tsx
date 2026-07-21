"use client";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, billingDisplay, formatUsd } from "@/lib/order/pricing";
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

  // Recurring (subscription) amount that will re-bill every 4 weeks.
  const recurringCents = useMemo(
    () =>
      items.reduce((sum, it) => {
        const d = billingDisplay(it);
        return sum + (d.recurring ? d.amountCents : 0);
      }, 0),
    [items],
  );
  const hasRecurring = recurringCents > 0;

  // A human-readable summary that rides along to Square (shows on the payment in Leo's dashboard).
  const note = useMemo(() => {
    const lines = items.map((it) => {
      const p = buildOrderPayload(it);
      const d = billingDisplay(it);
      return `${it.jugCount} jug(s) · ${p.planName} · ${p.deliveryFrequency}${
        d.recurring ? " (subscription — every 4 weeks)" : ""
      }`;
    });
    const dir = customer.directions.trim() ? ` | Directions: ${customer.directions.trim()}` : "";
    return (lines.join(" | ") + dir).slice(0, 480);
  }, [items, customer.directions]);

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

        {hasRecurring && (
          <p className="mb-4 rounded-lg border border-brand-blue/20 bg-brand-blue/5 px-3 py-2 text-xs font-semibold text-brand-blue">
            🔁 This is a recurring subscription. You&apos;ll be charged {formatUsd(totalCents)} today, then{" "}
            {formatUsd(recurringCents)} automatically every 4 weeks. Cancel anytime.
          </p>
        )}
        <p className="mb-5 text-xs text-brand-text/60">
          Your total due today includes any one-time starter items you selected. Delivery days are assigned by your ZIP
          route.
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
