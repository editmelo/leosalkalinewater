import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-brand-blue to-brand-aqua py-16 text-white">
      <Container className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h2 className="text-3xl font-extrabold">Ready to feel the difference?</h2>
          <p className="mt-2 text-white/90">Join the Water Fam today.</p>
        </div>
        <Button href="/store" variant="white" className="shrink-0">Order Delivery</Button>
      </Container>
    </section>
  );
}
