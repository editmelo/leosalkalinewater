"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { isInServiceArea } from "@/lib/service-area";
import { Button } from "@/components/ui/Button";
import { inputClass } from "@/components/ui/Field";

// One-click starter buy from the home page.
// First Pour = 1 jug, One-Time delivery, first-time customer
//            = $20 water + $15 refundable deposit + $10 rechargeable pump = $45.
export function FirstPourQuickAdd() {
  const router = useRouter();
  const { addItem } = useCart();
  const [zip, setZip] = useState("");
  const ready = isInServiceArea(zip);
  const rejected = zip.trim().length >= 5 && !ready;

  function addToCart() {
    addItem({ kind: "simple", jugCount: 1, frequency: "One-Time", zip: zip.trim(), firstTime: true });
    router.push("/cart");
  }

  return (
    <div className="w-full space-y-2">
      <input
        className={`${inputClass} py-2 text-sm`}
        inputMode="numeric"
        placeholder="Your ZIP code"
        aria-label="Delivery ZIP code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <Button variant="primary" className="w-full" disabled={!ready} onClick={addToCart}>
        {ready ? "Add to cart →" : "Enter your ZIP"}
      </Button>
      {rejected && (
        <p role="alert" className="text-xs text-red-600">
          We don&apos;t deliver to that ZIP yet.
        </p>
      )}
    </div>
  );
}
