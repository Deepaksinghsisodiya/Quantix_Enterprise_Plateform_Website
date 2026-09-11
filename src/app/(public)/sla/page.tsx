// src/app/(public)/sla/page.tsx
import React from 'react';
import { ShieldCheck, Clock3, Headset, Server } from 'lucide-react';

const SLA_POINTS = [
  {
    title: '99.9% Uptime Commitment',
    desc: 'Quantix Cloud Enterprise platforms target a 99.9% monthly uptime threshold for dashboard reports, stock sync, and payment authorizations.',
    icon: Clock3,
  },
  {
    title: 'Standalone Support Coverage',
    desc: 'Perpetual standalone licenses include offline re-downloads, activation help, and priority support with 12 business hour response targets.',
    icon: Headset,
  },
  {
    title: 'Service Credits',
    desc: 'If uptime drops below the agreed threshold, eligible subscriptions receive service credits applied to the active billing cycle.',
    icon: Server,
  },
];

export default function ServiceLevelAgreementPage() {
  return (
    <main className="min-h-screen bg-white pb-16 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <div className="site-container max-w-5xl space-y-10 sm:space-y-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 shadow-sm">
              <ShieldCheck size={13} /> Legal Guarantees
            </div>
            <h1 className="text-3xl font-syne font-black uppercase leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Service Level Agreement
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Last updated: April 1, 2026
            </p>
            <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
              This page summarizes the support, uptime, and credit terms that apply to active Quantix cloud subscriptions and standalone licenses.
            </p>
          </div>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SLA_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <article
                  key={point.title}
                  className="space-y-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 shadow-xs transition-colors dark:border-slate-800/80 dark:bg-slate-900/40 sm:p-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Icon size={16} />
                  </div>
                  <h2 className="text-sm font-syne font-bold uppercase tracking-tight text-slate-900 dark:text-white">
                    {point.title}
                  </h2>
                  <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                    {point.desc}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="space-y-6 rounded-3xl border border-slate-200/70 bg-slate-50/40 p-6 text-xs leading-relaxed text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/20 dark:text-slate-400 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-lg font-syne font-bold uppercase text-slate-900 dark:text-white">
                SLA Coverage Notes
              </h2>
              <p>
                Uptime is measured monthly and calculated from the availability of the core cloud control plane, merchant dashboards, and remote sync services.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-950/60">
                <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
                  What is covered
                </h3>
                <p className="mt-2">
                  Cloud service availability, API request handling, sync pipelines, and eligible support response windows.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-950/60">
                <h3 className="text-sm font-syne font-bold uppercase text-slate-900 dark:text-white">
                  How to escalate
                </h3>
                <p className="mt-2">
                  Contact support with your merchant ID, incident time, and affected services so the team can validate credit eligibility quickly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}
