import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT } from "@/lib/brand";

export const metadata = { title: "Privacy Policy — Leo's Alkaline Water" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Leo&apos;s Alkaline Water (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy explains what we collect and how we use it.</p>
      <h2>Information We Collect</h2>
      <p>Contact details (name, email, phone), delivery address and ZIP code, order and subscription details, and payment information processed securely by our payment provider (Square). We do not store full card numbers.</p>
      <h2>How We Use It</h2>
      <p>To process orders and recurring deliveries, contact you about your service, respond to inquiries, and improve our offerings. We do not sell your personal information.</p>
      <h2>Email Updates</h2>
      <p>If you ask to be notified when service reaches your area, we use your email solely for that purpose.</p>
      <h2>Your Choices</h2>
      <p>You may request access to or deletion of your information at any time by contacting us.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a className="text-brand-blue" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call {CONTACT.phone}.</p>
    </LegalLayout>
  );
}
