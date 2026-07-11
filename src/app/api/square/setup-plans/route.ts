import { NextResponse } from "next/server";
import { SquareError } from "square";
import { setupSubscriptionPlans } from "@/lib/square/subscriptions";

// ONE-TIME SETUP (run once per Square environment — sandbox, then production).
// Creates the two SUBSCRIPTION_PLAN catalog objects in Leo's Square account and
// returns their plan-variation IDs, which then go into env vars:
//   SQUARE_PLAN_VARIATION_WEEKLY, SQUARE_PLAN_VARIATION_BIWEEKLY
//
// Guarded: only runs when SQUARE_ALLOW_SETUP=true, so it can never be hit casually
// in production. Call with: curl -X POST http://localhost:3000/api/square/setup-plans
export async function POST() {
  if (process.env.SQUARE_ALLOW_SETUP !== "true") {
    return NextResponse.json(
      { ok: false, error: "Setup is disabled. Set SQUARE_ALLOW_SETUP=true to run it." },
      { status: 403 },
    );
  }

  try {
    const ids = await setupSubscriptionPlans();
    return NextResponse.json({
      ok: true,
      planVariationIds: ids,
      next: "Add these to your env as SQUARE_PLAN_VARIATION_WEEKLY and SQUARE_PLAN_VARIATION_BIWEEKLY.",
    });
  } catch (err) {
    const detail =
      err instanceof SquareError
        ? ((err as unknown as { body?: { errors?: { detail?: string }[] } }).body?.errors?.[0]?.detail ?? err.message)
        : err instanceof Error
          ? err.message
          : "Could not create the subscription plans.";
    return NextResponse.json({ ok: false, error: detail }, { status: 500 });
  }
}
