import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { OrderBuilder } from "@/components/order/OrderBuilder";

export const metadata = {
  title: "Store — Leo's Alkaline Water",
  description:
    "Choose from 4 delivery plans for 5-gallon alkaline water jugs delivered across Indianapolis. pH 8.5–9.5, powered by Kangen Water™ technology.",
};

export default function StorePage() {
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
              Bi-Weekly $30/mo · Weekly $55/mo · Pay as You Go $20/jug · Starter Pack $45
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
      </main>
      <Footer />
    </>
  );
}
