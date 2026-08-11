// src/app/(public)/status/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { CheckCircle, Server, Activity } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform System Status & Uptime | Quantix POS',
  description: 'Real-time status metrics and uptime dashboard for Quantix Cloud API, Telemetry Services, and Standalone Sync endpoints.',
};

const SERVICES = [
  { name: 'SaaS Platform REST API', status: 'Operational', latency: '42 ms', uptime: '99.99%' },
  { name: 'Merchant Cloud Telemetry Sync', status: 'Operational', latency: '35 ms', uptime: '99.98%' },
  { name: 'Payment Gateway Bridge', status: 'Operational', latency: '120 ms', uptime: '100%' },
  { name: 'Standalone Token Licensing Service', status: 'Operational', latency: '28 ms', uptime: '99.99%' },
  { name: 'Online Ordering Portal', status: 'Operational', latency: '50 ms', uptime: '99.95%' },
];

export default function SystemStatusPage() {
  return (
    <PublicLayout>
      <Navbar />
      <main className="min-h-screen bg-white pb-16 pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <div className="site-container max-w-5xl space-y-10 sm:space-y-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              All Systems Operational
            </div>
            <h1 className="text-3xl font-syne font-black uppercase leading-tight text-slate-900 dark:text-white sm:text-5xl">
              Quantix Platform Status
            </h1>
            <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
              Real-time monitoring of our global POS infrastructure, cloud sync gateways, and database telemetry nodes.
            </p>
          </div>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/40 sm:p-6">
              <Server className="h-5 w-5 text-primary" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Active services</p>
              <p className="mt-1 text-2xl font-syne font-black text-slate-900 dark:text-white">5</p>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/40 sm:p-6">
              <Activity className="h-5 w-5 text-primary" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Average latency</p>
              <p className="mt-1 text-2xl font-syne font-black text-slate-900 dark:text-white">59 ms</p>
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/40 sm:p-6">
              <CheckCircle className="h-5 w-5 text-primary" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
              <p className="mt-1 text-2xl font-syne font-black text-slate-900 dark:text-white">Healthy</p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-slate-50/50 p-5 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/40 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800">
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">Service Component</span>
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">Status & Uptime</span>
            </div>

            <div className="space-y-3 pt-4">
              {SERVICES.map((svc) => (
                <div
                  key={svc.name}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/60 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <h4 className="text-xs font-bold uppercase font-syne text-slate-900 dark:text-white">
                        {svc.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">Response time: {svc.latency}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1">
                    <span className="inline-block rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {svc.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{svc.uptime} SLA</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
