import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  appendLeadToSheet,
  buildWhatsAppHref,
  isGoogleSheetConfigured,
  isWhatsAppConfigured,
} from "../lib/formSubmit";

const SERVICES = [
  { id: "ux-research", emoji: "🔍", label: "UX Research" },
  { id: "ui-design", emoji: "🎨", label: "UI Design" },
  { id: "product-design", emoji: "📱", label: "Product Design" },
  { id: "redesign", emoji: "🔄", label: "Redesign / Audit" },
  { id: "design-system", emoji: "🎯", label: "Design System" },
  { id: "mvp", emoji: "🚀", label: "MVP / Startup Product" },
] as const;

const INDUSTRIES = [
  { id: "fintech", emoji: "💳", label: "Fintech" },
  { id: "ecommerce", emoji: "🛍️", label: "E-commerce" },
  { id: "saas", emoji: "💻", label: "SaaS" },
  { id: "mobility", emoji: "🚗", label: "Mobility / Logistics" },
  { id: "healthcare", emoji: "🏥", label: "Healthcare" },
  { id: "other", emoji: "🌐", label: "Other" },
] as const;

const TEAM_TYPES = ["Solo Founder", "Startup", "Company", "Agency"] as const;
const PROJECT_STAGES = ["Idea", "MVP", "Live Product"] as const;
const TIMELINES = ["ASAP", "1–3 months", "Flexible"] as const;

function CheckIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function labelForServiceId(id: string): string | undefined {
  return SERVICES.find((s) => s.id === id)?.label;
}

function labelForIndustryId(id: string): string | undefined {
  return INDUSTRIES.find((i) => i.id === id)?.label;
}

