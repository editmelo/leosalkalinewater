import { Droplet, FlaskConical, Recycle, MapPin, Star, BadgeCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustItem {
  icon: LucideIcon;
  label: string;
}

const ITEMS: TrustItem[] = [
  { icon: Droplet, label: "pH 8.5–9.5" },
  { icon: FlaskConical, label: "Kangen-powered" },
  { icon: Recycle, label: "Refillable 5-gal" },
  { icon: MapPin, label: "Indianapolis local" },
  { icon: Star, label: "Est. 2019" },
  { icon: BadgeCheck, label: "MBE Certified" },
];

export function TrustStrip() {
  return (
    <div className="bg-brand-navy py-8 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 text-center text-sm sm:grid-cols-3 md:grid-cols-6">
        {ITEMS.map(i => (
          <div key={i.label}>
            <i.icon className="mx-auto h-6 w-6 text-brand-aqua" aria-hidden />
            <div className="mt-1 opacity-90">{i.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
