"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

// Confirmation pop-up shown before an order is added to the cart — the "join the Water Fam" moment.
export function WaterFamConfirm({
  open,
  onConfirm,
  onCancel,
  children,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={onCancel} aria-hidden="true" />
      <div
        ref={cardRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="waterfam-confirm-title"
        className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl outline-none"
      >
        <div
          className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-aqua/15 text-3xl"
          aria-hidden="true"
        >
          💧
        </div>
        <h2
          id="waterfam-confirm-title"
          className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-brand-navy"
        >
          Ready to join the Water Fam?
        </h2>
        <p className="mt-2 text-sm text-brand-text/70">Here&apos;s what you&apos;re signing up for:</p>

        <div className="mt-4 rounded-2xl bg-[#eef7f1] p-4 text-left text-sm text-brand-text/85">{children}</div>

        <div className="mt-6 flex flex-col gap-2">
          <Button variant="primary" className="w-full" onClick={onConfirm}>
            Yes — I&apos;m in! 💧
          </Button>
          <button
            onClick={onCancel}
            className="font-[family-name:var(--font-heading)] text-sm font-semibold text-brand-text/60 hover:text-brand-text"
          >
            Not yet — keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}
