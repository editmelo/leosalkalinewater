import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Bubbles } from "@/components/motion/Bubbles";

export function WaterFam() {
  return (
    <Section className="relative overflow-hidden bg-brand-navy text-white">
      <Bubbles />
      <Container className="relative text-center">
        <p className="tagline text-3xl text-[#cdeefb]">&ldquo;We heal the Water, you heal yourself.&rdquo;</p>
        <p className="mx-auto mt-4 max-w-xl text-white/80">More than a delivery service — a community built on better hydration. When you order from Leo&apos;s, you join the <b>Water Fam</b>: neighbors across Indianapolis choosing living, alkaline water every day.</p>
      </Container>
    </Section>
  );
}
