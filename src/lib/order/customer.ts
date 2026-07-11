// Who the water goes to. Collected at checkout, sent to Square with the payment
// (buyer email/phone + shipping address), and reused later for Subscriptions
// (Square requires a Customer record to bill a card on file).
export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // optional
  address1: string;
  address2: string; // optional (apt / suite)
  city: string;
  state: string;
  zip: string;
}

export const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "IN",
  zip: "",
};

/** Everything Leo needs to actually deliver the jugs (phone + apt are optional). */
export function isCustomerComplete(c: CustomerDetails): boolean {
  const filled = (s: string) => s.trim().length > 0;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim());
  return (
    filled(c.firstName) &&
    filled(c.lastName) &&
    emailOk &&
    filled(c.address1) &&
    filled(c.city) &&
    filled(c.state) &&
    c.zip.trim().length >= 5
  );
}
