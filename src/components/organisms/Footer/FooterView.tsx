'use client';

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
    <footer className="bg-white text-slate-500 pt-10 pb-8 sm:pt-14 sm:pb-10 border-t border-slate-200/80 mt-auto w-full">
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

            {/* Newsletter Subscription */}
            <div className="pt-4 border-t border-slate-200/60 mt-4 max-w-xs">
              <h3 className="mb-3 font-syne font-bold text-slate-900 text-[11px] uppercase tracking-wider">Subscribe to our newsletter</h3>
              <form className="flex" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                <input 
                  type="email" 
                  placeholder="name@business.com" 
                  required
                  className="w-full bg-slate-100 border-transparent focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary rounded-l-lg py-2 px-3 text-xs outline-none transition-colors text-slate-800 placeholder-slate-400"
                />
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-3 py-2 rounded-r-lg transition-colors cursor-pointer">
                  Join
                </button>
              </form>
            </div>
          </div>

          <LinkColumn title="Product" links={productLinks} />
          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn title="Industries" links={industryLinks} />
          <LinkColumn title="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-14 border-t border-slate-200/60 pt-6 sm:pt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-xs text-center lg:text-left">
          <p className="text-slate-400 font-semibold text-xs order-2 lg:order-1">{FOOTER_COPYRIGHT}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 order-1 lg:order-2 w-full lg:w-auto">
            <Link
              href="/status"
              className="inline-flex items-center justify-center gap-1.5 text-emerald-600 font-bold uppercase tracking-wider text-[10px] sm:text-[11px] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200/80 transition-colors shadow-2xs cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </Link>
            <Link
              href="/pci"
              className="inline-flex items-center justify-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/80 transition-colors shadow-2xs cursor-pointer max-w-full"
            >
              <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>{FOOTER_COMPLIANCE}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
