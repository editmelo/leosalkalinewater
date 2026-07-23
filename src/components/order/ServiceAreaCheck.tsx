"use client";
import { useState } from "react";
import { isInServiceArea } from "@/lib/service-area";
import { Field, inputClass } from "@/components/ui/Field";
import { WaitlistForm } from "./WaitlistForm";

export function ServiceAreaCheck({ zip, onZip, onStatus }: {
  zip: string; onZip: (z: string) => void; onStatus?: (ok: boolean) => void;
}) {
  const [touched, setTouched] = useState(false);
  const ok = isInServiceArea(zip);
  const show = touched && zip.trim().length >= 5;
  return (
    <div>
      <Field label="Delivery ZIP code">
        <input
          className={inputClass} inputMode="numeric" placeholder="46204" value={zip}
          onChange={(e) => { onZip(e.target.value); setTouched(true); onStatus?.(isInServiceArea(e.target.value)); }}
        />
      </Field>
      {show && ok && (
        <div className="mt-3 rounded-xl bg-brand-green/5 p-3 text-sm">
          <p className="font-semibold text-brand-green">🎉 You&apos;re in our delivery zone — welcome to the Water Fam!</p>
        </div>
      )}
      {show && !ok && (
        <div className="mt-3 rounded-xl bg-brand-gold/10 p-3 text-sm">
          <p className="font-semibold text-brand-navy">We don&apos;t serve your area yet — check back soon!</p>
          <p className="text-brand-text/70">We&apos;re growing across the Indianapolis area — leave your info and we&apos;ll reach out when we get to you.</p>
          <WaitlistForm zip={zip} />
        </div>
      )}
    </div>
  );
}
