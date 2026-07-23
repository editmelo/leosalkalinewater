"use client";
import { useState } from "react";
import { inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

// Captures out-of-area leads (name, email, phone) → /api/waitlist → Leo's Google Sheet.
export function WaitlistForm({ zip }: { zip: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, zip }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok && data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-3 text-sm font-semibold text-brand-green">
        🎉 You&apos;re on the list! We&apos;ll reach out the moment we deliver to {zip || "your area"}.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-2 text-left">
      <p className="text-sm font-semibold text-brand-navy">Want first dibs when we reach you?</p>
      <input
        className={inputClass}
        placeholder="Full name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="email"
        placeholder="you@email.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="tel"
        placeholder="Phone (optional)"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {status === "error" && <p className="text-xs text-red-600">Something went wrong — please try again.</p>}
      <Button type="submit" variant="primary" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Adding you…" : "Notify me"}
      </Button>
    </form>
  );
}
