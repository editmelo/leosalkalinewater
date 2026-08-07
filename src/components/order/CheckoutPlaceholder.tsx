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

export function CheckoutPlaceholder({ onComplete }: { onComplete: (confirmationId: string, zip: string) => void }) {
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

  // Recurring (Weekly/Bi-weekly) orders auto-renew every 4 weeks. Track the renewing amount
  // and require explicit authorization before charging — the disclosure + consent that
  // auto-renewal (negative-option) billing legally needs.
  const recurringCents = useMemo(
    () =>
      items.reduce((sum, it) => {
        const d = billingDisplay(it);
        return sum + (d.recurring ? d.amountCents : 0);
      }, 0),
    [items],
  );
  const hasCycle = recurringCents > 0;
  const [consent, setConsent] = useState(false);
  const canPay = isCustomerComplete(customer) && (!hasCycle || consent);

  // A human-readable summary that rides along to Square (shows on the payment in Leo's dashboard).
  // One item per line; the delivery block is prepended server-side in the checkout route.
  const note = useMemo(() => {
    const lines = items.map((it) => {
      const p = buildOrderPayload(it);
      const d = billingDisplay(it);
      return `${it.jugCount} jug(s) · ${p.planName} · ${p.deliveryFrequency}${
        d.recurring ? " (recurring — renews every 4 weeks)" : ""
      }`;
    });
    if (customer.directions.trim()) lines.push(`Directions: ${customer.directions.trim()}`);
    return lines.join("\n");
  }, [items, customer.directions]);

  const detailsOk = isCustomerComplete(customer);

  function placeDemoOrder() {
    const id = "DEMO-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const zip = customer.zip;
    clear();
    onComplete(id, zip);
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

        {hasCycle && (
          <p className="mb-4 rounded-lg border border-brand-blue/20 bg-brand-blue/5 px-3 py-2 text-xs font-semibold text-brand-blue">
            🔁 This is a recurring order. You&apos;ll be charged {formatUsd(totalCents)} today, then{" "}
            {formatUsd(recurringCents)} <b>automatically every 4 weeks</b> until you contact us to change or cancel.
          </p>
        )}
        <p className="mb-5 text-xs text-brand-text/60">
          Your total due today includes any one-time starter items you selected. Delivery days are assigned by your ZIP
          route.
        </p>

        {hasCycle && (
          <label className="mb-4 flex items-start gap-2 rounded-lg bg-brand-bg px-3 py-2 text-xs text-brand-text/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand-blue"
            />
            <span>
              I authorize Leo&apos;s Alkaline Water to charge my card {formatUsd(recurringCents)} every 4 weeks for my
              recurring delivery until I cancel by contacting them. I&apos;ve read the{" "}
              <a href="/terms" className="text-brand-blue underline" target="_blank" rel="noreferrer">
                Terms
              </a>
              .
            </span>
          </label>
        )}

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

        {detailsOk && hasCycle && !consent && (
          <p className="mb-4 rounded-lg bg-brand-aqua/10 px-3 py-2 text-center text-xs font-semibold text-brand-blue">
            Please authorize the recurring charge above to continue.
          </p>
        )}

        {isSquareClientConfigured() ? (
          <SquarePaymentForm
            amountCents={totalCents}
            customer={customer}
            note={note}
            disabled={!canPay}
            onPaid={(id) => {
              const zip = customer.zip;
              clear();
              onComplete(id ?? "PAID", zip);
            }}
          />
        ) : (
          <div className="rounded-xl border-2 border-dashed border-brand-aqua/60 bg-brand-aqua/5 p-5 text-center">
            <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">Demo checkout</p>
            <p className="mt-1 mb-4 text-sm text-brand-text/70">
              Square isn&apos;t connected yet — use this to walk the full order flow. No card is charged.
            </p>
            <Button variant="primary" className="w-full" onClick={placeDemoOrder} disabled={!canPay}>
              Place order (demo)
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
