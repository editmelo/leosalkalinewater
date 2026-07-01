import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Atom, ShieldCheck, Truck, HeartPulse, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  { icon: Atom, title: "Restructured Hydration", body: "Ionized with leading international technology." },
  { icon: ShieldCheck, title: "Free of All Contaminants", body: "Tested with zero tolerance for heavy metals, plastics, and carcinogens." },
  { icon: Truck, title: "Convenience", body: "Fresh water delivered to your home or business, right on your schedule." },
  { icon: HeartPulse, title: "Daily Wellness", body: "Antioxidant-rich hydration to complement your daily wellness routine and lifestyle." },
  { icon: HeartHandshake, title: "Local & Made with Love", body: "We steward this water, you steward your wellbeing." },
];

export function Benefits() {
  return (
    <Section className="bg-[#eef7f1] pt-8 sm:pt-12">
      <Container className="text-center">
        <h2 className="tagline text-3xl text-brand-green">Choose Us for Your…</h2>
        <p className="mx-auto mt-2 max-w-md text-brand-text/70">Five reasons the Water Fam keeps coming back.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map(b => (
            <div key={b.title}>
              <div className="law-drop flex justify-center">
                <b.icon className="h-8 w-8 text-brand-green" aria-hidden="true" />
              </div>
              <h3 className="mt-3 text-base font-bold text-brand-navy">{b.title}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
