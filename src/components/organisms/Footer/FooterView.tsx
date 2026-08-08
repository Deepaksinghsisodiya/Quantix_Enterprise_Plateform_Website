'use client';

// src/components/organisms/Footer/FooterView.tsx
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
import { LeadFormCard } from "./LeadFormCard";
import { useContactModal } from "@/context/ContactModalContext";

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

const LinkColumn = ({ title, links, onOpenContact }: { title: string; links: FooterLink[]; onOpenContact: () => void }) => (
  <div className="col-span-1 min-w-[120px]">
    <h3 className="mb-3.5 font-syne font-black text-slate-900 dark:text-white text-xs sm:text-sm uppercase tracking-wider">{title}</h3>
    <ul className="space-y-2 text-xs sm:text-[13px] font-semibold">
      {links.map((link) => (
        <li key={`${title}-${link.label}`} className="flex items-center gap-1.5">
          {link.href.startsWith('/contact') ? (
            <button
              type="button"
              onClick={onOpenContact}
              className="text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary-light transition-colors duration-200 block text-left cursor-pointer font-semibold"
            >
              {link.label}
            </button>
          ) : (
            <Link href={link.href} className="text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary-light transition-colors duration-200 block">
              {link.label}
            </Link>
          )}
          {link.badge && (
            <span className="text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary-dark dark:text-primary-light px-1.5 py-0.2 rounded-md">
              {link.badge}
            </span>
          )}
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
  const { openModal } = useContactModal();

  return (
    <footer className="bg-slate-50/50 dark:bg-slate-950 text-slate-500 pt-8 pb-6 sm:pt-10 sm:pb-8 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto w-full transition-colors duration-300">
      <div className="site-container">
        
        {/* Main Footer Content: 12-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">

          {/* 1. Mobile First: Lead Form Card appears at TOP on Mobile (order-1), Right on Desktop (order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-4 flex justify-center lg:justify-end w-full">
            <LeadFormCard 
              heading="Get 2 Months of Free EPOS Rental"
              badgeText="FOR BUSINESS"
              buttonText="SPEAK WITH OUR TEAM"
              className="w-full max-w-full sm:max-w-[360px] mx-auto lg:mx-0"
            />
          </div>

          {/* 2. Left Side: Brand, Links & Newsletter (order-2 on Mobile, order-1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-8 space-y-6 sm:space-y-7 pr-0 lg:pr-4">
            
            {/* Top Brand Info + Socials */}
            <div className="space-y-3.5 text-center sm:text-left flex flex-col items-center sm:items-start">
              <div className="flex items-center text-slate-900 group">
                <img
                  src="/images/logo/quantix-logo-full-on-light.svg"
                  alt="Quantix Logo"
                  className="h-10 sm:h-11 w-auto"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                Quantix is the next-gen EPOS & Cloud management platform for restaurants, retail, and franchise chains. Built for speed, offline reliability, and effortless growth.
              </p>

              {/* Social icons */}
              <div className="flex space-x-2 pt-1 justify-center sm:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.ariaLabel}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className={`flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-500 transition-all duration-300 cursor-pointer shadow-2xs hover:scale-105 ${SOCIAL_HOVER[social.icon]}`}
                  >
                    {SOCIAL_ICONS[social.icon]}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns Grid (Stretched 4 columns filling horizontal space) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-x-12 lg:gap-x-16 xl:gap-x-20 pt-6 border-t border-slate-200/70 dark:border-slate-800/70 w-full justify-between">
              <LinkColumn title="Product" links={productLinks} onOpenContact={() => openModal()} />
              <LinkColumn title="Company" links={companyLinks} onOpenContact={() => openModal()} />
              <LinkColumn title="Industries" links={industryLinks} onOpenContact={() => openModal()} />
              <LinkColumn title="Legal" links={legalLinks} onOpenContact={() => openModal()} />
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800/70 max-w-lg">
              <h3 className="mb-2 font-syne font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-center sm:text-left">
                Subscribe to Quantix Product Updates
              </h3>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to newsletter updates!'); }}>
                <input 
                  type="email" 
                  placeholder="name@business.com" 
                  required
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl py-2.5 px-3.5 text-xs outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400"
                />
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-light active:bg-primary-dark text-white text-xs font-syne font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 border-t border-slate-200/80 dark:border-slate-800/80 pt-5 sm:pt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between text-xs text-center lg:text-left">
          <p className="text-slate-400 font-semibold text-xs order-2 lg:order-1">{FOOTER_COPYRIGHT}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 order-1 lg:order-2 w-full lg:w-auto">
            <Link
              href="/status"
              className="inline-flex items-center justify-center gap-1.5 text-primary font-bold uppercase tracking-wider text-[10px] sm:text-[11px] bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-full border border-primary/20 transition-colors shadow-2xs cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              All Systems Operational
            </Link>
            <Link
              href="/pci"
              className="inline-flex items-center justify-center gap-1.5 text-slate-500 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] bg-white dark:bg-slate-900 hover:bg-slate-50 px-3 py-1 rounded-full border border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs cursor-pointer max-w-full"
            >
              <Lock className="h-3 w-3 text-primary shrink-0" />
              <span>{FOOTER_COMPLIANCE}</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterView;
