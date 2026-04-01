import { GOOGLE_SCRIPT_URL, WHATSAPP_NUMBER } from "../config/contact";

export type LeadPayload = {
  form: "contact" | "start-project";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  extras?: string;
};

export async function appendLeadToSheet(payload: LeadPayload): Promise<void> {
  const url = GOOGLE_SCRIPT_URL?.trim();
  if (!url) {
    console.warn("[sheet] VITE_GOOGLE_SCRIPT_URL is empty — skipping POST");
    return;
  }

  const json = JSON.stringify({ ...payload, _ts: new Date().toISOString() });
  const encoded = `payload=${encodeURIComponent(json)}`;

  console.log("[sheet] POSTing to", url.slice(0, 60) + "…");

  // --- attempt 1: regular fetch (cors) so we can read errors ---------------
  try {
    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encoded,
    });
    console.log("[sheet] fetch ok, status", res.status);
    return;               // success — done
  } catch (err) {
    console.warn("[sheet] cors fetch failed, trying hidden-form fallback", err);
  }

  // --- attempt 2: hidden <form> + <iframe> (immune to CORS) ----------------
  try {
    await postViaHiddenForm(url, encoded);
    console.log("[sheet] hidden-form fallback succeeded");
  } catch (err2) {
    console.error("[sheet] hidden-form fallback also failed", err2);
  }
}

function postViaHiddenForm(url: string, body: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = `__sheet_iframe_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = id;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    form.target = id;
    form.style.display = "none";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "payload";
    input.value = decodeURIComponent(body.replace(/^payload=/, ""));
    form.appendChild(input);
    document.body.appendChild(form);

    const cleanup = () => {
      try { document.body.removeChild(iframe); } catch { /* */ }
      try { document.body.removeChild(form); } catch { /* */ }
    };

    const timer = setTimeout(() => { cleanup(); resolve(); }, 6000);

    iframe.addEventListener("load", () => {
      clearTimeout(timer);
      cleanup();
      resolve();
    });
    iframe.addEventListener("error", () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error("iframe load error"));
    });

    form.submit();
  });
}

function normalizeWhatsAppDigits(input: string): string {
  return input.replace(/\D/g, "");
}

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
