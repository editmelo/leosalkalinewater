import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FounderTeaser() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-aqua/20 to-brand-blue/10 text-5xl" aria-hidden="true">💧</div>
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Meet Leo</p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-navy">Founder &amp; Water Steward, est. 2019</h2>
          <p className="mt-3 max-w-xl text-brand-text/80">For over a decade, Leo has dedicated himself to understanding water. His mission is simple — make water health clear and accessible, so others can feel the same life-changing difference.</p>
          <Button href="/about" variant="primary" className="mt-5">Read Leo&apos;s story</Button>
        </div>
      </Container>
    </Section>
  );
}
