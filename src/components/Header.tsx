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

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#e5e7eb] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1368px] items-center justify-between px-16">
        <Link to="/" className="shrink-0">
          <img src={mhLogo} alt="Mohammed Helaly" className="h-[63px] w-auto" />
        </Link>

        <nav className="flex items-center gap-9" aria-label="Main">
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
          className="shrink-0 rounded-full bg-[#00c282] px-6 py-2.5 text-lg font-bold text-white transition-opacity hover:opacity-90"
        >
          Start a Project
        </Link>
      </div>
    </header>
  );
}
