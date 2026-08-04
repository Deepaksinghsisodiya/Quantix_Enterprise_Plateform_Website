// src/components/organisms/Footer/FooterView.tsx
// Pure UI component — receives all data as props, renders nothing on its own.
import React from "react";
import {
  RiTwitterXLine,
  RiLinkedinFill,
  RiGithubFill,
} from "react-icons/ri";
import { Lock } from "lucide-react";
import Link from "next/link";
import {
  FooterLink,
  SocialLink,
  FOOTER_COPYRIGHT,
  FOOTER_COMPLIANCE,
} from "./FooterData";

export interface FooterViewProps {
  productLinks: FooterLink[];
  companyLinks: FooterLink[];
  industryLinks: FooterLink[];
  legalLinks: FooterLink[];
  socialLinks: SocialLink[];
}

const SOCIAL_ICONS: Record<SocialLink['icon'], React.ReactNode> = {
  twitter: <RiTwitterXLine className="h-4 w-4" />,
  linkedin: <RiLinkedinFill className="h-4 w-4" />,
  github: <RiGithubFill className="h-4 w-4" />,
};

const SOCIAL_HOVER: Record<SocialLink['icon'], string> = {
  twitter: "hover:bg-slate-900 hover:text-white",
  linkedin: "hover:bg-blue-600 hover:text-white",
  github: "hover:bg-slate-950 hover:text-white",
};

const LinkColumn = ({ title, links }: { title: string; links: FooterLink[] }) => (
  <div className="col-span-1">
    <h3 className="mb-5 font-syne font-bold text-slate-900 text-xs uppercase tracking-wider">{title}</h3>
    <ul className="space-y-3 text-xs sm:text-sm font-medium">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-slate-500 hover:text-primary transition-colors duration-200 block">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const FooterView: React.FC<FooterViewProps> = ({
  productLinks,
  companyLinks,
  industryLinks,
  legalLinks,
  socialLinks,
}) => {
  return (
    <footer className="bg-white text-slate-500 pt-20 pb-12 border-t border-slate-200/80">
      <div className="site-container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">

          {/* Column 1 – Brand */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2 text-slate-900 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shrink-0 shadow-md shadow-blue-500/20">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M12 2L3.5 7L12 12L20.5 7L12 2Z" fill="url(#footer-logo-grad-1)" />
                  <path d="M3.5 7V17L12 22V12L3.5 7Z" fill="url(#footer-logo-grad-2)" />
                  <path d="M12 12V22L20.5 17V7L12 12Z" fill="url(#footer-logo-grad-3)" />
                  <defs>
                    <linearGradient id="footer-logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#93C5FD" /><stop offset="1" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="footer-logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6" /><stop offset="1" stopColor="#1E3A8A" />
                    </linearGradient>
                    <linearGradient id="footer-logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" /><stop offset="1" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-syne font-black tracking-tight uppercase">Quantix</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed font-medium">
              The modern POS platform for retail and restaurant businesses. Simple, powerful, and built to scale.
            </p>

            {/* Social icons */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.ariaLabel}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className={`flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 ${SOCIAL_HOVER[social.icon]}`}
                >
                  {SOCIAL_ICONS[social.icon]}
                </a>
              ))}
            </div>
          </div>

          <LinkColumn title="Product" links={productLinks} />
          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn title="Industries" links={industryLinks} />
          <LinkColumn title="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-slate-200/60 pt-8 flex flex-col gap-4 items-center justify-between text-xs sm:text-sm md:flex-row">
          <p className="text-slate-400 font-semibold">{FOOTER_COPYRIGHT}</p>
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[9px] bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100/80 shadow-xs">
            <Lock className="h-3.5 w-3.5 text-emerald-500" />
            <span>{FOOTER_COMPLIANCE}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
