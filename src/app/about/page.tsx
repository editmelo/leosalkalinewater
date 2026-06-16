import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Certifications } from "@/components/sections/Certifications";
import { PartnerBlock } from "@/components/sections/PartnerBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = { title: "About — Leo's Alkaline Water", description: "Leo's story, our mission, and our certifications." };

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section className="bg-gradient-to-br from-brand-green to-brand-blue text-white">
          <Container className="max-w-3xl text-center">
            <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-[#9fe0c0]">Est. 2019</p>
            <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">About Leo&apos;s Alkaline Water</h1>
            <p className="tagline mt-3 text-2xl text-[#cdeefb]">We heal the Water, you heal yourself.</p>
          </Container>
        </Section>
        <Section>
          <Container className="max-w-3xl space-y-5 text-lg text-brand-text/85">
            <h2 className="text-2xl font-extrabold text-brand-navy">Leonardo — Founder &amp; Water Steward</h2>
            <p>For over a decade, I&apos;ve dedicated myself to researching and understanding water. My journey began when I first experienced the remarkable effects of &ldquo;living water&rdquo; — within just 10 minutes, a persistent headache disappeared.</p>
            <p>From that moment on, everything changed. Experiencing truly balanced, living water brought me greater energy, mental clarity, and vitality — it even enhanced my running performance. Once you discover true balance, everything else becomes easier.</p>
            <p>Now, my mission is simple: to make water health clear and accessible, so others can experience the same life-changing impact.</p>
          </Container>
        </Section>
        <Certifications />
        <PartnerBlock />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
