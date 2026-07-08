import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Privacy Policy — Leo's Alkaline Water" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Leo&apos;s Alkaline Water (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
        policy explains what information we collect, how we use it, and the choices you have.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you place an order, sign up for delivery, or contact us, we may collect: your name,
        email address, and phone number; your delivery address and ZIP code; order and subscription
        details (jug quantity, frequency, plan); and payment information processed by our payment
        provider, Square. We do not store your full card number.
      </p>

      <h2>How We Use It</h2>
      <p>
        We use this information to process orders and recurring deliveries, manage your
        subscription, communicate with you about your service, respond to inquiries, and improve our
        offerings.
      </p>

      <h2>Payment Processing (Square)</h2>
      <p>
        All payments are processed securely through Square. Square handles your card details
        directly through its Web Payments SDK; we never receive or store your full card number.
        Square&apos;s use of your information is governed by its own privacy policy.
      </p>

      <h2>Email &amp; Notifications</h2>
      <p>
        If you provide your email to place an order or manage a subscription, we use it to send
        order and delivery updates. If you sign up to be notified when we reach your area, we use
        your email solely for that purpose. You can opt out of non-essential emails at any time.
      </p>

      <h2>Cookies &amp; Analytics</h2>
      <p>
        Our site may use basic cookies and simple analytics to understand how visitors use the site
        and to keep it running smoothly. This information is used in aggregate and is not sold to
        third parties.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell your personal information. We share it only with service providers that help
        us operate our business, such as Square for payment processing and delivery/logistics
        support, and only as needed to provide our service to you.
      </p>

      <h2>Your Choices &amp; Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information at any
        time by contacting us.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our site and services are not directed to children under 13, and we do not knowingly collect
        personal information from children under 13.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on this page with an
        updated effective date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email{" "}
        <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{" "}
        {CONTACT.phone}.
      </p>
    </LegalLayout>
  );
}
