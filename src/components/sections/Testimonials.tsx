import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Star } from "lucide-react";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Leo%27s+Alkaline+Water+Reviews";

// Real Google reviews go here (name + text). Left empty so nothing is fabricated;
// the section shows the "read on Google" CTA until reviews are added.
const REVIEWS: { name: string; text: string; stars?: number }[] = [];

export function Testimonials() {
  return (
    <Section>
      <Container className="text-center">
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
          Water Fam Love
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-brand-navy">Loved by the Water Fam</h2>
        <div className="mt-3 flex items-center justify-center gap-1 text-brand-gold" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
          ))}
        </div>

        {REVIEWS.length > 0 && (
          <div className="mt-8 grid gap-6 text-left md:grid-cols-3">
            {REVIEWS.map((r) => (
              <Card key={r.name}>
                <div className="flex gap-1 text-brand-gold">
                  {Array.from({ length: r.stars ?? 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-3 text-brand-text/80">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-3 font-semibold text-brand-navy">— {r.name}</p>
              </Card>
            ))}
          </div>
        )}

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3 font-[family-name:var(--font-heading)] text-sm font-semibold text-white transition hover:bg-[#0c3f6c]"
        >
          Read our reviews on Google
        </a>
      </Container>
    </Section>
  );
}
