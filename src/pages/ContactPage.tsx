import { useState } from "react";
import { Link } from "react-router-dom";
import socialLinkedin from "../assets/icons/social-linkedin.svg";
import socialBehance from "../assets/icons/social-behance.svg";
import { CONTACT_EMAIL } from "../config/contact";
import { PAGE_GUTTERS, PAGE_MAX_W } from "../constants/pageLayout";
import {
  appendLeadToSheet,
  buildWhatsAppHref,
  isGoogleSheetConfigured,
  isWhatsAppConfigured,
} from "../lib/formSubmit";

const LINKEDIN_HREF = "https://www.linkedin.com/in/mohamed-helaly95";
const BEHANCE_HREF = "https://www.behance.net/mohammeabdelsa";
const LOCATION = "Cairo, Egypt";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submitContact() {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }

    const subj = subject.trim() || "Portfolio contact";
    const phoneLine = phone.trim() ? `\nPhone: ${phone.trim()}` : "";
    const bodyText = `${message}${phoneLine}\n\n— ${name} <${email}>`;

    setSubmitting(true);
    try {
      await appendLeadToSheet({
        form: "contact",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject: subj,
        message: message.trim(),
      });

      if (isWhatsAppConfigured()) {
        const href = buildWhatsAppHref(`*${subj}*\n\n${bodyText}`);
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }

      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="font-[Manrope] text-[#0a0a0a] pt-[72px]">
      <header
        className={`pb-[72px] pt-12 text-center sm:pb-[90px] sm:pt-16 md:pt-20 ${PAGE_GUTTERS}`}
        style={{
          background:
            "linear-gradient(171deg, rgba(0, 194, 130, 0.05) 0%, rgba(0, 194, 130, 0.1) 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-[#0a0a0a] sm:text-[27px]">Let&apos;s Connect</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-[#7d7d7d]">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </header>

      <section className={`${PAGE_MAX_W} ${PAGE_GUTTERS} py-14 sm:py-[72px]`}>
        <h2 className="mb-10 text-center text-lg font-bold sm:text-xl">Get in Touch</h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#00c282]">
                Email
              </p>
              <p className="mt-2 break-all text-[15px] font-medium text-[#0a0a0a]">{CONTACT_EMAIL}</p>
            </div>

            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#00c282]">
                LinkedIn
              </p>
              <a
                href={LINKEDIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-[15px] font-medium text-[#0a0a0a] underline decoration-[#00c282]/40 underline-offset-2 hover:text-[#00c282]"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#00c282]">
                Location
              </p>
              <p className="mt-2 text-[15px] text-[#7d7d7d]">{LOCATION}</p>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold text-[#0a0a0a]">Follow</p>
              <div className="flex gap-3">
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white transition-colors hover:border-[#00c282]"
                  aria-label="LinkedIn"
                >
                  <img src={socialLinkedin} alt="" className="size-5" />
                </a>
                <a
                  href={BEHANCE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white transition-colors hover:border-[#00c282]"
                  aria-label="Behance"
                >
                  <img src={socialBehance} alt="" className="size-5" />
                </a>
              </div>
            </div>
          </div>

          <form
            id="contact-form"
            onSubmit={(e) => e.preventDefault()}
            className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Phone <span className="font-normal text-[#6a7282]">(optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                  placeholder="+00 000 000 0000"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                  placeholder="Tell me about your project..."
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                disabled={submitting}
                onClick={() => void submitContact()}
                className="w-full rounded-lg bg-[#00c282] py-3.5 text-[15px] font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px] sm:px-8"
              >
                {submitting
                  ? "Saving…"
                  : isWhatsAppConfigured()
                    ? "Submit & open WhatsApp"
                    : "Submit"}
              </button>
            </div>

            {isGoogleSheetConfigured() ? (
              <p className="mt-3 text-xs leading-relaxed text-[#6a7282]">
                Your details are saved to the sheet first; then WhatsApp opens if enabled.
              </p>
            ) : isWhatsAppConfigured() ? (
              <p className="mt-3 text-xs leading-relaxed text-[#6a7282]">
                WhatsApp will open with your message.
              </p>
            ) : null}

            {sent ? (
              <p className="mt-4 text-sm text-[#007a55]">
                Thanks — your message was received.
                {isWhatsAppConfigured() ? " Confirm in WhatsApp if that tab opened." : ""}
                {!isGoogleSheetConfigured() && !isWhatsAppConfigured() ? (
                  <>
                    {" "}
                    Configure <code className="rounded bg-[#f3f4f6] px-1">VITE_GOOGLE_SCRIPT_URL</code> or{" "}
                    <code className="rounded bg-[#f3f4f6] px-1">VITE_WHATSAPP_NUMBER</code> so submissions are delivered.
                  </>
                ) : null}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section
        className={`border-t border-[#f2f2f2] py-12 ${PAGE_GUTTERS}`}
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 194, 130, 0.06) 0%, rgba(0, 194, 130, 0.02) 100%)",
        }}
      >
        <div className={`${PAGE_MAX_W} text-center`}>
          <h3 className="text-base font-bold text-[#0a0a0a]">Response time</h3>
          <p className="mx-auto mt-2 max-w-2xl px-2 text-[15px] leading-relaxed text-[#7d7d7d] sm:px-0">
            I typically respond within 24–48 hours on business days. For urgent inquiries, mention it in the subject line.
          </p>
          <Link
            to="/start-project"
            className="mt-8 inline-block text-[15px] font-semibold text-[#00c282] underline underline-offset-4 hover:opacity-90"
          >
            Prefer a structured brief? Start a project →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
