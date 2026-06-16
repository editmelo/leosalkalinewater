import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Award, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Cert {
  icon: LucideIcon;
  title: string;
  body: string;
}

const CERTS: Cert[] = [
  { icon: Award, title: "Minority Business Enterprise", body: "Certified as a Minority Business Enterprise with the City of Indianapolis (Office of Minority & Women Business Development), proudly contributing to economic inclusion and diversity in our region." },
  { icon: ShieldCheck, title: "Water Quality Association — Gold Standard", body: "We uphold Enagic's Gold Standard, supporting premium alkaline water powered with trusted Kangen Water™ technology. Convenient delivery and independent solutions — hydration you can count on." },
];

export function Certifications() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Certified &amp; trusted</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {CERTS.map(c => (
            <Card key={c.title} className="flex gap-4">
              <c.icon className="h-10 w-10 shrink-0 text-brand-gold" aria-hidden />
              <div><h3 className="font-bold text-brand-blue">{c.title}</h3><p className="mt-1 text-sm text-brand-text/75">{c.body}</p></div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-brand-text/50">Replace badge emoji with official MBE &amp; WQA logo files once provided.</p>
      </Container>
    </Section>
  );
}
