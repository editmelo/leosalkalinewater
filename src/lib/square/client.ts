// Server-only Square client. Never import this from a client component —
// it pulls in the Node SDK and reads the secret Access Token.
import { SquareClient, SquareEnvironment } from "square";

/** Returns a configured Square client, or null if the Access Token isn't set yet. */
export function getSquareClient(): SquareClient | null {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) return null;
  const isProduction = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase() === "production";
  return new SquareClient({
    token,
    environment: isProduction ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
  });
}

/** The Square Location that receives the payment (public-safe value). */
export function getSquareLocationId(): string {
  return process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? "";
}
