import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { OrderSummary } from "@/components/order/OrderSummary";
import { CheckoutPlaceholder } from "@/components/order/CheckoutPlaceholder";

export const metadata = { title: "Your Cart — Leo's Alkaline Water" };

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] py-12">
        <Container className="max-w-3xl">
          <h1 className="mb-6 text-3xl font-extrabold text-brand-navy">Your Order</h1>
          <OrderSummary />
          <div className="mt-8"><CheckoutPlaceholder /></div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
