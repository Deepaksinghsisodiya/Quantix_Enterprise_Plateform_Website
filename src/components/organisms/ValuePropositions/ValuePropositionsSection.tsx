"use client";

import React from "react";
import { ArrowUpRight, ChefHat, ShieldCheck, Sparkles, WifiOff } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

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
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-slate-50/70 py-12 text-slate-900 transition-colors dark:border-slate-800/80 dark:bg-slate-900/45 dark:text-white sm:py-16">
      <div className="site-container relative z-10">
        <div className="mb-6 flex flex-col gap-5 border-b border-slate-200/80 pb-6 dark:border-slate-800/80 sm:mb-8 sm:pb-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[11px]">
              <Sparkles className="h-3 w-3 stroke-[2.4]" />
              Platform advantages
            </span>
            <h2 className="max-w-3xl font-syne text-[1.7rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight lg:text-4xl">
              Built for the daily pressure of POS operations
            </h2>
            <p className="mt-3 max-w-xl text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
              Quantix brings register, kitchen, inventory, and enterprise workflows into one focused operating system for retail and restaurant teams.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-white px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-primary shadow-xs dark:border-primary/30 dark:bg-slate-900 dark:text-primary-light sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Retail + restaurant ready
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-3">
          {PROPOSITIONS.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800/90 dark:bg-slate-900/70 dark:hover:shadow-none sm:min-h-[230px] sm:p-5"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary/35 group-hover:bg-primary group-hover:text-white dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:h-11 sm:w-11">
                    {item.icon}
                  </div>
                  <span className="max-w-[9.5rem] rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-right text-[9px] font-extrabold uppercase leading-tight tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400 sm:text-[10px]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-black leading-[1.15] tracking-normal text-slate-950 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary-light sm:text-xl sm:tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <span className="font-syne text-xs font-black text-slate-300 transition-colors group-hover:text-primary/70 dark:text-slate-600">
                  0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => openModal(`Learn About ${item.title}`)}
                  className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 text-[11px] font-extrabold uppercase tracking-wider text-primary transition-all duration-200 hover:border-primary/30 hover:bg-primary hover:text-white active:scale-95 dark:bg-primary/10 dark:text-primary-light dark:hover:bg-primary dark:hover:text-white"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
