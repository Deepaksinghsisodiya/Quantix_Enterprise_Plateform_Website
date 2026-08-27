import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChefHat,
  Check,
  ChevronRight,
  Coffee,
  Globe2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Tv,
  Utensils,
  Truck,
  Building2,
  Cloud,
  Server,
  Layers,
  LineChart,
  Users,
  Boxes,
  Wrench,
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
    eyebrow: "Restaurant & Kitchen POS",
    title: "Restaurant POS & Kitchen System",
    description:
      "Equip your restaurant with visual floor mapping, course pacing, complex bill splitting, QR ordering, and robust back-of-house kitchen displays.",
    points: [
      { title: "Course-Paced Routing", desc: "Fire starters, mains, and desserts in perfect sequence to the kitchen KDS displays." },
      { title: "Visual Table Floor Plans", desc: "Track table status, guest seat counts, and server sections in real time." },
      { title: "Advanced Bill Splitting", desc: "Split checks by seat, fractional amount, or individual items easily at tableside." },
    ],
    workflows: [
      { title: "Tableside Handhelds", desc: "Equip servers with mobile tablets to take orders and process payments directly at the table." },
      { title: "Multi-Station KDS Sync", desc: "Instant order ticket routing to grill, bar, salad, and expo prep station screens." },
      { title: "Tip & Shift Pooling", desc: "Manage server checkouts, tip pooling distribution, and cash drawer reconciliations." },
      { title: "Direct QR Table Ordering", desc: "Let diners scan QR codes on tables to load the interactive restaurant menu and pay instantly." },
      { title: "Menu & Modifier Trees", desc: "Custom order buttons for recipe variants, add-ons, temperatures, and allergy warnings." },
      { title: "Inventory & Recipe Costing", desc: "Link menu items to ingredient usage weights and calculate dish profit margins in real time." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Full service restaurant POS and kitchen management system",
    topBadge: "Full-Service Dining",
    bottomBadge: "Table Ops & Pacing",
    ctaLabel: "Start Restaurant POS Trial",
    icon: ChefHat,
    faqs: [
      { id: "rest-1", question: "Can I manage multiple dining rooms and patio sections?", answer: "Yes, you can create unlimited custom floor plans for indoor, patio, banquet, and bar seating." },
      { id: "rest-2", question: "Does Restaurant POS include kitchen display routing?", answer: "Yes. Orders route automatically to prep stations such as grill, bar, and expo screens without paper delays." },
      { id: "rest-3", question: "Can guests place orders with QR codes at their table?", answer: "Yes. Guests can scan a table QR code, browse the live menu, place orders, and pay with Apple Pay or credit cards." },
      { id: "rest-4", question: "Does the system work offline during internet outages?", answer: "Yes. Terminals operate on local IndexedDB storage caches, printing tickets and processing bills without interruption." },
    ],
  },
  "retail-pos": {
    slug: "retail-pos",
    eyebrow: "Retail & Inventory Registers",
    title: "Retail POS & Inventory Register",
    description:
      "Rapid barcode scanning billing, real-time stock deductions, cashier drawer controls, shelf label printing, and offline till continuity for retail stores.",
    points: [
      { title: "Barcode Checkout Speed", desc: "Scan items instantly with handheld or high-speed USB barcode readers." },
      { title: "Offline Till Continuity", desc: "Process checkout and print receipts even during internet broadband dropouts." },
      { title: "Real-Time Stock Control", desc: "Track inventory levels, matrix items (size/color), and automatic low-stock alerts." },
    ],
    workflows: [
      { title: "Barcode Lookup & Scale Sync", desc: "High-speed 1D/2D barcode scanning with certified weighing scale integrations." },
      { title: "Returns & Refund Governance", desc: "Manager PIN overrides, item exchanges, damaged goods logging, and promo discounts." },
      { title: "Automated Purchase Orders", desc: "Automated reorder triggers, supplier PO creation, and stock receiving ledgers." },
    ],
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Retail POS checkout register",
    topBadge: "Barcode Ready",
    bottomBadge: "Built for Retail",
    ctaLabel: "Explore Retail POS",
    icon: Store,
    faqs: [
      { id: "ret-1", question: "Does Retail POS work when internet is down?", answer: "Yes. Local register sync allows continuous barcode checkout and drawer access during network outages." },
      { id: "ret-2", question: "Can it print barcode shelf labels?", answer: "Yes. Quantix supports printing barcode stickers, shelf tags, and custom price labels directly from inventory." },
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
      { title: "Multi-Location Dashboards", desc: "Consolidated sales telemetry, revenue breakdown, and branch comparisons." },
      { title: "Central Menu Syndication", desc: "Instant pricing, menu item, and tax updates pushed across all store registers." },
      { title: "Automated Cloud Reporting", desc: "Real-time P&L analytics, inventory valuation, and accounting exports." },
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Cloud POS back-office dashboard",
    topBadge: "Cloud Hub",
    bottomBadge: "Real-time Telemetry",
    ctaLabel: "Explore Cloud POS",
    icon: Cloud,
    faqs: [
      { id: "cld-1", question: "How fast is store data updated in the cloud?", answer: "Register transactions sync to your cloud dashboard in sub-second real time." },
    ],
  },
  "enterprise-pos": {
    slug: "enterprise-pos",
    eyebrow: "Enterprise Multi-Location Networks",
    title: "Enterprise POS for Large Scale Chains",
    description:
      "Role-permission matrices, central catalog rollouts, regional dashboards, ERP integrations, and 24/7 dedicated SLA operations.",
    points: [
      { title: "Role Permission Governance", desc: "Granular access control for cashiers, managers, regional leads, and admins." },
      { title: "Custom ERP & API Middleware", desc: "Connect Quantix with SAP, Oracle, NetSuite, and enterprise ERP systems." },
      { title: "Dedicated SLA Support", desc: "Priority 24/7 technical hotline and dedicated rollout account manager." },
    ],
    workflows: [
      { title: "Franchise Royalty Tracking", desc: "Automate percentage-based sales tracking and royalty payout audits." },
      { title: "Group-Wide Loyalty Sync", desc: "Allow customers to earn and redeem reward points across any chain location." },
      { title: "Central Purchasing Ledger", desc: "Coordinate warehouse raw ingredient orders and cross-outlet stock transfers." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Enterprise POS hardware bundle",
    topBadge: "Enterprise SLA",
    bottomBadge: "50+ Locations",
    ctaLabel: "Explore Enterprise POS",
    icon: Server,
    faqs: [
      { id: "ent-1", question: "Does Enterprise POS support SAP and NetSuite?", answer: "Yes, native gRPC and REST webhook pipelines post daily sales, taxes, and COGS journal entries automatically." },
    ],
  },
  "websites": {
    slug: "websites",
    eyebrow: "Direct Online Ordering & Web Storefront",
    title: "Website Ordering & Online Storefront",
    description:
      "Direct branded web ordering for pickup and delivery, QR code menus, and direct order injection into POS and kitchen KDS.",
    points: [
      { title: "Zero App Commission", desc: "Keep 100% of your online food and dining sales without third-party fees." },
      { title: "Direct POS & KDS Routing", desc: "Online orders bypass manual entry and print straight to kitchen screens." },
      { title: "Mobile Responsive Portal", desc: "Stunning web storefront that works seamlessly on customer mobile browsers." },
    ],
    workflows: [
      { title: "Branded Web Storefront", desc: "Publish a mobile-friendly web storefront with custom branding, item photos, and zero marketplace commission." },
      { title: "Pickup & Delivery Dispatch", desc: "Support pickup time windows, delivery zones, order status tracking, and kitchen ticket injection." },
      { title: "Direct Kitchen Routing", desc: "Send customer orders into the connected POS and kitchen workflow instead of creating a separate manual queue." },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Online ordering website storefront",
    topBadge: "Direct Sales",
    bottomBadge: "Zero Commission",
    ctaLabel: "Launch Online Store",
    icon: Globe2,
    faqs: [
      { id: "web-1", question: "Are there third-party order commissions?", answer: "No. Quantix online ordering is direct with zero third-party per-order commissions." },
    ],
  },
  "mobile-application": {
    slug: "mobile-application",
    eyebrow: "Handheld Server POS & Mobile Apps",
    title: "Mobile Application & Server Handhelds",
    description:
      "Handheld waiter tablets for tableside ordering, mobile payment processing, and customer self-service mobile app experiences.",
    points: [
      { title: "Tableside Server Ordering", desc: "Take orders right at the table and fire tickets instantly to kitchen displays." },
      { title: "Mobile Payment Checkout", desc: "Process contactless cards, Apple Pay, and tip entry on handheld terminals." },
      { title: "Faster Table Turnover", desc: "Reduce server trip times and speed up dining room service speed." },
    ],
    workflows: [
      { title: "Server Handheld Terminals", desc: "Equip servers with mobile handheld tablets for tableside ordering, ticket firing, and mobile card payment collection." },
      { title: "Live Table Status Sync", desc: "See seated, paid, empty, and dirty tables in color-coded sections on server screens." },
      { title: "Tableside Check Splitting", desc: "Drag items to separate check registers right in front of restaurant guests." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Mobile waiter handheld POS tablet app",
    topBadge: "Handheld POS",
    bottomBadge: "Tableside Order & Pay",
    ctaLabel: "Explore Handheld POS",
    icon: Smartphone,
    faqs: [
      { id: "mob-1", question: "What devices run the handheld server app?", answer: "Quantix handheld POS runs on standard Android tablets, mobile POS terminals, and iOS devices." },
    ],
  },
  "custom-service": {
    slug: "custom-service",
    eyebrow: "Custom POS Development & API Platform",
    title: "Custom POS Solutions & API Platform",
    description:
      "White-label POS customization, custom API middleware bridges, ERP integration engineering, and non-standard workflow design.",
    points: [
      { title: "White-Label Customization", desc: "Tailor branding, register screens, and terminal UX to your exact specifications." },
      { title: "Open API & Webhooks", desc: "REST & GraphQL APIs to bridge Quantix POS with custom web applications and ERPs." },
      { title: "Custom Integration Engineering", desc: "Dedicated engineering team to build custom system and payment drivers." },
    ],
    workflows: [
      { title: "Tailored Register UX", desc: "Tailor order states, cashier screens, KDS routing rules, and terminal UX to fit non-standard business models." },
      { title: "Connected API Middleware", desc: "Open REST/GraphQL APIs, webhooks, and middleware connectors to bridge Quantix POS with custom ERPs and legacy tools." },
      { title: "Developer Sandbox & SLA", desc: "Dedicated technical onboarding, webhook logs, and dedicated integration engineering support." },
    ],
    imageSrc: "/images/ent_guide_blueprint.png",
    imageAlt: "Custom POS development and API platform",
    topBadge: "White-Label & API",
    bottomBadge: "Custom Engineering",
    ctaLabel: "Request Custom Proposal",
    icon: Wrench,
    faqs: [
      { id: "cst-1", question: "Do you provide developer API access?", answer: "Yes. We provide full API keys, developer sandboxes, and webhook documentation for custom integrations." },
    ],
  },
  "takeout-pos": {
    slug: "takeout-pos",
    eyebrow: "Takeout & High-Speed Tills",
    title: "High-Speed Takeout Till POS",
    description:
      "Engineered for rapid order entry, fast payment collection, and direct kitchen routing for takeouts, bakeries, and fast food.",
    points: [
      { title: "Sub-Second Counter Till", desc: "Fast layout with custom shortcut hotkeys for high-volume orders." },
      { title: "Online Aggregators Sync", desc: "Consolidate Uber Eats, Deliveroo, and online orders directly on the till screen." },
      { title: "Lobby Order Paging", desc: "Sync ticket numbers with guest pagers to manage busy queue throughput." },
    ],
    workflows: [
      { title: "Sub-Second Cashier Billing", desc: "Maximize lobby order throughput during peak rush hours with custom hotkey grids and cashier fast-pins." },
      { title: "Aggregator Ingestion", desc: "No more maintaining 5 tablets. Uber Eats, Just Eat, and web orders flow into one unified queue." },
      { title: "Driver Ticket Assigning", desc: "Assign orders in batches to drivers, monitor delivery run durations, and print address slips." },
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "High speed takeout POS screen",
    topBadge: "High Speed",
    bottomBadge: "Fast Food Till",
    ctaLabel: "Explore Takeout POS",
    icon: Utensils,
    faqs: [
      { id: "tk-1", question: "Does it support fast cashier logins?", answer: "Yes, cashier pins or RFID cards log staff in instantly." },
    ],
  },
  "cafe-pos": {
    slug: "cafe-pos",
    eyebrow: "Cafes, Bakeries & Coffee Shops",
    title: "Cafe & Coffee Shop POS System",
    description:
      "Syrup & milk modifier grids, bar tabs, and pastry barcode scanner sync built for bustling cafes and coffee shops.",
    points: [
      { title: "Drink Modifier Grids", desc: "One-tap modifiers for milk choices, sizes, and syrup shots." },
      { title: "Bar Tabs & Quick Pay", desc: "Open, hold, and close tabs for bar and cafe guests." },
      { title: "Lobby Customer Screens", desc: "Display drink statuses clearly on a secondary display console." },
    ],
    workflows: [
      { title: "Drink & Prep Customization", desc: "Serve custom coffees and beverages quickly with dedicated milk, syrup, and extra shots modifier matrices." },
      { title: "Cafe Digital Loyalty Cards", desc: "Reward regular coffee drinkers with digital stamp cards and points directly at checkout." },
      { title: "Bakery Barcode Scanning", desc: "Process pre-packaged goods, coffee bags, and pastries using plug-and-play barcode scanners." },
    ],
    imageSrc: "/images/ent_cafe_bakery_bundle.png",
    imageAlt: "Cafe and coffee shop POS workflow",
    topBadge: "Cafe & Bakery",
    bottomBadge: "Barista Workflows",
    ctaLabel: "Explore Cafe POS",
    icon: Coffee,
    faqs: [
      { id: "cf-1", question: "Can we print labels for cups?", answer: "Yes, we support automatic sticky label printing for cups." },
    ],
  },
  "kds": {
    slug: "kds",
    eyebrow: "Kitchen Display System",
    title: "Kitchen Display System (KDS)",
    description:
      "Replace paper tickets with real-time station displays, expo screens, and prep timer bump screens.",
    points: [
      { title: "Expo Station KDS", desc: "Track total ticket preparation and coordinate front-of-house collections." },
      { title: "Bump Bar Inputs", desc: "Physical or digital bump controls to mark items prepared." },
      { title: "Multi-Station Routing", desc: "Direct items from a single order to different screens in the kitchen automatically." },
    ],
    workflows: [
      { title: "Station-Based Prep Routing", desc: "Route items from a single order to different screens in the kitchen (grill, salad, assembly, expo)." },
      { title: "Interactive Bump Bars & Timers", desc: "Keep kitchen teams moving with color-coded ticket timers, priority alerts, and physical bump bars." },
      { title: "FOH Ready Alerts", desc: "Sync kitchen completions with lobby status boards and server handheld devices automatically." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Kitchen display system KDS screens for prep stations",
    topBadge: "Paperless Kitchen",
    bottomBadge: "Zero Delay Routing",
    ctaLabel: "Explore KDS System",
    icon: Tv,
    faqs: [
      { id: "kds-1", question: "How many screens can I connect?", answer: "You can connect unlimited station screens to one central system." },
    ],
  },
  "kiosk": {
    slug: "kiosk",
    eyebrow: "Self-Ordering Touchscreen Kiosks",
    title: "Self-Ordering Checkout Kiosks",
    description:
      "Deploy self-service touchscreen kiosks to reduce queue times and increase average order values.",
    points: [
      { title: "Upsell Modifier Flow", desc: "Auto-prompts for combo upgrades, extra toppings, and drinks." },
      { title: "Card Terminal Sync", desc: "Fully integrated payment kiosk terminals for quick customer checkouts." },
      { title: "Multi-Language Menus", desc: "Let customers toggle menu language options instantly with one click." },
    ],
    workflows: [
      { title: "Interactive Touchscreen Menu", desc: "A stunning, responsive kiosk interface that keeps queues moving and reduces counter labor costs." },
      { title: "Automated Upsell Engine", desc: "Boost average ticket value by prompting diners to add extra toppings, drinks, or sides before paying." },
      { title: "Integrated Card Checkout", desc: "Integrated payment terminals for secure credit card taps and Apple Pay checkouts." },
    ],
    imageSrc: "/images/ent_qsr_kiosk_bundle.png",
    imageAlt: "Lobby self-service ordering kiosk",
    topBadge: "Lobby Kiosk",
    bottomBadge: "Line Buster",
    ctaLabel: "Explore Kiosk POS",
    icon: Smartphone,
    faqs: [
      { id: "ki-1", question: "Can it print orders directly?", answer: "Yes, it has a built-in receipt printer." },
    ],
  },
  "portal": {
    slug: "portal",
    eyebrow: "Cloud Manager Portal",
    title: "Cloud Portal Management",
    description:
      "Centralized recipe costing, analytics, inventory tracking, and franchise menu rollouts.",
    points: [
      { title: "Recipe Cost Control", desc: "Track raw ingredient prices and monitor profit margins." },
      { title: "Central Menu Push", desc: "Push new items and menu configurations to all branches at once." },
      { title: "Cross-Store Analysis", desc: "Compare revenue charts, check averages, and peak hours across multiple stores." },
    ],
    workflows: [
      { title: "Recipe Costing & Inventory", desc: "Connect menu items to ingredient weights, track cost variations, and trigger reorder alerts." },
      { title: "Consolidated Group Reports", desc: "Access sales reports, labor costs, void logs, and store performance comparisons." },
      { title: "Manager Audit Trail", desc: "Track cash drawer corrections, discounts, and exception void logs remotely." },
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Cloud management back-office console",
    topBadge: "Cloud Portal",
    bottomBadge: "Central Control",
    ctaLabel: "Explore Cloud Portal",
    icon: Layers,
    faqs: [
      { id: "po-1", question: "Can I manage multiple locations?", answer: "Yes, you can manage 1 to 100+ stores from one login." },
    ],
  },
  "inventory": {
    slug: "inventory",
    eyebrow: "Inventory & Food Costing",
    title: "Inventory Tracking & Food Cost Control",
    description:
      "Connect menu items to raw ingredient weights, track real-time food cost ratios, monitor kitchen wastage, and trigger automated reorder alerts.",
    points: [
      { title: "Recipe-Level Deductions", desc: "Each order automatically deducts exact raw ingredient quantities from inventory." },
      { title: "Live Food Cost Analysis", desc: "Calculate profit margins for every dish using real-time supplier pricing." },
      { title: "Low-Stock Alerts", desc: "Receive push notifications when ingredients fall below minimum thresholds." },
    ],
    workflows: [
      { title: "Recipe Costing Engine", desc: "Link menu items to raw ingredient weights and calculate exact per-dish food cost percentages." },
      { title: "Wastage & Variance Reports", desc: "Track kitchen waste, unexpected shrinkage, and variance between theoretical vs actual inventory counts." },
      { title: "Supplier Purchase Orders", desc: "Generate automated supplier purchase orders when raw ingredients reach reorder thresholds." },
    ],
    imageSrc: "/images/ent_supply_chain_bundle.png",
    imageAlt: "Inventory tracking and food cost control dashboard",
    topBadge: "Smart Inventory",
    bottomBadge: "Food Cost Control",
    ctaLabel: "Explore Inventory Tools",
    icon: Boxes,
    faqs: [
      { id: "inv-1", question: "Can recipe costing handle item modifier deductions?", answer: "Yes. Adding extra cheese automatically deducts the extra raw weight." },
    ],
  },
  "analytics": {
    slug: "analytics",
    eyebrow: "Sales & Performance Analytics",
    title: "Real-Time Sales & Performance Analytics",
    description:
      "Access live sales dashboards, automated Z-reports, staff performance metrics, and item-level profitability heatmaps from any device.",
    points: [
      { title: "Live Sales Dashboards", desc: "View real-time revenue, transaction counts, and average ticket values." },
      { title: "Automated Z-Reports", desc: "Generate end-of-day summaries automatically with tax breakdowns." },
      { title: "Staff Performance", desc: "Track which servers drive the most upsells and fastest table turns." },
    ],
    workflows: [
      { title: "Live Revenue Monitoring", desc: "See real-time transaction updates, hourly sales charts, and order channel breakdowns on your phone." },
      { title: "End-of-Day Z-Reports", desc: "Automatically generate comprehensive closing reports with tax summaries, payment splits, and void logs." },
      { title: "Staff & Menu Performance", desc: "Benchmark server performance, track upsell rates, and identify your most profitable menu items." },
    ],
    imageSrc: "/images/ent_bi_analytics_bundle.png",
    imageAlt: "Restaurant sales analytics and reporting dashboard",
    topBadge: "Live Analytics",
    bottomBadge: "Performance Insights",
    ctaLabel: "Explore Analytics",
    icon: LineChart,
    faqs: [
      { id: "an-1", question: "Can I access reports on my phone?", answer: "Yes, our cloud dashboard is fully optimized for mobile devices." },
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
      title: productSlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      description: `Tailored workflows for ${productSlug.replace("-", " ")} are currently being mapped out for our enterprise POS platform.`,
      points: [
        { title: "Features Coming Soon", desc: "This product module is being integrated into our next core update." }
      ],
      workflows: [
        { title: "Connected Till Systems", desc: "Keep menu and inventory in sync across all devices." },
        { title: "Live Real-Time Sync", desc: "Stream real-time transactions into cloud telemetry consoles." },
        { title: "24/7 SLA Operations", desc: "Backed by enterprise support and uptime guarantees." },
      ],
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: productSlug,
      topBadge: "Quantix POS",
      bottomBadge: "All-in-one",
      ctaLabel: "Contact Sales",
      icon: Store,
      faqs: [
        { id: "coming-soon", question: "When will this module be released?", answer: "This product module is part of our upcoming release pipeline. Contact our sales team for an early-access demo." }
      ],
    };
  }
  const Icon = product.icon;

  return (
    <>
      {/* 1. Hero Section (Matching Restaurant Benchmark) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-55 sm:max-w-none">{product.eyebrow || product.title}</span>
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

      {/* 2. Industry Workflows Section (Matching Restaurant Benchmark) */}
      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">INDUSTRY WORKFLOWS</span>
            <h2 className="font-syne text-2xl font-black text-slate-900 dark:text-white sm:text-3xl leading-tight">
              Engineered For {product.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Purpose-built capabilities engineered to streamline operations and elevate customer experience.
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

      {/* 4. Customer Testimonials */}
      <TestimonialsWrapper />

      {/* 5. FAQ Section */}
      <FAQSection faqs={product.faqs} />

      {/* 6. Production CTA Banner */}
      <CTABanner />
    </>
  );
}
