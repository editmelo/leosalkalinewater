import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ShopPreview() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container className="max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-brand-navy">Fresh Alkaline Water, Delivered</h2>
        <p className="mx-auto mt-3 max-w-lg text-brand-text/70">
          Just <b>$15 per jug</b> — pick how many you need and how often. Fresh pH 8.5–9.5 alkaline water delivered
          across Indianapolis.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/store" variant="primary">
            Order Now
          </Button>
        </div>
      </Container>
    </Section>
  );
}
