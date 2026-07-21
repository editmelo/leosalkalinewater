import { QuickOrder } from "@/components/order/QuickOrder";
import { Bubbles } from "@/components/motion/Bubbles";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline poster="/hero-poster.jpg" aria-hidden>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[url('/hero-poster.jpg')] bg-cover bg-center motion-safe:hidden" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/85 via-brand-blue/80 to-brand-green/80" aria-hidden />
      <Bubbles />
      <Container className="relative grid items-center gap-8 py-14 sm:py-20 md:grid-cols-[1.2fr_minmax(0,380px)] md:gap-10 md:py-28">
        <div className="text-white">
          <p className="font-[family-name:var(--font-heading)] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#9fe0c0] sm:text-xs">Alkaline Water Delivery · Serving Greater Indianapolis</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Hydrating You<br />Is What We Do.</h1>
          <p className="tagline mt-3 text-xl text-[#cdeefb] sm:text-2xl">Water That Meets You Where You Are.</p>
          <p className="mt-4 max-w-md text-white/90">Fresh Alkaline Water delivered to your home and business — on your schedule.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/store" variant="aqua">Order Delivery</Button>
          </div>
        </div>
        <div className="w-full justify-self-center md:justify-self-end"><QuickOrder /></div>
      </Container>
    </section>
  );
}
