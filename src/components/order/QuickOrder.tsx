import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function QuickOrder() {
  return (
    <Card className="mx-auto w-full max-w-sm text-center">
      <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
        Indy&apos;s Alkaline Water Delivery
      </p>
      <p className="mt-3 text-4xl font-extrabold text-brand-navy">
        $15<span className="text-lg font-semibold text-brand-text/60"> / jug</span>
      </p>
      <p className="mb-5 mt-1 text-sm text-brand-text/70">Starting at $15. Pick your jugs &amp; how often.</p>
      <Button href="/store" variant="primary" className="w-full">
        Order Now
      </Button>
    </Card>
  );
}
