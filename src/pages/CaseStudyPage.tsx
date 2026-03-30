import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import arrowRight from "../assets/icons/arrow-right.svg";

function RoleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DurationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00c282" strokeWidth="1.5"/>
      <path d="M12 6v6l4 2" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OutcomeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4 12 14.01l-3-3" stroke="#00c282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const shell = "max-w-[1152px] mx-auto px-6 sm:px-12 lg:px-[172.5px]";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject =
    projectIndex >= 0 && projectIndex < PROJECTS.length - 1
      ? PROJECTS[projectIndex + 1]
      : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-white pt-[73px]">
        <div className={`${shell} py-[72px]`}>
          <h1 className="text-2xl font-bold text-[#0a0a0a]">Project not found</h1>
          <p className="mt-3 text-[15.75px] text-[#4a5565]">
            We couldn't find a case study for this URL.
          </p>
          <Link
            to="/portfolio"
            className="mt-6 inline-flex items-center gap-2 text-[15.75px] font-medium text-[#00c282]"
          >
            <img src={arrowRight} alt="" className="h-[18px] w-[18px] rotate-180" style={{ filter: "brightness(0) saturate(100%) invert(55%) sepia(86%) saturate(1200%) hue-rotate(118deg) brightness(96%) contrast(101%)" }} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[73px]">
      {/* Back to Portfolio */}
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb]">
        <div className="max-w-[1497px] mx-auto px-[195px] py-[27px]">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[9.25px] text-[15.75px] font-medium text-[#4a5565] transition-colors hover:text-[#0a0a0a]"
          >
            <img src={arrowRight} alt="" className="h-[18px] w-[18px] rotate-180 opacity-60" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Title Section */}
      <section className="border-b border-[#e5e7eb] bg-white py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h1 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">
              {project.caseStudyTitle}
            </h1>
            <p className="mt-[18px] text-[20.25px] leading-[31.5px] text-[#4a5565]">
              {project.caseStudySubtitle}
            </p>

            {/* Metadata */}
            <div className="mt-[36px] flex flex-wrap gap-x-[27px] gap-y-4">
              <div className="flex items-start gap-[13.5px]">
                <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[rgba(0,194,130,0.1)]">
                  <RoleIcon />
                </div>
                <div>
                  <p className="text-[15.75px] leading-[22.5px] text-[#4a5565]">Role</p>
                  <p className="text-[18px] leading-[27px] text-[#0a0a0a]">{project.role}</p>
                </div>
              </div>

              <div className="flex items-start gap-[13.5px]">
                <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[rgba(0,194,130,0.1)]">
                  <DurationIcon />
                </div>
                <div>
                  <p className="text-[15.75px] leading-[22.5px] text-[#4a5565]">Duration</p>
                  <p className="text-[18px] leading-[27px] text-[#0a0a0a]">{project.duration}</p>
                </div>
              </div>

              {project.team && (
                <div className="flex items-start gap-[13.5px]">
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full bg-[rgba(0,194,130,0.1)]">
                    <TeamIcon />
                  </div>
                  <div>
                    <p className="text-[15.75px] leading-[22.5px] text-[#4a5565]">Team</p>
                    <p className="text-[18px] leading-[27px] text-[#0a0a0a]">{project.team}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">Overview</h2>
            <p className="mt-[27px] text-[18px] leading-[31.5px] text-[#4a5565] whitespace-pre-line">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">The Problem</h2>
            <p className="mt-[27px] text-[18px] leading-[31.5px] text-[#4a5565] whitespace-pre-line">
              {project.problem}
            </p>
          </div>
        </div>
      </section>

      {/* Research & Insights */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">Research &amp; Insights</h2>
            <p className="mt-[27px] text-[18px] leading-[31.5px] text-[#4a5565] whitespace-pre-line">
              {project.research}
            </p>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">Design Process</h2>
            <div className="mt-[36px] grid grid-cols-3 gap-[27px]">
              {project.designProcess.map((step, index) => (
                <div key={step.title} className="rounded-[18px] border border-[#e5e7eb] p-7">
                  <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[rgba(0,194,130,0.1)] text-[15.75px] font-bold text-[#00c282]">
                    {index + 1}
                  </div>
                  <h3 className="mt-[22px] text-[18px] font-semibold leading-[27px] text-[#0a0a0a]">
                    {step.title}
                  </h3>
                  <p className="mt-[9px] text-[15.75px] leading-[22.5px] text-[#4a5565]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">The Solution</h2>
            <p className="mt-[27px] text-[18px] leading-[31.5px] text-[#4a5565] whitespace-pre-line">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes & Impact */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">Outcomes &amp; Impact</h2>
            <div className="mt-[36px] grid grid-cols-3 gap-[36px]">
              {project.outcomes.map((outcome) => (
                <div key={outcome.title} className="flex flex-col items-center text-center">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[rgba(0,194,130,0.08)]">
                    <OutcomeIcon />
                  </div>
                  <h3 className="mt-[18px] text-[33.75px] font-bold leading-[45px] text-[#0a0a0a]">
                    {outcome.title}
                  </h3>
                  <p className="text-[18px] leading-[27px] text-[#4a5565]">
                    {outcome.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-[72px]">
        <div className={shell}>
          <div className="px-[36px]">
            <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">Key Learnings</h2>
            <p className="mt-[27px] text-[18px] leading-[31.5px] text-[#4a5565] whitespace-pre-line">
              {project.keyLearnings}
            </p>
          </div>
        </div>
      </section>

      {/* Full case study presentation (Figma / deck export) */}
      <section className="border-t border-[#e5e7eb] bg-[#f9fafb] py-[72px]">
        <div className="mx-auto w-full max-w-[min(100%,1400px)] px-4 sm:px-8">
          <h2 className="text-center text-[24px] font-bold leading-[30px] text-[#0a0a0a]">
            Full case study
          </h2>
          <p className="mx-auto mt-[13px] max-w-[720px] text-center text-[18px] leading-[27px] text-[#4a5565]">
            Complete visual walkthrough—process, wireframes, UI, and final screens for{" "}
            {project.title}.
          </p>
          <div className="mt-10 overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white shadow-sm">
            <img
              src={project.caseStudyBoard}
              alt={`${project.title} — full case study presentation`}
              sizes="(max-width: 1400px) 100vw, 1400px"
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full max-w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="border-t border-[#e5e7eb] bg-white py-[54px]">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="text-[15.75px] font-medium uppercase tracking-wide text-[#00c282]">
              Next project
            </p>
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="mt-4 flex flex-col gap-6 rounded-[18px] border border-[#e5e7eb] bg-[#f9fafb] p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
            >
              <div
                className="relative w-full shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6] sm:w-[min(100%,360px)]"
                style={{ aspectRatio: "16 / 10" }}
              >
                <img
                  src={nextProject.thumbnail}
                  alt=""
                  className="absolute left-1/2 top-1/2 max-h-[92%] max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <h3 className="text-[22.5px] font-bold text-[#0a0a0a]">{nextProject.title}</h3>
                <p className="mt-2 text-[15.75px] text-[#4a5565]">{nextProject.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[15.75px] font-medium text-[#00c282]">
                  View case study
                  <img
                    src={arrowRight}
                    alt=""
                    className="h-[18px] w-[18px]"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(55%) sepia(86%) saturate(1200%) hue-rotate(118deg) brightness(96%) contrast(101%)",
                    }}
                  />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* CTA: Interested in Working Together? */}
      <section className="border-t border-[#e5e7eb] py-[73px]">
        <div className={`${shell} text-center`}>
          <h2 className="text-[24px] font-bold leading-[27px] text-[#0a0a0a]">
            Interested in Working Together?
          </h2>
          <p className="mx-auto mt-[18px] text-[18px] leading-[27px] text-[#4a5565]">
            Let's discuss how I can help solve your design challenges.
          </p>
          <Link
            to="/portfolio"
            className="mt-[36px] inline-flex items-center justify-center rounded-[9.25px] bg-[#00c282] px-[27px] py-[11px] text-[15.75px] font-medium text-white transition-opacity hover:opacity-90"
          >
            View More Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
