// src/components/organisms/Footer/Footer.tsx
import React from "react";
import { cn } from "../../../lib/utils";
import {
  RiTwitterXLine,
  RiLinkedinFill,
  RiGithubFill,
} from "react-icons/ri";
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
        {/* Main columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Column 1 – Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-slate-900 group">
              {/* Quantix POS Logo */}
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shrink-0 shadow-md shadow-blue-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5"
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
              <span className="text-lg font-display font-bold tracking-tight">Quantix</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed font-semibold">
              The modern POS platform for retail and restaurant businesses. Simple, powerful, and built to scale.
            </p>
            {/* Social icons - plain text design match */}
            <div className="flex space-x-2">
              <a
                href="https://twitter.com/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer text-xs font-bold font-mono"
                aria-label="Twitter"
              >
                x
              </a>
              <a
                href="https://linkedin.com/company/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer text-xs font-bold font-mono"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com/quantix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer text-xs font-bold font-mono"
                aria-label="GitHub"
              >
                gh
              </a>
            </div>
          </div>

          {/* Column 2 – Product */}
          <div>
            <h3 className="mb-4 font-display font-bold text-slate-900 text-xs uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-500 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – Company */}
          <div>
            <h3 className="mb-4 font-display font-bold text-slate-900 text-xs uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-500 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 – Industries */}
          <div>
            <h3 className="mb-4 font-display font-bold text-slate-900 text-xs uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-500 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 – Legal */}
          <div>
            <h3 className="mb-4 font-display font-bold text-slate-900 text-xs uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-blue-500 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-slate-100 pt-6 pb-10 flex flex-col items-center justify-between text-xs sm:text-sm md:flex-row md:items-center">
          <p className="text-slate-400 font-semibold">© 2025 Quantix, Inc. All rights reserved.</p>
          <div className="mt-3 md:mt-0 flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <span className="flex h-4.5 w-4.5 items-center justify-center text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            PCI DSS Compliant · SOC 2 Type II · GDPR Ready
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
