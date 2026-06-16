export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wide text-brand-blue">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-base outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/30";
