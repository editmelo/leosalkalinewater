import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Terms & Conditions — Leo's Alkaline Water" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>By ordering from Leo&apos;s Alkaline Water, you agree to these terms.</p>
      <h2>Service Area</h2>
      <p>We currently deliver only within the Indianapolis service area. Orders outside this area cannot be fulfilled.</p>
      <h2>Orders &amp; Subscriptions</h2>
      <p>Leo&apos;s Alkaline Water offers Pay as You Go single deliveries ($20 per 5-gallon jug, valid 7 days), recurring subscriptions — Bi-Weekly Delivery ($30/month) and Weekly Delivery ($55/month), billed monthly — and a Starter Pack Bundle ($45). Subscriptions recur monthly until paused or cancelled. One-time orders are charged once.</p>
      <h2>Jug Deposit</h2>
      <p>The Starter Pack Bundle includes a refundable jug deposit, returned when jugs are returned in good condition.</p>
      <h2>Payments</h2>
      <p>Payments are processed securely through Square. Recurring charges occur automatically per your subscription schedule.</p>
      <h2>Cancellations</h2>
      <p>You may cancel or modify your subscription by contacting us; self-service management is coming soon.</p>
      <h2>Contact</h2>
      <p>Email <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call {CONTACT.phone}.</p>
    </LegalLayout>
  );
}
