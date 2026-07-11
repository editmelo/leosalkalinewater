"use client";
import { Field, inputClass } from "@/components/ui/Field";
import type { CustomerDetails } from "@/lib/order/customer";

export function CustomerDetailsForm({
  value,
  onChange,
}: {
  value: CustomerDetails;
  onChange: (c: CustomerDetails) => void;
}) {
  function set<K extends keyof CustomerDetails>(key: K, v: CustomerDetails[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">Delivery details</p>
        <p className="text-xs text-brand-text/60">Where should we bring your water?</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="First name">
          <input
            className={inputClass}
            autoComplete="given-name"
            value={value.firstName}
            onChange={(e) => set("firstName", e.target.value)}
          />
        </Field>
        <Field label="Last name">
          <input
            className={inputClass}
            autoComplete="family-name"
            value={value.lastName}
            onChange={(e) => set("lastName", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Email">
          <input
            className={inputClass}
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            className={inputClass}
            type="tel"
            autoComplete="tel"
            placeholder="317-555-0123"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Street address">
        <input
          className={inputClass}
          autoComplete="address-line1"
          placeholder="123 N Meridian St"
          value={value.address1}
          onChange={(e) => set("address1", e.target.value)}
        />
      </Field>

      <Field label="Apt / Suite (optional)">
        <input
          className={inputClass}
          autoComplete="address-line2"
          value={value.address2}
          onChange={(e) => set("address2", e.target.value)}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="City">
          <input
            className={inputClass}
            autoComplete="address-level2"
            placeholder="Indianapolis"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </Field>
        <Field label="State">
          <input
            className={inputClass}
            autoComplete="address-level1"
            value={value.state}
            onChange={(e) => set("state", e.target.value)}
          />
        </Field>
        <Field label="ZIP">
          <input
            className={inputClass}
            inputMode="numeric"
            autoComplete="postal-code"
            value={value.zip}
            onChange={(e) => set("zip", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
