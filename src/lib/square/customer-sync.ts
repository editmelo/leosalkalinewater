// Server-only. Bridges a website order into Square's Customer Directory + Cards on File,
// so Leo can run recurring billing (Recurring Series) against a saved card without
// re-collecting it. Everything here is BEST-EFFORT: on any failure we return null and the
// caller charges the card directly, so checkout never breaks.
import { randomUUID } from "node:crypto";
import type { SquareClient } from "square";
import { billingAddressOf, normalizePhoneToE164, type CustomerDetails } from "@/lib/order/customer";

/** Find an existing Square customer by email, else create one. Returns the customer id, or null. */
export async function findOrCreateCustomer(client: SquareClient, c: CustomerDetails): Promise<string | null> {
  const email = c.email.trim();

  try {
    const found = await client.customers.search({
      query: { filter: { emailAddress: { exact: email } } },
      limit: BigInt(1),
    });
    const existing = found.customers?.[0]?.id;
    if (existing) return existing;
  } catch (err) {
    console.error("[square] customer search failed", err);
  }

  try {
    const created = await client.customers.create({
      idempotencyKey: randomUUID(),
      givenName: c.firstName,
      familyName: c.lastName,
      emailAddress: email,
      phoneNumber: normalizePhoneToE164(c.phone) ?? undefined,
      address: {
        addressLine1: c.address1,
        addressLine2: c.address2 || undefined,
        locality: c.city,
        administrativeDistrictLevel1: c.state,
        postalCode: c.zip,
        country: "US",
      },
      note: "Created from leosalkalinewater.com order",
    });
    return created.customer?.id ?? null;
  } catch (err) {
    console.error("[square] customer create failed", err);
    return null;
  }
}

/**
 * Store the card on file for the customer, using a dedicated single-use token from the web
 * payment form (separate from the one used to charge). Returns the saved card id, or null if
 * it couldn't be saved — either way the charge is unaffected.
 */
export async function saveCardOnFile(
  client: SquareClient,
  sourceId: string,
  customerId: string,
  c: CustomerDetails,
  verificationToken?: string,
): Promise<string | null> {
  try {
    const b = billingAddressOf(c);
    const res = await client.cards.create({
      idempotencyKey: randomUUID(),
      sourceId,
      verificationToken,
      card: {
        customerId,
        cardholderName: `${c.firstName} ${c.lastName}`.trim(),
        billingAddress: {
          addressLine1: b.address1,
          addressLine2: b.address2 || undefined,
          locality: b.city,
          administrativeDistrictLevel1: b.state,
          postalCode: b.zip,
          country: "US",
        },
      },
    });
    return res.card?.id ?? null;
  } catch (err) {
    console.error("[square] save card on file failed", err);
    return null;
  }
}
