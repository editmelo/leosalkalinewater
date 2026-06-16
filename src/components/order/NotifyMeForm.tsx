"use client";
import { useState } from "react";
import { inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function NotifyMeForm({ defaultZip = "" }: { defaultZip?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("/api/notify", { method: "POST", body: JSON.stringify({ email, zip: defaultZip }) });
      if (res.ok) setDone(true); else setErr("Please enter a valid email.");
    } catch {
      setErr("Something went wrong — please try again.");
    }
  }
  if (done) return <p className="text-sm font-semibold text-brand-green">You&apos;re on the list — we&apos;ll be in touch! 💧</p>;
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input className={inputClass} type="email" required placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
      <Button type="submit" variant="green">Notify me</Button>
      {err && <span role="alert" className="text-xs text-red-600">{err}</span>}
    </form>
  );
}
