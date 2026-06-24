import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

interface Cert {
  image: string;
  alt: string;
  title: string;
  body: string;
}

const CERTS: Cert[] = [
  {
    image: "/badges/mbe.avif",
    alt: "City of Indianapolis Certified — Office of Minority & Women Business Development",
    title: "Minority Business Enterprise",
    body: "Certified as a Minority Business Enterprise with the City of Indianapolis, we proudly contribute to economic inclusion and diversity within our region's business ecosystem.",
  },
  {
    image: "/badges/cbp.avif",
    alt: "Certified Business Professional badge",
    title: "Business Professional in Customer Service",
    body: "Certified as a Business Professional in Customer Service, we exemplify professionalism and compassion through every customer interaction — reinforcing our role as a trusted community partner in hydration and wellness.",
  },
  {
    image: "/badges/gold-standard.avif",
    alt: "Water Quality — Tested and Certified Gold Standard seal",
    title: "Enagic Gold Standard",
    body: "We uphold Enagic's Gold Standard by supporting premium alkaline water powered with trusted Kangen technology. With convenient delivery and independent solutions, we bring you hydration you can count on and opportunities to thrive.",
  },
];

export function Certifications() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Certified &amp; Trusted</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CERTS.map((c) => (
            <Card key={c.title} className="flex flex-col items-center text-center">
              <div className="relative h-28 w-28">
                <Image src={c.image} alt={c.alt} fill className="object-contain" sizes="112px" />
              </div>
              <h3 className="mt-4 font-bold text-brand-blue">{c.title}</h3>
              <p className="mt-2 text-sm text-brand-text/75">{c.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
