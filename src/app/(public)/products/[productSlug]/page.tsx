"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  BarChart3,
  CalendarClock,
  Calculator,
  ChefHat,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Gift,
  Globe2,
  Headset,
  Layers,
  LockKeyhole,
  Monitor,
  PackageCheck,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  Scan,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Timer,
  Tv,
  Store,
  Tags,
  Truck,
  Utensils,
  Users,
  Warehouse,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import FAQSection from "@/features/FAQ/components/FAQ";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";

type ProductPoint = {
  title: string;
  desc: string;
};

type IncludedWorkflow = {
  title: string;
  desc: string;
};

type OrderMode = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

type FeaturePanelContent = {
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  icon?: LucideIcon;
};

type ProductSolution = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  points: ProductPoint[];
  orderModes?: OrderMode[];
  orderModesContent?: FeaturePanelContent;
  billingHardware?: OrderMode[];
  billingHardwareContent?: FeaturePanelContent;
  advancedControls?: OrderMode[];
  advancedControlsContent?: FeaturePanelContent;
  workflows: IncludedWorkflow[];
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  ctaLabel: string;
  ctaHref: string;
  icon: LucideIcon;
  faqs: FAQItem[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const fadeSide = (x: number) => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0 },
});

const motionTransition = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1] as const,
};

const PRODUCT_CARD_IMAGES: Array<{ keywords: string[]; src: string; alt: string }> = [
  { keywords: ["kitchen", "grill", "bar", "prep", "recipe"], src: "/images/kitchen_display_3d.png", alt: "Kitchen operations workflow" },
  { keywords: ["table", "dine", "restaurant", "cafe", "floor"], src: "/images/hero-restaurant.jpg", alt: "Restaurant floor workflow" },
  { keywords: ["delivery", "pickup", "takeaway", "order", "ordering", "curbside"], src: "/images/online_ordering_3d.png", alt: "Ordering and fulfillment workflow" },
  { keywords: ["stock", "inventory", "supplier", "catalog", "barcode", "shelf", "product"], src: "/images/inventory_sync_3d.png", alt: "Inventory and catalog workflow" },
  { keywords: ["mobile", "handheld", "app", "customer"], src: "/images/mobile_app_3d.png", alt: "Mobile POS workflow" },
  { keywords: ["payment", "receipt", "cash", "bill", "refund", "discount", "loyalty", "gift"], src: "/images/pos_counter_3d.png", alt: "POS checkout workflow" },
];

const getProductCardImage = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  return PRODUCT_CARD_IMAGES.find(({ keywords }) => keywords.some((keyword) => normalizedTitle.includes(keyword))) ?? {
    src: "/images/demo-thumb-ai.png",
    alt: "Quantix platform workflow",
  };
};

const WORKFLOW_IMAGE_MAP: Record<string, { src: string; alt: string; badge: string }> = {
  "Table management": {
    src: "/images/ss2.jpg",
    alt: "Restaurant table management POS screen",
    badge: "Floor workflow",
  },
  "Kitchen display system": {
    src: "/images/hero-restaurant.jpg",
    alt: "Kitchen display system workflow",
    badge: "Kitchen routing",
  },
  "Direct online ordering": {
    src: "/images/online_ordering_3d.png",
    alt: "Online ordering workflow",
    badge: "Web ordering",
  },
  "QR code ordering": {
    src: "/images/mobile_app_3d.png",
    alt: "Mobile QR ordering workflow",
    badge: "QR ordering",
  },
  "Delivery dispatch": {
    src: "/images/hero-local.png",
    alt: "Delivery dispatch workflow",
    badge: "Delivery flow",
  },
  "Loyalty workflows": {
    src: "/images/demo-thumb-ai.png",
    alt: "Customer loyalty workflow",
    badge: "Customer growth",
  },
  "Menu & modifier management": {
    src: "/images/hero-cafe.jpg",
    alt: "Restaurant menu modifier management workflow",
    badge: "Menu controls",
  },
  "Payments & split bills": {
    src: "/images/demo-thumb.jpg",
    alt: "Restaurant split bill and payment workflow",
    badge: "Bill splitting",
  },
  "Staff & shift controls": {
    src: "/images/ss3-ai.png",
    alt: "Restaurant staff shift controls dashboard",
    badge: "Staff controls",
  },
  "Inventory & recipe costing": {
    src: "/images/inventory_sync_3d.png",
    alt: "Restaurant inventory and recipe costing workflow",
    badge: "Recipe costing",
  },
  "Reservations & waitlist": {
    src: "/images/enterprise_hub_3d.png",
    alt: "Restaurant reservations and waitlist workflow",
    badge: "Guest flow",
  },
  "Restaurant analytics": {
    src: "/images/ss1.jpg",
    alt: "Restaurant analytics dashboard workflow",
    badge: "Analytics",
  },
};

