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
        <section className="border-b border-slate-100 bg-slate-50 py-16 text-center transition-colors dark:border-slate-800/80 dark:bg-slate-900/60 sm:py-24">
          <div className="site-container max-w-2xl space-y-4">
            <div className="mx-auto w-fit rounded-2xl bg-primary/10 p-3.5 text-primary">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-syne font-black uppercase text-slate-900 dark:text-white sm:text-4xl">
              Build the future of POS
            </h1>
            <p className="mx-auto max-w-md px-2 text-sm font-medium text-slate-500 dark:text-slate-400 sm:px-0">
              Join a high-growth, remote-first SaaS company crafting terminal billing systems used by thousands of merchants.
            </p>
          </div>
        </section>

        <section className="site-container grid grid-cols-1 gap-5 py-14 max-w-7xl sm:gap-8 sm:py-20 md:grid-cols-3">
          <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 sm:p-6">
            <Globe2 className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold uppercase text-slate-900 dark:text-white">
              Remote-First Culture
            </h3>
            <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Code or take calls from anywhere. We sync on structured milestones rather than micromanaging active timers.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 sm:p-6">
            <DollarSign className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold uppercase text-slate-900 dark:text-white">
              Premium Compensation
            </h3>
            <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              We pay highly competitive, localized wages along with wellness budgets, medical stipends, and stock allocations.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xs dark:border-slate-800/80 dark:bg-slate-900 sm:p-6">
            <Briefcase className="h-6 w-6 text-primary" />
            <h3 className="text-base font-syne font-bold uppercase text-slate-900 dark:text-white">
              Top-Tier Hardware
            </h3>
            <p className="text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Receive a premium home-office kit including developer computers, test POS reader terminals, and desk setups.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-14 transition-colors dark:border-slate-800/80 dark:bg-slate-900/60 sm:py-20">
          <div className="site-container max-w-4xl space-y-8">
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Careers Board</span>
              <h2 className="text-2xl font-syne font-black uppercase text-slate-900 dark:text-white sm:text-3xl">
                Open Positions
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Find the role that corresponds to your specialization and submit an application.
              </p>
            </div>

            <div className="space-y-4">
              {JOB_OPENINGS.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/60 bg-white p-5 transition hover:shadow-lg dark:border-slate-800/80 dark:bg-slate-900 sm:p-6 md:flex-row md:items-center"
                >
                  <div className="space-y-2">
                    <span className="rounded-md bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800">
                      {job.department}
                    </span>
                    <h3 className="text-base font-syne font-bold text-slate-900 dark:text-white sm:text-lg">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold font-medium text-slate-400 sm:gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-0.5">
                        <DollarSign className="h-3.5 w-3.5" />
                        {job.salary}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center gap-1 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-white transition hover:scale-105 hover:bg-primary-dark shadow-md shadow-primary/20 md:w-auto"
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
