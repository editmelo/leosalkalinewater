import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const PLAN_SUMMARY = [
  { label: "First Pour", price: "$45" },
  { label: "Stay Balanced", price: "$30/mo" },
  { label: "Fully Hydrated", price: "$55/mo" },
  { label: "Top Off", price: "from $20" },
];

export function QuickOrder() {
  return (
    <Card className="w-full max-w-sm">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
        Choose Your Plan
      </p>
      <h3 className="mt-1 font-extrabold text-brand-navy">Local Alkaline Water Delivery</h3>
      <p className="mb-4 mt-1 text-sm text-brand-text/70">Starting at $20.</p>
      <ul className="mb-5 space-y-2">
        {PLAN_SUMMARY.map(({ label, price }) => (
          <li key={label} className="flex items-center justify-between text-sm">
            <span className="text-brand-text">{label}</span>
            <span className="font-semibold text-brand-blue">{price}</span>
          </li>
        ))}
      </ul>
      <Button href="/store" variant="primary" className="w-full">
        View plans &amp; order
      </Button>
    </Card>
  );
}
