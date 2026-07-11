// Who the water goes to, and who's paying. Collected at checkout, sent to Square with
// the payment (buyer email/phone + shipping/billing address), and reused later for
// Subscriptions (Square requires a Customer record to bill a card on file).

export interface Address {
  address1: string;
  address2: string; // optional (apt / suite)
  city: string;
  state: string;
  zip: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // optional

  // Delivery address — where the jugs go. Must be inside the service area.
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;

  // Billing address — the card's address. Often the same, so default to that.
  billingSameAsDelivery: boolean;
  billing: Address;
}

export const EMPTY_ADDRESS: Address = {
  address1: "",
  address2: "",
  city: "",
  state: "IN",
  zip: "",
};

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
  billingSameAsDelivery: true,
  billing: { ...EMPTY_ADDRESS },
};

const filled = (s: string) => s.trim().length > 0;

function isAddressComplete(a: Address): boolean {
  return filled(a.address1) && filled(a.city) && filled(a.state) && a.zip.trim().length >= 5;
}

/** The billing address actually used — the delivery address unless they said otherwise. */
export function billingAddressOf(c: CustomerDetails): Address {
  return c.billingSameAsDelivery
    ? { address1: c.address1, address2: c.address2, city: c.city, state: c.state, zip: c.zip }
    : c.billing;
}

/** Everything Leo needs to deliver the jugs and charge the card (phone + apt are optional). */
export function isCustomerComplete(c: CustomerDetails): boolean {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim());
  const deliveryOk = isAddressComplete({
    address1: c.address1,
    address2: c.address2,
    city: c.city,
    state: c.state,
    zip: c.zip,
  });
  const billingOk = c.billingSameAsDelivery || isAddressComplete(c.billing);
  return filled(c.firstName) && filled(c.lastName) && emailOk && deliveryOk && billingOk;
}
