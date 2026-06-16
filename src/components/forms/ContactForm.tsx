"use client";
import { useState } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  function set(k: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) setDone(true); else setErr("Please complete all fields with a valid email.");
    } catch {
      setErr("Network error — please try again.");
    }
  }
  if (done) return <p role="status" className="rounded-xl bg-brand-green/10 p-6 font-semibold text-brand-green">Thanks for reaching out — we&apos;ll be in touch soon! <span aria-hidden="true">💧</span></p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Name"><input className={inputClass} required value={form.name} onChange={set("name")} /></Field>
      <Field label="Email"><input className={inputClass} type="email" required value={form.email} onChange={set("email")} /></Field>
      <Field label="Message"><textarea className={inputClass} rows={5} required value={form.message} onChange={set("message")} /></Field>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <Button type="submit" variant="primary">Send message</Button>
    </form>
  );
}
