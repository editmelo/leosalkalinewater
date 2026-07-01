// Browser-safe Square config. These NEXT_PUBLIC_* values are inlined at build time.
// The Application ID and Location ID are not secrets (the Access Token is — server only).

export const SQUARE_APPLICATION_ID = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? "";
export const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? "";

// Sandbox Application IDs are prefixed "sandbox-"; production are "sq0idp-".
export const IS_SQUARE_SANDBOX = SQUARE_APPLICATION_ID.startsWith("sandbox-");

// The Web Payments SDK is served from a different host per environment.
export const SQUARE_WEB_SDK_URL = IS_SQUARE_SANDBOX
  ? "https://sandbox.web.squarecdn.com/v1/square.js"
  : "https://web.squarecdn.com/v1/square.js";

/** True once the public Square credentials are present (card form can initialize). */
export function isSquareClientConfigured(): boolean {
  return Boolean(SQUARE_APPLICATION_ID && SQUARE_LOCATION_ID);
}
