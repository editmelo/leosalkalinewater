import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Plus } from "lucide-react";

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What are the benefits of Leo's Alkaline Water?",
    a: (
      <>
        <p>
          Leo&apos;s Alkaline Water helps your body achieve deep, cellular hydration — supporting
          wellness from the inside out. The elevated hydrogen levels provide powerful antioxidants
          that neutralize free radicals, while the alkaline properties help flush toxins and acidic
          waste.
        </p>
        <p className="mt-3">Regular hydration with Leo&apos;s Alkaline Water may:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Support natural detoxification and digestive health</li>
          <li>Strengthen immunity and disease-fighting capabilities</li>
          <li>Boost energy, focus, and mental clarity</li>
          <li>Promote restful sleep and balanced recovery</li>
          <li>Enhance skin health and overall vitality</li>
        </ul>
        <p className="mt-3">
          It&apos;s more than hydration — it&apos;s intentional Water designed to help your body thrive.
        </p>
      </>
    ),
  },
  {
    q: "How is Leo's Alkaline Water different from regular tap water?",
    a: (
      <>
        <p>
          Unlike regular tap water, Leo&apos;s Alkaline Water is structured with a higher pH and
          enriched hydrogen content, helping the body naturally neutralize acidity and flush out
          toxins. It&apos;s also rich in active antioxidants that combat free radicals, supporting
          optimal hydration and overall well-being.
        </p>
        <p className="mt-3">
          While tap water is often treated and stagnant, Leo&apos;s Alkaline Water is alive, fresh,
          and full of energy — crafted to promote balance, clarity, and vitality with every sip.
        </p>
      </>
    ),
  },
  {
    q: "What is the recommended daily intake of Leo's Alkaline Water?",
    a: (
      <>
        <p>
          Just as the Earth is about two-thirds Water, so are we — a reminder of how vital proper
          hydration is to our health and balance.
        </p>
        <p className="mt-3">
          To find your ideal daily intake of Leo&apos;s Alkaline Water, follow this simple guide:
        </p>
        <ol className="mt-2 space-y-2">
          <li>
            <b>Know Your Weight:</b> Your Water needs depend on your body weight. Generally, the more
            you weigh, the more Water your body requires to stay hydrated and function optimally.
          </li>
          <li>
            <b>Multiply by ⅔ (or 67%):</b> Multiply your weight (in pounds) by ⅔ to estimate how many
            ounces of Water you should drink daily. Example: If you weigh 175 pounds × ⅔ = about 117
            ounces per day.
          </li>
          <li>
            <b>Adjust for Activity:</b> Add 12 ounces of Water for every 30 minutes of exercise or
            physical activity, since you lose fluids through sweat. Example: A 45-minute workout =
            about 18 extra ounces.
          </li>
        </ol>
        <p className="mt-3">
          Staying consistent with your Water intake helps your body maintain energy and focus
          throughout the day. It also supports natural detoxification, keeping you aligned with
          intentional hydration and overall balance.
        </p>
      </>
    ),
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
              <div className="mt-3 text-brand-text/75">{f.a}</div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
