// Server-only email delivery. Supports two providers by env var, whichever is set:
//   1. Web3Forms (free, no DNS) — set WEB3FORMS_ACCESS_KEY. Emails go to the inbox the
//      key is registered to (leo@leosalkalinewater.com). Reply-to is the customer.
//   2. Resend (needs a verified domain) — set RESEND_API_KEY (+ optional EMAIL_FROM).
// Neither set → sendEmail is a safe no-op returning { sent: false }, so routes keep
// working (they still log) until a provider is configured.

export function isEmailConfigured(): boolean {
  return Boolean(process.env.WEB3FORMS_ACCESS_KEY || process.env.RESEND_API_KEY);
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  if (process.env.WEB3FORMS_ACCESS_KEY) return sendViaWeb3Forms(opts);
  if (process.env.RESEND_API_KEY) return sendViaResend(opts);
  return { sent: false, error: "Email not configured." };
}

// --- Web3Forms (free, no domain verification) --------------------------------
async function sendViaWeb3Forms(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: opts.subject,
        from_name: "Leo's Alkaline Water Website",
        // Web3Forms uses `email` as the reply-to on the message it sends to Leo.
        email: opts.replyTo || "no-reply@leosalkalinewater.com",
        message: opts.text,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) return { sent: false, error: data.message || `Web3Forms ${res.status}` };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : "Email failed to send." };
  }
}

// --- Resend (from a verified domain) -----------------------------------------
async function sendViaResend(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<{ sent: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "Leo's Alkaline Water <hello@leosalkalinewater.com>",
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
