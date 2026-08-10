// src/app/(public)/features/[featureSlug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Cloud,
  CreditCard,
  Database,
  Layout,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Timer,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";

type FeatureCard = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

type FeatureVisual = {
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
};

type FeatureFaq = {
  question: string;
  answer: string;
};

interface FeatureData {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  benefits: string[];
  techSpec: string;
  relatedFeatures: { title: string; slug: string }[];
  visual?: FeatureVisual;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overviewTitle?: string;
  overviewDesc?: string;
  capabilities?: FeatureCard[];
  workflowTitle?: string;
  workflowDesc?: string;
  workflowItems?: FeatureCard[];
  useCaseTitle?: string;
  useCaseDesc?: string;
  useCases?: FeatureCard[];
  faqs?: FeatureFaq[];
}

const FEATURES_DATA: Record<string, FeatureData> = {
  "smart-inventory": {
    slug: "smart-inventory",
    title: "Smart Inventory & Recipe Costing",
    tagline: "Track raw ingredient costs and calculate perfect profit margins.",
    desc:
      "Never guess your actual margins. Smart inventory tracks individual item variations, raw recipe details, ingredient wastes log, and automated supplier draft orders, preserving accurate profit metrics across all locations.",
    benefits: ["Recipe costing down to the gram", "Automatic low-stock supplier email alerts", "Integrated waste logging dashboards"],
    techSpec: "Syncs stock levels in real-time using secure JSON webhooks mapped directly to standard warehouse APIs.",
    relatedFeatures: [
      { title: "Offline Registers database", slug: "offline-registers" },
      { title: "Interactive restaurant floor manager", slug: "table-management" },
    ],
  },
  "offline-registers": {
    slug: "offline-registers",
    title: "Offline Standalone Register POS",
    tagline: "Process sales and print thermal bills completely without internet.",
    desc:
      "Secure continuous billing operations even during network failovers. The register utilizes a secure local IndexedDB database on your hard drive to record sales, authorize PIN access, and print thermal receipt papers natively, backing up logs upon connection restores.",
    benefits: ["No server connectivity dependencies", "High-speed local IndexedDB lookups", "Encrypted local cache storage logs"],
    techSpec: "Utilizes high-performance local SQLite / IndexedDB databases with local course-pacing backup buffers.",
    relatedFeatures: [
      { title: "Smart inventory metrics", slug: "smart-inventory" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "table-management": {
    slug: "table-management",
    title: "Table Management & Floor Layouts",
    tagline: "Interactive floor layouts, visual course alerts, and split checks.",
    desc:
      "Maximize table turn velocities. Design interactive custom floor layouts, fire courses course pacing directly to different KDS screens, and handle complex customer check splits instantly at the terminal register.",
    benefits: ["Drag & drop floor builder layouts", "Dynamic multi-course KDS routing triggers", "Instant check splitting modules"],
    techSpec: "Interactive HTML5 canvas grids connected directly to state telemetry handlers.",
    relatedFeatures: [
      { title: "Offline Registers database", slug: "offline-registers" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "online-ordering": {
    slug: "online-ordering",
    title: "Direct Online Ordering Portal",
    tagline: "Branded commission-free web ordering for pickup & delivery.",
    desc:
      "Eliminate third-party commission fees. Launch a custom-branded web storefront and mobile web app where customers order directly. Orders route directly into your POS register and Kitchen Display System.",
    benefits: ["0% commission fee direct orders", "Real-time menu stock availability sync", "Automated SMS order status updates"],
    techSpec: "High-speed Server-Side Rendered ordering portal with instant WebSocket POS notification dispatch.",
    relatedFeatures: [
      { title: "Delivery Management", slug: "delivery-management" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "self-service-kiosk": {
    slug: "self-service-kiosk",
    title: "Self-Service Kiosk Ordering",
    tagline: "Guest-led ordering screens connected to POS, KDS, payments, and receipts.",
    desc:
      "Give guests a guided touchscreen ordering flow for menu browsing, modifiers, add-ons, dine-in, takeaway, and pickup selection. Orders stay connected to the same Quantix POS, kitchen display, inventory, receipt, and payment workflow your team already uses.",
    benefits: [
      "Visual menu browsing with modifier control",
      "Dine-in, takeaway, pickup, and counter-service flows",
      "POS, KDS, payment terminal, and receipt printer routing",
      "Staff override controls for busy service moments",
    ],
    techSpec:
      "Locked-down kiosk mode interface for touchscreen ordering, menu availability sync, integrated payment terminal status, thermal receipt printing, and POS/KDS order routing.",
    visual: {
      imageSrc: "/images/online_ordering_3d.png",
      imageAlt: "Self-service kiosk ordering workflow connected to POS and kitchen display",
      topBadge: "Guest self-ordering",
      bottomBadge: "Connected POS + KDS workflow",
    },
    primaryCta: { label: "Start Kiosk Setup", href: "/sign-up" },
    secondaryCta: { label: "Contact Sales", href: "/contact/sales" },
    overviewTitle: "What the kiosk module handles",
    overviewDesc:
      "The kiosk experience should feel simple to guests, while still giving operators the control they need over menus, payments, kitchen routing, receipts, and staff exceptions.",
    capabilities: [
      { title: "Visual menu browsing", desc: "Show categories, item photos, availability, add-ons, and clear item details.", icon: Tablet },
      { title: "Modifiers and add-ons", desc: "Guide guests through sizes, toppings, notes, combos, and required choices.", icon: Layout },
      { title: "Order type selection", desc: "Support dine-in, takeaway, pickup, and counter-service order paths.", icon: ShoppingBag },
      { title: "Integrated payments", desc: "Keep card terminal payment status tied to each kiosk checkout.", icon: CreditCard },
      { title: "Receipt printing", desc: "Print customer receipts, order numbers, and pickup references when needed.", icon: Printer },
      { title: "Kitchen routing", desc: "Send confirmed kiosk orders into POS and KDS station workflows.", icon: ChefHat },
    ],
    workflowTitle: "Connected to the same Quantix service flow",
    workflowDesc:
      "Kiosk orders should not create a separate island. Menu changes, stock availability, payments, KDS tickets, receipts, and order handoff stay aligned with the wider POS platform.",
    workflowItems: [
      { title: "Menu sync", desc: "Publish item availability, pricing, categories, modifiers, and combo options from the platform.", icon: Cloud },
      { title: "Payment confirmation", desc: "Track payment status before sending the order into kitchen and counter queues.", icon: CreditCard },
      { title: "KDS and prep tickets", desc: "Route food, drink, and prep items to the right kitchen or service station.", icon: Monitor },
      { title: "Receipt and pickup flow", desc: "Generate order numbers, receipts, pickup labels, and customer-facing status cues.", icon: ReceiptText },
      { title: "Staff assistance", desc: "Let staff resolve payment issues, item questions, overrides, and abandoned carts.", icon: ShieldCheck },
      { title: "Service timing", desc: "Keep kiosk orders visible alongside online, QR, delivery, and counter orders.", icon: Timer },
    ],
    useCaseTitle: "Where self-service kiosks fit best",
    useCaseDesc:
      "Use kiosks where guests need quick guided ordering and staff need less pressure at the counter.",
    useCases: [
      { title: "Quick-service restaurants", desc: "Let guests build meals while staff focus on prep and handoff.", icon: Utensils },
      { title: "Cafes and bakeries", desc: "Speed up repeat orders, add-ons, takeaway, and pickup queues.", icon: Store },
      { title: "Food courts", desc: "Support visual menu browsing and clear order numbers during peak periods.", icon: ShoppingBag },
      { title: "Retail express checkout", desc: "Use guided self-checkout style flows for simple counter items.", icon: Zap },
    ],
    faqs: [
      {
        question: "Can kiosk orders go directly to the kitchen display?",
        answer:
          "Yes. Kiosk orders can be routed into the POS and KDS flow so prep stations receive the right tickets after checkout confirmation.",
      },
      {
        question: "Can it support modifiers, combos, and add-ons?",
        answer:
          "Yes. The kiosk flow can guide guests through required modifiers, optional add-ons, combos, notes, and item availability rules.",
      },
      {
        question: "Does it support payment terminals and receipts?",
        answer:
          "Yes. The workflow can connect kiosk checkout with card terminal payment status and thermal receipt printing where hardware is configured.",
      },
      {
        question: "Can staff help or override a kiosk order?",
        answer:
          "Yes. Staff assistance and override controls can be used for payment issues, unavailable items, corrections, and service exceptions.",
      },
    ],
    relatedFeatures: [
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "qr-code-ordering": {
    slug: "qr-code-ordering",
    title: "Tableside QR Code Ordering & Pay",
    tagline: "Contactless digital menus for instant guest self-service at table.",
    desc:
      "Allow guests to scan a table QR code, browse rich visual menus, place orders, and pay directly from their mobile browser without downloading any application or waiting for a server.",
    benefits: ["Zero app installation required for guests", "Instant table-to-kitchen ticket firing", "Split bill & digital tip checkout"],
    techSpec: "Web-native PWA client leveraging dynamic QR token validation for secure table sessions.",
    relatedFeatures: [
      { title: "Table Management & Floor Layouts", slug: "table-management" },
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
    ],
  },
  "kitchen-display": {
    slug: "kitchen-display",
    title: "Kitchen Display System (KDS)",
    tagline: "Replace paper tickets with real-time digital kitchen order screens.",
    desc:
      "Eliminate lost paper tickets and miscommunications. KDS screens color-code order prep times, organize tickets by station (Grill, Fryer, Assembly), and notify front-of-house staff when orders are ready.",
    benefits: ["Color-coded order prep timer alerts", "Multi-station ticket routing & bump bars", "Real-time kitchen order status sync"],
    techSpec: "Low-latency WebSockets with local subnet fallback to ensure zero order loss.",
    relatedFeatures: [
      { title: "Table Management & Floor Layouts", slug: "table-management" },
      { title: "Offline Standalone Register POS", slug: "offline-registers" },
    ],
  },
  "delivery-management": {
    slug: "delivery-management",
    title: "Delivery Management & Dispatch Hub",
    tagline: "Manage in-house drivers and third-party delivery dispatch in one view.",
    desc:
      "Consolidate incoming delivery orders from your website, DoorDash, and Uber Eats into a single dispatch dashboard. Assign drivers, track real-time GPS locations, and send automated SMS updates to customers.",
    benefits: ["Single screen for all delivery orders", "Driver assignment & route optimization", "Customer live SMS tracking links"],
    techSpec: "Integrated REST API bridge connecting DoorDash Drive and mapping services directly into POS dispatch.",
    relatedFeatures: [
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "marketing-loyalty": {
    slug: "marketing-loyalty",
    title: "Customer Loyalty & Marketing Engine",
    tagline: "Turn one-time diners into loyal repeat customers with automated rewards.",
    desc:
      "Build automated customer profiles, track purchasing habits, issue digital loyalty points, and send targeted SMS/email promotion campaigns directly from your POS control panel.",
    benefits: ["Automated points earning & redemption", "Targeted customer segment SMS campaigns", "Digital gift cards & promo coupons"],
    techSpec: "Real-time customer profile database with automated behavioral campaign triggers.",
    relatedFeatures: [
      { title: "Smart Inventory & Recipe Costing", slug: "smart-inventory" },
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
    ],
  },
};

const motionTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const FeatureCardGrid: React.FC<{
  title: string;
  description: string;
  items: FeatureCard[];
  eyebrow?: string;
}> = ({ title, description, items, eyebrow = "Feature capabilities" }) => (
  <section className="border-y border-slate-200/80 bg-slate-50/70 py-12 dark:border-slate-800/80 dark:bg-slate-900/45 sm:py-16">
    <div className="site-container">
      <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Sparkles className="h-3 w-3 stroke-[2.4]" />
          {eyebrow}
        </span>
        <h2 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              transition={{ ...motionTransition, delay: index * 0.04 }}
              className="group rounded-lg border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                <Icon className="h-5 w-5 stroke-[2.4]" />
              </div>
              <h3 className="font-syne text-base font-black leading-tight text-slate-950 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const WorkflowSection: React.FC<{ feature: FeatureData }> = ({ feature }) => {
  if (!feature.workflowItems?.length) return null;

  const visual = feature.visual;

  return (
    <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-5 lg:col-span-6"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                <Database className="h-3 w-3 stroke-[2.4]" />
                Connected workflow
              </span>
              <h2 className="max-w-2xl font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                {feature.workflowTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {feature.workflowDesc}
              </p>
            </div>

            <div className="grid gap-3">
              {feature.workflowItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:text-primary-light">
                      <Icon className="h-4 w-4 stroke-[2.4]" />
                    </span>
                    <span>
                      <span className="block font-syne text-sm font-black text-slate-950 dark:text-white">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                        {item.desc}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...motionTransition, delay: 0.08 }}
            className="lg:col-span-6"
          >
            {visual ? (
              <div className="group/image relative overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 sm:aspect-[16/10]">
                  <Image
                    src="/images/kitchen_display_3d.png"
                    alt="Self-service kiosk order routing into kitchen display workflow"
                    fill
                    sizes="(max-width: 1024px) 92vw, 44vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                  />
                </div>
                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  KDS-ready routing
                </div>
                <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[82%] items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  Built for POS operations
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200/90 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Technical specs</span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.techSpec}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function FeatureDetailPage() {
  const params = useParams();
  const featureSlug = params.featureSlug as string;
  const feature = FEATURES_DATA[featureSlug];

  if (!feature) {
    notFound();
  }

  const heroVisual = feature.visual;

  return (
    <PublicLayout>
      <Navbar />

      <main className="min-h-screen bg-white pt-24 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200/80 bg-white pb-12 dark:border-slate-800/80 dark:bg-slate-950 sm:pb-16">
          <div className="site-container px-4 sm:px-0">
            <div className="mb-8 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Link href="/" className="transition-colors hover:text-primary">Home</Link>
              <ChevronRight size={10} />
              <Link href="/features" className="transition-colors hover:text-primary">Features</Link>
              <ChevronRight size={10} />
              <span className="truncate text-primary">{feature.title}</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={motionTransition}
                className="space-y-5 lg:col-span-6"
              >
                <div>
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                    <Sparkles className="h-3 w-3 stroke-[2.4]" />
                    Feature breakdown
                  </span>
                  <h1 className="max-w-3xl font-syne text-[2rem] font-black leading-[1.06] tracking-normal text-slate-950 dark:text-white sm:text-5xl sm:tracking-tight lg:text-[3.4rem]">
                    {feature.title}
                  </h1>
                </div>

                <p className="text-xs font-black uppercase tracking-wider text-primary dark:text-primary-light sm:text-sm">
                  {feature.tagline}
                </p>
                <p className="max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {feature.desc}
                </p>

                <div className="grid gap-2.5 pt-2 sm:grid-cols-2">
                  {feature.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-2.5 rounded-lg border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-primary-light">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </span>
                      <span className="text-xs font-bold leading-relaxed text-slate-700 dark:text-slate-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {(feature.primaryCta || feature.secondaryCta) && (
                  <div className="flex flex-row gap-3 pt-2">
                    {feature.primaryCta && (
                      <Link
                        href={feature.primaryCta.href}
                        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 font-syne text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:flex-none sm:px-6"
                      >
                        {feature.primaryCta.label}
                        <ArrowRight className="h-4 w-4 stroke-[2.6]" />
                      </Link>
                    )}
                    {feature.secondaryCta && (
                      <Link
                        href={feature.secondaryCta.href}
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 font-syne text-[11px] font-extrabold uppercase tracking-wider text-slate-900 transition-all duration-200 hover:border-primary/40 hover:text-primary active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:flex-none sm:px-6"
                      >
                        {feature.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ ...motionTransition, delay: 0.08 }}
                className="lg:col-span-6"
              >
                {heroVisual ? (
                  <div className="group/image relative overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 sm:aspect-[16/10]">
                      <Image
                        src={heroVisual.imageSrc}
                        alt={heroVisual.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 92vw, 44vw"
                        className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                      />
                    </div>
                    <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {heroVisual.topBadge}
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[82%] items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-1.5 text-[11px] font-extrabold text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {heroVisual.bottomBadge}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200/90 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-light">
                      <Database className="h-3.5 w-3.5" />
                      Technical telemetry specs
                    </span>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      {feature.techSpec}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {feature.capabilities?.length ? (
          <FeatureCardGrid
            title={feature.overviewTitle ?? "Core feature capabilities"}
            description={feature.overviewDesc ?? feature.desc}
            items={feature.capabilities}
          />
        ) : null}

        <WorkflowSection feature={feature} />

        {feature.useCases?.length ? (
          <FeatureCardGrid
            eyebrow="Use cases"
            title={feature.useCaseTitle ?? "Where this feature fits"}
            description={feature.useCaseDesc ?? "Use this module across the service moments where it creates the most operational clarity."}
            items={feature.useCases}
          />
        ) : null}

        {feature.faqs?.length ? (
          <section className="bg-white py-12 dark:bg-slate-950 sm:py-16">
            <div className="site-container">
              <div className="mx-auto mb-8 max-w-3xl text-center">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <Clock className="h-3 w-3 stroke-[2.4]" />
                  Common questions
                </span>
                <h2 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                  Self-service kiosk FAQs
                </h2>
              </div>

              <div className={`grid gap-4 ${feature.faqs.length === 1 ? "mx-auto max-w-xl" : "mx-auto max-w-5xl md:grid-cols-2"}`}>
                {feature.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-lg border border-slate-200/90 bg-slate-50/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <h3 className="font-syne text-sm font-black leading-snug text-slate-950 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="border-t border-slate-200/80 bg-slate-50/70 py-12 dark:border-slate-800/80 dark:bg-slate-900/45">
          <div className="site-container">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              <div className="rounded-lg border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 lg:col-span-5">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-light">
                  <Database className="h-3.5 w-3.5" />
                  Technical specs
                </span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.techSpec}
                </p>
              </div>

              <div className="lg:col-span-7">
                <h3 className="mb-4 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Related feature breakdowns
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {feature.relatedFeatures.map((relatedFeature) => (
                    <Link key={relatedFeature.slug} href={`/features/${relatedFeature.slug}`}>
                      <div className="group flex items-center justify-between rounded-lg border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:text-primary dark:border-slate-800 dark:bg-slate-900/70">
                        <span className="text-xs font-black uppercase tracking-tight text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                          {relatedFeature.title}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </PublicLayout>
  );
}
