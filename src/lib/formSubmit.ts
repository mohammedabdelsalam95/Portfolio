import { GOOGLE_SCRIPT_URL, WHATSAPP_NUMBER } from "../config/contact";

export type LeadPayload = {
  form: "contact" | "start-project";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  /** Extra structured text (e.g. wizard summary) */
  extras?: string;
};

/**
 * Fire-and-forget POST to Google Apps Script web app.
 *
 * Uses `application/x-www-form-urlencoded` with a `payload` field (simple CORS request).
 *
 * Uses `sendBeacon` first, then `fetch` with `keepalive`, so the POST is likely to finish
 * even if the user navigates away quickly.
 */
export function appendLeadToSheet(payload: LeadPayload): void {
  if (!GOOGLE_SCRIPT_URL) return;
  const json = JSON.stringify({
    ...payload,
    _ts: new Date().toISOString(),
  });
  const body = `payload=${encodeURIComponent(json)}`;
  const url = GOOGLE_SCRIPT_URL.trim();

  try {
    const blob = new Blob([body], { type: "application/x-www-form-urlencoded" });
    if (navigator.sendBeacon(url, blob)) {
      return;
    }
  } catch {
    /* continue to fetch */
  }

  void fetch(url, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  }).catch(() => {});
}

function normalizeWhatsAppDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/** Empty string if WhatsApp is not configured */
export function buildWhatsAppHref(message: string): string {
  const digits = normalizeWhatsAppDigits(WHATSAPP_NUMBER);
  if (!digits) return "";
  const text = message.length > 3800 ? `${message.slice(0, 3800)}…` : message;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function isWhatsAppConfigured(): boolean {
  return normalizeWhatsAppDigits(WHATSAPP_NUMBER).length > 0;
}

export function isGoogleSheetConfigured(): boolean {
  return Boolean(GOOGLE_SCRIPT_URL);
}
