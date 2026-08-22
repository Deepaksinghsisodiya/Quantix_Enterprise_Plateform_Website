import React from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Headphones, ShieldCheck } from "lucide-react";
import { LeadFormCard } from "@/components/organisms/Footer/LeadFormCard";

export const metadata: Metadata = {
  title: "Contact Enterprise Sales & Solutions",
  description:
    "Connect with a Quantix Enterprise Solution Architect. Discuss multi-location rollouts, ERP integrations, custom SLA, and migration timelines.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white dark:bg-slate-950 page-hero-header border-b border-slate-200/80 dark:border-slate-800">
        <div className="site-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-extrabold uppercase tracking-wider text-primary mb-4">
              <Headphones size={14} />
              <span>ENTERPRISE SOLUTIONS TEAM</span>
            </div>
            <h1 className="font-syne text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Contact Quantix Enterprise
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Speak directly with our Enterprise Solution Architects about multi-location deployment, SAP/NetSuite ERP synchronization, custom SLA agreements, and zero-downtime data migration.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
                <h2 className="font-syne text-xl font-black text-slate-900 dark:text-white mb-5">
                  Enterprise Headquarters
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail size={16} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise Sales</p>
                      <a href="mailto:enterprise@quantixpos.com" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
                        enterprise@quantixpos.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone size={16} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Sales Line</p>
                      <a href="tel:+10000000000" className="text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-primary transition-colors">
                        +1 000 000 0000
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock size={16} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Support Hours</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">24/7/365 Dedicated Enterprise SLA</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MapPin size={16} />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">HQ Office</p>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Quantix Global Enterprise HQ, Tech District</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <ShieldCheck size={18} />
                  <span>Enterprise Security & SLA Guarantee</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  All enterprise conversations are covered under mutual NDA. We provide custom security reviews, SOC 2 Type II compliance reports, and dedicated sandbox environments for technical scoping.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <LeadFormCard
                heading="Request Custom Enterprise Proposal"
                subheading="Tell us your number of locations and ERP stack. An enterprise specialist will connect within 1 hour."
                badgeText="DIRECT ARCHITECT ACCESS"
                buttonText="SUBMIT PROPOSAL REQUEST"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
