import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CoverageChecker } from "./CoverageChecker";

export function ServiceAreaBanner() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold text-brand-green">Do We Deliver to You?</h2>
        <p className="mt-2 text-brand-text/70">
          We currently serve the Indianapolis area. Pop in your ZIP code to see if you&apos;re in our delivery zone.
        </p>
        <div className="mt-5">
          <CoverageChecker />
        </div>
      </Container>
    </Section>
  );
}
