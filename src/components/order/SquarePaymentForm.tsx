"use client";
import { useEffect, useRef, useState } from "react";
import {
  SQUARE_APPLICATION_ID,
  SQUARE_LOCATION_ID,
  SQUARE_WEB_SDK_URL,
  isSquareClientConfigured,
} from "@/lib/square/config";
import { formatUsd } from "@/lib/order/pricing";
import { Button } from "@/components/ui/Button";
import LoadingBottle from "@/components/ui/loading-bottle";

// Minimal typing for the Square Web Payments SDK global (loaded via <script>).
type SqTokenResult = { status: string; token?: string; errors?: { message: string }[] };
type SqCard = {
  attach: (el: HTMLElement | null) => Promise<void>;
  tokenize: () => Promise<SqTokenResult>;
  destroy?: () => void;
};
type SqPayments = { card: () => Promise<SqCard> };
type SqGlobal = { payments: (appId: string, locationId: string) => SqPayments };
declare global {
  interface Window {
    Square?: SqGlobal;
  }
}

function loadSquareSdk(): Promise<void> {
  if (window.Square) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SQUARE_WEB_SDK_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load the secure payment form."));
    document.head.appendChild(script);
  });
}

export function SquarePaymentForm({
  amountCents,
  onPaid,
}: {
  amountCents: number;
  onPaid: (paymentId: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<SqCard | null>(null);
  const [ready, setReady] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSquareClientConfigured()) return;
    let cancelled = false;
    let card: SqCard | null = null;
    (async () => {
      await loadSquareSdk();
      if (cancelled || !window.Square) return;
      const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);
      card = await payments.card();
      await card.attach(containerRef.current);
      cardRef.current = card;
      if (!cancelled) setReady(true);
    })().catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load the payment form."));
    return () => {
      cancelled = true;
      card?.destroy?.();
    };
  }, []);

  async function handlePay() {
    if (!cardRef.current) return;
    setError("");
    setProcessing(true);
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK" || !result.token) {
        throw new Error(result.errors?.[0]?.message ?? "Your card wasn't accepted. Please check the details.");
      }
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId: result.token, amountCents }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Payment failed. Please try again.");
      onPaid(data.paymentId ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  if (!isSquareClientConfigured()) {
    return <p className="text-sm text-brand-text/70">Card payments are being connected — check back soon.</p>;
  }

  // NOTE: the card container must stay mounted at all times. Square attaches an iframe to
  // it, so unmounting it (e.g. while processing) destroys the card form and the customer
  // can't correct their details after a decline.
  return (
    <div className="space-y-4">
      <div ref={containerRef} className="min-h-[90px]" />

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <p className="mt-0.5 text-xs text-red-600">
            Check your card details above and try again, or use a different card.
          </p>
        </div>
      )}

      {processing ? (
        <div className="py-2">
          <LoadingBottle label="Processing your payment…" />
        </div>
      ) : (
        <Button onClick={handlePay} variant="primary" className="w-full" disabled={!ready}>
          {ready ? `Pay ${formatUsd(amountCents)}` : "Loading secure card form…"}
        </Button>
      )}

      <p className="text-center text-xs text-brand-text/50">
        Secured by Square. Your card details never touch our servers.
      </p>
    </div>
  );
}
