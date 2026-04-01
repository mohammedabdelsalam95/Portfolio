import { CONTACT_EMAIL, GOOGLE_SCRIPT_URL, WHATSAPP_NUMBER } from "../config/contact";

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
 * Uses `application/x-www-form-urlencoded` with a `payload` field so the
 * request stays a "simple" cross-origin POST (works with `no-cors`). Raw JSON
 * + text/plain is often dropped or mishandled by the browser for script.google.com.
 */
export function appendLeadToSheet(payload: LeadPayload): void {
  if (!GOOGLE_SCRIPT_URL) return;
  const json = JSON.stringify({
    ...payload,
    _ts: new Date().toISOString(),
  });
  const body = `payload=${encodeURIComponent(json)}`;
  fetch(GOOGLE_SCRIPT_URL.trim(), {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  }).catch(() => {});
}

export function buildMailtoHref(subject: string, body: string): string {
  return `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
