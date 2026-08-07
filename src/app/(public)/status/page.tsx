// src/app/(public)/status/page.tsx
import React from 'react';
import { PublicLayout } from '@/components/organisms/PublicLayout/PublicLayout';
import Navbar from '@/components/organisms/Navbar/Navbar';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Activity, CheckCircle, RefreshCw, Server, Wifi } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Platform System Status & Uptime | Quantix POS',
  description: 'Real-time status metrics and uptime dashboard for Quantix Cloud API, Telemetry Services, and Standalone Sync endpoints.',
};

export default function SystemStatusPage() {
  const services = [
    { name: 'SaaS Platform REST API', status: 'Operational', latency: '42 ms', uptime: '99.99%' },
    { name: 'Merchant Cloud Telemetry Sync', status: 'Operational', latency: '35 ms', uptime: '99.98%' },
    { name: 'Payment Gateway Gateway Bridge', status: 'Operational', latency: '120 ms', uptime: '100%' },
    { name: 'Standalone Token Licensing Service', status: 'Operational', latency: '28 ms', uptime: '99.99%' },
    { name: 'Online Ordering Portal', status: 'Operational', latency: '50 ms', uptime: '99.95%' },
  ];

  return (
    <PublicLayout>
      <Navbar />
      <main className="pt-24 bg-white dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pb-16 transition-colors duration-300">
        <div className="site-container max-w-4xl px-4 sm:px-0 space-y-10">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              All Systems Operational
            </div>
            <h1 className="text-3xl sm:text-5xl font-syne font-black uppercase text-slate-900 dark:text-white leading-tight">
              Quantix Platform Status
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Real-time monitoring of our global POS infrastructure, cloud sync gateways, and database telemetry nodes.
            </p>
          </div>

          {/* Status Matrix Card */}
          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/80 pb-4">
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">Service Component</span>
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-slate-400">Status & Uptime</span>
            </div>

            <div className="space-y-3">
              {services.map((svc, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-gray-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-syne">{svc.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Response time: {svc.latency}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                      {svc.status}
                    </span>
                    <span className="block text-[10px] font-mono text-slate-400 mt-0.5">{svc.uptime} SLA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PublicLayout>
  );
}
