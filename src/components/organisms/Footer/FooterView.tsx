'use client';

// src/components/organisms/Footer/FooterView.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { BrandLogo } from "../Navbar/components/BrandLogo";
import { useContactModal } from "@/context/ContactModalContext";
import { LeadFormCard } from "./LeadFormCard";
import { NewsletterSubscribeBox } from "./NewsletterSubscribeBox";
import { FooterLink, SocialLink } from "./types/FooterTypes";
import {
  FOOTER_COPYRIGHT,
  FOOTER_COMPLIANCE,
  SOCIAL_LINKS,
  PRODUCT_LINKS,
  INDUSTRY_LINKS,
  COMPANY_LINKS,
  LEGAL_LINKS,
} from "./dummyData/FooterData";

export interface FooterViewProps {
  productLinks?: FooterLink[];
  companyLinks?: FooterLink[];
  industryLinks?: FooterLink[];
  legalLinks?: FooterLink[];
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

  let brandClasses = "text-slate-600 bg-white border-slate-200 hover:bg-[#FF4F00] hover:text-white hover:border-[#FF4F00]";

  if (icon === 'linkedin') {
    brandClasses = "text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/20 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]";
  } else if (icon === 'twitter' || icon === 'x') {
    brandClasses = "text-slate-700 bg-white border-slate-200 hover:bg-black hover:text-white hover:border-black";
  } else if (icon === 'youtube') {
    brandClasses = "text-[#FF0000] bg-[#FF0000]/10 border-[#FF0000]/20 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]";
  } else if (icon === 'instagram') {
    brandClasses = "text-[#E4405F] bg-[#E4405F]/10 border-[#E4405F]/20 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent";
  } else if (icon === 'facebook') {
    brandClasses = "text-[#1877F2] bg-[#1877F2]/10 border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]";
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

const LinkColumn = ({
  title,
  links,
  currentPath,
  onOpenContact,
}: {
  title: string;
  links: FooterLink[];
  currentPath: string;
  onOpenContact: () => void;
}) => (
  <div className="flex flex-col space-y-2.5 sm:space-y-3.5">
    <div>
      <h4 className="font-syne font-bold text-slate-900 text-[11px] sm:text-[13px] uppercase tracking-wider inline-block pb-1 border-b-2 border-[#FF4F00]">
        {title}
      </h4>
    </div>
    <ul className="flex flex-col space-y-2 sm:space-y-2.5 pt-0.5">
      {links.map((link) => {
        const isActive = currentPath === link.href;

        return (
          <li key={link.label}>
            {link.href === '/contact' || link.href.startsWith('/contact/sales') ? (
              <button
                onClick={() => onOpenContact()}
                className={`transition-all duration-200 text-xs sm:text-[13px] group inline-flex items-center flex-wrap gap-1.5 w-full text-left cursor-pointer hover:translate-x-1 leading-snug py-0.5 ${isActive
                    ? 'text-[#FF4F00] font-bold'
                    : 'text-slate-600 hover:text-[#FF4F00] font-medium'
                  }`}
              >
                <span className={isActive ? 'text-[#FF4F00] font-bold' : 'group-hover:text-[#FF4F00] transition-colors'}>
                  {link.label}
                </span>
                {link.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-orange-500/10 border border-orange-500/25 text-[#FF4F00] font-bold shrink-0">
                    {link.badge}
                  </span>
                )}
                <ArrowRight
                  size={11}
                  className={`transition-all duration-200 text-[#FF4F00] shrink-0 stroke-[2.5] ${isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                />
              </button>
            ) : (
              <Link
                href={link.href}
                className={`transition-all duration-200 text-xs sm:text-[13px] group inline-flex items-center flex-wrap gap-1.5 cursor-pointer hover:translate-x-1 leading-snug py-0.5 ${isActive
                    ? 'text-[#FF4F00] font-bold'
                    : 'text-slate-600 hover:text-[#FF4F00] font-medium'
                  }`}
              >
                <span className={isActive ? 'text-[#FF4F00] font-bold' : 'group-hover:text-[#FF4F00] transition-colors'}>
                  {link.label}
                </span>
                {link.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-md bg-orange-500/10 border border-orange-500/25 text-[#FF4F00] font-bold shrink-0">
                    {link.badge}
                  </span>
                )}
                <ArrowRight
                  size={11}
                  className={`transition-all duration-200 text-[#FF4F00] shrink-0 stroke-[2.5] ${isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                />
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

export const FooterView: React.FC<FooterViewProps> = ({
  productLinks = PRODUCT_LINKS,
  companyLinks = COMPANY_LINKS,
  industryLinks = INDUSTRY_LINKS,
  legalLinks = LEGAL_LINKS,
  socialLinks = SOCIAL_LINKS,
}) => {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  return (
    <footer className="bg-slate-50 text-slate-600 pt-6 sm:pt-8 lg:pt-9 pb-4 sm:pb-5 border-t border-slate-200/90 w-full relative overflow-hidden transition-colors duration-300">
      {/* Background Soft Glow & Ambient Highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-b from-orange-500/[0.04] to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-gradient-to-t from-amber-500/[0.02] to-transparent blur-3xl pointer-events-none -z-0" />

      <div className="site-container px-4 sm:px-6 relative z-10">

        {/* ======================================================= */}
        {/* MAIN FOOTER GRID: Brand & Directory (Left) + Form (Right) */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start mb-4 sm:mb-5">

          {/* ----------------------------------------------------- */}
          {/* LEFT: Brand Info & 4-Column Directory (7 cols on lg, 8 on xl) */}
          {/* ----------------------------------------------------- */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6">
            {/* Top Brand Block */}
            <div className="space-y-3 sm:space-y-3.5 text-left">
              <BrandLogo pathname={pathname} />
              <p className="text-xs sm:text-sm font-normal leading-relaxed text-slate-500 max-w-md">
                Quantix Enterprise is the next-generation EPOS & autonomous cloud management platform engineered for multi-location restaurants, high-throughput retail, and franchise chains.
              </p>

              {/* Live Platform Status Beacon & Social Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-mono font-semibold text-emerald-700 shadow-2xs max-w-full">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  <span className="truncate">All Systems Operational (99.99% Uptime)</span>
                </div>

                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {socialLinks.map((social) => (
                      <SocialButton key={social.ariaLabel} social={social} />
                    ))}
                  </div>
                )}
              </div>

              {/* Live Newsletter Subscribe Box (with direct API mutation) */}
              <div className="pt-2 max-w-sm">
                <NewsletterSubscribeBox />
              </div>
            </div>

            {/* 4-Column Navigation Directory (2x2 on mobile, 4-col on tablet/desktop) */}
            <div className="pt-3 border-t border-slate-200/90 grid grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-5 sm:gap-y-6">
              <LinkColumn title="Platform" links={productLinks} currentPath={pathname} onOpenContact={openModal} />
              <LinkColumn title="Solutions" links={industryLinks} currentPath={pathname} onOpenContact={openModal} />
              <LinkColumn title="Resources" links={companyLinks} currentPath={pathname} onOpenContact={openModal} />
              <LinkColumn title="Company" links={legalLinks} currentPath={pathname} onOpenContact={openModal} />
            </div>
          </div>

          {/* ----------------------------------------------------- */}
          {/* RIGHT: Lead Capture Form Card (5 cols on lg, 4 on xl) */}
          {/* ----------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-4 w-full flex justify-center lg:justify-end">
            <LeadFormCard className="w-full" />
          </div>

        </div>

        {/* ======================================================= */}
        {/* BOTTOM ROW: Copyright, Security Pill & Quick Legal Links */}
        {/* ======================================================= */}
        <div className="pt-3.5 sm:pt-4 border-t border-slate-200/90 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          {/* Security Compliance Badge */}
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-2xl sm:rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-[11px] font-mono text-slate-600 text-center max-w-full order-1 lg:order-2 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{FOOTER_COMPLIANCE}</span>
          </div>

          {/* Quick Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-slate-500 text-[11px] font-medium order-2 lg:order-3 text-center">
            <Link href="/privacy" className="hover:text-[#FF4F00] transition-colors py-0.5">
              Privacy Policy
            </Link>
            <span className="text-slate-300 select-none">•</span>
            <Link href="/terms" className="hover:text-[#FF4F00] transition-colors py-0.5">
              Terms
            </Link>
            <span className="text-slate-300 select-none">•</span>
            <Link href="/security" className="hover:text-[#FF4F00] transition-colors py-0.5">
              Security
            </Link>
            <span className="text-slate-300 select-none">•</span>
            <Link href="/status" className="hover:text-[#FF4F00] transition-colors inline-flex items-center gap-1 py-0.5">
              <span>Status</span>
            </Link>
          </div>

          {/* Copyright Text */}
          <p className="text-slate-500 font-medium text-center lg:text-left order-3 lg:order-1 text-[11px] sm:text-xs">
            {FOOTER_COPYRIGHT}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterView;
