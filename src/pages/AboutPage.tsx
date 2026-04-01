import { Link } from "react-router-dom";
import { PAGE_GUTTERS, PAGE_MAX_W } from "../constants/pageLayout";
import aboutImg from "../assets/images/about-me.jpg";
import arrowRight from "../assets/icons/arrow-right.svg";

const STORY_PARAS = [
  "I discovered my passion for design while working as a Graphic Designer. I was fascinated by how small design decisions could dramatically impact user experience and business outcomes.",
  "Over the past 5+ years, I've had the privilege of working with startups and established companies across fintech, healthcare, and e-commerce. Each project has taught me something new about users, technology, and the art of simplifying complexity.",
  "Today, I help companies create products that users love. I approach every project with curiosity, empathy, and a commitment to delivering real value—not just pretty interfaces.",
];

const VALUES: { title: string; body: string; icon: "heart" | "spark" | "users" | "book" }[] = [
  {
    title: "User Empathy",
    body: "I believe great design starts with deeply understanding user needs and pain points.",
    icon: "heart",
  },
  {
    title: "Creative Problem Solving",
    body: "Every design challenge is an opportunity to create innovative, elegant solutions.",
    icon: "spark",
  },
  {
    title: "Collaboration",
    body: "The best outcomes emerge from close collaboration between design, product, and engineering.",
    icon: "users",
  },
  {
    title: "Continuous Learning",
    body: "Design evolves constantly, and I stay curious about new tools, trends, and methodologies.",
    icon: "book",
  },
];

const JOURNEY: {
  year: string;
  title: string;
  body: string;
  side: "left" | "right";
}[] = [
  {
    year: "2021",
    title: "Started The Journey",
    body: "Began learning UX/UI design fundamentals and working on freelance projects.",
    side: "left",
  },
  {
    year: "2021",
    title: "Joined BeSmartSolutions",
    body: "First full-time role as a UX/UI Designer at a promising tech startup, leading design for various platforms and apps.",
    side: "right",
  },
  {
    year: "2023",
    title: "Web Designer Role in Alex Logistics Co.",
    body: "Promoted to Web Designer, managing the design system of the company website and platform.",
    side: "left",
  },
  {
    year: "2025",
    title: "UX/UI Designer in Supercommerce",
    body: "Joined an e-commerce company, working on the latest design trends and AI integration in the design process.",
    side: "right",
  },
];

const TOOL_PILLS = [
  "Figma",
  "Adobe XD",
  "Sketch",
  "Framer",
  "Protopie",
  "Principle",
  "User Research",
  "Usability Testing",
  "Information Architecture",
  "Design Systems",
  "Interaction Design",
  "Prototyping",
];

type Values = typeof VALUES;

