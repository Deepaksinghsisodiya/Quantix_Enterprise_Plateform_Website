'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { BrandLogo } from "../Navbar/components/BrandLogo";
import { useContactModal } from "@/context/ContactModalContext";
import { LeadFormCard } from "./LeadFormCard";
import NewsletterWrapper from "@/features/Newsletter";
import {
  FooterLink,
  SocialLink,
} from "./types/FooterTypes";
import {
  FOOTER_COPYRIGHT,
  FOOTER_COMPLIANCE,
  SOCIAL_LINKS,
} from "./dummyData/FooterData";

export interface FooterViewProps {
  productLinks: FooterLink[];
  companyLinks: FooterLink[];
  industryLinks: FooterLink[];
  legalLinks: FooterLink[];
  socialLinks?: SocialLink[];
}

const SocialIcon = ({ icon }: { icon: string }) => {
  switch (icon.toLowerCase()) {
    case 'linkedin':
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
};

const SocialButton = ({ social }: { social: SocialLink }) => {
  const icon = social.icon.toLowerCase();
  
  let brandClasses = "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white hover:border-primary";
  
  if (icon === 'linkedin') {
    brandClasses = "text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/30 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]";
  } else if (icon === 'twitter' || icon === 'x') {
    brandClasses = "text-slate-950 dark:text-white bg-slate-900/10 dark:bg-white/10 border-slate-300 dark:border-slate-700 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black";
  } else if (icon === 'youtube') {
    brandClasses = "text-[#FF0000] bg-[#FF0000]/10 border-[#FF0000]/30 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]";
  } else if (icon === 'instagram') {
    brandClasses = "text-[#E4405F] bg-[#E4405F]/10 border-[#E4405F]/30 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent";
  } else if (icon === 'facebook') {
    brandClasses = "text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]";
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.ariaLabel}
      className={`flex h-8 w-8 items-center justify-center rounded-xl border shadow-2xs transition-all duration-200 hover:scale-110 active:scale-95 ${brandClasses}`}
    >
      <SocialIcon icon={social.icon} />
    </a>
  );
};

const LinkColumn = ({ title, links, onOpenContact }: { title: string; links: FooterLink[]; onOpenContact: () => void }) => (
  <div className="flex flex-col space-y-4">
    <div>
      <h4 className="font-syne font-bold text-slate-900 dark:text-white text-[13px] sm:text-sm uppercase tracking-wider inline-block pb-1.5 border-b-2 border-primary">
        {title}
      </h4>
    </div>
    <ul className="flex flex-col space-y-4 sm:space-y-5 pt-1.5">
      {links.map((link) => (
        <li key={link.label}>
          {link.href === '/contact' || link.href.startsWith('/contact/sales') ? (
            <button
              onClick={() => onOpenContact()}
              className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-all duration-200 text-xs sm:text-[13px] font-medium group inline-flex items-center gap-1.5 w-full text-left cursor-pointer hover:translate-x-1"
            >
              <span className="group-hover:text-primary transition-colors">{link.label}</span>
              <ArrowRight
                size={12}
                className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary shrink-0 stroke-[2.5]"
              />
            </button>
          ) : (
            <Link
              href={link.href}
              className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-all duration-200 text-xs sm:text-[13px] font-medium group inline-flex items-center gap-1.5 cursor-pointer hover:translate-x-1"
            >
              <span className="group-hover:text-primary transition-colors">{link.label}</span>
              <ArrowRight
                size={12}
                className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary shrink-0 stroke-[2.5]"
              />
            </Link>
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
  socialLinks = SOCIAL_LINKS,
}) => {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  return (
    <footer className="bg-slate-50/50 dark:bg-slate-950 text-slate-500 pt-8 pb-6 sm:pt-10 sm:pb-8 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto w-full transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/2 to-transparent pointer-events-none" />
      
      <div className="site-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 xl:gap-8 items-start mb-6 lg:mb-10">
          {/* Brand Info (Order 1 on mobile, Order 1 on desktop) */}
          <div className="order-1 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-3 flex flex-col space-y-4 sm:space-y-5 text-center lg:text-left items-center lg:items-start">
            <BrandLogo pathname={pathname} />
            <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs text-center lg:text-left">
              Quantix Enterprise is the next-gen EPOS & Cloud management platform for restaurants, retail, and franchise chains.
            </p>

            {/* Vibrant Social Links Row */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-2 pt-1 sm:pt-2">
                {socialLinks.map((social) => (
                  <SocialButton key={social.ariaLabel} social={social} />
                ))}
              </div>
            )}

            {/* Live Newsletter Subscribe Box */}
            <NewsletterWrapper className="pt-2 w-full max-w-xs" />
          </div>

          {/* Lead Capture Form Card (Order 2 on mobile, Order 3 on desktop) */}
          <div className="order-2 lg:order-3 col-span-1 lg:col-span-3 xl:col-span-3 flex justify-center lg:justify-end w-full max-w-full sm:max-w-md lg:max-w-85 mx-auto lg:mx-0">
            <LeadFormCard className="w-full" />
          </div>

          {/* Navigation Links Grid (Order 3 on mobile, Order 2 on desktop) */}
          <div className="order-3 lg:order-2 col-span-1 lg:col-span-6 xl:col-span-6 grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 pt-1 lg:pt-0">
            <LinkColumn title="Solutions" links={productLinks} onOpenContact={openModal} />
            <LinkColumn title="Company" links={companyLinks} onOpenContact={openModal} />
            <LinkColumn title="Industries" links={industryLinks} onOpenContact={openModal} />
            <LinkColumn title="Legal" links={legalLinks} onOpenContact={openModal} />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-0">
          <p className="text-slate-400 font-medium text-xs order-2 lg:order-1 text-center sm:text-left">{FOOTER_COPYRIGHT}</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 lg:gap-6 order-1 lg:order-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="text-emerald-500" size={13} />
              <span>{FOOTER_COMPLIANCE}</span>
            </div>
            
            <div className="flex gap-1.5">
              <Link href="/privacy" className="text-[11px] font-medium text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-1.5">Privacy</Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link href="/terms" className="text-[11px] font-medium text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-1.5">Terms</Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <Link href="/pci" className="text-[11px] font-medium text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-1.5">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;
