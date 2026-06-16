"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";

export function CheckoutPlaceholder() {
  const { items, clear } = useCart();
  const [msg, setMsg] = useState("");
  async function checkout() {
    try {
      const res = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }) });
      const data = await res.json();
      if (data.ok) { setMsg("Order captured (demo). Square payment connects here once Leo's account is linked."); clear(); }
      else setMsg("Something went wrong — please try again.");
    } catch {
      setMsg("Something went wrong — please try again.");
    }
  }
  return (
    <div className="rounded-2xl border-2 border-dashed border-brand-aqua/60 bg-brand-aqua/5 p-6 text-center">
      <p className="mb-1 font-[family-name:var(--font-heading)] font-bold text-brand-blue">Payment — Square (coming soon)</p>
      <p className="mb-4 text-sm text-brand-text/70">This step is wired and ready; live Square checkout activates once account credentials are added.</p>
      <Button variant="primary" onClick={checkout} disabled={!items.length}>Place demo order</Button>
      {msg && <p role="status" className="mt-4 text-sm font-semibold text-brand-green">{msg}</p>}
    </div>
  );
}
