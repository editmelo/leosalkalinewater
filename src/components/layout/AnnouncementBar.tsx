import { Droplet } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-green py-2 text-center font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-white">
      <Droplet className="inline-block h-3.5 w-3.5 align-middle" aria-hidden="true" /> Now serving the Indianapolis area · Join the Water Fam
    </div>
  );
}
