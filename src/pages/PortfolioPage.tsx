import { Link } from "react-router-dom";
import { PROJECTS } from "../data/projects";
import arrowRight from "../assets/icons/arrow-right.svg";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] pt-[73px]">
      {/* Hero Header */}
      <header className="border-b border-[#e5e7eb] bg-white py-[72px]">
        <div className="mx-auto max-w-[864px] px-6 text-center">
          <h1 className="text-[40.5px] font-extrabold leading-[45px] text-[#0a0a0a]">
            My Portfolio
          </h1>
          <p className="mx-auto mt-[18px] text-[20.25px] leading-[31.5px] text-[#4a5565]">
            A selection of projects showcasing my approach to solving real-world
            design challenges through research, iteration, and user-centered
            thinking.
          </p>
        </div>
      </header>

      {/* Project Grid */}
      <section className="py-[54px]">
        <div className="mx-auto max-w-[1368px] px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 gap-[36px] md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white transition-shadow hover:shadow-md"
              >
                <Link to={`/portfolio/${project.slug}`} className="block">
                  <div
                    className="relative w-full overflow-hidden bg-[#f3f4f6]"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute left-1/2 top-1/2 max-h-[92%] max-w-[92%] -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
                <div className="p-[27px]">
                  <p className="text-[15.75px] leading-[22.5px] text-[#00c282]">
                    {project.category}
                  </p>
                  <h2 className="mt-[4.5px] text-[18px] leading-[27px] text-[#0a0a0a]">
                    {project.title}
                  </h2>
                  <p className="mt-[9px] text-[15.75px] leading-[22.5px] text-[#4a5565]">
                    {project.description}
                  </p>
                  <div className="mt-[18px] flex flex-wrap gap-[9px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f3f4f6] px-[13.5px] py-1 text-[13.5px] leading-[18px] text-[#4a5565]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="mt-[18px] inline-flex items-center gap-1.5 text-[15.75px] font-medium text-[#00c282] transition-colors hover:text-[#008559]"
                  >
                    View Case Study
                    <img
                      src={arrowRight}
                      alt=""
                      className="h-[18px] w-[18px]"
                      style={{ filter: "brightness(0) saturate(100%) invert(55%) sepia(86%) saturate(1200%) hue-rotate(118deg) brightness(96%) contrast(101%)" }}
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#e5e7eb] bg-white py-[73px]">
        <div className="mx-auto max-w-[1008px] px-6 text-center">
          <h2 className="text-[24px] font-semibold leading-[27px] text-[#0a0a0a]">
            Like What You See?
          </h2>
          <p className="mt-[18px] text-[18px] leading-[27px] text-[#4a5565]">
            These are just a few examples of my work. Let's discuss how I can
            help with your project.
          </p>
          <Link
            to="/start-project"
            className="mt-[36px] inline-flex items-center gap-2 rounded-[9.25px] bg-[#00c282] px-[18px] py-[11.75px] text-[15.75px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Get in Touch
            <img src={arrowRight} alt="" className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
