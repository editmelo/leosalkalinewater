import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-brand-blue to-brand-aqua py-16 text-center text-white">
      <Container>
        <h2 className="text-3xl font-extrabold">Ready to feel the difference?</h2>
        <p className="mt-2 text-white/90">Join the Water Fam today.</p>
        <Button href="/store" variant="primary" className="mt-6 bg-white text-brand-blue hover:bg-white/90">Order Delivery</Button>
      </Container>
    </section>
  );
}
