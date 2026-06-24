import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function PartnerBlock() {
  return (
    <Section>
      <Container className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:text-left">
        <a href="https://www.indplsul.org" target="_blank" rel="noopener noreferrer" aria-label="Visit the Indianapolis Urban League website" className="shrink-0 transition hover:opacity-80">
          <Image src="/urban-league-logo.png" alt="Indianapolis Urban League" width={220} height={70} className="h-16 w-auto" />
        </a>
        <div>
          <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-brand-blue">Proud Supporting Partner</p>
          <p className="mt-1 max-w-xl text-brand-text/80">Leo&apos;s Alkaline Water proudly supports the <b>Indianapolis Urban League</b> and its mission to empower communities and advance economic inclusion across Indianapolis.</p>
        </div>
      </Container>
    </Section>
  );
}
