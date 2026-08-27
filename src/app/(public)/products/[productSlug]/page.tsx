import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Cloud,
  Globe,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import FAQSection from "@/features/FAQ/FAQSection";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials/components/TestimonialsWrapper";
import { MainProductsShowcaseSection } from "@/components/organisms/MainProductsShowcaseSection/MainProductsShowcaseSection";

type ProductPoint = {
  title: string;
  desc: string;
};

type ProductWorkflow = {
  title: string;
  desc: string;
};

type ProductSolution = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  points: ProductPoint[];
  workflows: ProductWorkflow[];
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  ctaLabel: string;
  icon: LucideIcon;
  faqs: FAQItem[];
};

const PRODUCT_SOLUTIONS: Record<string, ProductSolution> = {
  "restaurant-pos": {
    slug: "restaurant-pos",
    eyebrow: "Restaurant POS & Kitchen System",
    title: "Restaurant POS & Kitchen Management System",
    description:
      "Run table service, kitchen ticket routing, QR ordering, modifiers, and payment workflows from one restaurant-ready POS stack.",
    points: [
      { title: "Kitchen KDS Routing", desc: "Send grill, bar, and prep tickets to the right display in real time." },
      { title: "Visual Floor Mapping", desc: "Track table status, split bills, and course-paced service from one view." },
      { title: "Tableside & QR Ordering", desc: "Serve faster through handheld tablets and customer self-ordering flows." },
    ],
    workflows: [
      { title: "Table Management", desc: "Interactive floor layouts, table status, course pacing, and split checks." },
      { title: "Kitchen Display System", desc: "Station-based prep tickets for grill, bar, assembly, and expo screens." },
      { title: "Direct Online Ordering", desc: "Commission-free branded ordering with pickup and delivery routing." },
      { title: "QR Code Ordering", desc: "Guest self-ordering from table QR codes without installing an app." },
      { title: "Menu & Modifier Control", desc: "Control items, add-ons, variants, combos, spice levels, and availability." },
      { title: "Payments & Split Bills", desc: "Close checks with tips, discounts, partial payments, and split-bill workflows." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Dual-screen restaurant POS countertop terminal with receipt printer and card reader",
    topBadge: "Commercial EPOS Hardware",
    bottomBadge: "Dual-Screen Countertop POS",
    ctaLabel: "Start Restaurant POS Trial",
    icon: ChefHat,
    faqs: [
      { id: "restaurant-kds", question: "Does Restaurant POS include kitchen display routing?", answer: "Yes. Restaurant POS includes KDS routing for prep stations, bar tickets, grill tickets, and front-of-house status updates." },
      { id: "restaurant-qr", question: "Can guests place orders with QR codes?", answer: "Yes. Guests can scan a table QR code, browse the menu, place orders, and send them into the POS and KDS workflow." },
      { id: "restaurant-floor", question: "Can it manage tables and split bills?", answer: "Yes. The restaurant workflow supports visual floor mapping, table status, split checks, modifiers, and course-paced service." },
    ],
  },
  "retail-pos": {
    slug: "retail-pos",
    eyebrow: "Retail POS & Barcode Register",
    title: "Retail POS & Barcode Inventory Register",
    description:
      "Rapid barcode billing, stock deductions, cashier drawer controls, shelf label printing, and offline till continuity for retail stores.",
    points: [
      { title: "Barcode Checkout Speed", desc: "Scan items instantly with handheld or USB barcode readers." },
      { title: "Offline Till Continuity", desc: "Process checkout and print receipts even during internet dropouts." },
      { title: "Real-Time Stock Control", desc: "Track stock levels, matrix items (size/color), and automatic low-stock alerts." },
    ],
    workflows: [
      { title: "Offline Register", desc: "Process sales, receipts, and cash drawers offline during network outages." },
      { title: "Smart Inventory Sync", desc: "Real-time inventory deduction, PO generation, and stock level tracking." },
      { title: "High-Speed Barcode Lookup", desc: "High-speed 1D/2D barcode scanning and price lookup." },
      { title: "Returns & Discounts", desc: "Manager PIN overrides, item exchanges, and promotional discounts." },
      { title: "Product Catalog & Variants", desc: "Manage item matrices, variants, supplier SKUs, and bundle pricing." },
      { title: "Automated Purchase Orders", desc: "Automated reorder triggers, PO creation, and stock receiving." },
    ],
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Retail POS checkout register and barcode peripherals",
    topBadge: "Barcode Ready",
    bottomBadge: "Built for Retail Checkout",
    ctaLabel: "Start Retail POS Trial",
    icon: Store,
    faqs: [
      { id: "retail-offline", question: "Does Retail POS work when internet is down?", answer: "Yes. Local register sync allows continuous barcode checkout, receipt printing, and drawer access during network outages." },
      { id: "retail-barcodes", question: "Can it print barcode shelf labels?", answer: "Yes. Quantix supports printing barcode stickers, shelf tags, and custom price labels directly from inventory." },
      { id: "retail-variants", question: "How does it handle size and color variants?", answer: "Create matrix items easily with independent SKU numbers, color swatches, and size breakdowns." },
    ],
  },
  "cloud-pos": {
    slug: "cloud-pos",
    eyebrow: "Cloud Back-Office Hub & Analytics",
    title: "Cloud POS & Multi-Store Telemetry",
    description:
      "Centralized cloud hub to control pricing, menus, live inventory sync, employee shift permissions, and consolidated branch analytics.",
    points: [
      { title: "Central Store Control", desc: "Manage catalog pricing, store menus, and promos across all branches." },
      { title: "Live Branch Telemetry", desc: "View real-time sales revenue, cashier performance, and hourly footfall." },
      { title: "Cloud Accounting Sync", desc: "Automated daily financial exports for QuickBooks, Xero, and CSV files." },
    ],
    workflows: [
      { title: "Multi-Location Dashboards", desc: "Consolidated sales telemetry, revenue breakdown, and branch comparison." },
      { title: "Central Menu Control", desc: "Instant pricing, menu item, and tax updates pushed across all store registers." },
      { title: "Cloud Financial Reporting", desc: "Real-time P&L analytics, inventory valuation, and accounting exports." },
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Cloud POS back-office dashboard",
    topBadge: "Multi-Store Cloud Hub",
    bottomBadge: "Real-Time Store Telemetry",
    ctaLabel: "Explore Cloud POS Hub",
    icon: Cloud,
    faqs: [
      { id: "cloud-sync", question: "How fast is store data updated in the cloud?", answer: "Register transactions sync to your cloud dashboard in sub-second real time." },
    ],
  },
  "enterprise-pos": {
    slug: "enterprise-pos",
    eyebrow: "Enterprise Multi-Location Networks",
    title: "Enterprise POS for Large Scale Chains",
    description:
      "Role permission matrices, central catalog rollouts, regional dashboards, ERP integrations, and 24/7 dedicated SLA operations.",
    points: [
      { title: "Role Permission Governance", desc: "Granular access control for cashiers, managers, regional leads, and admins." },
      { title: "Custom ERP & API Middleware", desc: "Connect Quantix with SAP, Oracle, NetSuite, and enterprise ERP systems." },
      { title: "Dedicated SLA Support", desc: "Priority 24/7 technical hotline and dedicated rollout account manager." },
    ],
    workflows: [
      { title: "Multi-Location Dashboards", desc: "Enterprise branch performance, live telemetry, and unified ledger reports." },
      { title: "Central Catalog Syndication", desc: "Push catalog versions, combo rules, and regional pricing to 50+ stores in seconds." },
      { title: "ERP Accounting Sync", desc: "P&L dashboards, inventory COGS audits, and automatic ERP ledger sync." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Enterprise POS hardware bundle",
    topBadge: "Enterprise SLA",
    bottomBadge: "Built for 50+ Locations",
    ctaLabel: "Schedule Enterprise Demo",
    icon: Server,
    faqs: [
      { id: "ent-erp", question: "Does Enterprise POS support SAP and NetSuite?", answer: "Yes, native gRPC and REST webhook pipelines post daily sales, taxes, and COGS journal entries automatically." },
    ],
  },
  websites: {
    slug: "websites",
    eyebrow: "Direct Online Channels",
    title: "Website Ordering & Online Storefront",
    description:
      "Direct branded web ordering storefronts with real-time POS stock sync, pickup scheduling, and delivery driver dispatching.",
    points: [
      { title: "Commission-Free Ordering", desc: "Keep 100% of your online revenue without third-party marketplace fees." },
      { title: "Direct POS & KDS Sync", desc: "Online orders appear directly on your kitchen and till screens." },
      { title: "Branded Mobile Storefront", desc: "Fast, responsive web checkout tailored to your brand identity." },
    ],
    workflows: [
      { title: "Branded Storefront", desc: "Mobile-responsive ordering website with item photos, modifiers, and cart checkout." },
      { title: "Pickup & Delivery Windows", desc: "Scheduled pickup time windows, delivery zones, and courier dispatch links." },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Website ordering and digital storefront platform",
    topBadge: "Direct Web Sales",
    bottomBadge: "Zero Commission",
    ctaLabel: "Launch Online Store",
    icon: Globe,
    faqs: [
      { id: "web-pos", question: "Do online orders sync directly to the kitchen?", answer: "Yes, web orders route directly to KDS screens and till printers automatically." },
    ],
  },
  "mobile-application": {
    slug: "mobile-application",
    eyebrow: "Handheld & Mobile POS",
    title: "Mobile POS & Server Handheld Terminals",
    description:
      "Equip servers and hawkers with ultra-fast mobile POS tablets for tableside ordering, line busting, and contactless payments.",
    points: [
      { title: "Tableside Speed", desc: "Fire tickets to kitchen stations directly from the dining room floor." },
      { title: "Line Busting", desc: "Process counter rushes and event lines with portable tap-to-pay units." },
      { title: "Real-Time Floor Sync", desc: "Table status and split check states update across all devices instantly." },
    ],
    workflows: [
      { title: "Server Handhelds", desc: "Handheld ordering tablets with instant kitchen firing and tableside payments." },
      { title: "Mobile QR Ordering", desc: "Guest mobile self-ordering without requiring separate app downloads." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Mobile server handheld terminal",
    topBadge: "Tableside Ordering",
    bottomBadge: "Portable EMV Payment",
    ctaLabel: "Equip Mobile Fleet",
    icon: Smartphone,
    faqs: [
      { id: "mobile-offline", question: "Do handhelds work in dead zones?", answer: "Yes, local IndexedDB till caches allow servers to take orders even when Wi-Fi fluctuates." },
    ],
  },
  "custom-service": {
    slug: "custom-service",
    eyebrow: "Bespoke Engineering & Custom Workflows",
    title: "Custom POS Engineering & Tailored Workflows",
    description:
      "Bespoke POS workflows, custom hardware peripheral drivers, legacy database migration, and dedicated integration engineers.",
    points: [
      { title: "Custom Workflow Architecture", desc: "Tailored cashier interfaces, modifier trees, and production routing." },
      { title: "Legacy Migration Support", desc: "Seamless historical data and product catalog migration from legacy POS." },
      { title: "Dedicated Solutions Architect", desc: "Named engineering lead for custom API bridges and on-site rollout." },
    ],
    workflows: [
      { title: "Custom Workflow Design", desc: "Tailor checkout UI, KDS station screens, and cashier flows to exact specs." },
      { title: "API Bridge Development", desc: "Custom REST, GraphQL, and webhook bridges to connect legacy ERPs." },
    ],
    imageSrc: "/images/ent_guide_blueprint.png",
    imageAlt: "Custom POS engineering blueprint and architecture",
    topBadge: "Custom Engineering",
    bottomBadge: "Dedicated Solutions Lead",
    ctaLabel: "Book Architecture Call",
    icon: Server,
    faqs: [
      { id: "custom-api", question: "Can you build custom API bridges for legacy ERPs?", answer: "Yes, our engineering team provides custom middleware connectors for legacy on-premise systems." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCT_SOLUTIONS).map((productSlug) => ({ productSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}): Promise<Metadata> {
  const { productSlug } = await params;
  const product = PRODUCT_SOLUTIONS[productSlug];
  if (!product) {
    return { title: "Products | Quantix Enterprise" };
  }
  return {
    title: `${product.title} | Quantix Enterprise`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;

  if (!productSlug) {
    notFound();
  }

  let product = PRODUCT_SOLUTIONS[productSlug];
  if (!product) {
    product = {
      slug: productSlug,
      eyebrow: productSlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      title: `${productSlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")} System`,
      description: `Tailored enterprise capabilities for ${productSlug.replace("-", " ")} operations with central telemetry, offline mesh reliability, and multi-unit controls.`,
      points: [
        { title: "Enterprise Grade Speed", desc: "Engineered for high-volume transactions and sub-second checkout." },
        { title: "Sub-4ms Offline Till Mesh", desc: "Maintain continuous operations during broadband interruptions." },
        { title: "Central HQ Telemetry", desc: "Real-time visibility into branch revenue, inventory, and staff." },
      ],
      workflows: [
        { title: "Connected Till Systems", desc: "Keep menu and inventory in sync across all store registers." },
        { title: "Live Real-Time Sync", desc: "Stream real-time transactions into cloud telemetry consoles." },
        { title: "24/7 SLA Operations", desc: "Backed by enterprise support and uptime guarantees." },
      ],
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: productSlug,
      topBadge: "Quantix Product",
      bottomBadge: "All-in-One POS",
      ctaLabel: "Contact Sales",
      icon: Store,
      faqs: [
        { id: "prod-faq", question: "How quickly can we deploy this product across multiple venues?", answer: "Our deployment team configures hardware, menu mapping, and staff training in under 48 hours." },
      ],
    };
  }
  const Icon = product.icon;

  return (
    <>
      {/* 1. Hero Section (Matching Exact Restaurant & Retail Benchmark) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-55 sm:max-w-none">{product.eyebrow}</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light shadow-xs">
                <Icon size={14} className="stroke-[2.5]" />
                <span>{product.eyebrow}</span>
              </div>

              <h1 className="font-syne text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {product.title}
              </h1>

              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {product.description}
              </p>

              <div className="grid gap-2.5 pt-2">
                {product.points.map((point) => (
                  <div key={point.title} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                      <Check className="h-3.5 w-3.5 stroke-3" />
                    </span>
                    <span className="text-xs sm:text-sm">
                      <strong className="font-extrabold text-slate-950 dark:text-white">{point.title}: </strong>
                      <span className="font-medium text-slate-600 dark:text-slate-300">{point.desc}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 pt-4 w-full sm:w-auto">
                <Link
                  href="/sign-up"
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95 text-center min-w-0 cursor-pointer"
                >
                  <span className="truncate">{product.ctaLabel}</span>
                  <ArrowRight size={13} className="shrink-0" />
                </Link>
                <RequestDemoButton
                  title={`Request Demo for ${product.title}`}
                  buttonText="PRODUCT_DETAIL_DEMO"
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-center min-w-0"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full flex items-center justify-center p-2">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-contain p-2 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Capabilities Bento Grid Section */}
      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">PRODUCT CAPABILITIES</span>
            <h2 className="font-syne text-2xl font-black text-slate-900 dark:text-white sm:text-3xl leading-tight">
              Engineered For Modern Workflows
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Purpose-built capabilities engineered to streamline operations and scale multi-unit performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {product.workflows.map((wf) => (
              <div
                key={wf.title}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary shrink-0" />
                    <h3 className="font-syne font-bold text-slate-900 dark:text-white text-base line-clamp-1">{wf.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Main Products Showcase Section */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80">
        <MainProductsShowcaseSection />
      </div>

      {/* 4. Customer Social Proof */}
      <TestimonialsWrapper />

      {/* 5. Product FAQ Section */}
      <FAQSection faqs={product.faqs} />

      {/* 6. Production CTA Banner */}
      <CTABanner />
    </>
  );
}