function ValueIcon({ kind }: { kind: Values[number]["icon"] }) {
  const stroke = "#00c282";
  const className = "size-[27px]";
  switch (kind) {
    case "heart":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 21s-7-4.5-9-9c-1.5-3 0-6 3-6 1.5 0 3 1 3 3 0-2 1.5-3 3-3 3 0 4.5 3 3 6-2 4.5-9 9-9 9z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "spark":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10l1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10L18.4 5.6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "book":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function AboutPage() {
  return (
    <div className="font-[Manrope] text-slate-900 pt-[72px]">
      {/* Hero — extra top padding below fixed nav */}
      <header
        className={`flex flex-col items-center justify-center gap-4 pb-[72px] pt-12 text-center sm:pb-[90px] sm:pt-16 md:pt-20 ${PAGE_GUTTERS}`}
        style={{
          background:
            "linear-gradient(138deg, rgba(0, 194, 130, 0.05) 0%, rgba(0, 194, 130, 0.1) 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-[#0a0a0a] sm:text-[24px]">About Me</h1>
        <p className="mx-auto max-w-2xl text-[15px] leading-7 text-[#7d7d7d]">
          A passionate designer dedicated to creating meaningful digital experiences
        </p>
      </header>

      {/* My Story */}
      <section className={`${PAGE_MAX_W} ${PAGE_GUTTERS} py-14 sm:py-[72px]`}>
        <h2 className="mb-10 text-left text-lg font-bold text-[#0a0a0a] sm:text-xl">My Story</h2>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-12">
          <div className="max-w-[65ch] space-y-5 text-[15px] leading-7 text-[#7d7d7d] lg:max-w-none">
            {STORY_PARAS.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#00c282] shadow-[0px_10px_42px_rgba(0,194,130,0.32),0px_4px_20px_rgba(0,0,0,0.1)]">
            <img src={aboutImg} alt="" className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      {/* My Values */}
      <section className={`border-t border-[#f2f2f2] bg-slate-50/80 py-14 sm:py-[72px] ${PAGE_GUTTERS}`}>
        <div className={PAGE_MAX_W}>
          <h2 className="mb-10 text-center text-lg font-bold text-[#0a0a0a] sm:text-xl">My Values</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="rounded-lg border border-[#d5d7da] bg-white p-5 sm:p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <ValueIcon kind={v.icon} />
                  <h3 className="text-[15px] font-bold text-[#0a0a0a]">{v.title}</h3>
                </div>
                <p className="text-[13px] leading-6 text-[#7d7d7d]">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* My Journey — dots sit on center axis; no stretched spacer column */}
      <section className={`${PAGE_MAX_W} ${PAGE_GUTTERS} py-14 sm:py-[72px]`}>
        <h2 className="mb-12 text-center text-lg font-bold text-[#0a0a0a] sm:text-xl">My Journey</h2>
        <div className="relative">
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-0 -translate-x-1/2 border-l border-dashed border-[#d5d7da] sm:block"
            aria-hidden
          />
          <ul className="space-y-10 sm:space-y-12">
            {JOURNEY.map((item) => (
              <li
                key={item.title}
                className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-start sm:gap-x-10"
              >
                <span
                  className="pointer-events-none absolute left-1/2 top-[1.375rem] z-[1] hidden size-[14px] -translate-x-1/2 rounded-full border-[3px] border-[#00c282] bg-white sm:block"
                  aria-hidden
                />
                {item.side === "left" ? (
                  <>
                    <div className="rounded-lg border border-[#d5d7da] bg-white p-5 sm:p-6 sm:pr-8 sm:text-right">
                      <p className="mb-2 text-sm font-bold text-[#00c282]">{item.year}</p>
                      <h3 className="mb-2 text-[15px] font-bold text-[#0a0a0a]">{item.title}</h3>
                      <p className="text-[13px] leading-6 text-[#7d7d7d]">{item.body}</p>
                    </div>
                    <div className="hidden min-h-0 sm:block" aria-hidden />
                  </>
                ) : (
                  <>
                    <div className="hidden min-h-0 sm:block" aria-hidden />
                    <div className="rounded-lg border border-[#d5d7da] bg-white p-5 sm:p-6 sm:pl-8">
                      <p className="mb-2 text-sm font-bold text-[#00c282]">{item.year}</p>
                      <h3 className="mb-2 text-[15px] font-bold text-[#0a0a0a]">{item.title}</h3>
                      <p className="text-[13px] leading-6 text-[#7d7d7d]">{item.body}</p>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools & Skills */}
      <section className={`border-t border-[#f2f2f2] bg-slate-50/80 py-14 sm:py-[72px] ${PAGE_GUTTERS}`}>
        <div className={PAGE_MAX_W}>
          <h2 className="mb-10 text-center text-lg font-bold text-[#0a0a0a] sm:text-xl">Tools &amp; Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOL_PILLS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#00c282] bg-[rgba(0,194,130,0.06)] px-4 py-2 text-[13px] font-medium text-[#0a0a0a]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${PAGE_MAX_W} ${PAGE_GUTTERS} py-16 sm:py-20`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-lg font-bold text-[#0a0a0a] sm:text-xl">Interested in working together?</h2>
          <p className="mx-auto max-w-xl px-2 text-[15px] text-[#7d7d7d] sm:px-0">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate.
          </p>
          <Link
            to="/start-project"
            className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#00c282] px-6 py-3 text-[15px] font-semibold text-white transition hover:brightness-105"
          >
            Let&apos;s Connect
            <img src={arrowRight} alt="" className="size-4 brightness-0 invert" />
          </Link>
        </div>
      </section>
    </div>
  );
}
