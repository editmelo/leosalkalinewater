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

      <h2>Orders &amp; Plans</h2>
      <p>
        Leo&apos;s Alkaline Water is a build-your-own delivery service: you choose the number of
        5-gallon jugs and a delivery frequency &mdash; One-Time, Weekly, or Biweekly. Each
        plan includes one jug; additional jugs are +$10 each per delivery. We also offer named plans
        for convenience &mdash; <b>First Pour</b> (starter), <b>Stay Balanced</b> (biweekly),
        <b> Fully Hydrated</b> (weekly), and <b>Top Off</b> (one-time) &mdash; whose pricing and
        inclusions are subject to change; the current price and details are always shown at checkout.
      </p>

      <h2>Billing (Every 4 Weeks)</h2>
      <p>
        Recurring subscriptions are billed on a 4-week cycle, not a calendar month. For clarity, we
        may display pricing as a per-week rate on the site, but your card is charged once every 4
        weeks for the full cycle. Subscriptions renew automatically at each 4-week interval until you
        pause or cancel. One-time orders are charged a single time at checkout.
      </p>

      <h2>First Order, Jug Deposit &amp; Exchanges</h2>
      <p>
        A first-time customer&apos;s order includes their First Fill &amp; Delivery, a one-time
        refundable $15 jug deposit (a single flat charge regardless of how many jugs you order, to
        cover jug damage or non-return), and a one-time $10 Rechargeable Pump that is yours to keep.
        On future deliveries, we exchange your empty jugs for full ones, so
        returning customers who exchange jugs are not charged a new deposit or pump. Deposits are
        refunded when jugs are returned in good condition. A damage fee, up to the deposit amount,
        applies to jugs that are cracked, deformed, or not returned.
      </p>

      <h2>Refunds &amp; Returns</h2>
      <p>
        One-time orders may be refunded if you contact us before the order is dispatched for
        delivery. Because water is a consumable product, once it has been delivered it is
        non-refundable. Jug deposits are refunded as described above when jugs are returned. Billing
        disputes for subscriptions (such as proration or an unexpected charge) are handled case by
        case &mdash; please contact us and we&apos;ll work it out with you.
      </p>

      <h2>Cancellations &amp; Changes</h2>
      <p>
        You may pause a subscription, change your jug quantity or delivery frequency, or cancel at
        any time by contacting us. Self-service account management is coming soon.
      </p>

      <h2>Payments</h2>
      <p>
        Payments are processed securely through Square. We do not store your full card number on our
        systems. Recurring charges for active subscriptions occur automatically according to the
        4-week billing schedule above.
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
