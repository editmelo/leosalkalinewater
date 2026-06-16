import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { OrderBuilder } from "@/components/order/OrderBuilder";

export const metadata = { title: "Store — Leo's Alkaline Water", description: "Order 5-gallon alkaline water jugs for delivery across Indianapolis." };

export default function StorePage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section className="bg-gradient-to-br from-brand-blue to-brand-green text-white">
          <Container className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl">Build your water order</h1>
            <p className="tagline mt-3 text-2xl text-[#cdeefb]">Water for the People.</p>
          </Container>
        </Section>
        <Section>
          <Container className="grid gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
            <Card><OrderBuilder /></Card>
            <div className="space-y-4 text-brand-text/80">
              <h2 className="text-2xl font-extrabold text-brand-navy">5-Gallon Alkaline Water Jugs</h2>
              <p>Premium, structured alkaline water at <b>pH 8.5–9.5</b>, powered with Kangen Water™ technology. <b>$15 per jug, delivered.</b></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Subscribe weekly, biweekly, or monthly — or order one-time.</li>
                <li>Residential &amp; business delivery across the Indianapolis area.</li>
                <li>Add the optional Starter Package: hand dispenser + refundable $15 jug deposit.</li>
                <li>Delivered in refillable, sustainable 5-gallon jugs.</li>
              </ul>
              <p className="text-sm text-brand-text/60">Enter your ZIP in the order builder to confirm we serve your area.</p>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
