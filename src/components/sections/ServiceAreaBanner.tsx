import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { NotifyMeForm } from "@/components/order/NotifyMeForm";

export function ServiceAreaBanner() {
  return (
    <Section className="bg-[#eef7f1]">
      <Container className="max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold text-brand-green">Currently serving the Indianapolis area</h2>
        <p className="mt-2 text-brand-text/70">Outside our delivery zone? Leave your email and we&apos;ll let you know the moment we reach your neighborhood.</p>
        <div className="mx-auto mt-5 max-w-md"><NotifyMeForm /></div>
      </Container>
    </Section>
  );
}
