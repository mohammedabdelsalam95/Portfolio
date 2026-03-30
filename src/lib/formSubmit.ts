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

/** Fire-and-forget: browser `no-cors` POST to Apps Script web app (no response body). */
export function appendLeadToSheet(payload: LeadPayload): void {
  if (!GOOGLE_SCRIPT_URL) return;
  const body = JSON.stringify({
    ...payload,
    _ts: new Date().toISOString(),
  });
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
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