export function StartProjectPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [services, setServices] = useState<Set<string>>(new Set());
  const [industries, setIndustries] = useState<Set<string>>(new Set());
  const [teamType, setTeamType] = useState<string | null>(null);
  const [projectStage, setProjectStage] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function buildBriefSummary(): string {
    const lines: string[] = [];
    if (services.size) {
      lines.push(
        `Services: ${[...services].map((id) => labelForServiceId(id)).filter(Boolean).join(", ")}`
      );
    }
    if (industries.size) {
      lines.push(
        `Industry: ${[...industries].map((id) => labelForIndustryId(id)).filter(Boolean).join(", ")}`
      );
    }
    if (teamType) lines.push(`Team: ${teamType}`);
    if (projectStage) lines.push(`Project stage: ${projectStage}`);
    if (timeline) lines.push(`Timeline: ${timeline}`);
    if (notes.trim()) lines.push(`Additional notes: ${notes.trim()}`);
    return lines.join("\n");
  }

  useEffect(() => {
    if (step !== 4) return;
    setContactMessage((prev) => (prev.trim() ? prev : buildBriefSummary()));
    // Intentionally only react to step — summary reads latest wizard state when entering step 4.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function submitProject() {
    const elName = document.getElementById("sp-contact-name") as HTMLInputElement | null;
    const elEmail = document.getElementById("sp-contact-email") as HTMLInputElement | null;
    const elSubj = document.getElementById("sp-contact-subject") as HTMLInputElement | null;
    const elMsg = document.getElementById("sp-contact-message") as HTMLTextAreaElement | null;
    if (
      !elName?.checkValidity() ||
      !elEmail?.checkValidity() ||
      !elSubj?.checkValidity() ||
      !elMsg?.checkValidity()
    ) {
      elName?.reportValidity();
      elEmail?.reportValidity();
      elSubj?.reportValidity();
      elMsg?.reportValidity();
      return;
    }

    const phoneLine = contactPhone.trim() ? `\nPhone: ${contactPhone.trim()}` : "";
    const bodyText = `${contactMessage}${phoneLine}\n\n— ${contactName} <${contactEmail}>`;
    const subj = contactSubject.trim() || "Project inquiry";

    setSubmitting(true);
    try {
      await appendLeadToSheet({
        form: "start-project",
        name: contactName.trim(),
        email: contactEmail.trim(),
        phone: contactPhone.trim() || undefined,
        subject: subj,
        message: contactMessage.trim(),
        extras: buildBriefSummary(),
      });

      if (isWhatsAppConfigured()) {
        const href = buildWhatsAppHref(`*${subj}*\n\n${bodyText}`);
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }

      setStep(5);
    } finally {
      setSubmitting(false);
    }
  }

  const toggleSet = (set: Set<string>, id: string, update: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    update(next);
  };

  const lineClass = (stepNum: number) =>
    step > stepNum ? "bg-[#00c282]" : "bg-[#e5e7eb]";

  const circleClass = (stepNum: number) =>
    step >= stepNum
      ? "bg-[#00c282] text-white"
      : "bg-[#e5e7eb] text-[#4a5565]";

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 pt-[73px] font-sans text-[#0a0a0a]">
      <div className="relative mx-auto mb-12 mt-[54px] max-w-[756px] rounded-[18px] bg-white p-[54px] shadow-lg">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-[#4a5565] transition-colors hover:bg-[#f3f4f6] hover:text-[#0a0a0a]"
          aria-label="Close"
        >
          ×
        </button>

        {step < 5 && (
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-center gap-0">
              <div
                className={`flex size-[45px] shrink-0 items-center justify-center rounded-full text-base font-bold ${circleClass(1)}`}
              >
                1
              </div>
              <div className={`mx-1 h-[5px] w-8 sm:w-16 ${lineClass(1)}`} />
              <div
                className={`flex size-[45px] shrink-0 items-center justify-center rounded-full text-base font-bold ${circleClass(2)}`}
              >
                2
              </div>
              <div className={`mx-1 h-[5px] w-8 sm:w-16 ${lineClass(2)}`} />
              <div
                className={`flex size-[45px] shrink-0 items-center justify-center rounded-full text-base font-bold ${circleClass(3)}`}
              >
                3
              </div>
              <div className={`mx-1 h-[5px] w-8 sm:w-16 ${lineClass(3)}`} />
              <div
                className={`flex size-[45px] shrink-0 items-center justify-center rounded-full text-base font-bold ${circleClass(4)}`}
              >
                4
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[#4a5565]">
              Step {step} of 4
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-[24px] font-bold text-[#0a0a0a]">
              What do you need help with?
            </h1>
            <p className="mt-2 text-base text-[#4a5565]">
              Select one or more services (you can choose multiple)
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => {
                const selected = services.has(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      toggleSet(services, s.id, (next) => setServices(next))
                    }
                    className={`flex items-center gap-3 rounded-[12px] border p-5 text-left text-[#0a0a0a] transition-colors ${
                      selected
                        ? "border-[#00c282] bg-[rgba(0,194,130,0.05)]"
                        : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden>
                      {s.emoji}
                    </span>
                    <span className="font-medium">{s.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-[9.25px] bg-[#00c282] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-[24px] font-bold text-[#0a0a0a]">
              Your Industry
            </h1>
            <p className="mt-2 text-base text-[#4a5565]">
              Help me understand your business context
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {INDUSTRIES.map((ind) => {
                const selected = industries.has(ind.id);
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() =>
                      toggleSet(industries, ind.id, (next) =>
                        setIndustries(next)
                      )
                    }
                    className={`flex items-center gap-3 rounded-[12px] border p-5 text-left text-[#0a0a0a] transition-colors ${
                      selected
                        ? "border-[#00c282] bg-[rgba(0,194,130,0.05)]"
                        : "border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden>
                      {ind.emoji}
                    </span>
                    <span className="font-medium">{ind.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-10 flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-[9.25px] border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#f9fafb]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-[9.25px] bg-[#00c282] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-[24px] font-bold text-[#0a0a0a]">
              Your Team &amp; Timeline
            </h1>
            <p className="mt-2 text-base text-[#4a5565]">
              Let&apos;s understand where you are in your journey
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <p className="mb-3 text-sm font-bold text-[#0a0a0a]">
                  Team Type
                </p>
                <div className="flex flex-wrap gap-3">
                  {TEAM_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTeamType(t)}
                      className={`min-w-0 flex-1 rounded-[9.25px] border py-4 text-center text-sm font-medium transition-colors sm:flex-none sm:px-6 ${
                        teamType === t
                          ? "border-[#00c282] bg-[rgba(0,194,130,0.05)] text-[#0a0a0a]"
                          : "border-[#e5e7eb] bg-white text-[#0a0a0a] hover:bg-[#f9fafb]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-[#0a0a0a]">
                  Project Stage
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROJECT_STAGES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProjectStage(p)}
                      className={`flex-1 rounded-[9.25px] border py-4 text-center text-sm font-medium transition-colors sm:flex-none sm:px-8 ${
                        projectStage === p
                          ? "border-[#00c282] bg-[rgba(0,194,130,0.05)] text-[#0a0a0a]"
                          : "border-[#e5e7eb] bg-white text-[#0a0a0a] hover:bg-[#f9fafb]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-[#0a0a0a]">
                  Timeline
                </p>
                <div className="flex flex-wrap gap-3">
                  {TIMELINES.map((tl) => (
                    <button
                      key={tl}
                      type="button"
                      onClick={() => setTimeline(tl)}
                      className={`flex-1 rounded-[9.25px] border py-4 text-center text-sm font-medium transition-colors sm:flex-none sm:px-8 ${
                        timeline === tl
                          ? "border-[#00c282] bg-[rgba(0,194,130,0.05)] text-[#0a0a0a]"
                          : "border-[#e5e7eb] bg-white text-[#0a0a0a] hover:bg-[#f9fafb]"
                      }`}
                    >
                      {tl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-notes"
                  className="mb-2 block text-sm font-bold text-[#0a0a0a]"
                >
                  Anything else I should know? (Optional)
                </label>
                <textarea
                  id="project-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell me more about your project..."
                  rows={4}
                  className="w-full resize-y rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-[9.25px] border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#f9fafb]"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="rounded-[9.25px] bg-[#00c282] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-[24px] font-bold text-[#0a0a0a]">Your contact details</h1>
            <p className="mt-2 text-base text-[#4a5565]">
              How can I reach you? I&apos;ll use this to follow up about your project.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="sp-contact-name" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Full name
                </label>
                <input
                  id="sp-contact-name"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                  className="w-full rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
              <div>
                <label htmlFor="sp-contact-email" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Email
                </label>
                <input
                  id="sp-contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="w-full rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
              <div>
                <label htmlFor="sp-contact-phone" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Phone <span className="font-normal text-[#4a5565]">(optional)</span>
                </label>
                <input
                  id="sp-contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  autoComplete="tel"
                  placeholder="+00 000 000 0000"
                  className="w-full rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
              <div>
                <label htmlFor="sp-contact-subject" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Subject
                </label>
                <input
                  id="sp-contact-subject"
                  required
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="Project inquiry"
                  className="w-full rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
              <div>
                <label htmlFor="sp-contact-message" className="mb-2 block text-sm font-bold text-[#0a0a0a]">
                  Message
                </label>
                <textarea
                  id="sp-contact-message"
                  required
                  rows={5}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Anything else you'd like to share..."
                  className="w-full resize-y rounded-[12px] border border-[#e5e7eb] bg-white px-4 py-3 text-[15px] text-[#0a0a0a] placeholder:text-[#99a1af] focus:border-[#00c282] focus:outline-none focus:ring-2 focus:ring-[#00c282]/20"
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-[9.25px] border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#f9fafb]"
              >
                ← Back
              </button>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => void submitProject()}
                  className="rounded-[9.25px] bg-[#00c282] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Saving…"
                    : isWhatsAppConfigured()
                      ? "Submit & open WhatsApp"
                      : "Submit"}
                </button>
              </div>
            </div>

            {isGoogleSheetConfigured() ? (
              <p className="mt-4 text-center text-xs text-[#6a7282] sm:text-right">
                Details are saved to the sheet first; then WhatsApp opens if enabled.
              </p>
            ) : isWhatsAppConfigured() ? (
              <p className="mt-4 text-center text-xs text-[#6a7282] sm:text-right">
                WhatsApp will open with your project summary.
              </p>
            ) : null}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center pt-4 text-center">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00c282]"
              aria-hidden
            >
              <CheckIcon />
            </div>
            <h1 className="mt-8 text-[24px] font-bold text-[#0a0a0a]">
              Thank You!
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#4a5565]">
              Your project details have been submitted. I&apos;ll review them and get back to you within
              24 hours.
            </p>
            <Link
              to="/portfolio"
              className="mt-10 inline-flex items-center rounded-[9.25px] bg-[#00c282] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Explore Portfolio →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default StartProjectPage;
