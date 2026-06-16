import { OrderBuilder } from "./OrderBuilder";
import { Card } from "@/components/ui/Card";

export function QuickOrder() {
  return (
    <Card className="w-full max-w-sm">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">Quick Order</p>
      <h3 className="mb-4 mt-1 font-extrabold text-brand-navy">Start in seconds</h3>
      <OrderBuilder compact />
    </Card>
  );
}