const WORKFLOW_DETAIL_MAP: Record<string, string[]> = {
  "Table management": [
    "Create floor sections, assign table status, and keep servers aligned on active, seated, and ready-to-clear tables.",
    "Support split checks, course pacing, modifiers, and visual service flow from one restaurant-ready workspace.",
    "Give managers a cleaner view of table movement so dining-room decisions do not depend on manual notes.",
  ],
  "Kitchen display system": [
    "Route orders to prep stations such as grill, bar, assembly, and expo without relying on printed tickets.",
    "Keep kitchen teams aware of item modifiers, ticket timing, and order status as service volume changes.",
    "Help front-of-house teams see when items are being prepared, completed, or ready for handoff.",
  ],
  "Direct online ordering": [
    "Publish branded ordering flows for pickup and delivery so customers can order directly from your business.",
    "Send customer orders into the connected POS and kitchen workflow instead of creating a separate manual queue.",
    "Keep menu availability, ordering channels, and fulfillment steps closer to the live restaurant operation.",
  ],
  "QR code ordering": [
    "Let guests browse menus and place table orders from their phone without installing a separate application.",
    "Connect self-ordering with table service so staff can focus on service quality and order accuracy.",
    "Support quick updates to menu items, modifiers, and availability for high-change restaurant operations.",
  ],
  "Delivery dispatch": [
    "Bring delivery orders into a focused queue for assignment, preparation status, and customer updates.",
    "Support pickup, delivery, and third-party-style dispatch workflows around one POS operating layer.",
    "Help teams avoid missed handoffs by keeping driver, order, and kitchen status in one workflow.",
  ],
  "Loyalty workflows": [
    "Build customer profiles around ordering history, rewards, and repeat-visit opportunities.",
    "Support offers, loyalty points, digital rewards, and targeted customer communication workflows.",
    "Give restaurants a path to grow repeat business without bolting on a disconnected marketing tool.",
  ],
  "Menu & modifier management": [
    "Manage menu items, variants, add-ons, spice levels, combo meals, prep notes, and availability from one control layer.",
    "Keep modifiers attached to the right kitchen station so custom orders do not turn into verbal instructions.",
    "Support item changes, happy-hour pricing, out-of-stock states, and menu updates without rebuilding the workflow.",
  ],
  "Payments & split bills": [
    "Handle split checks by item, seat, table, or custom amount for dining-room and group-order scenarios.",
    "Support tips, discounts, refunds, service charges, tax handling, and partial payment workflows around the same bill.",
    "Keep payment actions connected to the POS ticket so cashiers and servers can close checks cleanly.",
  ],
  "Staff & shift controls": [
    "Control server, cashier, kitchen, and manager permissions so each role sees the actions they actually need.",
    "Track clock-in, clock-out, shift handover, drawer accountability, and end-of-day operating reports.",
    "Give managers better visibility into staff performance, table coverage, and exception actions during service.",
  ],
  "Inventory & recipe costing": [
    "Connect menu items to ingredient usage, recipe cost, stock deduction, wastage, and low-stock alerts.",
    "Help kitchens understand ingredient movement and margin impact across dine-in, takeaway, and online orders.",
    "Support more accurate purchasing decisions by tying restaurant sales back to raw inventory consumption.",
  ],
  "Reservations & waitlist": [
    "Manage bookings, walk-ins, guest queue status, seating preferences, and wait-time communication from one workflow.",
    "Help hosts coordinate table availability with actual floor status instead of disconnected reservation notes.",
    "Support smoother handoff between reservations, seating, table service, and dining-room operations.",
  ],
  "Restaurant analytics": [
    "Track item performance, peak hours, table turn time, staff activity, discounts, voids, and sales trends.",
    "Give owners a clearer view of what is selling, when teams are busiest, and where operations slow down.",
    "Connect reporting with POS activity so decisions are based on live restaurant workflows, not manual summaries.",
  ],
};

