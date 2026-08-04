// src/app/(public)/careers/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Briefcase, MapPin, DollarSign, ArrowUpRight, Globe2 } from "lucide-react";
import Link from "next/link";

interface JobOpening {
  title: string;
  department: string;
  location: string;
  salary: string;
  type: string;
}

const JOB_OPENINGS: JobOpening[] = [
  {
    title: "Senior Core DB & Sync Engineer (Rust / TS)",
    department: "Core Platform Engineering",
    location: "Remote (Global) / USA East Coast",
    salary: "$140k – $175k + Equity",
    type: "Full-Time"
  },
  {
    title: "SaaS UI/UX Designer & Frontend Developer",
    department: "Product Design Team",
    location: "Remote / Europe or India Hubs",
    salary: "$90k – $120k",
    type: "Full-Time"
  },
  {
    title: "Enterprise Solutions & Account Executive",
    department: "Sales & Strategic Growth",
    location: "Hybrid (New York or San Francisco)",
    salary: "$80k base + OTE Commission",
    type: "Full-Time"
  },
  {
    title: "Technical Customer Success & POS Onboarding Agent",
    department: "Customer Operations Support",
    location: "Remote (Asia-Pacific / Americas)",
    salary: "$55k – $70k",
    type: "Full-Time"
  }
];

export default function CareersPage() {
  return (
    <PublicLayout>
      <Navbar />

      <div className="bg-white dark:bg-slate-950 transition-colors duration-300 flex-1">
        
        {/* Header Hero */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800/80 transition-colors text-center">
          <div className="site-container max-w-2xl space-y-4">
            <div className="mx-auto p-3.5 bg-primary/10 rounded-2xl w-fit text-primary">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-syne font-black text-slate-900 dark:text-white uppercase">Build the future of POS</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Join a high-growth, remote-first SaaS company crafting terminal billing systems used by thousands of merchants.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 site-container max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
            <Globe2 className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white uppercase">Remote-First Culture</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Code or take calls from anywhere. We sync on structured milestones rather than micromanaging active timers.
            </p>
          </div>
          
          <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
            <DollarSign className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white uppercase">Premium Compensation</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              We pay highly competitive, localized wages along with robust wellness budgets, medical stipends, and stock allocations.
            </p>
          </div>

          <div className="space-y-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
            <Briefcase className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white uppercase">Top-Tier Hardware</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Receive a premium home-office kit including standard developer computers, certified test POS reader terminals, and desk setups.
            </p>
          </div>
        </section>

        {/* Active Openings Board */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 transition-colors">
          <div className="site-container max-w-4xl space-y-8">
            <div className="text-left space-y-2">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Careers Board</span>
              <h2 className="text-3xl font-syne font-black text-slate-900 dark:text-white uppercase">Open Positions</h2>
              <p className="text-sm font-medium text-slate-500">Find the role that corresponds to your specialization and submit an application.</p>
            </div>

            <div className="space-y-4">
              {JOB_OPENINGS.map((job, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {job.department}
                    </span>
                    <h3 className="text-lg font-syne font-bold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Link
                    href="/contact"
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-xs font-bold transition shadow-md shadow-primary/20 hover:scale-105 flex items-center justify-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </PublicLayout>
  );
}
