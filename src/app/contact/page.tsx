import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/brand";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact — Leo's Alkaline Water" };

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar /><Header />
      <main>
        <Section>
          <Container className="grid max-w-4xl gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-3xl font-extrabold text-brand-navy">Get in touch</h1>
              <p className="mt-2 text-brand-text/75">Questions about delivery, your subscription, or the Water Fam? We&apos;d love to hear from you.</p>
              <ul className="mt-6 space-y-2 text-brand-text/85">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" /> <a className="text-brand-blue hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-blue" aria-hidden="true" /> <a className="text-brand-blue hover:underline" href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-blue" aria-hidden="true" /> Serving the Indianapolis area</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href={CONTACT.social.instagram} className="text-brand-blue hover:underline">Instagram</a>
                <a href={CONTACT.social.facebook} className="text-brand-blue hover:underline">Facebook</a>
                <a href={CONTACT.social.linktree} className="text-brand-blue hover:underline">Linktree</a>
              </div>
            </div>
            <ContactForm />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
