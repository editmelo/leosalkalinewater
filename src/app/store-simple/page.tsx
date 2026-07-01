import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SimpleOrder } from "@/components/order/SimpleOrder";

export const metadata = {
  title: "Order — Leo's Alkaline Water",
  description: "Choose how many jugs you need and how often — fresh alkaline water delivered across Indianapolis.",
};

export default function StoreSimplePage() {
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
      </main>
      <Footer />
    </>
  );
}
