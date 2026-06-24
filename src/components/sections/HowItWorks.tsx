import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const STEPS = [
  { n: "1", t: "Pick your plan", d: "Bi-Weekly, Weekly, Pay as You Go, or the Starter Pack." },
  { n: "2", t: "Add your jugs & ZIP", d: "Tell us how many 5-gallon jugs and confirm we serve your Indianapolis-area ZIP." },
  { n: "3", t: "We deliver", d: "You hydrate. We handle the rest." },
];
export function HowItWorks() {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">How Delivery Works</h2>
        <div className="relative mx-auto mt-8 aspect-[16/7] w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <Image src="/media/delivery.jpg" alt="Leo delivering a 5-gallon jug to a customer's doorstep" fill className="object-cover" sizes="(max-width: 896px) 100vw, 896px" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(s => (
            <Card key={s.n} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-bold text-white">{s.n}</div>
              <h3 className="mt-4 font-bold text-brand-blue">{s.t}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{s.d}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/store" variant="primary">Order Now</Button>
        </div>
      </Container>
    </Section>
  );
}
