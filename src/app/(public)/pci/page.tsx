// src/app/(public)/pci/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Shield, Lock, CreditCard, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PCI DSS Compliance & Security | Quantix POS',
  description: 'Quantix adheres to PCI DSS Level 1 payment processing standards with tokenized card data and zero raw PAN storage.',
};

export default function PCIPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container max-w-4xl px-4 sm:px-0 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Lock size={13} /> SECURITY CERTIFICATION
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
              PCI DSS Compliance & Tokenization
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Quantix architecture never stores raw credit card numbers or sensitive authentication data. All card payments are tokenized directly via PCI DSS Level 1 certified gateways.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Tokenized Payments', desc: 'Card payloads are instantly exchanged for secure provider tokens prior to reaching POS registers.' },
              { title: 'End-to-End Encryption', desc: 'Payment PDQ terminals communicate over TLS 1.3 encrypted channels with zero plain-text leaks.' },
              { title: 'SOC 2 & PCI Audited', desc: 'Annual third-party penetration tests and security audit verification.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50/50 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Security Features */}
          <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-gray-50/30 dark:bg-slate-900/20 p-8 rounded-3xl border border-gray-200 dark:border-slate-800/80">
            <h2 className="text-lg font-syne font-bold uppercase text-slate-900 dark:text-white">Security Infrastructure</h2>
            <p>Our cloud infrastructure uses isolated tenant network boundaries, continuous automated threat monitoring, and zero-trust authentication protocols for all API gateway calls.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
