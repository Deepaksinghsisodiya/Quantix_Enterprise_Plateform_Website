import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Lock, Eye, Server, RefreshCw, Mail, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Quantix Enterprise POS',
  description: 'Learn how Quantix Enterprise collects, protects, and handles merchant and customer data across cloud POS registers and analytics.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'collection',
      title: '1. Information We Collect',
      content: [
        {
          heading: 'Account & Business Data',
          text: 'When merchants create a Quantix Enterprise account, we collect legal business names, corporate tax IDs, billing contacts, administrator emails, and authorized staff credentials.',
        },
        {
          heading: 'Transaction & Sales Telemetry',
          text: 'To power live cloud dashboards and automated Z-reports, our platform records item sales, category velocities, order time stamps, and transaction totals. Raw credit card numbers (PAN) are never stored on our servers.',
        },
        {
          heading: 'Terminal & Network Diagnostics',
          text: 'We collect IP addresses, device hardware identifiers, OS versions, and network latency logs to guarantee 99.99% cloud uptime and diagnose local network dropouts.',
        },
      ],
    },
    {
      id: 'usage',
      title: '2. How We Use Your Data',
      content: [
        {
          heading: 'Core Platform Operations',
          text: 'We process your data to synchronize menu updates across branches, coordinate kitchen display routing, deduct real-time inventory balances, and generate consolidated accounting reports.',
        },
        {
          heading: 'Zero Third-Party Advertising',
          text: 'Quantix strictly does NOT sell, rent, or monetize your customer database or sales records to third-party data brokers or advertising networks.',
        },
      ],
    },
    {
      id: 'security',
      title: '3. Data Storage & Encryption Standards',
      content: [
        {
          heading: 'End-to-End Encryption',
          text: 'All data transmitted between POS terminals and Quantix Cloud is secured using TLS 1.3 encryption. At rest, databases are encrypted using AES-256 with automated daily backups.',
        },
        {
          heading: 'Role-Based Access Controls (RBAC)',
          text: 'Staff access is strictly gated through manager PINs, biometric logins, and granular permission matrices defined by head office administrators.',
        },
      ],
    },
    {
      id: 'gdpr',
      title: '4. GDPR & CCPA Compliance Rights',
      content: [
        {
          heading: 'Your Legal Rights',
          text: 'Under GDPR and CCPA regulations, business owners and customers have the right to request a full export of their data, rectify inaccurate records, or request complete account erasure within 30 business days.',
        },
      ],
    },
  ];

  return (
    <main className="bg-slate-50/50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 pt-28 pb-12 sm:pt-32 sm:pb-16 page-hero-header relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="site-container relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">Privacy Policy</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <ShieldCheck size={14} className="stroke-[2.5]" />
              <span>LEGAL & DATA PROTECTION</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight">
              Quantix Privacy Policy
            </h1>

            <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              We take merchant and diner privacy seriously. This document outlines how data is gathered, encrypted, and protected across our cloud POS infrastructure.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-400">
              <span>Last Updated: March 2026</span>
              <span>•</span>
              <span>Effective Globally</span>
              <span>•</span>
              <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 size={13} /> GDPR & CCPA Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Body Grid */}
      <section className="site-container py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Quick TOC Sidebar */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <h3 className="font-syne text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Table of Contents
              </h3>
              <nav className="flex flex-col space-y-2 pt-3">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light transition-colors py-1 flex items-center justify-between group"
                  >
                    <span>{sec.title}</span>
                    <ChevronRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-primary transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Compliance Help Card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <Lock size={14} />
                <span>Data Protection Officer</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Have specific compliance or legal questions regarding your store data?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-syne font-extrabold uppercase tracking-wider hover:bg-primary-dark transition-colors shadow-xs"
              >
                <Mail size={13} />
                <span>Contact Legal Team</span>
              </Link>
            </div>
          </div>

          {/* Main Legal Sections */}
          <div className="lg:col-span-8 space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs scroll-mt-28 space-y-5"
              >
                <h2 className="font-syne text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.heading}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
