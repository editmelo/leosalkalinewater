import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const PRODUCTS = [
  { t: "5-Gal Jug Subscription", p: "$15/jug · recurring", cta: "Subscribe" },
  { t: "One-Time Jugs", p: "$15/jug · no commitment", cta: "Order once" },
  { t: "Starter Package", p: "Dispenser + refundable deposit", cta: "Get started" },
];
export function ShopPreview() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Shop the Water Fam favorites</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map(p => (
            <Card key={p.t}>
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-brand-aqua/20 to-brand-blue/10 text-5xl">💧</div>
              <h3 className="font-bold text-brand-blue">{p.t}</h3>
              <p className="text-sm text-brand-text/70">{p.p}</p>
              <Button href="/store" variant="aqua" className="mt-4 w-full">{p.cta}</Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
