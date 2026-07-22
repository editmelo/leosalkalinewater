// Server-only email delivery via Resend (https://resend.com).
// No RESEND_API_KEY set → sendEmail is a no-op that returns { sent: false }, so routes
// keep working (they still log) until the key + verified domain are in place.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// The "from" address must be on a domain verified in Resend (leosalkalinewater.com).
// Override with EMAIL_FROM if you use a different sender.
function fromAddress(): string {
  return process.env.EMAIL_FROM ?? "Leo's Alkaline Water <hello@leosalkalinewater.com>";
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, error: "Email not configured." };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [opts.to],
        subject: opts.subject,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { sent: false, error: `Resend ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Email failed to send." };
  }
}
