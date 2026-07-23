import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section>
          <Container className="max-w-3xl">
            <h1 className="text-3xl font-extrabold text-brand-navy">{title}</h1>
            <div className="mt-8 max-w-none space-y-4 text-brand-text/85 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-navy">{children}</div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
