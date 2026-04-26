import { Link } from "react-router-dom";
import mhLogo from "../assets/images/mh-logo.png";
import socialLinkedin from "../assets/icons/social-linkedin.svg";
import socialBehance from "../assets/icons/social-behance.svg";
import socialEmail from "../assets/icons/social-email.svg";

const quickLinks = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "About Me", to: "/about" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
] as const;

const socialLinks = [
  { href: "https://www.linkedin.com/", icon: socialLinkedin, label: "LinkedIn" },
  { href: "https://www.behance.net/", icon: socialBehance, label: "Behance" },
  { href: "mailto:hello@example.com", icon: socialEmail, label: "Email" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-[#f9fafb]">
      <div className="mx-auto max-w-[1440px] px-4 pt-[54px] sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
          <div className="flex flex-col gap-[18px]">
            <img src={mhLogo} alt="Mohammed Helaly" className="h-[63px] w-auto object-contain object-left" />
            <p className="max-w-[378px] text-[15.75px] leading-[22.5px] text-[#4a5565]">
              UX/UI &amp; Product Designer crafting meaningful digital experiences.
            </p>
          </div>

          <div className="flex flex-col gap-[18px]">
            <h4 className="text-lg leading-[27px] font-normal text-[#0a0a0a]">Quick Links</h4>
            <ul className="flex flex-col gap-[9px]">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[15.75px] leading-[22.5px] text-[#4a5565] transition-colors hover:text-[#00c282]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[18px]">
            <h4 className="text-lg leading-[27px] font-normal text-[#0a0a0a]">Connect</h4>
            <div className="flex items-center gap-[18px]">
              {socialLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[#e5e7eb] transition-colors hover:bg-[#d1d5db]"
                  aria-label={label}
                >
                  <img src={icon} alt="" className="h-[22.5px] w-[22.5px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-[#e5e7eb] pt-[37px] pb-[22px]">
          <p className="text-center text-[15.75px] leading-[22.5px] text-[#4a5565]">
            © 2026 Mohammed Helaly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
