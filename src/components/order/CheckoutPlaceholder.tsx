"use client";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { NEW_CUSTOMER_DEPOSIT_CENTS } from "@/lib/order/products";
import { isSquareClientConfigured } from "@/lib/square/config";
import { SquarePaymentForm } from "./SquarePaymentForm";
import { Card } from "@/components/ui/Card";

export function CheckoutPlaceholder() {
  const { items, clear } = useCart();
  const [paidId, setPaidId] = useState<string | null>(null);

  const totalCents = useMemo(
    () => items.reduce((sum, it) => sum + computeTotals(it).subtotalCents, 0),
    [items],
  );

  if (paidId) {
    return (
      <Card className="text-center">
        <p className="font-[family-name:var(--font-heading)] font-bold text-brand-green">
          Payment received — welcome to the Water Fam! 💧
        </p>
        <p className="mt-1 text-sm text-brand-text/70">
          Confirmation: <span className="font-mono">{paidId ?? "—"}</span>. We&apos;ll be in touch about your delivery.
        </p>
      </Card>
    );
  }

  if (!items.length) return null;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">Total due today</span>
        <span className="text-xl font-extrabold text-brand-blue">{formatUsd(totalCents)}</span>
      </div>
      <p className="mb-5 text-xs text-brand-text/60">
        New customers: a one-time {formatUsd(NEW_CUSTOMER_DEPOSIT_CENTS)} refundable jug deposit is billed separately.
        Recurring plans set up automatic billing after checkout.
      </p>

      {isSquareClientConfigured() ? (
        <SquarePaymentForm amountCents={totalCents} onPaid={(id) => { clear(); setPaidId(id); }} />
      ) : (
        <div className="rounded-xl border-2 border-dashed border-brand-aqua/60 bg-brand-aqua/5 p-5 text-center">
          <p className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">
            Card payment — connecting to Square
          </p>
          <p className="mt-1 text-sm text-brand-text/70">
            The checkout is fully built and ready; it goes live the moment Leo&apos;s Square credentials are added.
          </p>
        </div>
      )}
    </Card>
  );
}
