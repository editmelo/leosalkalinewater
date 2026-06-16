"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Frequency, CustomerType, OrderSelection } from "@/lib/order/types";
import { QUICK_QUANTITIES, FREQUENCY_LABELS } from "@/lib/order/products";
import { computeTotals, formatUsd } from "@/lib/order/pricing";
import { isInServiceArea } from "@/lib/service-area";
import { useCart } from "@/components/cart/CartProvider";
import { ServiceAreaCheck } from "./ServiceAreaCheck";
import { Button } from "@/components/ui/Button";

const FREQS: Frequency[] = ["weekly", "biweekly", "monthly", "one-time"];
const pillBase = "rounded-full px-4 py-2 text-sm font-semibold transition border";

export function OrderBuilder({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [jugCount, setJugCount] = useState(4);
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [customerType, setCustomerType] = useState<CustomerType>("residential");
  const [starterPackage, setStarter] = useState(false);
  const [zip, setZip] = useState("");

  const selection: OrderSelection = { jugCount, frequency, customerType, starterPackage, zip };
  const totals = useMemo(() => computeTotals(selection), [jugCount, starterPackage]);
  const ready = isInServiceArea(zip);

  function pill(active: boolean) {
    return `${pillBase} ${active ? "border-brand-blue bg-brand-blue text-white" : "border-black/10 bg-white text-brand-text hover:border-brand-aqua"}`;
  }
  function submit() {
    addItem(selection);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">How many 5-gal jugs?</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUANTITIES.map(q => <button key={q} className={pill(jugCount === q)} onClick={() => setJugCount(q)}>{q}</button>)}
          <input type="number" min={1} value={jugCount} onChange={e => setJugCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-24 rounded-full border border-black/10 px-4 py-2 text-sm" aria-label="Custom quantity" />
        </div>
      </div>
      <div>
        <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">How often?</p>
        <div className="flex flex-wrap gap-2">
          {FREQS.map(f => <button key={f} className={pill(frequency === f)} onClick={() => setFrequency(f)}>{FREQUENCY_LABELS[f]}</button>)}
        </div>
      </div>
      {!compact && (
        <div>
          <p className="mb-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">Delivery type</p>
          <div className="flex gap-2">
            {(["residential","business"] as CustomerType[]).map(t =>
              <button key={t} className={pill(customerType === t)} onClick={() => setCustomerType(t)}>{t[0].toUpperCase()+t.slice(1)}</button>)}
          </div>
        </div>
      )}
      {!compact && (
        <label className="flex items-center gap-3 rounded-xl bg-brand-aqua/10 p-4">
          <input type="checkbox" checked={starterPackage} onChange={e => setStarter(e.target.checked)} className="h-5 w-5 accent-brand-blue" />
          <span className="text-sm"><b>Add Starter Package</b> — hand dispenser + refundable $15 jug deposit.</span>
        </label>
      )}
      <ServiceAreaCheck zip={zip} onZip={setZip} />
      <div className="flex items-center justify-between rounded-xl bg-brand-bg p-4">
        <span className="font-[family-name:var(--font-heading)] font-bold text-brand-blue">{formatUsd(totals.subtotalCents)}{frequency !== "one-time" ? " / delivery" : ""}</span>
        <Button variant="primary" onClick={submit} disabled={!ready}>
          {ready ? "Add to cart →" : "Enter a serviced ZIP"}
        </Button>
      </div>
    </div>
  );
}
