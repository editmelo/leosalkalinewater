import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const PLAN_SUMMARY = [
  { label: "Bi-Weekly", price: "$30/mo" },
  { label: "Weekly", price: "$55/mo" },
  { label: "Pay as You Go", price: "$20/jug" },
  { label: "Starter Pack", price: "$45" },
];

export function QuickOrder() {
  return (
    <Card className="w-full max-w-sm">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
        Choose your plan
      </p>
      <h3 className="mb-4 mt-1 font-extrabold text-brand-navy">Fresh Alkaline Water, Delivered</h3>
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
