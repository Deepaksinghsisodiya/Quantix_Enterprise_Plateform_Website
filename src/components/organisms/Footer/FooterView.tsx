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
            <div className="flex items-center text-slate-900 group">
              <img
                src="/images/logo/quantix-logo-full-on-light.svg"
                alt="Quantix Logo"
                className="h-[48px] w-auto"
              />
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
