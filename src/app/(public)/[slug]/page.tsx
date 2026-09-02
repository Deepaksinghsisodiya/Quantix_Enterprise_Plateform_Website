// src/app/(public)/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    icon: <Shield className="h-8 w-8 text-[#FF4D00]" />,
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
    icon: <Scale className="h-8 w-8 text-[#FF4D00]" />,
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
        heading: "3. Payment & Subscription Billing",
        content: "Monthly and annual subscriptions renew automatically unless cancelled before the billing cycle ends. Hardware purchases and warranty coverage terms apply as specified during terminal procurement.",
      },
      {
        heading: "4. Limitation of Liability",
        content: "Quantix provides the software on an 'as-is' and 'as-available' basis. We are not liable for incidental business revenue losses resulting from internet outages or third-party card terminal communication dropouts.",
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    icon: <Cookie className="h-8 w-8 text-[#FF4D00]" />,
    lastUpdated: "April 2026",
    description: "This policy details the functional and analytical cookies we use across Quantix applications and marketing platforms.",
    sections: [
      {
        heading: "1. What are Cookies?",
        content: "Cookies are small data files placed on your browser or device to help our services remember your language preferences, multi-location filter states, and secure login tokens.",
      },
      {
        heading: "2. Authentication Cookies",
        content: "We set minor browser tokens to keep manager and employee credentials verified on active checkout terminals, preventing constant session timeout interruptions during peak hours.",
      },
      {
        heading: "3. Analytics Tools",
        content: "We deploy basic privacy-focused telemetry cookies to analyze application performance, measure page response times, and locate bugs inside the sales dashboards.",
      },
    ],
  },
  gdpr: {
    title: "GDPR Compliance",
    icon: <CheckCircle className="h-8 w-8 text-[#FF4D00]" />,
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
    icon: <Lock className="h-8 w-8 text-[#FF4D00]" />,
    lastUpdated: "January 2026",
    description: "Quantix operates under strict Payment Card Industry Data Security Standards (PCI DSS) to secure merchant checkouts.",
    sections: [
      {
        heading: "1. Zero Cardholder Data Retention",
        content: "Our billing POS terminal never stores raw magnetic stripe, CVV, or card PIN numbers in our local offline database. Card swipe data is encrypted directly on certified terminal systems.",
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = LEGAL_PAGES[slug?.toLowerCase()];

  if (!pageData) {
    return {
      title: "Document Not Found | Quantix Enterprise",
    };
  }

  return {
    title: `${pageData.title} | Quantix Enterprise`,
    description: pageData.description,
  };
}

export default async function DynamicLegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = LEGAL_PAGES[slug?.toLowerCase()];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="pb-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex-1">
      <div className="site-container max-w-5xl pt-8 sm:pt-12">
        {/* Header Area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-8 md:p-12 mb-8 shadow-sm flex flex-col md:flex-row md:items-center gap-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl w-fit">
            {pageData.icon}
          </div>
          <div>
            <span className="text-xs font-bold text-[#FF4D00] tracking-wider uppercase">Quantix Trust & Compliance</span>
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
          {/* Quick Table of Contents / Sidebar */}
          <div className="md:col-span-1 hidden md:block">
            <div className="sticky top-28 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Table of Contents</h3>
              <ul className="space-y-1 text-xs">
                {pageData.sections.map((section, idx) => (
                  <li key={idx}>
                    <a
                      href={`#sec-${idx}`}
                      className="block px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Policy Body */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-sm">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-8 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {pageData.description}
              </p>

              <div className="space-y-8">
                {pageData.sections.map((sec, i) => (
                  <div key={i} id={`sec-${i}`} className="scroll-mt-32">
                    <h2 className="text-lg font-syne font-bold text-slate-900 dark:text-white mb-2">
                      {sec.heading}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Home Button */}
            <div className="flex justify-end">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF4D00] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
