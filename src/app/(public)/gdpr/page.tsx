// src/app/(public)/gdpr/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ShieldCheck, Lock, FileText, CheckCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GDPR Compliance & Data Rights | Quantix POS',
  description: 'Learn how Quantix protects your privacy, complies with EU GDPR regulations, and handles Data Subject Rights requests.',
};

export default function GDPRPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container max-w-4xl px-4 sm:px-0 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={13} /> COMPLIANCE STATEMENT
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
              GDPR Compliance & Data Privacy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Quantix is committed to European General Data Protection Regulation (GDPR) standards, ensuring full protection of merchant and customer transaction data.
            </p>
          </div>

          {/* Key Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Data Minimization', desc: 'We only collect essential telemetry and transaction metadata required to process sales and fulfill billing.' },
              { title: 'Right to Erasure', desc: 'Merchants can request complete removal of non-fiscal logs from cloud synchronization servers.' },
              { title: 'AES-256 Encryption', desc: 'All database payloads in transit and at rest are encrypted with bank-grade encryption keys.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50/50 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl space-y-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle size={16} />
                </div>
                <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Policy Text */}
          <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-gray-50/30 dark:bg-slate-900/20 p-8 rounded-3xl border border-gray-200 dark:border-slate-800/80">
            <h2 className="text-lg font-syne font-bold uppercase text-slate-900 dark:text-white">Your Rights Under GDPR</h2>
            <p>Under GDPR, data subjects have the right to access, rectify, port, and erase their personal data. Quantix acts as a Data Processor for POS merchant data and a Data Controller for direct merchant account registration records.</p>
            <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white pt-2">Data Protection Officer Contact</h3>
            <p>For data subject requests or privacy inquiries, contact our Data Protection Officer at <span className="text-blue-500 font-bold">privacy@quantixpos.com</span>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
