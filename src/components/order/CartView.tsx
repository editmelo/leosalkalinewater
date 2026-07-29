"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { getDeliveryDay } from "@/lib/order/delivery-schedule";
import { OrderSummary } from "./OrderSummary";
import { CheckoutPlaceholder } from "./CheckoutPlaceholder";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function CartView() {
  const { items } = useCart();
  const [confirmation, setConfirmation] = useState<{ id: string; zip: string } | null>(null);

  if (confirmation) {
    const day = getDeliveryDay(confirmation.zip);
    return (
      <Card className="text-center">
        <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-brand-green">
          Order confirmed — welcome to the Water Fam! 💧
        </p>
        {day ? (
          <p className="mt-2 text-sm text-brand-text/80">
            Your water is delivered on <b>{day.emoji} {day.day}s</b> ({day.region}). Leave your empty jugs out and
            we&apos;ll swap them.
          </p>
        ) : (
          <p className="mt-2 text-sm text-brand-text/70">We&apos;ll be in touch to confirm your delivery day.</p>
        )}
        <p className="mt-1 text-xs text-brand-text/60">
          Confirmation: <span className="font-mono">{confirmation.id}</span>
        </p>
        {confirmation.id.startsWith("DEMO-") && (
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
      {items.length > 0 && <CheckoutPlaceholder onComplete={(id, zip) => setConfirmation({ id, zip })} />}
    </div>
  );
}
