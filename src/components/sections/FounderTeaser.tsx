import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FounderTeaser() {
  return (
    <Section className="bg-[#e9f3fc]">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full shadow-lg">
          <Image src="/leo.avif" alt="Leonardo Colon, founder of Leo's Alkaline Water" fill className="object-cover object-top" sizes="192px" />
        </div>
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Meet Leo</p>
          <h2 className="mt-1 text-2xl font-extrabold text-brand-navy">Founder &amp; Water Steward, est. 2019</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-text/80">For over a decade, Leo has dedicated himself to understanding water. His mission is simple — make water health clear and accessible, so others can feel the same life-changing difference.</p>
          <Button href="/about" variant="primary" className="mt-5">Read Leo&apos;s story</Button>
        </div>
      </Container>
    </Section>
  );
}
