import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mhLogo from "../assets/images/mh-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Resume", to: "/resume" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

function navClassName(isActive: boolean): string {
  return isActive ? "text-[#00c282]" : "text-[#4a5565]";
}

export default function Header() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLabel = useMemo(() => {
    const active = navItems.find(({ to }) =>
      to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`),
    );
    return active?.label ?? "Menu";
  }, [pathname]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#e5e7eb] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1368px] items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link to="/" className="shrink-0">
          <img src={mhLogo} alt="Mohammed Helaly" className="h-[63px] w-auto" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {navItems.map(({ label, to }) => {
            const isActive =
              to === "/"
                ? pathname === "/"
                : pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                className={`text-lg leading-[27px] transition-colors hover:text-[#00c282] ${navClassName(isActive)}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/start-project"
          className="hidden shrink-0 rounded-full bg-[#00c282] px-6 py-2.5 text-lg font-bold text-white transition-opacity hover:opacity-90 md:inline-flex"
        >
          Start a Project
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/start-project"
            className="shrink-0 rounded-full bg-[#00c282] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Start
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-semibold text-[#0a0a0a] shadow-sm transition-colors hover:bg-gray-50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? "Close" : activeLabel}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-[#e5e7eb] bg-white md:hidden">
          <nav className="mx-auto max-w-[1368px] px-4 py-3 sm:px-6" aria-label="Mobile">
            <div className="flex flex-col gap-2">
              {navItems.map(({ label, to }) => {
                const isActive =
                  to === "/"
                    ? pathname === "/"
                    : pathname === to || pathname.startsWith(`${to}/`);
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base leading-6 transition-colors hover:bg-gray-50 hover:text-[#00c282] ${navClassName(isActive)}`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
