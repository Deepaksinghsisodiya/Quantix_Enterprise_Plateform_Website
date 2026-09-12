import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, CreditCard, CheckCircle2, ChevronRight, Server, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PCI DSS Compliance & Security | Quantix Enterprise POS',
  description: 'Quantix adheres to PCI DSS Level 1 payment processing standards with tokenized card data, point-to-point encryption, and zero raw PAN storage.',
};

export default function PCIPage() {
  const sections = [
    {
      id: 'compliance-overview',
      title: '1. PCI DSS Level 1 Architecture',
      content: [
        {
          heading: 'Highest Industry Standards',
          text: 'Quantix Enterprise POS is engineered to comply with the Payment Card Industry Data Security Standard (PCI DSS) Level 1 requirements. We partner exclusively with certified payment processors and gateways to ensure that cardholder data never touches unencrypted storage.',
        },
        {
          heading: 'Third-Party Audits & Attestation',
          text: 'Our infrastructure undergoes annual external audits by Qualified Security Assessors (QSAs), continuous quarterly vulnerability scans by Approved Scanning Vendors (ASVs), and ongoing automated penetration testing.',
        },
      ],
    },
    {
      id: 'tokenization',
      title: '2. Tokenization & Zero Raw PAN Storage',
      content: [
        {
          heading: 'Zero Cardholder Data Retention',
          text: 'Quantix cloud servers, POS registers, and databases never store, process, or transmit raw Primary Account Numbers (PAN), CVVs, or card magnetic stripe data. All payment transactions are immediately tokenized at the certified terminal level.',
        },
        {
          heading: 'Secure Gateway Tokens',
          text: 'When a transaction is processed, sensitive cardholder data is replaced with irreversible, cryptographically secure gateway tokens used exclusively for refunds, pre-authorizations, and recurring billing.',
        },
      ],
    },
    {
      id: 'encryption',
      title: '3. Point-to-Point Encryption (P2PE) & TLS 1.3',
      content: [
        {
          heading: 'Encrypted from Swipe/Tap to Bank',
          text: 'Payment terminal integrations employ certified hardware-level Point-to-Point Encryption (P2PE). The moment a customer taps, dips, or swipes their card, data is encrypted inside the secure crypto-processor before reaching POS software.',
        },
        {
          heading: 'Transport Layer Security',
          text: 'All internal and external communication across our microservices and API gateways is forced over modern TLS 1.3 protocol with strict HSTS policies and cipher suite validation.',
        },
      ],
    },
    {
      id: 'infrastructure',
      title: '4. Network Isolation & Vulnerability Management',
      content: [
        {
          heading: 'Isolated Cardholder Data Environment (CDE)',
          text: 'Payment traffic is segmented away from general POS operations, kitchen display network traffic, and guest Wi-Fi networks using virtual private clouds (VPCs) and stateful firewalls.',
        },
        {
          heading: 'Continuous Monitoring & DDoS Defense',
          text: 'Our cloud layer incorporates multi-layer DDoS defense, automated intrusion detection systems (IDS/IPS), and real-time anomaly detection flagging suspicious transaction patterns 24/7/365.',
        },
      ],
    },
    {
      id: 'merchant-scope',
      title: '5. Merchant Compliance Scope Reduction',
      content: [
        {
          heading: 'Simplifying Your SAQ Requirements',
          text: 'By isolating cardholder data at the payment terminal and utilizing Quantix cloud tokenization, merchants can significantly reduce their PCI self-assessment audit scope (often qualifying for the simplified SAQ A-EP or SAQ-P2PE).',
        },
        {
          heading: 'Chain of Custody & Role-Based Access',
          text: 'Manager overrides, refund permissions, and sensitive terminal settings are strictly governed by granular multi-tiered permissions, biometric authentications, and tamper-proof audit trails.',
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      {/* Header Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 pt-28 pb-12 sm:pt-32 sm:pb-16 page-hero-header">
        <div className="site-container max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400 dark:text-slate-600" />
            <span className="text-slate-900 dark:text-white font-semibold">PCI DSS Compliance</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
            <ShieldCheck size={14} /> Level 1 Security Standards
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
            PCI DSS Compliance & Payment Security
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Quantix Enterprise POS adheres to strict PCI DSS Level 1 payment processing requirements. We safeguard your transactions through point-to-point encryption, instant tokenization, and zero raw PAN retention.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <span>Last Audit: <strong className="text-slate-700 dark:text-slate-300">January 2026</strong></span>
            <span>Standard: <strong className="text-slate-700 dark:text-slate-300">PCI DSS v4.0 Level 1</strong></span>
            <span>Environment: <strong className="text-slate-700 dark:text-slate-300">SOC 2 Type II & PCI Certified</strong></span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="site-container max-w-5xl py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Quick Navigation / Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                Security Navigation
              </h3>
              <nav className="space-y-1.5">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light hover:translate-x-1 transition-all py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Security Highlights Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-primary/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <Lock size={16} /> Zero Storage Guarantee
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Raw card numbers (PAN) and CVV security codes never hit our hard disks, memory dumps, or log files.
              </p>
              <div className="pt-2 border-t border-emerald-500/20 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>TLS 1.3 Transport Security</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>Hardware-level P2PE Support</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span>24/7 Threat Monitoring</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Legal / Policy Body */}
          <div className="lg:col-span-8 space-y-10">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-28 space-y-6"
              >
                <h2 className="text-lg sm:text-xl font-bold font-syne text-slate-900 dark:text-white uppercase tracking-tight pb-3 border-b border-slate-100 dark:border-slate-800">
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.content.map((block, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {block.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {block.text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}

            {/* Compliance Contact */}
            <div className="bg-slate-900 dark:bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary-light flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-syne uppercase tracking-wider">Compliance & Security Inquiries</h3>
                  <p className="text-xs text-slate-400">Request our PCI Attestation of Compliance (AoC) or SOC 2 report.</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For security audits, vulnerability disclosures, or vendor assessment questionnaires, contact our compliance team directly at:
              </p>
              <div className="inline-block bg-slate-800/80 px-4 py-2 rounded-lg text-xs font-mono text-primary-light border border-slate-700">
                security@quantixpos.com
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
