import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

// Mirrors what the Store actually sells: pick jugs + a frequency. "First Pour" is the
// starter kit automatically added to a first-time customer's first order.
const OFFERINGS = [
  {
    name: "First Pour",
    tagline: "Starter Kit · Add-on",
    price: "+$25",
    priceNote: "one-time — new customers",
    image: "/products/starter-pack.jpg",
    features: ["Refundable $15 jug deposit", "Rechargeable pump — yours to keep!", "Add it to any plan at checkout"],
  },
  {
    name: "Stay Balanced",
    tagline: "Bi-Weekly Delivery",
    price: "$30",
    priceNote: "per month · billed every 4 weeks",
    image: "/products/jug-biweekly.jpg",
    features: ["5-gallon alkaline water", "Delivered every 2 weeks", "Cancel anytime"],
  },
  {
    name: "Fully Hydrated",
    tagline: "Weekly Delivery",
    price: "$55",
    priceNote: "per month · billed every 4 weeks",
    image: "/products/jug-weekly.jpg",
    features: ["5-gallon alkaline water", "Delivered every week", "Cancel anytime"],
  },
  {
    name: "Top Off",
    tagline: "One-Time",
    price: "$20",
    priceNote: "single delivery",
    image: "/products/jug-payg.jpg",
    features: ["5-gallon alkaline water", "No commitment", "Order any time"],
  },
];

export function ShopPreview() {
  return (
    <Section className="bg-[#f2f7fa]">
      <Container>
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Choose Your Plan</h2>
        <p className="mt-3 text-center text-brand-text/70">
          Fresh pH 8.5–9.5 alkaline water delivered to your door across Indianapolis.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {OFFERINGS.map((o) => (
            <Card key={o.name} className="flex flex-col">
              <div className="relative -mx-6 -mt-6 mb-4 aspect-[4/3] overflow-hidden rounded-t-2xl">
                <Image
                  src={o.image}
                  alt={`${o.name} — Leo's alkaline water`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>

              <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wide text-brand-blue">
                {o.tagline}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-brand-navy">{o.name}</h3>

              <div className="my-3">
                <span className="text-3xl font-extrabold text-brand-blue">{o.price}</span>
                <p className="mt-1 text-xs text-brand-text/60">{o.priceNote}</p>
              </div>

              <hr className="mb-4 border-black/8" />

              <ul className="mb-6 flex-1 space-y-2">
                {o.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button href="/store" variant="primary" className="w-full">
                Select
              </Button>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-brand-text/60">
          Each delivery includes 1 jug; additional jugs are +$10 each. New to Leo&apos;s? Add the First Pour starter
          kit to any plan.
        </p>
      </Container>
    </Section>
  );
}
