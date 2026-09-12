import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ChevronRight, CheckCircle2, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Quantix Enterprise POS',
  description: 'Terms of service governing subscription licenses, cloud uptime SLAs, terminal operations, and acceptable usage of Quantix POS.',
};

export default function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: [
        {
          heading: 'Binding Agreement',
          text: 'By signing up for an account, activating POS register terminals, or accessing cloud management dashboards, merchants agree to be bound by these Terms of Service. If you do not agree with any provision, you may not access our services.',
        },
      ],
    },
    {
      id: 'service',
      title: '2. Service Scope & Cloud Operations',
      content: [
        {
          heading: 'Platform Provision',
          text: 'Quantix provides cloud-native point-of-sale software, kitchen display routing, online ordering storefronts, and cross-branch inventory telemetry. Platform scope expands according to your active enterprise tier.',
        },
        {
          heading: '99.99% Cloud Uptime SLA',
          text: 'We commit to 99.99% core service availability for cloud data ingestion. In the rare event of broadband ISP disruptions, local register mesh caching guarantees continuous sales ringing and receipt printing.',
        },
      ],
    },
    {
      id: 'billing',
      title: '3. Subscription, Invoicing & Cancellations',
      content: [
        {
          heading: 'Transparent Pricing',
          text: 'Software subscriptions are billed on a recurring monthly or annual schedule as selected during account setup. Enterprise plans include software upgrades and 24/7 technical hotline access.',
        },
        {
          heading: 'Cancellation Policy',
          text: 'Merchants may cancel month-to-month plans at any time with 30 days written notice before the next billing cycle. Account data remains exportable for 60 days following termination.',
        },
      ],
    },
    {
      id: 'conduct',
      title: '4. Merchant Operational Obligations',
      content: [
        {
          heading: 'Compliance & Tax Accuracy',
          text: 'Merchants are solely responsible for configuring accurate local sales taxes, product prices, tip pools, and age verification thresholds in compliance with local municipal laws.',
        },
        {
          heading: 'Prohibited Activities',
          text: 'You agree not to reverse engineer, decompile, or attempt unauthorized database extractions from client software or API gateways.',
        },
      ],
    },
    {
      id: 'liability',
      title: '5. Limitation of Liability',
      content: [
        {
          heading: 'Warranty Disclaimer',
          text: 'To the maximum extent permitted by applicable law, Quantix provides software on an "as is" and "as available" basis without warranties against local hardware failure or merchant configuration errors.',
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
            <span className="text-primary font-bold">Terms of Service</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary">
              <FileText size={14} className="stroke-[2.5]" />
              <span>LEGAL AGREEMENT</span>
            </div>

            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white leading-tight">
              Terms of Service
            </h1>

            <p className="text-sm sm:text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Clear, transparent rules governing your subscription, software usage rights, uptime guarantees, and merchant responsibilities.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-400">
              <span>Last Updated: March 2026</span>
              <span>•</span>
              <span>Version 3.4</span>
              <span>•</span>
              <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 size={13} /> 99.99% Uptime Commitment
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

            {/* Support Card */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs">
                <ShieldCheck size={14} />
                <span>Enterprise Support</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Need customized master service agreements (MSA) or custom enterprise contracts?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary text-white text-xs font-syne font-extrabold uppercase tracking-wider hover:bg-primary-dark transition-colors shadow-xs"
              >
                <Mail size={13} />
                <span>Contact Enterprise Legal</span>
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
