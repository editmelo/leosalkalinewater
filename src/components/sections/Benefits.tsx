import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const BENEFITS = [
  { icon: "💧", title: "Deep Cellular Hydration", body: "Structured water for better absorption and real results." },
  { icon: "⚖️", title: "Alkaline pH 8.5–9.5", body: "Helps neutralize body acidity and restore balance." },
  { icon: "🛡️", title: "Immune Health", body: "Antioxidant-rich to support cellular harmony, resilience, and recovery." },
  { icon: "♻️", title: "Sustainability", body: "Delivered in refillable 5-gallon jugs and system solutions available." },
  { icon: "🤝", title: "Local & Community Support", body: "Proudly rooted in Indianapolis, promoting healthy water access for all." },
];
export function Benefits() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="text-center">
        <h2 className="tagline text-3xl text-brand-green">Choose us for your…</h2>
        <p className="mx-auto mt-2 max-w-md text-brand-text/70">Five reasons the Water Fam keeps coming back.</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map(b => (
            <div key={b.title}>
              <div className="text-3xl law-drop" aria-hidden="true">{b.icon}</div>
              <h3 className="mt-3 text-base font-bold text-brand-navy">{b.title}</h3>
              <p className="mt-1 text-sm text-brand-text/70">{b.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
