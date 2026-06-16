import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function PartnerBlock() {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
        <Image src="/urban-league-logo.png" alt="Indianapolis Urban League" width={220} height={70} className="h-16 w-auto" />
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Proud Supporting Partner</p>
          <p className="mt-1 max-w-xl text-brand-text/80">Leo&apos;s Alkaline Water proudly supports the <b>Indiana Urban League</b> and its mission to empower communities and advance economic inclusion across Indianapolis.</p>
        </div>
      </Container>
    </Section>
  );
}
