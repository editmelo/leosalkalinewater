import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SimpleOrder } from "@/components/order/SimpleOrder";
import { DeliveryInfo } from "@/components/sections/DeliveryInfo";

export const metadata = {
  title: "Store — Leo's Alkaline Water",
  description:
    "Choose how many 5-gallon jugs you need and how often — fresh alkaline water delivered across Indianapolis. pH 8.5–9.5, powered by Kangen Water™.",
};

export default function StorePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* Text-first ordering. A subtle, low-opacity video plays behind it for a hint of motion. */}
        <section className="relative overflow-hidden py-12">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.08] motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-brand-bg/70" aria-hidden />
          <Container className="relative">
            <SimpleOrder />
          </Container>
        </section>
        <DeliveryInfo className="bg-[#eef7f1]" />
      </main>
      <Footer />
    </>
  );
}
