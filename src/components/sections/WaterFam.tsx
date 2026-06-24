import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Bubbles } from "@/components/motion/Bubbles";

export function WaterFam() {
  return (
    <Section className="relative overflow-hidden bg-brand-aqua text-brand-navy">
      <Bubbles />
      <Container className="relative grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          <Image src="/media/waterfam.jpg" alt="Leo carrying a 5-gallon jug of alkaline water" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="sr-only">The Water Fam</h2>
          <p className="tagline text-3xl text-brand-blue">&ldquo;We heal the Water, you heal yourself.&rdquo;</p>
          <p className="mx-auto mt-4 max-w-xl text-brand-navy/80 md:mx-0">More than a delivery service — a community built on better hydration. When you order from Leo&apos;s, you join the <b>Water Fam</b>: neighbors across Indianapolis choosing living, alkaline water every day.</p>
        </div>
      </Container>
    </Section>
  );
}
