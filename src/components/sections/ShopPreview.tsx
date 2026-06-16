import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PlanCard } from "@/components/order/PlanCard";
import { PLANS } from "@/lib/order/products";

export function ShopPreview() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Choose your plan</h2>
        <p className="mt-3 text-center text-brand-text/70">
          Fresh pH 8.5–9.5 alkaline water delivered to your door across Indianapolis.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} jugCount={1} href="/store" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
