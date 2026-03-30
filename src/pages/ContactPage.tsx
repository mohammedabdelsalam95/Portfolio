import { useState } from "react";
import { Link } from "react-router-dom";
import socialLinkedin from "../assets/icons/social-linkedin.svg";
import socialBehance from "../assets/icons/social-behance.svg";
import socialEmail from "../assets/icons/social-email.svg";
import { CONTACT_EMAIL } from "../config/contact";
import {
  appendLeadToSheet,
  buildMailtoHref,
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
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function sendVia(channel: "email" | "whatsapp") {
    const form = document.getElementById("contact-form") as HTMLFormElement | null;
    if (!form?.checkValidity()) {
      form?.reportValidity();
      return;
    }

    const subj = subject.trim() || "Portfolio contact";
    const bodyText = `${message}\n\n— ${name} <${email}>`;

    appendLeadToSheet({
      form: "contact",
      name: name.trim(),
      email: email.trim(),
      subject: subj,
      message: message.trim(),
    });

    if (channel === "email") {
      window.location.href = buildMailtoHref(subj, bodyText);
    } else {
      const href = buildWhatsAppHref(`*${subj}*\n\n${bodyText}`);
      if (href) window.open(href, "_blank", "noopener,noreferrer");
    }
    setSent(true);
  }

  return (
    <div className="font-[Manrope] text-[#0a0a0a]">
      <header
        className="px-6 py-[72px] text-center sm:py-[90px]"
        style={{
          background:
            "linear-gradient(171deg, rgba(0, 194, 130, 0.05) 0%, rgba(0, 194, 130, 0.1) 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-[#0a0a0a] sm:text-[27px]">Let&apos;s Connect</h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#7d7d7d]">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
        </p>
      </header>

      <section className="mx-auto max-w-[1080px] px-6 py-14 sm:py-[72px]">
        <h2 className="mb-10 text-center text-lg font-bold sm:text-xl">Get in Touch</h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-[#00c282]">
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 block text-[15px] font-medium text-[#0a0a0a] underline decoration-[#00c282]/40 underline-offset-2 hover:text-[#00c282]"
              >
                {CONTACT_EMAIL}
              </a>
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
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex size-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white transition-colors hover:border-[#00c282]"
                  aria-label="Email"
                >
                  <img src={socialEmail} alt="" className="size-5" />
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
                onClick={() => sendVia("email")}
                className="w-full rounded-lg bg-[#00c282] py-3.5 text-[15px] font-semibold text-white transition hover:brightness-105 sm:w-auto sm:min-w-[160px] sm:px-8"
              >
                Send with email
              </button>
              {isWhatsAppConfigured() ? (
                <button
                  type="button"
                  onClick={() => sendVia("whatsapp")}
                  className="w-full rounded-lg border-2 border-[#25D366] bg-white py-3.5 text-[15px] font-semibold text-[#128C7E] transition hover:bg-[#25D366]/5 sm:w-auto sm:min-w-[160px] sm:px-8"
                >
                  Send with WhatsApp
                </button>
              ) : null}
            </div>

            {isGoogleSheetConfigured() ? (
              <p className="mt-3 text-xs leading-relaxed text-[#6a7282]">
                A copy may be saved to my Google Sheet when you send (no account required).
              </p>
            ) : null}

            {sent ? (
              <p className="mt-4 text-sm text-[#007a55]">
                If nothing opened, email me at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                {isWhatsAppConfigured() ? (
                  <>
                    or use{" "}
                    <a
                      href={buildWhatsAppHref("Hi — reaching out from your portfolio.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      WhatsApp
                    </a>
                  </>
                ) : null}
                .
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section
        className="border-t border-[#f2f2f2] px-6 py-12 text-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 194, 130, 0.06) 0%, rgba(0, 194, 130, 0.02) 100%)",
        }}
      >
        <h3 className="text-base font-bold text-[#0a0a0a]">Response time</h3>
        <p className="mx-auto mt-2 max-w-lg text-[15px] text-[#7d7d7d]">
          I typically respond within 24–48 hours on business days. For urgent inquiries, mention it in the subject line.
        </p>
        <Link
          to="/start-project"
          className="mt-8 inline-block text-[15px] font-semibold text-[#00c282] underline underline-offset-4 hover:opacity-90"
        >
          Prefer a structured brief? Start a project →
        </Link>
      </section>
    </div>
  );
}

export default ContactPage;
