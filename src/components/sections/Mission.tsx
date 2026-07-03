import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function Mission({ className = "" }: { className?: string }) {
  return (
    <Section className={className}>
      <Container className="max-w-3xl text-center">
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
          Our Mission
        </p>
        <p className="mt-4 text-xl leading-relaxed text-brand-text/85 sm:text-2xl">
          Welcome to Leo&apos;s Alkaline Water — your trusted source for locally delivered, refreshing, and
          nourishing alkaline Water. Our mission is simple: to make intentional hydration accessible and
          effortless for every home and business we serve. With flexible delivery options and friendly,
          community-driven service, we bring clean, revitalizing Water right to your door — so you can stay
          balanced, energized, and connected through every sip.
        </p>
      </Container>
    </Section>
  );
}
