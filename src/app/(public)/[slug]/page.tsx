// src/app/(public)/[slug]/page.tsx
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Shield, Scale, Cookie, CheckCircle, Lock, ArrowLeft } from "lucide-react";

// Mock data for legal pages
const LEGAL_PAGES: Record<
  string,
  {
    title: string;
    icon: React.ReactNode;
    lastUpdated: string;
    description: string;
    sections: { heading: string; content: string }[];
  }
> = {
  privacy: {
    title: "Privacy Policy",
    icon: <Shield className="h-8 w-8 text-primary" />,
    lastUpdated: "May 2026",
    description: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal and business data.",
    sections: [
      {
        heading: "1. Information We Collect",
        content: "We collect information you provide directly to us when creating a Quantix account, using our POS services, or contacting support. This includes business name, email address, transaction history, inventory lists, and customer detail records.",
      },
      {
        heading: "2. How We Use Information",
        content: "We use the collected information to power your terminals, process card payments, synchronize cloud inventory, provide real-time sales dashboards, prevent fraud, and optimize our platform's speed and security features.",
      },
      {
        heading: "3. Data Sharing & Third Parties",
        content: "Quantix does not sell your data. We only share transactional data with certified payment processors (e.g., Stripe) to facilitate checkout, and with search API engines when you use smart barcode lookup services.",
      },
      {
        heading: "4. Your Data Rights & Choices",
        content: "You can request full export of your business data or request account deletion at any time by contacting our privacy officer. We retain your transaction records as required under tax and financial laws.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    icon: <Scale className="h-8 w-8 text-primary" />,
    lastUpdated: "May 2026",
    description: "Welcome to Quantix. These terms govern your subscription and use of our SaaS application and POS billing terminal services.",
    sections: [
      {
        heading: "1. Subscription & Account Security",
        content: "To access the platform, you must create a secure business account. You are responsible for safeguarding your login credentials and terminal PIN codes to prevent unauthorized billing or cash drawer access.",
      },
      {
        heading: "2. Authorized Usage",
        content: "Our software must only be used for legal billing, stock management, and retail/restaurant service operations. You agree not to reverse-engineer our proprietary local offline billing database mechanisms.",
      },
      {
        heading: "3. Payments, Refunds & Taxes",
        content: "Subscription plans are billed monthly or annually. You are responsible for setting up accurate POS sales tax brackets inside our terminal setup. Refund policies for your retail shoppers are your sole responsibility.",
      },
      {
        heading: "4. Limitation of Liability",
        content: "Quantix provides its cloud syncing services on an 'as-is' and 'as-available' basis. While our terminal operates robustly offline, we are not responsible for direct business losses resulting from network outages.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    icon: <Cookie className="h-8 w-8 text-primary" />,
    lastUpdated: "April 2026",
    description: "This cookie policy outlines how Quantix uses trackers, local storage, and session tokens to provide responsive cloud billing.",
    sections: [
      {
        heading: "1. Why We Use Local Storage",
        content: "We use browser local storage and IndexedDB databases. These are essential for our offline billing mode, allowing cashiers to add items to cart, compute tax, and generate receipts even during internet outages.",
      },
      {
        heading: "2. Authentication Cookies",
        content: "We set minor browser tokens to keep manager and employee credentials verified on active checkout terminals, preventing constant session timeout interruptions during peak restaurant hours.",
      },
      {
        heading: "3. Analytics Tools",
        content: "We deploy basic privacy-focused telemetry cookies to analyze application performance, measure page response times, and locate bugs inside the sales dashboards.",
      },
    ],
  },
  gdpr: {
    title: "GDPR Compliance",
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    lastUpdated: "March 2026",
    description: "Quantix is fully committed to compliance with the General Data Protection Regulation (GDPR) for our European Union merchant base.",
    sections: [
      {
        heading: "1. Data Processing Addendum (DPA)",
        content: "When serving EU merchants, Quantix acts as a 'Data Processor' under GDPR guidelines. We secure customer sales logs, employee logs, and inventory data on enterprise servers that comply with standard security audits.",
      },
      {
        heading: "2. Right to Access & Erasure",
        content: "If a retail customer requests account erasure, you can easily delete their record from your POS customer directory, which automatically propagates the erasure to our central cloud database within 48 hours.",
      },
      {
        heading: "3. International Data Transfer Protocols",
        content: "All cross-border data movements utilize Standard Contractual Clauses (SCCs) to ensure equivalent protection standards for EU merchants operating international chains.",
      },
    ],
  },
  pci: {
    title: "PCI DSS Security Compliance",
    icon: <Lock className="h-8 w-8 text-primary" />,
    lastUpdated: "January 2026",
    description: "Quantix operates under strict Payment Card Industry Data Security Standards (PCI DSS) to secure merchant checkouts.",
    sections: [
      {
        heading: "1. Zero Cardholder Data Retention",
        content: "Our billing POS terminal never stores raw magnetic stripe, CVV, or card PIN numbers in our local offline database. Card swipe data is encrypted directly on certified terminal hardware.",
      },
      {
        heading: "2. Secure Payment Gateways",
        content: "Online invoice payments and physical card terminals communicate directly with Tier 1 PCI-Compliant payment gateways (e.g., Stripe Reader, Adyen) using point-to-point encryption (P2PE).",
      },
      {
        heading: "3. System Firewalls & Penetration Audits",
        content: "Our cloud architecture undergoes regular vulnerability scanning, automated penetration testing, and firewall reviews to prevent database breaches.",
      },
    ],
  },
};

export default function DynamicLegalPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug.toLowerCase() : "";

  // If page does not exist in our mock list, show a friendly page not found message
  const pageData = LEGAL_PAGES[slug];

  if (!pageData) {
    return (
      <PublicLayout>
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 site-container text-center">
          <Shield className="h-16 w-16 text-slate-300 mb-4" />
          <h1 className="text-3xl font-syne font-bold text-slate-800 mb-2">Page Not Found</h1>
          <p className="text-slate-500 mb-6 max-w-sm">The document or subpage you are trying to view does not exist or has been relocated.</p>
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </button>
        </div>
        <Footer />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Navbar />

      <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex-1">
        <div className="site-container max-w-5xl">
          {/* Header Area */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-8 md:p-12 mb-8 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl w-fit">
              {pageData.icon}
            </div>
            <div>
              <span className="text-xs font-bold text-primary tracking-wider uppercase">Quantix Trust & Compliance</span>
              <h1 className="text-3xl md:text-4xl font-syne font-black text-slate-900 dark:text-white uppercase mt-1 mb-3">
                {pageData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                <span>Last Updated: {pageData.lastUpdated}</span>
                <span>•</span>
                <span>PCI-Compliant Tier 1 SaaS</span>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sidebar navigation */}
            <div className="md:col-span-1 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Legal Documents</h3>
              {Object.keys(LEGAL_PAGES).map((key) => (
                <button
                  key={key}
                  onClick={() => router.push(`/${key}`)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    slug === key
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/40 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {LEGAL_PAGES[key].title}
                </button>
              ))}
            </div>

            {/* Document Content */}
            <div className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-8 md:p-10 shadow-sm space-y-8">
              <p className="text-base font-medium text-slate-500 dark:text-slate-300 leading-relaxed italic border-l-4 border-primary/40 pl-4 py-1">
                "{pageData.description}"
              </p>

              <hr className="border-slate-100 dark:border-slate-800/80" />

              {pageData.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-lg font-syne font-bold text-slate-900 dark:text-white">
                    {section.heading}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </PublicLayout>
  );
}
