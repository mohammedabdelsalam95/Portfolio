import { useEffect, useState } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
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

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#0a0a0a] transition-colors hover:bg-gray-50 md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          <MenuIcon open={isMobileMenuOpen} />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-nav" className="border-t border-[#e5e7eb] bg-white md:hidden">
          <nav className="mx-auto max-w-[1368px] px-4 py-3 sm:px-6" aria-label="Mobile">
            <div className="flex flex-col gap-1">
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
              <Link
                to="/start-project"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[#00c282] px-6 py-2.5 text-base font-bold text-white transition-opacity hover:opacity-90"
              >
                Start a Project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
