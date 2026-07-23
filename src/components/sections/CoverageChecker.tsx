"use client";
import { useState } from "react";
import { isInServiceArea } from "@/lib/service-area";
import { inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { WaitlistForm } from "@/components/order/WaitlistForm";

// Standalone "do we deliver to you?" checker — enter a ZIP, get an instant answer.
// No email capture, no backend.
export function CoverageChecker() {
  const [zip, setZip] = useState("");
  const checked = zip.trim().length >= 5;
  const ok = isInServiceArea(zip);

  return (
    <div className="mx-auto max-w-md">
      <label className="sr-only" htmlFor="coverage-zip">
        Enter your ZIP code
      </label>
      <input
        id="coverage-zip"
        className={`${inputClass} text-center`}
        inputMode="numeric"
        placeholder="Enter your ZIP code"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />

      {checked && ok && (
        <div className="mt-4 rounded-xl border border-brand-green/20 bg-brand-green/5 p-4">
          <p className="font-[family-name:var(--font-heading)] font-bold text-brand-green">
            🎉 Yes — we deliver to you!
          </p>
          <p className="mt-1 text-sm text-brand-text/75">
            You&apos;re in our zone. Come join the Water Fam and get fresh alkaline water at your door.
          </p>
          <Button href="/store" variant="primary" className="mt-4">
            Start your order
          </Button>
        </div>
      )}

      {checked && !ok && (
        <div className="mt-4 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4">
          <p className="font-[family-name:var(--font-heading)] font-bold text-brand-navy">
            We don&apos;t serve your area yet — check back soon!
          </p>
          <p className="mt-1 text-sm text-brand-text/70">
            We&apos;re growing fast across the Indianapolis area — leave your info and you&apos;ll be first to know when
            we reach you.
          </p>
          <WaitlistForm zip={zip} />
        </div>
      )}
    </div>
  );
}
