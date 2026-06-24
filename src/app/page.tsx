import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ShopPreview } from "@/components/sections/ShopPreview";
import { WaterFam } from "@/components/sections/WaterFam";
import { PartnerBlock } from "@/components/sections/PartnerBlock";
import { ServiceAreaBanner } from "@/components/sections/ServiceAreaBanner";
import { FounderTeaser } from "@/components/sections/FounderTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WaveDivider } from "@/components/motion/WaveDivider";
import { BRAND } from "@/lib/brand";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <WaveDivider fill="#eef7f1" />
        <Benefits />
        <HowItWorks />
        <WaveDivider fill="#f2f7fa" />
        <ShopPreview />
        <WaveDivider fill={BRAND.aqua} />
        <WaterFam />
        <WaveDivider fill={BRAND.bg} flip />
        <PartnerBlock />
        <FounderTeaser />
        <ServiceAreaBanner />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
