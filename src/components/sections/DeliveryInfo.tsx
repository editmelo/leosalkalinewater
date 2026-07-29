import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function DeliveryInfo({ className = "" }: { className?: string }) {
  return (
    <Section className={className}>
      <Container className="max-w-3xl text-center">
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
          How Delivery Works
        </p>
        <p className="mt-4 text-lg leading-relaxed text-brand-text/85">
          Our Water delivery service is designed for your convenience. Choose the subscription that fits
          your flow — weekly or every other week. Your delivery day is based on your address, so
          you&apos;ll always know when to expect us. On delivery day, simply place your empty jug(s) by
          your door for exchange, then bring your fresh Water inside and stay intentionally hydrated.
        </p>
      </Container>
    </Section>
  );
}
