const ITEMS = [
  { icon: "💧", label: "pH 8.5–9.5" }, { icon: "🔬", label: "Kangen-powered" }, { icon: "♻️", label: "Refillable 5-gal" },
  { icon: "📍", label: "Indianapolis local" }, { icon: "⭐", label: "Est. 2019" }, { icon: "🏅", label: "MBE Certified" },
];
export function TrustStrip() {
  return (
    <div className="bg-brand-navy py-8 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 text-center text-sm sm:grid-cols-3 md:grid-cols-6">
        {ITEMS.map(i => <div key={i.label}><div className="text-2xl">{i.icon}</div><div className="mt-1 opacity-90">{i.label}</div></div>)}
      </div>
    </div>
  );
}
