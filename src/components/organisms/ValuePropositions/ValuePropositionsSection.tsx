'use client';

import React from 'react';
import { ArrowUpRight, ChefHat, ShieldCheck, WifiOff } from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export const ValuePropositionsSection: React.FC = () => {
  const { openModal } = useContactModal();

  const PROPOSITIONS = [
    {
      icon: <WifiOff className="h-5 w-5 stroke-[2.2]" />,
      badge: "Offline registers",
      title: "Keep checkout moving",
      description: "Process counter sales, print receipts, and keep local billing workflows available when store connectivity is unreliable.",
    },
    {
      icon: <ChefHat className="h-5 w-5 stroke-[2.2]" />,
      badge: "Restaurant flow",
      title: "Connect floor to kitchen",
      description: "Route table orders, modifiers, split bills, and KDS tickets through one restaurant-ready operating layer.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 stroke-[2.2]" />,
      badge: "Cloud control",
      title: "Manage every location",
      description: "Give multi-store teams centralized visibility across inventory, staff access, sales telemetry, and operating controls.",
    },
  ];

  return (
    <section className="bg-white py-12 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:py-16">
      <div className="site-container">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800/80 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-2 block text-[11px] font-black uppercase tracking-widest text-primary dark:text-primary-light">
              Platform advantages
            </span>
            <h2 className="font-syne text-2xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">
              Built for the daily pressure of POS operations
            </h2>
            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              Quantix brings register, kitchen, inventory, and enterprise workflows into one focused operating system for retail and restaurant teams.
            </p>
          </div>

          <span className="inline-flex w-fit items-center rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary-light">
            Retail + restaurant ready
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROPOSITIONS.map((item, idx) => (
            <div
              key={idx}
              className="group flex min-h-[220px] flex-col justify-between rounded-lg border border-slate-200/90 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-sm dark:border-slate-800/90 dark:bg-slate-900/60"
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-primary/5 text-primary dark:border-primary/30 dark:bg-primary/10 dark:text-primary-light">
                    {item.icon}
                  </div>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-black leading-snug text-slate-950 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-light">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                  0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => openModal(`Learn About ${item.title}`)}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-extrabold text-primary transition-colors hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionsSection;
