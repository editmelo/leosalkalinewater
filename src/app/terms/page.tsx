import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Terms & Conditions — Leo's Alkaline Water" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the Leo&apos;s Alkaline
        Water website and your purchase of any products or delivery service from us. By placing an
        order or creating an account, you agree to these Terms.
      </p>

      <h2>Service Area</h2>
      <p>
        We currently deliver only within the Indianapolis, Indiana service area, determined by
        delivery ZIP code. If your address falls outside our service area, we cannot fulfill your
        order. You may sign up to be notified when we expand to your area.
      </p>

      <h2>Orders</h2>
      <p>
        Leo&apos;s Alkaline Water is a build-your-own delivery service: you choose the number of
        5-gallon jugs and a delivery frequency &mdash; One-Time, Weekly, or Bi-Weekly. Water is $15
        per 5-gallon jug, per delivery, plus a flat $5 delivery fee per order (regardless of
        frequency or quantity). Current pricing and any options are always shown at checkout before
        you pay.
      </p>

      <h2>Billing &amp; Automatic Renewal</h2>
      <p>
        Weekly and Bi-Weekly orders are <b>recurring</b>. Your card is charged for the delivery cycle
        at checkout and then <b>automatically every 4 weeks</b> for the same amount, until you change
        or cancel. For pricing clarity the site may show a per-week or per-delivery rate, but each
        charge covers the full 4-week cycle &mdash; four deliveries (Weekly) or two (Bi-Weekly).
        One-Time orders are charged a single time and do not renew. By placing a recurring order, you
        authorize Leo&apos;s Alkaline Water to charge your payment method on this 4-week schedule until
        you cancel. We&apos;ll send a receipt for each charge.
      </p>

      <h2>First Order, Jug Deposit &amp; Exchanges</h2>
      <p>
        A first-time customer&apos;s order includes their First Fill &amp; Delivery, a one-time
        refundable jug deposit of $15 per jug (to cover jug damage or non-return), and an optional
        $15 Rechargeable Pump that is yours to keep. On future deliveries, we exchange your empty
        jugs for full ones, so returning customers who exchange jugs are not charged a new deposit or
        pump. Deposits are refunded when jugs are returned in good condition. A damage fee, up to the
        deposit amount, applies to jugs that are cracked, deformed, or not returned.
      </p>

      <h2>Refunds &amp; Returns</h2>
      <p>
        Orders may be refunded if you contact us before the order is dispatched for delivery. Because
        water is a consumable product, once it has been delivered it is non-refundable. Jug deposits
        are refunded as described above when jugs are returned. If you ever see a charge you
        didn&apos;t expect, contact us and we&apos;ll make it right.
      </p>

      <h2>Cancellations &amp; Changes</h2>
      <p>
        To change your jug quantity or delivery frequency, pause, or cancel your recurring order,
        contact us and we&apos;ll update it. Changes apply to future cycles. To avoid being charged
        for an upcoming cycle, please reach out <b>before your next 4-week renewal</b>. There is no
        cancellation fee.
      </p>

      <h2>Payments</h2>
      <p>
        Payments are processed securely through Square. We do not store your full card number on our
        systems. Recurring charges for active orders occur automatically according to the 4-week
        billing schedule above until you cancel.
      </p>

      <h2>Product Disclaimer</h2>
      <p>
        Any statements about alkaline water or wellness on this site are for general informational
        purposes only and are not medical advice. They have not been evaluated by the Food and Drug
        Administration, and our products are not intended to diagnose, treat, cure, or prevent any
        disease. Consult a healthcare professional with questions about your individual health needs.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{" "}
        or call {CONTACT.phone}.
      </p>
    </LegalLayout>
  );
}
