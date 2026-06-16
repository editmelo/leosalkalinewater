"use client";
import { useState } from "react";
import { isInServiceArea } from "@/lib/service-area";
import { Field, inputClass } from "@/components/ui/Field";
import { NotifyMeForm } from "@/components/order/NotifyMeForm";

export function ServiceAreaCheck({ zip, onZip, onStatus }: {
  zip: string; onZip: (z: string) => void; onStatus: (ok: boolean) => void;
}) {
  const [touched, setTouched] = useState(false);
  const ok = isInServiceArea(zip);
  return (
    <div>
      <Field label="Delivery ZIP code">
        <input
          className={inputClass} inputMode="numeric" placeholder="46204" value={zip}
          onChange={(e) => { onZip(e.target.value); setTouched(true); onStatus(isInServiceArea(e.target.value)); }}
        />
      </Field>
      {touched && zip.length >= 5 && !ok && (
        <div className="mt-3 rounded-xl bg-brand-green/5 p-4 text-sm">
          <p className="font-semibold text-brand-green">We don&apos;t currently service your area yet.</p>
          <p className="mb-3 text-brand-text/70">Leave your email and we&apos;ll let you know the moment we reach you.</p>
          <NotifyMeForm defaultZip={zip} />
        </div>
      )}
    </div>
  );
}
