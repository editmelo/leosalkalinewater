"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "./OrderSummary";
import { CheckoutPlaceholder } from "./CheckoutPlaceholder";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function CartView() {
  const { items } = useCart();
  const [confirmation, setConfirmation] = useState<string | null>(null);

  if (confirmation) {
    return (
      <Card className="text-center">
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-brand-green">
          Order confirmed — welcome to the Water Fam! 💧
        </p>
        <p className="mt-1 text-sm text-brand-text/70">
          Confirmation: <span className="font-mono">{confirmation}</span>. We&apos;ll be in touch to schedule your delivery day.
        </p>
        {confirmation.startsWith("DEMO-") && (
          <p className="mt-2 text-xs text-brand-text/50">
            (Demo order — no payment was processed. Live card checkout activates once Square is connected.)
          </p>
        )}
        <Button href="/store" variant="primary" className="mt-5">
          Back to the Store
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <OrderSummary />
      {items.length > 0 && <CheckoutPlaceholder onComplete={setConfirmation} />}
    </div>
  );
}
