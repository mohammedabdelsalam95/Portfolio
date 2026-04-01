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
 * POST lead to Google Apps Script, then wait briefly so the row can be written
 * before opening WhatsApp or advancing the wizard.
 *
 * Always `await` this in the UI before any follow-up action.
 */
export async function appendLeadToSheet(payload: LeadPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL?.trim()) return;

  const json = JSON.stringify({
    ...payload,
    _ts: new Date().toISOString(),
  });
  const body = `payload=${encodeURIComponent(json)}`;
  const url = GOOGLE_SCRIPT_URL.trim();

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch {
    /* network failure — user can still use WhatsApp */
  }

  // Let Apps Script finish appendRow before the next browser action
  await new Promise((r) => setTimeout(r, 450));
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
  return Boolean(GOOGLE_SCRIPT_URL?.trim());
}
