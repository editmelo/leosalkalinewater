// Server-only. Square Subscriptions API plumbing for recurring water delivery.
//
// ── THE CADENCE PROBLEM ──────────────────────────────────────────────────────
// Leo wants billing "every 4 weeks" (28 days = 13 cycles/year) so short months
// don't cost him a billing period. Square does NOT offer a 28-day cadence. The
// supported set is: DAILY | WEEKLY | EVERY_TWO_WEEKS | THIRTY_DAYS | SIXTY_DAYS |
// NINETY_DAYS | MONTHLY | EVERY_TWO_MONTHS | QUARTERLY | ... | ANNUAL.
//
// ── THE FIX: BILL PER DELIVERY ───────────────────────────────────────────────
// Charging the per-delivery amount on the delivery cadence reproduces Leo's
// 4-week economics EXACTLY, and the customer is charged each time water arrives:
//
//   Fully Hydrated  $55 / 4 weeks → WEEKLY @ $13.75  → 52 × 13.75 = $715/yr = 13 × $55 ✅
//   Stay Balanced   $30 / 4 weeks → EVERY_TWO_WEEKS @ $15 → 26 × 15 = $390/yr = 13 × $30 ✅
//
// Compare MONTHLY: 12 × $55 = $660/yr — Leo loses a full cycle. THIRTY_DAYS only
// yields ~12.17 cycles ($669/yr), which does NOT recover the lost month.
// ─────────────────────────────────────────────────────────────────────────────
import { randomUUID } from "node:crypto";
import type { Square } from "square";
import { getSquareClient, getSquareLocationId } from "./client";
import { computeTotals } from "@/lib/order/pricing";
import type { SimpleSelection } from "@/lib/order/types";

export type RecurringFrequency = "Weekly" | "Biweekly";

/** Square cadence + how many deliveries fall in one 4-week cycle. */
export const CADENCE: Record<
  RecurringFrequency,
  { cadence: Square.SubscriptionCadence; deliveriesPerCycle: number }
> = {
  Weekly: { cadence: "WEEKLY", deliveriesPerCycle: 4 },
  Biweekly: { cadence: "EVERY_TWO_WEEKS", deliveriesPerCycle: 2 },
};

export function isRecurring(sel: SimpleSelection): sel is SimpleSelection & { frequency: RecurringFrequency } {
  return sel.frequency === "Weekly" || sel.frequency === "Biweekly";
}

/**
 * What Square charges on each delivery: the 4-week cycle price split across the
 * deliveries in that cycle. (Deposit + pump are NOT included — those are one-time
 * charges taken up front by the Payments API.)
 */
export function perDeliveryCents(sel: SimpleSelection & { frequency: RecurringFrequency }): number {
  const { subtotalCents } = computeTotals(sel);
  return Math.round(subtotalCents / CADENCE[sel.frequency].deliveriesPerCycle);
}

/** Catalog IDs for the two subscription plan variations (created once via /api/square/setup-plans). */
export function getPlanVariationId(frequency: RecurringFrequency): string {
  return frequency === "Weekly"
    ? process.env.SQUARE_PLAN_VARIATION_WEEKLY ?? ""
    : process.env.SQUARE_PLAN_VARIATION_BIWEEKLY ?? "";
}

/** True once the catalog plans exist and Square is configured — otherwise we stay on one-time checkout. */
export function areSubscriptionsReady(): boolean {
  return Boolean(
    getSquareClient() &&
      getSquareLocationId() &&
      process.env.SQUARE_PLAN_VARIATION_WEEKLY &&
      process.env.SQUARE_PLAN_VARIATION_BIWEEKLY,
  );
}

/**
 * One-time setup: create the two SUBSCRIPTION_PLAN objects (Weekly / Bi-Weekly) in
 * Leo's Square catalog. Price is a placeholder — each subscription overrides it with
 * `priceOverrideMoney`, so we need only ONE variation per cadence (no catalog explosion
 * across jug counts).
 * Returns the plan variation IDs to store in env.
 */
