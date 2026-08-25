'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Mail, ArrowRight, ChevronRight } from "lucide-react";
import { BrandLogo } from "../Navbar/components/BrandLogo";
import { useContactModal } from "@/context/ContactModalContext";
import { LeadFormCard } from "./LeadFormCard";
import {
  FooterLink,
  SocialLink,
} from "./types/FooterTypes";
import {
  FOOTER_COPYRIGHT,
  FOOTER_COMPLIANCE,
} from "./dummyData/FooterData";

export interface FooterViewProps {
  productLinks: FooterLink[];
  companyLinks: FooterLink[];
  industryLinks: FooterLink[];
  legalLinks: FooterLink[];
  socialLinks: SocialLink[];
}

const LinkColumn = ({ title, links, onOpenContact }: { title: string; links: FooterLink[]; onOpenContact: () => void }) => (
  <div className="flex flex-col space-y-4">
    <h4 className="font-syne font-bold text-slate-900 dark:text-white text-[13px] sm:text-sm uppercase tracking-wider relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-0 w-4 h-0.5 bg-primary rounded-full"></span>
    </h4>
    <ul className="flex flex-col space-y-3 sm:space-y-4 pt-1">
      {links.map((link) => (
        <li key={link.label}>
          {link.href === '/contact' || link.href.startsWith('/contact/sales') ? (
            <button
              onClick={() => onOpenContact()}
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-all duration-200 text-xs sm:text-[13px] font-medium group inline-flex items-center gap-1 w-full text-left cursor-pointer hover:scale-[1.03] active:scale-[0.98] origin-left"
            >
              <span className="group-hover:text-primary transition-colors">{link.label}</span>
              <ChevronRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary shrink-0 stroke-3"
              />
            </button>
          ) : (
            <Link
              href={link.href}
              className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-all duration-200 text-xs sm:text-[13px] font-medium group inline-flex items-center gap-1 cursor-pointer hover:scale-[1.03] active:scale-[0.98] origin-left"
            >
              <span className="group-hover:text-primary transition-colors">{link.label}</span>
              <ChevronRight
                size={14}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary shrink-0 stroke-3"
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
}) => {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  return (
    <footer className="bg-slate-50/50 dark:bg-slate-950 text-slate-500 pt-8 pb-6 sm:pt-10 sm:pb-8 border-t border-slate-200/80 dark:border-slate-800/80 mt-auto w-full transition-colors duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/2 to-transparent pointer-events-none" />
      
      <div className="site-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start mb-8 lg:mb-10">
          {/* Lead Capture Form Card (Order 1 on mobile, Order 3 on desktop) */}
          <div className="order-1 lg:order-3 col-span-1 lg:col-span-3 xl:col-span-3 flex justify-center lg:justify-end w-full max-w-full sm:max-w-85 mx-auto lg:mx-0 mb-6 lg:mb-0">
            <LeadFormCard className="w-full" />
          </div>

          {/* Brand Info (Order 2 on mobile, Order 1 on desktop) */}
          <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-3 flex flex-col space-y-4 text-center lg:text-left items-center lg:items-start mb-6 lg:mb-0">
            <BrandLogo pathname={pathname} />
            <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs text-center lg:text-left">
              Quantix Enterprise is the next-gen EPOS & Cloud management platform for restaurants, retail, and franchise chains.
            </p>
            <div className="pt-1">
              <button 
                type="button"
                onClick={() => openModal()}
                className="group flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-1 text-[12px] font-bold text-slate-900 transition-colors hover:text-primary dark:text-white dark:hover:text-primary-light sm:text-[13px]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-slate-800">
                  <Mail size={14} />
                </div>
                <span>Talk to Sales</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Navigation Links Grid (Order 3 on mobile, Order 2 on desktop) */}
          <div className="order-3 lg:order-2 col-span-1 lg:col-span-6 xl:col-span-6 grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 pt-1 lg:pt-0">
            <LinkColumn title="Products" links={productLinks} onOpenContact={openModal} />
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
