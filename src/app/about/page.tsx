import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Certifications } from "@/components/sections/Certifications";
import { Mission } from "@/components/sections/Mission";
import { Faq } from "@/components/sections/Faq";
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
        <Mission />
        <Section>
          <Container className="max-w-3xl">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <div className="relative h-72 w-56 shrink-0 overflow-hidden rounded-2xl shadow-lg">
                <Image src="/leo.avif" alt="Leonardo Colon, founder of Leo's Alkaline Water" fill className="object-cover object-top" sizes="224px" />
              </div>
              <div className="space-y-5 text-lg text-brand-text/85">
                <h2 className="text-2xl font-extrabold text-brand-navy">Meet Leonardo, Your Water Man</h2>
                <p>I&apos;m Leonardo Colon—your friendly neighborhood Water Man. My mission is to make Water health as transparent as possible. My journey began when I experienced firsthand the incredible effects of this living Water — within minutes, it relieved a headache I had while on the go. That moment changed everything. I knew this Water needed to be shared.</p>
                <p>What began as simple deliveries to my G-Ma soon grew into a passion for serving the Indianapolis community and beyond.</p>
                <p>You won&apos;t find this Water on store shelves because it&apos;s alive, crafted fresh, and held to the highest gold-standard quality. It&apos;s made for those seeking true balance, wellness, and next-level hydration. Experience the difference — pure energy and revitalization, straight from living Water.</p>
              </div>
            </div>
          </Container>
        </Section>
        <Certifications />
        <Faq />
        <PartnerBlock />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
