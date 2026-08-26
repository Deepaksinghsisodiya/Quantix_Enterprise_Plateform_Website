"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import {
  Utensils,
  Store,
  Server,
  Globe,
  Smartphone,
  Cloud,
  Wrench,
  ArrowRight,
  Sparkles,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { RESTAURANT_SITE_URL, RETAIL_SITE_URL } from '@/components/organisms/Navbar/config/navConfig';

const PRODUCTS = [
  {
    slug: "restaurant-pos",
    title: "Restaurant POS & Kitchen System",
    eyebrow: "Restaurant & Dining",
    desc: "Tableside ordering, visual floor mapping, course pacing, KDS ticket routing, and split-check management.",
    href: "/products/restaurant-pos",
    icon: Utensils,
    badge: "Most Popular",
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    image: "/images/nav_restaurant_bundle.png",
  },
  {
    slug: "retail-pos",
    title: "Retail POS & Inventory Register",
    eyebrow: "Retail & Supermarkets",
    desc: "Barcode scanner billing, cashier permissions, offline registers, stock deductions, returns, and shelf label printing.",
    href: "/products/retail-pos",
    icon: Store,
    badge: "Scanner Ready",
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    image: "/images/nav_retail_bundle.png",
  },
  {
    slug: "cloud-pos",
    title: "Cloud POS & Multi-Store Telemetry",
    eyebrow: "Multi-Store Chains",
    desc: "Centralized cloud control for pricing, menus, live inventory sync, staff permissions, and branch analytics.",
    href: "/products/cloud-pos",
    icon: Cloud,
    badge: "Cloud Hub",
    color: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    image: "/images/nav_cloud_bundle.png",
  },
  {
    slug: "enterprise-pos",
    title: "Enterprise POS for Large Scale Networks",
    eyebrow: "Franchise & Enterprise",
    desc: "Role-permission matrices, central catalog rollouts, regional dashboards, ERP integration, and dedicated SLA operations.",
    href: "/products/enterprise-pos",
    icon: Server,
    badge: "Enterprise SLA",
    color: "from-purple-500/20 via-violet-500/10 to-transparent",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    image: "/images/ent_global_pos_bundle.png",
  },
  {
    slug: "websites",
    title: "Website Ordering & Online Storefront",
    eyebrow: "Direct Online Channels",
    desc: "Branded web storefronts, pickup and delivery routing, QR table ordering links, and direct POS order injection.",
    href: "/products/websites",
    icon: Globe,
    badge: "Zero Commission",
    color: "from-sky-500/20 via-cyan-500/10 to-transparent",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    image: "/images/ent_omnichannel_bundle.png",
  },
  {
    slug: "mobile-application",
    title: "Mobile Application & Server Handhelds",
    eyebrow: "Handheld & Mobile",
    desc: "Handheld server ordering tablets, mobile checkout, and customer self-service app experiences.",
    href: "/products/mobile-application",
    icon: Smartphone,
    badge: "Handheld POS",
    color: "from-rose-500/20 via-pink-500/10 to-transparent",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    image: "/images/ent_venues_pos.png",
  },
  {
    slug: "custom-service",
    title: "Custom POS Solutions & API Platform",
    eyebrow: "White-Label & Tailored",
    desc: "Custom workflow modules, API bridges, ERP middleware sync, white-label portals, and custom device routing.",
    href: "/products/custom-service",
    icon: Wrench,
    badge: "Tailored Build",
    color: "from-teal-500/20 via-emerald-500/10 to-transparent",
    iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    image: "/images/ent_guide_blueprint.png",
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-slate-50/60 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-linear-to-b from-white via-slate-50/60 to-slate-50/80 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950 overflow-hidden">
          <div className="site-container relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary-dark dark:text-primary-light mb-6 shadow-2xs">
              <Sparkles size={13} />
              <span>THE QUANTIX POS SUITE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-syne font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
              Purpose-Built POS Systems for Modern Business
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore our complete ecosystem of offline-first point of sale registers, kitchen display systems, direct online ordering portals, and enterprise cloud control hubs.
            </p>
          </div>
        </section>

        {/* Products Grid Section */}
        <section className="py-16 sm:py-24">
          <div className="site-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((prod) => {
                const IconComp = prod.icon;

                return (
                  <motion.div
                    key={prod.slug}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-32 bg-linear-to-b ${prod.color} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${prod.iconBg} shadow-xs`}>
                          <IconComp size={22} />
                        </span>
                        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                          {prod.badge}
                        </span>
                      </div>

                      {/* Transparent 3D Studio Mockup */}
                      <div className="relative aspect-16/10 w-full flex items-center justify-center my-3 transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain drop-shadow-xl p-1"
                        />
                      </div>

                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                        {prod.eyebrow}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-syne font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-3">
                        {prod.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                      <Link
                        href={prod.href}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-primary group-hover:text-primary-dark transition-colors"
                      >
                        <span>Explore Platform</span>
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 sm:py-20 bg-primary text-white text-center">
          <div className="site-container max-w-3xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-syne font-black">
              Need a Custom Solution for 5+ Locations?
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-medium max-w-xl mx-auto">
              Our enterprise engineers build custom workflows, API bridges, and on-site rollout plans tailored to your brand.
            </p>
            <div className="pt-2">
              <Link
                href="/sign-up/enterprise"
                className="px-8 py-4 rounded-2xl bg-white text-primary hover:bg-slate-100 font-syne font-bold text-sm shadow-xl inline-block transition-transform hover:scale-105"
              >
                Schedule Enterprise Consultation →
              </Link>
            </div>
          </div>
        </section>
      </main>
  );
}
