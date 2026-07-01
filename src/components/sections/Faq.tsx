import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What are the benefits of Leo's Alkaline Water?",
    a: "Leo's Alkaline Water facilitates deep cellular hydration while offering elevated hydrogen levels for antioxidant support and alkaline properties for toxin elimination. Reported benefits include supporting natural detoxification and digestive health, strengthening immunity, boosting energy and mental clarity, promoting restful sleep, and enhancing skin health and vitality.",
  },
  {
    q: "How is it different from regular tap water?",
    a: "It features a higher pH with enriched hydrogen content to help neutralize body acidity and flush toxins, plus active antioxidants that combat free radicals. Ours is alive, fresh, and full of energy — crafted to promote balance, clarity, and vitality — compared to tap water, which is treated and stagnant.",
  },
  {
    q: "How much should I drink each day?",
    a: "A good rule of thumb: multiply your body weight in pounds by ⅔ to find your daily ounces. For example, 175 pounds × ⅔ ≈ 117 ounces per day. Then add about 12 ounces for every 30 minutes of exercise.",
  },
];

export function Faq() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="max-w-3xl">
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-black/5 bg-white p-5 shadow-[0_6px_24px_rgba(15,76,129,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-heading)] font-bold text-brand-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-blue transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-brand-text/75">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
