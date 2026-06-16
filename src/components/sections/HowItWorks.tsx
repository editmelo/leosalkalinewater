import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const STEPS = [
  { n: "1", t: "Pick your jugs", d: "2–10+ jugs at $15 each, delivered." },
  { n: "2", t: "Choose frequency", d: "Weekly, biweekly, monthly — or one-time." },
  { n: "3", t: "We deliver", d: "You hydrate. We handle the rest." },
];
export function HowItWorks() {
  return (
    <Section>
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">How delivery works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map(s => (
            <Card key={s.n} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue font-bold text-white">{s.n}</div>
              <h3 className="mt-4 font-bold text-brand-blue">{s.t}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{s.d}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
