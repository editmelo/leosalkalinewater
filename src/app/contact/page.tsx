import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CONTACT } from "@/lib/brand";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact — Leo's Alkaline Water" };

// Pre-fills the customer's email app with a draft to Leo.
const emailHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Water Fam Inquiry",
)}&body=${encodeURIComponent("Hi Leo,\n\n")}`;

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-aqua";

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Section>
          <Container className="max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold text-brand-navy sm:text-4xl">Get in Touch</h1>
            <p className="mx-auto mt-3 max-w-lg text-brand-text/75">
              Questions about delivery, your subscription, or joining the Water Fam? Reach out — Leo would love to hear
              from you.
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={emailHref} className={`${btnBase} bg-brand-blue text-white hover:bg-[#0c3f6c]`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Us
              </a>
              <a href={CONTACT.phoneHref} className={`${btnBase} bg-brand-aqua text-brand-blue hover:brightness-95`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {CONTACT.phone}
              </a>
            </div>

            {/* Details */}
            <ul className="mt-10 flex flex-col items-center gap-2 text-brand-text/85">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                <a className="text-brand-blue hover:underline" href={emailHref}>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                <a className="text-brand-blue hover:underline" href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                Serving the Indianapolis area
              </li>
            </ul>

            {/* Social */}
            <div className="mt-6 flex justify-center gap-5">
              <a href={CONTACT.social.instagram} className="text-brand-blue hover:underline">
                Instagram
              </a>
              <a href={CONTACT.social.facebook} className="text-brand-blue hover:underline">
                Facebook
              </a>
              <a href={CONTACT.social.linktree} className="text-brand-blue hover:underline">
                Linktree
              </a>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