const PRODUCT_SOLUTIONS: Record<string, ProductSolution> = {
  "restaurant-pos": {
    slug: "restaurant-pos",
    eyebrow: "Restaurant POS - dining, cafes and kitchens",
    title: "Restaurant POS & Kitchen System",
    description:
      "Run table service, kitchen ticket routing, QR ordering, modifiers, and payment workflows from one restaurant-ready POS stack.",
    points: [
      { title: "Kitchen KDS routing", desc: "Send grill, bar, and prep tickets to the right display in real time." },
      { title: "Visual floor mapping", desc: "Track table status, split bills, and course-paced service from one view." },
      { title: "Tableside and QR ordering", desc: "Serve faster through handheld tablets and customer self-ordering flows." },
    ],
    orderModes: [
      { title: "Dine-in", desc: "Table service, courses, split bills, and floor status.", icon: Utensils },
      { title: "Counter service", desc: "Fast cashier orders for cafes, bakeries, and quick-service counters.", icon: Store },
      { title: "Pickup", desc: "Customer pickup orders with kitchen-ready prep flow.", icon: ShoppingBag },
      { title: "Takeaway", desc: "Fast counter orders for packed meals and quick handoff.", icon: Store },
      { title: "QR table ordering", desc: "Guests order from table QR menus without app installs.", icon: QrCode },
      { title: "Online ordering", desc: "Branded web orders routed into POS and KDS.", icon: Globe2 },
      { title: "Scheduled orders", desc: "Advance orders for pickup windows, parties, and planned service.", icon: Smartphone },
    ],
    billingHardware: [
      { title: "Guest receipt printing", desc: "Print table receipts, reprint guest bills, and counter invoices from checkout.", icon: ReceiptText },
      { title: "Kitchen ticket printing", desc: "Route prep tickets to kitchen, bar, grill, and expo printers.", icon: Printer },
      { title: "Dining cash drawer", desc: "Track server and cashier cash payments, drawer openings, shifts, and close-out totals.", icon: Banknote },
      { title: "Table card terminal", desc: "Keep terminal payment status tied to each table, split check, or counter bill.", icon: CreditCard },
      { title: "Tax, tips & service charge", desc: "Apply tax, tips, service charges, discounts, voids, and bill adjustments.", icon: Calculator },
      { title: "Shift close reports", desc: "Close the day with totals for cash, refunds, voids, and staff activity.", icon: Clock },
    ],
    advancedControls: [
      { title: "Offline billing mode", desc: "Keep dine-in tables, counter orders, receipts, and closing flow moving during short outages.", icon: Cloud },
      { title: "Customer display screen", desc: "Show table items, tips, service charge, tax, discounts, totals, and payment status.", icon: Monitor },
      { title: "Void/refund approvals", desc: "Control voids, refunds, discounts, and manager approval logs.", icon: RotateCcw },
      { title: "Kitchen prep timers", desc: "Track ticket age, prep time, bump actions, and station readiness.", icon: Timer },
      { title: "Menu scheduling", desc: "Schedule breakfast, lunch, dinner, happy-hour pricing, and item availability.", icon: CalendarClock },
      { title: "End-of-day Z reports", desc: "Summarize sales, cash, cards, taxes, discounts, voids, refunds, and shifts.", icon: ClipboardCheck },
      { title: "Tip pooling & distribution", desc: "Track service-charge splits, tip pooling, and staff payout summaries.", icon: Banknote },
      { title: "Restaurant accounting export", desc: "Export restaurant sales, service charges, tips, tax, payouts, discounts, refunds, and close-day totals.", icon: ReceiptText },
    ],
    workflows: [
      { title: "Table management", desc: "Interactive floor layouts, table status, course pacing, and split checks." },
      { title: "Kitchen display system", desc: "Station-based prep tickets for grill, bar, assembly, and expo screens." },
      { title: "Direct online ordering", desc: "Commission-free branded ordering with pickup and delivery routing." },
      { title: "QR code ordering", desc: "Guest self-ordering from table QR codes without installing an app." },
      { title: "Menu & modifier management", desc: "Control items, add-ons, variants, combos, spice levels, and availability." },
      { title: "Payments & split bills", desc: "Close checks with tips, discounts, partial payments, and split-bill workflows." },
      { title: "Staff & shift controls", desc: "Manage role permissions, shift handovers, drawer accountability, and team activity." },
      { title: "Inventory & recipe costing", desc: "Connect recipe ingredients, stock deduction, wastage, and margin visibility." },
      { title: "Reservations & waitlist", desc: "Coordinate bookings, walk-ins, queue status, seating, and table handoff." },
      { title: "Restaurant analytics", desc: "Track table turns, item sales, staff performance, voids, discounts, and peak hours." },
    ],
    imageSrc: "/images/kitchen_display_3d.png",
    imageAlt: "Restaurant POS and kitchen display system",
    topBadge: "Kitchen-ready workflow",
    bottomBadge: "Built for dining operations",
    ctaLabel: "Start Restaurant POS Trial",
    ctaHref: "/sign-up",
    icon: ChefHat,
    faqs: [
      {
        id: "restaurant-kds",
        question: "Does Restaurant POS include kitchen display routing?",
        answer:
          "Yes. Restaurant POS includes KDS routing for prep stations, bar tickets, grill tickets, and front-of-house status updates.",
      },
      {
        id: "restaurant-qr",
        question: "Can guests place orders with QR codes?",
        answer:
          "Yes. Guests can scan a table QR code, browse the menu, place orders, and send them into the POS and KDS workflow.",
      },
      {
        id: "restaurant-floor",
        question: "Can it manage tables and split bills?",
        answer:
          "Yes. The restaurant workflow supports visual floor mapping, table status, split checks, modifiers, and course-paced service.",
      },
      {
        id: "restaurant-menu-modifiers",
        question: "Can menus, modifiers, and combos be managed?",
        answer:
          "Yes. Restaurant POS can support menu items, add-ons, variants, combo meals, spice levels, availability, and kitchen notes.",
      },
      {
        id: "restaurant-recipe-costing",
        question: "Can it track recipe costing and inventory?",
        answer:
          "Yes. Restaurant workflows can connect menu sales with ingredient usage, stock deduction, wastage, recipe cost, and margin visibility.",
      },
      {
        id: "restaurant-receipt-hardware",
        question: "Does it support receipt printing and checkout hardware?",
        answer:
          "Yes. Restaurant POS can support customer receipt printing, kitchen ticket printing, cash drawer workflows, card terminal payments, tax, tips, service charge, refunds, voids, and shift close reports.",
      },
      {
        id: "restaurant-offline-z-reports",
        question: "Does it include offline billing and end-of-day reports?",
        answer:
          "Yes. Restaurant POS can support offline billing mode, shift close reports, end-of-day Z reports, cash/card totals, tax summaries, discounts, refunds, voids, and cashier activity.",
      },
    ],
  },
};

