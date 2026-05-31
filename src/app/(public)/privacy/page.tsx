// src/app/(public)/privacy/page.tsx
'use client';

import React, { useState } from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ShieldCheck, Mail, Globe, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [gdprForm, setGdprForm] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprForm.name || !gdprForm.email || !gdprForm.topic) return;
    setSubmitted(true);
    setGdprForm({ name: '', email: '', topic: '', message: '' });
  };

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container max-w-3xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
              LEGAL COMPLIANCE
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black tracking-tight uppercase leading-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Last updated: April 1, 2026</p>
          </div>

          {/* Policy prose content */}
          <div className="space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium border-t border-gray-100 dark:border-slate-900 pt-8">
            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">1. Introduction</h2>
              <p>
                Quantix Technologies (&ldquo;Quantix&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is dedicated to safeguarding customer privacy. This Privacy Policy details how we collect, utilize, disclose, and preserve customer information when you use our POS registers, cloud dashboard services, or website platforms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">2. Information We Collect</h2>
              <p>
                <strong className="text-slate-900 dark:text-white uppercase text-[10px] tracking-wide">Account Details:</strong> When creating accounts, we gather contact emails, merchant names, country locales, and standard subscription credentials.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white uppercase text-[10px] tracking-wide">Transaction Telemetry:</strong> Customer database registers record item logs, Z-Report summaries, and sales analytics cached locally on client terminals or synced to enterprise endpoints.
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white uppercase text-[10px] tracking-wide">Device Cookies:</strong> Web portals dispatch analytical cookies to track preferred metrics.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">3. Data Security & Storage</h2>
              <p>
                Enterprise cloud data registers employ AES-256 databases with TLS 1.3 transmission gateways. Standalone offline clients deploy databases locally within active memory caches. Standard security checks utilize JWT auth logs and RBAC parameters.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">4. GDPR Rights</h2>
              <p>
                European Union operators hold the right to export, rectify, restrict, or purge personal databases. Quantix POS registers implement standard GDPR anonymizer methods, Z-Report sweeps, and instant deletion scripts.
              </p>
            </section>

            {/* GDPR Interactive Form Section */}
            <section className="space-y-6 bg-gray-50 dark:bg-slate-900/10 border border-gray-200 dark:border-slate-850 p-6 rounded-3xl">
              <div className="space-y-2">
                <h3 className="text-xs font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">Submit GDPR Data Request</h3>
                <p className="text-[10px] text-slate-500">Exercise your GDPR options directly via this secure form. Requests resolve within 30 business days.</p>
              </div>

              {submitted ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 dark:text-emerald-400">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span className="text-[10px] font-bold uppercase">GDPR Access Request Received Securely.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={gdprForm.name}
                        onChange={(e) => setGdprForm({ ...gdprForm, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={gdprForm.email}
                        onChange={(e) => setGdprForm({ ...gdprForm, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Request Type *</label>
                    <select
                      required
                      value={gdprForm.topic}
                      onChange={(e) => setGdprForm({ ...gdprForm, topic: e.target.value })}
                      className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none cursor-pointer"
                    >
                      <option value="">Select option...</option>
                      <option value="export">Export personal data</option>
                      <option value="rectify">Rectify account records</option>
                      <option value="erase">Purge database entries</option>
                      <option value="restrict">Restrict diagnostic logs</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Additional details</label>
                    <textarea
                      rows={3}
                      value={gdprForm.message}
                      onChange={(e) => setGdprForm({ ...gdprForm, message: e.target.value })}
                      placeholder="Add descriptive requests..."
                      className="w-full rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-full cursor-pointer uppercase transition-all"
                  >
                    Submit GDPR Request
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
