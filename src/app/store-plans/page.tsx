// ARCHIVED — "Store 1" (fixed named plans). Not linked in nav and hidden from search.
// Kept so we can restore this model if Leo ever wants it. The live store is /store (Store 2).
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { OrderBuilder } from "@/components/order/OrderBuilder";
import { DeliveryInfo } from "@/components/sections/DeliveryInfo";

export const metadata = {
  title: "Store (Plans) — Leo's Alkaline Water",
  description: "Archived plan-based store layout.",
  robots: { index: false, follow: false },
};

export default function StorePlansPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero */}
        <Section className="bg-gradient-to-br from-brand-blue to-brand-green text-white">
          <Container className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl">Choose Your Water Plan</h1>
            <p className="mt-3 text-xl text-[#cdeefb]">
              Fresh alkaline water · pH 8.5–9.5 · Kangen Water™ · Refillable 5-gal jugs
            </p>
            <p className="mt-2 text-[#cdeefb]/80">
              First Pour $45 · Stay Balanced $30/mo · Fully Hydrated $55/mo · Top Off from $20
            </p>
          </Container>
        </Section>

        {/* Order builder */}
        <Section id="order">
          <Container>
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-brand-navy">Build Your Order</h2>
              <p className="mt-2 text-brand-text/70">
                Enter your Indianapolis-area ZIP, choose how many 5-gallon jugs you need per
                delivery, then select a plan. Subscriptions bill monthly and can be cancelled
                anytime. Delivered in refillable, sustainable jugs powered by Kangen Water™
                technology at pH 8.5–9.5.
              </p>
            </div>
            <OrderBuilder />
          </Container>
        </Section>
        <DeliveryInfo className="bg-[#eef7f1]" />
      </main>
      <Footer />
    </>
  );
}
