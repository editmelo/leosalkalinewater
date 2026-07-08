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
      <main className="py-12">
        <Section>
          <Container className="max-w-5xl">
            <SimpleOrder />
          </Container>
        </Section>
        <DeliveryInfo className="bg-[#eef7f1]" />
      </main>
      <Footer />
    </>
  );
}