const WorkflowRow: React.FC<{
  workflow: IncludedWorkflow;
  index: number;
  fallbackImage: string;
  fallbackAlt: string;
  icon: LucideIcon;
}> = ({ workflow, index, fallbackImage, fallbackAlt, icon: Icon }) => {
  const isRight = index % 2 === 0;
  const visual = WORKFLOW_IMAGE_MAP[workflow.title] ?? {
    src: fallbackImage,
    alt: fallbackAlt,
    badge: "POS workflow",
  };
  const details = WORKFLOW_DETAIL_MAP[workflow.title] ?? [
    "Connect this workflow with POS, reporting, and operational controls around the main product module.",
    "Keep teams aligned with a clear process that supports daily business execution.",
  ];

  return (
    <div className="border-t border-slate-200/80 py-5 dark:border-slate-800/80 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 items-center gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-9 xl:gap-12">
        <motion.div
          variants={fadeSide(isRight ? -18 : 18)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...motionTransition, delay: 0.04 }}
          className={`space-y-2.5 sm:space-y-3 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:mb-2.5 sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-wider">
              <Icon className="h-3 w-3 stroke-[2.4] sm:h-3.5 sm:w-3.5" />
              Workflow {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="max-w-2xl font-syne text-[1.35rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.5rem] sm:text-3xl sm:tracking-tight lg:text-[2.35rem]">
              {workflow.title}
            </h3>
          </div>

          <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {workflow.desc}
          </p>

          <div className="grid max-w-xl gap-2">
            {details.map((detail) => (
              <div
                key={detail}
                className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 shadow-xs dark:border-slate-800 dark:bg-slate-900/70 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5"
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light sm:h-5 sm:w-5">
                  <Check className="h-3 w-3 stroke-[3] sm:h-3.5 sm:w-3.5" />
                </span>
                <span className="text-[11.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-300 min-[380px]:text-xs sm:text-sm">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeSide(isRight ? 18 : -18)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...motionTransition, delay: 0.1 }}
          className={`lg:col-span-6 ${!isRight ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
              />
            </div>

            <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {visual.badge}
            </div>

            <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
              <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
              Built into Quantix workflow
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DEFAULT_ORDER_MODES_CONTENT: FeaturePanelContent = {
  badge: "Order modes",
  title: "Serve every restaurant order type from one POS flow",
  description:
    "Dine-in, counter service, pickup, takeaway, delivery, curbside, QR, online, and scheduled orders stay connected to kitchen, billing, and handoff workflows.",
  imageSrc: "/images/ss2-ai.png",
  imageAlt: "Restaurant POS order modes and table workflow",
  topBadge: "Dine-in to delivery",
  bottomBadge: "Connected order workflow",
  icon: Sparkles,
};

const DEFAULT_BILLING_HARDWARE_CONTENT: FeaturePanelContent = {
  badge: "Billing & hardware",
  title: "Print receipts and close every bill cleanly",
  description:
    "Receipt printers, kitchen tickets, cash drawer, card terminals, tax, tips, discounts, and shift-close reports stay connected to the same POS order.",
  imageSrc: "/images/pos_counter_3d.png",
  imageAlt: "Restaurant POS receipt printing and checkout hardware workflow",
  topBadge: "Receipt + payments",
  bottomBadge: "Printer, drawer and terminal ready",
  icon: ReceiptText,
};

const DEFAULT_ADVANCED_CONTROLS_CONTENT: FeaturePanelContent = {
  badge: "Advanced controls",
  title: "Add the controls busy restaurants actually ask for",
  description:
    "Offline billing, guest-facing display, promos, approvals, prep timers, scheduled menus, delivery integrations, and end-of-day reporting stay inside the same restaurant POS workflow.",
  imageSrc: "/images/ss1-ai.png",
  imageAlt: "Advanced restaurant POS controls dashboard",
  topBadge: "Manager controls",
  bottomBadge: "Built for real restaurant operations",
  icon: Sparkles,
};

const OrderModesSection: React.FC<{
  orderModes: OrderMode[];
  content?: FeaturePanelContent;
}> = ({ orderModes, content = DEFAULT_ORDER_MODES_CONTENT }) => {
  const BadgeIcon = content.icon ?? Sparkles;

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/70 py-5 dark:border-slate-800/80 dark:bg-slate-900/45 sm:py-7">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-3 lg:col-span-6"
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[10px] sm:tracking-wider">
                <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                {content.badge}
              </span>
              <h2 className="max-w-2xl font-syne text-[1.45rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.65rem] sm:text-3xl sm:tracking-tight lg:text-[2.35rem]">
                {content.title}
              </h2>
            </div>

            <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {content.description}
            </p>

            <div className="grid max-w-xl grid-cols-1 gap-2 min-[430px]:grid-cols-2">
              {orderModes.map((mode, index) => {
                const ModeIcon = mode.icon;
                const modeImage = getProductCardImage(mode.title);

                return (
                  <motion.div
                    key={mode.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ ...motionTransition, delay: index * 0.04 }}
                    className="group/mode flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none"
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-visible rounded-lg">
                      <Image src={modeImage.src} alt={modeImage.alt} fill sizes="44px" className="rounded-lg object-cover" />
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border border-white bg-primary text-white shadow-sm dark:border-slate-900">
                        <ModeIcon className="h-3 w-3 stroke-[2.4]" />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-syne text-[12px] font-black leading-tight text-slate-950 dark:text-white sm:text-sm">
                        {mode.title}
                      </span>
                      <span className="mt-1 block text-[10.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs">
                        {mode.desc}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeSide(18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...motionTransition, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
                <Image
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                />
              </div>

              <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {content.topBadge}
              </div>

              <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                {content.bottomBadge}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BillingHardwareSection: React.FC<{
  items: OrderMode[];
  content?: FeaturePanelContent;
}> = ({ items, content = DEFAULT_BILLING_HARDWARE_CONTENT }) => {
  const BadgeIcon = content.icon ?? ReceiptText;

  return (
    <section className="border-b border-slate-200/80 bg-white py-5 dark:border-slate-800/80 dark:bg-slate-950 sm:py-7">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="lg:col-span-6 lg:order-2"
          >
            <div className="space-y-3">
              <div>
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[10px] sm:tracking-wider">
                  <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                  {content.badge}
                </span>
                <h2 className="max-w-2xl font-syne text-[1.45rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.65rem] sm:text-3xl sm:tracking-tight lg:text-[2.35rem]">
                  {content.title}
                </h2>
              </div>

              <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {content.description}
              </p>

              <div className="grid max-w-xl grid-cols-1 gap-2 min-[430px]:grid-cols-2">
                {items.map((item, index) => {
                  const ItemIcon = item.icon;
                  const itemImage = getProductCardImage(item.title);

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ ...motionTransition, delay: index * 0.04 }}
                      className="group/hardware flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none"
                    >
                      <span className="relative h-11 w-11 shrink-0 overflow-visible rounded-lg">
                        <Image src={itemImage.src} alt={itemImage.alt} fill sizes="44px" className="rounded-lg object-cover" />
                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border border-white bg-primary text-white shadow-sm dark:border-slate-900">
                          <ItemIcon className="h-3 w-3 stroke-[2.4]" />
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="block font-syne text-[12px] font-black leading-tight text-slate-950 dark:text-white sm:text-sm">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[10.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs">
                          {item.desc}
                        </span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeSide(18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...motionTransition, delay: 0.1 }}
            className="lg:col-span-6 lg:order-1"
          >
            <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
                <Image
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                />
              </div>

              <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {content.topBadge}
              </div>

              <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                {content.bottomBadge}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AdvancedControlsSection: React.FC<{
  items: OrderMode[];
  content?: FeaturePanelContent;
}> = ({ items, content = DEFAULT_ADVANCED_CONTROLS_CONTENT }) => {
  const BadgeIcon = content.icon ?? Sparkles;

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/70 py-5 dark:border-slate-800/80 dark:bg-slate-900/45 sm:py-7">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-3 lg:col-span-6"
          >
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:text-[10px] sm:tracking-wider">
                <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                {content.badge}
              </span>
              <h2 className="max-w-2xl font-syne text-[1.45rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.65rem] sm:text-3xl sm:tracking-tight lg:text-[2.35rem]">
                {content.title}
              </h2>
            </div>

            <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              {content.description}
            </p>

            <div className="grid max-w-xl grid-cols-1 gap-2 min-[430px]:grid-cols-2">
              {items.map((item, index) => {
                const ItemIcon = item.icon;
                const itemImage = getProductCardImage(item.title);

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ ...motionTransition, delay: index * 0.035 }}
                    className="group/control flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white p-2.5 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none"
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-visible rounded-lg">
                      <Image src={itemImage.src} alt={itemImage.alt} fill sizes="44px" className="rounded-lg object-cover" />
                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md border border-white bg-primary text-white shadow-sm dark:border-slate-900">
                        <ItemIcon className="h-3 w-3 stroke-[2.4]" />
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-syne text-[12px] font-black leading-tight text-slate-950 dark:text-white sm:text-sm">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[10.5px] font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xs">
                        {item.desc}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeSide(18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ ...motionTransition, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
                <Image
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                />
              </div>

              <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {content.topBadge}
              </div>

              <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                {content.bottomBadge}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function ProductSolutionPage() {
  const params = useParams();
  const productSlug = params.productSlug as string;
  const solution = PRODUCT_SOLUTIONS[productSlug];

  if (!solution) {
    notFound();
  }

  const Icon = solution.icon;

  return (
    <PublicLayout>
      <Navbar />

      <main className="min-h-screen bg-white pt-[5.75rem] text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:pt-24 lg:pt-24">
        {/* --- 1. HERO SECTION --- */}
        <section className="border-b border-slate-200/80 bg-white py-5 dark:border-slate-800/80 dark:bg-slate-950 sm:py-8 lg:py-10">
          <div className="site-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={motionTransition}
              className="mb-4 flex flex-wrap items-center gap-1.5 text-[8.5px] font-black uppercase tracking-normal text-slate-400 dark:text-slate-500 min-[380px]:text-[9px] sm:mb-6 sm:text-[10px] sm:tracking-wider"
            >
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <Link href="/products" className="transition-colors hover:text-primary">
                Platform modules
              </Link>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="max-w-full truncate text-primary">{solution.title}</span>
            </motion.div>

            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-12">
              <motion.div
                variants={fadeSide(-22)}
                initial="hidden"
                animate="visible"
                transition={{ ...motionTransition, delay: 0.08 }}
                className="space-y-3.5 lg:col-span-6"
              >
                <div>
                  <div className="mb-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[8.5px] font-black uppercase leading-none tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light min-[380px]:text-[9px] sm:mb-2.5 sm:gap-2 sm:px-3 sm:text-[11px] sm:tracking-wider">
                    <Icon className="h-3 w-3 shrink-0 stroke-[2.4] sm:h-3.5 sm:w-3.5" />
                    {solution.eyebrow}
                  </div>
                  <h1 className="max-w-2xl font-syne text-[1.72rem] font-black leading-[1.05] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.95rem] sm:text-5xl sm:tracking-tight lg:text-[3.2rem]">
                    {solution.title}
                  </h1>
                </div>

                <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 min-[380px]:text-[13px] sm:text-base">
                  {solution.description}
                </p>

                <div className="grid gap-2 pt-0.5">
                  {solution.points.map((point) => (
                    <div
                      key={point.title}
                      className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 shadow-xs dark:border-slate-800 dark:bg-slate-900/70 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5"
                    >
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light sm:h-5 sm:w-5">
                        <Check className="h-3 w-3 stroke-[3] sm:h-3.5 sm:w-3.5" />
                      </span>
                      <span className="text-[11.5px] leading-relaxed min-[380px]:text-xs sm:text-sm">
                        <strong className="font-extrabold text-slate-950 dark:text-white">{point.title}:</strong>{" "}
                        <span className="font-medium text-slate-600 dark:text-slate-300">{point.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row gap-2 pt-0.5 sm:gap-3 sm:pt-1">
                  <Link
                    href={solution.ctaHref}
                    className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-2.5 font-syne text-[8.5px] font-extrabold uppercase tracking-normal text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-95 min-[380px]:text-[9.5px] sm:h-12 sm:flex-none sm:gap-2.5 sm:rounded-full sm:px-6 sm:text-xs sm:tracking-wider"
                  >
                    <span className="truncate">{solution.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5] sm:h-4 sm:w-4" />
                  </Link>
                  <Link
                    href="/contact/sales"
                    className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-2.5 font-syne text-[8.5px] font-extrabold uppercase tracking-normal text-slate-800 transition-all duration-200 hover:border-primary/35 hover:text-primary active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 min-[380px]:text-[9.5px] sm:h-12 sm:flex-none sm:gap-2.5 sm:rounded-full sm:px-6 sm:text-xs sm:tracking-wider"
                  >
                    Contact sales
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={fadeSide(22)}
                initial="hidden"
                animate="visible"
                transition={{ ...motionTransition, delay: 0.16 }}
                className="lg:col-span-6"
              >
                <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
                    <Image
                      src={solution.imageSrc}
                      alt={solution.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                    />
                  </div>

                  <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {solution.topBadge}
                  </div>

                  <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                    <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                    {solution.bottomBadge}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 2. ORDER MODES SECTION --- */}
        {solution.orderModes && (
          <OrderModesSection orderModes={solution.orderModes} content={solution.orderModesContent} />
        )}

        {/* --- 3. BILLING & HARDWARE SECTION --- */}
        {solution.billingHardware && (
          <BillingHardwareSection items={solution.billingHardware} content={solution.billingHardwareContent} />
        )}

        {/* --- 4. ADVANCED CONTROLS --- */}
        {solution.advancedControls && (
          <AdvancedControlsSection items={solution.advancedControls} content={solution.advancedControlsContent} />
        )}

        {/* --- 5. INCLUDED WORKFLOWS --- */}
        <section className="border-b border-slate-200/80 bg-slate-50/70 py-5 dark:border-slate-800/80 dark:bg-slate-900/45 sm:py-8">
          <div className="site-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={motionTransition}
              className="mx-auto mb-1 max-w-3xl text-center sm:mb-3"
            >
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-normal text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:mb-2.5 sm:px-3 sm:text-[10px] sm:tracking-wider">
                <Sparkles className="h-3 w-3 stroke-[2.4]" />
                Included workflows
              </span>
              <h2 className="font-syne text-[1.45rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.65rem] sm:text-4xl sm:tracking-tight lg:text-5xl">
                Everything this module brings into the Quantix platform
              </h2>
            </motion.div>

            <div>
              {solution.workflows.map((workflow, index) => (
                <WorkflowRow
                  key={workflow.title}
                  workflow={workflow}
                  index={index}
                  fallbackImage={solution.imageSrc}
                  fallbackAlt={solution.imageAlt}
                  icon={solution.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. FAQS --- */}
        <FAQSection faqs={solution.faqs} isLoading={false} />
      </main>

      <Footer />
    </PublicLayout>
  );
}
