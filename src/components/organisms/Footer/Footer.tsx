// src/components/organisms/Footer/Footer.tsx
import React from "react";
import { cn } from "../../../lib/utils";
import {
  RiTwitterXLine,
  RiLinkedinFill,
  RiGithubFill,
} from "react-icons/ri";
import { Lock } from "lucide-react";
import Link from "next/link";

// Simple data arrays for links
const productLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/changelog", label: "Changelog" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/api-docs", label: "API Docs" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/press", label: "Press Kit" },
  { href: "/contact", label: "Contact" },
];

const industryLinks = [
  { href: "/industries/retail", label: "Retail POS" },
  { href: "/industries/restaurant", label: "Restaurant POS" },
  { href: "/industries/grocery", label: "Grocery" },
  { href: "/industries/cafes", label: "Cafes & Bars" },
  { href: "/industries/food-trucks", label: "Food Trucks" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/gdpr", label: "GDPR" },
  { href: "/pci", label: "PCI Compliance" },
];

export const Footer = () => {
  return (
    <footer className="bg-white text-slate-500 pt-16 border-t border-slate-200/60">
      <div className="site-container">
        {/* Main columns: Responsive 2-column on mobile, 5-column on desktop */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
          
          {/* Column 1 – Brand (Spans full-width on mobile) */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2 text-slate-900 group">
              {/* Quantix POS Logo */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shrink-0 shadow-md shadow-blue-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M12 2L3.5 7L12 12L20.5 7L12 2Z"
                    fill="url(#footer-logo-grad-1)"
                  />
                  <path
                    d="M3.5 7V17L12 22V12L3.5 7Z"
                    fill="url(#footer-logo-grad-2)"
                  />
                  <path
                    d="M12 12V22L20.5 17V7L12 12Z"
                    fill="url(#footer-logo-grad-3)"
                  />
                  <defs>
                    <linearGradient id="footer-logo-grad-1" x1="12" y1="2" x2="12" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#93C5FD" />
                      <stop offset="1" stopColor="#60A5FA" />
                    </linearGradient>
                    <linearGradient id="footer-logo-grad-2" x1="3.5" y1="7" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B82F6" />
                      <stop offset="1" stopColor="#1E3A8A" />
                    </linearGradient>
                    <linearGradient id="footer-logo-grad-3" x1="12" y1="12" x2="20.5" y2="17" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#1D4ED8" />
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
              <a
                href="https://twitter.com/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-white hover:bg-slate-900 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                aria-label="Twitter"
              >
                <RiTwitterXLine className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-white hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                aria-label="LinkedIn"
              >
                <RiLinkedinFill className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:text-white hover:bg-slate-950 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
                aria-label="GitHub"
              >
                <RiGithubFill className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2 – Product */}
          <div className="col-span-1">
            <h3 className="mb-5 font-syne font-bold text-slate-900 text-xs uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Company */}
          <div className="col-span-1">
            <h3 className="mb-5 font-syne font-bold text-slate-900 text-xs uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Industries */}
          <div className="col-span-1">
            <h3 className="mb-5 font-syne font-bold text-slate-900 text-xs uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 – Legal */}
          <div className="col-span-1">
            <h3 className="mb-5 font-syne font-bold text-slate-900 text-xs uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm font-medium">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-slate-100 pt-8 pb-12 flex flex-col gap-4 items-center justify-between text-xs sm:text-sm md:flex-row">
          <p className="text-slate-400 font-semibold">© 2025 Quantix, Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[9px] bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100/80 shadow-xs">
            <Lock className="h-3.5 w-3.5 text-emerald-500" />
            <span>PCI DSS Compliant · SOC 2 Type II · GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
