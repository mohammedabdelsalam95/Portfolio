import { Link } from "react-router-dom";
import heroImg from "../assets/images/hero-profile.png";
import mhLogo from "../assets/images/mh-logo.png";
import projectsIcon from "../assets/icons/projects.svg";
import clientsIcon from "../assets/icons/clients.svg";
import experienceIcon from "../assets/icons/experience.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const STATS = [
  { icon: projectsIcon, value: "10+", label: "Projects Completed" },
  { icon: clientsIcon, value: "15+", label: "Happy Clients" },
  { icon: experienceIcon, value: "3+", label: "Years Experience" },
];

const SERVICES = [
  { emoji: "🔍", title: "UX Research", desc: "Understanding user needs through interviews, surveys, and usability testing." },
  { emoji: "🎨", title: "UI Design", desc: "Crafting beautiful, accessible interfaces that users love to interact with." },
  { emoji: "🎯", title: "Design Systems", desc: "Building scalable design systems for consistency across your product." },
  { emoji: "⚡", title: "Prototyping", desc: "Creating interactive prototypes to validate ideas before development." },
  { emoji: "✅", title: "User Testing", desc: "Validating designs with real users to ensure optimal experiences." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f9fafb] to-white pb-[36px] pt-[108px]">
        <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-[54px] lg:px-16">
          <div className="flex w-full flex-col justify-center lg:w-1/2">
            <span className="inline-flex w-fit items-center rounded-full border border-[rgba(0,194,130,0.2)] bg-[rgba(0,194,130,0.05)] px-[18px] py-[5px] text-[15.75px] text-[#00c282]">
              Available for new projects
            </span>
            <div className="mt-[36px] flex flex-col gap-[18px]">
              <h1 className="text-[40px] font-bold leading-[44px] tracking-[-1.1px] text-[#0a0a0a] sm:text-[54px] sm:leading-[56px] sm:tracking-[-1.4px] lg:text-[67.5px] lg:leading-[67.5px] lg:tracking-[-1.69px]">
                Hi, I'm <span className="text-[#00c282]">Mohammed Helaly</span>
              </h1>
              <p className="text-[22px] leading-[28px] text-[#4a5565] sm:text-[28px] sm:leading-[34px] lg:text-[33.75px] lg:leading-[40.5px]">
                UX/UI &amp; Product Designer
              </p>
              <p className="max-w-[654px] text-[16.5px] leading-[26px] text-[#4a5565] sm:text-[18px] sm:leading-[28px] lg:text-[22.5px] lg:leading-[31.5px]">
                I design digital experiences that solve real problems and delight
                users. Specializing in turning complex challenges into elegant,
                intuitive solutions.
              </p>
            </div>
            <div className="mt-[36px] flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-[18px]">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-[9.25px] bg-[#00c282] px-[18px] py-[11.75px] text-[15.75px] font-medium text-white transition-opacity hover:opacity-90"
              >
                View Portfolio
                <img src={arrowRight} alt="" className="h-[18px] w-[18px]" />
              </Link>
              <Link
                to="/start-project"
                className="inline-flex items-center justify-center rounded-[9.25px] border border-black/10 bg-white px-[28px] py-[11px] text-[15.75px] font-medium text-[#0a0a0a] transition-colors hover:bg-gray-50"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-[27px]">
              <img src={heroImg} alt="Mohammed Helaly - UX/UI Designer" className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-3 bottom-3 rounded-[18px] bg-white p-[12px] shadow-2xl sm:left-6 sm:bottom-6 sm:p-[18px] lg:-left-9 lg:bottom-[90px]">
              <img src={mhLogo} alt="MH Logo" className="h-[144px] w-[144px] object-contain" />
            </div>
            <div className="absolute -top-[27px] right-0 h-[108px] w-[108px] rounded-[27px] bg-[#00c282]/20 blur-[64px]" />
            <div className="absolute -bottom-[90px] right-[54px] h-[144px] w-[144px] rounded-[27px] bg-yellow-400/20 blur-[64px]" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#e5e7eb] bg-white">
        <div className="mx-auto grid max-w-[1368px] grid-cols-1 gap-8 px-4 py-[55px] sm:px-6 md:grid-cols-3 lg:gap-9 lg:px-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-[18px]">
              <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[18px] bg-[rgba(0,194,130,0.1)]">
                <img src={stat.icon} alt="" className="h-[27px] w-[27px]" />
              </div>
              <div>
                <p className="text-[33.75px] leading-[40.5px] text-[#0a0a0a]">{stat.value}</p>
                <p className="text-[15.75px] leading-[22.5px] text-[#4a5565]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#f9f9f9] py-[51px]">
        <div className="mx-auto max-w-[1368px] px-4 sm:px-6 lg:px-9">
          <div className="mb-[51px] text-center">
            <h2 className="text-[40.5px] font-bold leading-[45px] text-[#0a0a0a]">What I Do ?</h2>
            <p className="mx-auto mt-[18px] max-w-[733px] text-lg leading-[27px] text-[#4a5565]">
              From research to final UI, I help bring your product vision to life with user-centered design thinking.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[27px] sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex flex-col gap-[18px] rounded-[18px] border border-[#e5e7eb] bg-white p-7">
                <span className="text-[40.5px] leading-[45px]">{s.emoji}</span>
                <h3 className="text-lg leading-[27px] text-[#0a0a0a]">{s.title}</h3>
                <p className="text-[15.75px] leading-[22.5px] text-[#4a5565]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-[90px]"
        style={{ backgroundImage: "linear-gradient(166deg, #00c282 0%, rgba(0,194,130,0.8) 100%)" }}
      >
        <div className="mx-auto max-w-[936px] px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold leading-[27px] text-white">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-[18px] max-w-[873px] text-[20.25px] leading-[31.5px] text-white/90">
            Let's discuss how I can help bring your vision to life. It takes less than 60 seconds to share your project details.
          </p>
          <Link
            to="/start-project"
            className="mt-[36px] inline-flex items-center gap-2 rounded-[9.25px] bg-[#008559] px-[18px] py-[11.75px] text-[15.75px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Let's Work Together
            <img src={arrowRight} alt="" className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </section>
    </>
  );
}
