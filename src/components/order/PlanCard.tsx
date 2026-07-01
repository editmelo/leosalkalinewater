"use client";
import Image from "next/image";
import { ADDON_JUG_CENTS, type Plan } from "@/lib/order/products";
import { formatUsd } from "@/lib/order/pricing";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  jugCount: number;
  onSelect?: () => void;
  href?: string;
  disabled?: boolean;
  disabledReason?: string;
}

export function PlanCard({ plan, jugCount, onSelect, href, disabled, disabledReason }: PlanCardProps) {
  const qty = Math.max(1, jugCount);
  const displayPrice = formatUsd(plan.priceCents + (qty - 1) * ADDON_JUG_CENTS);
  const isMonthly = plan.billing === "monthly";

  return (
    <Card className="flex flex-col">
      <div className="relative -mx-6 -mt-6 mb-5 aspect-[4/3] overflow-hidden rounded-t-2xl bg-brand-blue/5">
        <Image
          src={plan.image}
          alt={`${plan.name} — Leo's 5-gallon alkaline water`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="mb-1">
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
          {plan.tagline}
        </p>
        <h3 className="mt-1 text-xl font-extrabold text-brand-navy">{plan.name}</h3>
      </div>

      <div className="my-4 flex items-end gap-1">
        <span className="text-4xl font-extrabold text-brand-blue">{displayPrice}</span>
        <span className="mb-1 text-sm text-brand-text/60">{isMonthly ? "/mo" : ""}</span>
      </div>

      <p className="mb-1 text-xs text-brand-text/50">
        1 jug included · +{formatUsd(ADDON_JUG_CENTS)} per additional jug
      </p>

      <p className="mb-1 text-xs font-semibold text-brand-text/60">{plan.billingLabel}</p>

      <hr className="my-4 border-black/8" />

      <ul className="mb-6 flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {href ? (
        <Button href={href} variant="primary" className="w-full" disabled={disabled}>
          {disabled && disabledReason ? disabledReason : "Select"}
        </Button>
      ) : (
        <Button variant="primary" className="w-full" onClick={onSelect} disabled={disabled}>
          {disabled && disabledReason ? disabledReason : "Select"}
        </Button>
      )}
    </Card>
  );
}
