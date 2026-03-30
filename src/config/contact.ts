/** Set in `.env`: VITE_CONTACT_EMAIL=your@email.com */
export const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() ||
  "hello@example.com";

/**
 * WhatsApp click-to-chat: digits only, country code included, no + spaces.
 * Example Egypt mobile: 201234567890
 * Set: VITE_WHATSAPP_NUMBER=201234567890
 */
export const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim() || "";

/**
 * Optional: Google Apps Script “Web app” URL (POST → append row to Sheet).
 * Set: VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 */
export const GOOGLE_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined)?.trim() || "";