export async function setupSubscriptionPlans(): Promise<Record<RecurringFrequency, string>> {
  const client = getSquareClient();
  if (!client) throw new Error("Square is not configured.");

  const out = {} as Record<RecurringFrequency, string>;

  for (const frequency of ["Weekly", "Biweekly"] as RecurringFrequency[]) {
    const { cadence } = CADENCE[frequency];
    const planId = `#plan-${frequency.toLowerCase()}`;
    const variationId = `#plan-var-${frequency.toLowerCase()}`;

    const res = await client.catalog.object.upsert({
      idempotencyKey: randomUUID(),
      object: {
        type: "SUBSCRIPTION_PLAN",
        id: planId,
        subscriptionPlanData: {
          name: `Leo's Alkaline Water — ${frequency} Delivery`,
          subscriptionPlanVariations: [
            {
              type: "SUBSCRIPTION_PLAN_VARIATION",
              id: variationId,
              subscriptionPlanVariationData: {
                name: `${frequency} Delivery`,
                phases: [
                  {
                    cadence,
                    // Placeholder — overridden per subscription via priceOverrideMoney.
                    pricing: {
                      type: "STATIC",
                      priceMoney: { amount: BigInt(1000), currency: "USD" },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });

    const created = res.catalogObject;
    const variation =
      created?.type === "SUBSCRIPTION_PLAN"
        ? created.subscriptionPlanData?.subscriptionPlanVariations?.[0]
        : undefined;
    if (!variation?.id) throw new Error(`Could not create the ${frequency} subscription plan variation.`);
    out[frequency] = variation.id;
  }

  return out;
}

/**
 * Enroll a customer in a recurring delivery:
 *   1. create (or reuse) the Square Customer
 *   2. save the tokenized card on file
 *   3. create the subscription with the per-delivery price override
 */
export async function createSubscription(opts: {
  sourceId: string; // card token from the Web Payments SDK
  selection: SimpleSelection & { frequency: RecurringFrequency };
  givenName: string;
  familyName: string;
  email: string;
  phone?: string;
}): Promise<{ subscriptionId: string; customerId: string; perDeliveryCents: number }> {
  const client = getSquareClient();
  const locationId = getSquareLocationId();
  if (!client || !locationId) throw new Error("Square is not configured.");

  const planVariationId = getPlanVariationId(opts.selection.frequency);
  if (!planVariationId) throw new Error("Subscription plans have not been set up yet.");

  // 1. Customer
  const customerRes = await client.customers.create({
    idempotencyKey: randomUUID(),
    givenName: opts.givenName,
    familyName: opts.familyName,
    emailAddress: opts.email,
    phoneNumber: opts.phone,
    note: `Delivery ZIP ${opts.selection.zip} · ${opts.selection.jugCount} jug(s) · ${opts.selection.frequency}`,
  });
  const customerId = customerRes.customer?.id;
  if (!customerId) throw new Error("Could not create the customer record.");

  // 2. Card on file
  const cardRes = await client.cards.create({
    idempotencyKey: randomUUID(),
    sourceId: opts.sourceId,
    card: { customerId },
  });
  const cardId = cardRes.card?.id;
  if (!cardId) throw new Error("Could not save the card on file.");

  // 3. Subscription — price overridden to the per-delivery amount.
  const amount = perDeliveryCents(opts.selection);
  const subRes = await client.subscriptions.create({
    idempotencyKey: randomUUID(),
    locationId,
    planVariationId,
    customerId,
    cardId,
    priceOverrideMoney: { amount: BigInt(amount), currency: "USD" },
  });
  const subscriptionId = subRes.subscription?.id;
  if (!subscriptionId) throw new Error("Could not start the subscription.");

  return { subscriptionId, customerId, perDeliveryCents: amount };
}
