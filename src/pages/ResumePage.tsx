import type { ReactNode } from "react";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionIcon() {
  return (
    <div
      className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#00c282]"
      aria-hidden
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-4 py-2 text-sm text-[#0a0a0a]">
      {children}
    </span>
  );
}

export function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] pt-[73px] font-sans text-[#0a0a0a]">
      <header className="border-b border-[#e5e7eb] bg-[#f9fafb]">
        <div className="mx-auto max-w-[1080px] px-[208.5px] py-10">
          <div className="px-[36px] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[24px] font-bold leading-tight text-[#0a0a0a]">
                Resume
              </h1>
              <p className="mt-2 text-base text-[#4a5565]">
                My professional experience, education, and skills.
              </p>
            </div>
            <a
              href="/cv.pdf"
              download="Mohammed-Helaly-CV.pdf"
              className="inline-flex items-center justify-center gap-2 self-start rounded-[9.25px] border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-medium text-[#0a0a0a] transition-colors hover:bg-[#f3f4f6]"
            >
              <DownloadIcon className="text-[#0a0a0a]" />
              Download CV
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1080px] px-[208.5px] pb-20">
        {/* Experience */}
        <section className="px-[36px] pt-12">
          <div className="mb-8 flex items-center gap-4">
            <SectionIcon />
            <h2 className="text-xl font-bold text-[#0a0a0a]">Experience</h2>
          </div>

          <div className="flex flex-col gap-6">
            <article className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
              <h3 className="text-lg font-bold text-[#00c282]">UX/UI Designer</h3>
              <p className="mt-1 font-semibold text-[#0a0a0a]">Supercommerce</p>
              <p className="mt-1 text-sm text-[#4a5565]">April 2024 – Present</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4a5565]">
                Conducted user research through interviews, surveys, and usability
                testing to gather insights and inform design decisions.
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0a0a0a]">
                Key Achievements:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-[#4a5565]">
                <li>Supported the introduction of new UI components</li>
                <li>Collaborated in cross-functional design reviews</li>
                <li>Redesigned core product flows</li>
                <li>Created and maintained design systems</li>
              </ul>
            </article>

            <article className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
              <h3 className="text-lg font-bold text-[#00c282]">UX/UI Designer</h3>
              <p className="mt-1 font-semibold text-[#0a0a0a]">Evertizing</p>
              <p className="mt-1 text-sm text-[#4a5565]">January 2023 – Present</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4a5565]">
                Optimized the checkout form, leading to a 20% decrease in user
                drop-offs during the three months of the redesign by conducting user
                research and A/B testing.
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0a0a0a]">
                Key Achievement:
              </p>
              <p className="mt-2 text-[15px] text-[#4a5565]">
                Successfully launched a new mobile app that was downloaded over
                100,000 times in the first three months, with a 4/5 user rating on
                app stores
              </p>
            </article>

            <article className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
              <h3 className="text-lg font-bold text-[#00c282]">
                Junior UX/UI Designer
              </h3>
              <p className="mt-1 font-semibold text-[#0a0a0a]">
                Be Smart Solutions
              </p>
              <p className="mt-1 text-sm text-[#4a5565]">
                October 2021 – September 2022
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4a5565]">
                Conducted user research through interviews, surveys, and usability
                testing to gather insights and inform design decisions.
              </p>
              <p className="mt-4 text-sm font-semibold text-[#0a0a0a]">
                Key Achievements:
              </p>
              <p className="mt-2 text-[15px] text-[#4a5565]">
                Collaborated with product managers, developers, and stakeholders to
                define the product requirements and design solutions
              </p>
            </article>
          </div>
        </section>

        {/* Education */}
        <section className="px-[36px] pt-16">
          <div className="mb-8 flex items-center gap-4">
            <SectionIcon />
            <h2 className="text-xl font-bold text-[#0a0a0a]">Education</h2>
          </div>
          <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
            <h3 className="text-lg font-bold text-[#00c282]">
              BSc. Computer Science (Software Industry and Multimedia)
            </h3>
            <p className="mt-1 font-semibold text-[#0a0a0a]">
              Alexandria University
            </p>
            <p className="mt-1 text-sm text-[#4a5565]">October 2021 – July 2025</p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#4a5565]">
              Strong foundation in computer science principles including algorithms,
              data structures, software engineering, databases, and human–computer
              interaction. Coursework emphasized multimedia systems, web technologies,
              and applying UX methods within software product development.
            </p>
          </div>
        </section>

        {/* Certifications */}
        <section className="px-[36px] pt-16">
          <div className="mb-8 flex items-center gap-4">
            <SectionIcon />
            <h2 className="text-xl font-bold text-[#0a0a0a]">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
              <p className="font-semibold text-[#0a0a0a]">
                Google UX Design Professional Certificate
              </p>
              <p className="mt-2 text-sm text-[#4a5565]">2022</p>
            </div>
            <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
              <p className="font-semibold text-[#0a0a0a]">
                Interaction Design Foundation - UX Management
              </p>
              <p className="mt-2 text-sm text-[#4a5565]">2023</p>
            </div>
          </div>
        </section>

        {/* Skills & Tools */}
        <section className="px-[36px] pt-16">
          <div className="mb-8 flex items-center gap-4">
            <SectionIcon />
            <h2 className="text-xl font-bold text-[#0a0a0a]">
              Skills &amp; Tools
            </h2>
          </div>
          <div className="space-y-8 rounded-[18px] border border-[#e5e7eb] bg-white p-[37px]">
            <div>
              <h3 className="mb-3 text-sm font-bold text-[#0a0a0a]">
                Design Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Visual Design",
                  "Interaction Design",
                  "Design Systems",
                  "Usability Testing",
                  "Information Architecture",
                ].map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-[#0a0a0a]">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Figma",
                  "Adobe XD",
                  "Sketch",
                  "Framer",
                  "Procope",
                  "Principle",
                  "Miro",
                  "FigJam",
                  "Notion",
                ].map((tool) => (
                  <Pill key={tool}>{tool}</Pill>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-[#0a0a0a]">
                Methodologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Design Thinking",
                  "Agile/Scrum",
                  "User-Centered Design",
                  "Design Sprints",
                  "A/B Testing",
                  "Lean UX",
                ].map((m) => (
                  <Pill key={m}>{m}</Pill>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ResumePage;
