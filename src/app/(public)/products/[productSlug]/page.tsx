"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  Calculator,
  ChefHat,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Cloud,
  CreditCard,
  Globe,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Timer,
  Store,
  Utensils,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import FAQSection from "@/features/FAQ/FAQSection";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";

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
  billingCheckout?: OrderMode[];
  billingCheckoutContent?: FeaturePanelContent;
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
  { keywords: ["table", "dine", "floor", "counter", "pos", "terminal"], src: "/images/nav_restaurant_bundle.png", alt: "Dual-screen restaurant POS countertop terminal" },
  { keywords: ["kitchen", "grill", "bar", "prep", "kds"], src: "/images/ent_global_pos_bundle.png", alt: "Kitchen display KDS system" },
  { keywords: ["handheld", "waiter", "card terminal", "terminal", "pay"], src: "/images/nav_payment_bundle.png", alt: "POS card reader and billing peripherals" },
  { keywords: ["delivery", "dispatch", "courier", "route"], src: "/images/ent_delivery_dispatch_bundle.png", alt: "Food delivery management and courier dispatch tracking" },
  { keywords: ["stock", "inventory", "recipe", "costing", "cost"], src: "/images/ent_supply_chain_bundle.png", alt: "Recipe costing and inventory control" },
  { keywords: ["qr", "mobile", "phone"], src: "/images/rest_qr_table_bundle.png", alt: "Mobile QR code ordering interface on restaurant table" },
  { keywords: ["online", "web", "storefront", "pickup"], src: "/images/ent_omnichannel_bundle.png", alt: "Online web ordering portal" },
  { keywords: ["kiosk", "self-service"], src: "/images/ent_qsr_kiosk_bundle.png", alt: "Restaurant free-standing self-ordering kiosk" },
  { keywords: ["menu", "modifier", "topping", "variant", "scheduled", "board"], src: "/images/rest_menu_modifier_bundle.png", alt: "Restaurant digital menu board and modifier management" },
  { keywords: ["staff", "shift", "permission", "drawer", "roster"], src: "/images/ent_franchise_portal.png", alt: "Staff roster and shift scheduling dashboard" },
  { keywords: ["reservation", "waitlist", "booking", "guest queue"], src: "/images/ent_fine_dining_bundle.png", alt: "Table reservations and waitlist host stand" },
  { keywords: ["loyalty", "crm", "rewards", "vip"], src: "/images/rest_loyalty_crm_bundle.png", alt: "Customer loyalty and dining CRM" },
  { keywords: ["analytics", "telemetry", "reports", "margin", "p&l"], src: "/images/ent_bi_analytics_bundle.png", alt: "Restaurant revenue analytics and telemetry" },
  { keywords: ["payment", "receipt", "cash", "bill", "split", "tip"], src: "/images/nav_payment_bundle.png", alt: "POS checkout and split check terminal" },
];

const getProductCardImage = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  return PRODUCT_CARD_IMAGES.find(({ keywords }) => keywords.some((keyword) => normalizedTitle.includes(keyword))) ?? {
    src: "/images/ent_global_pos_bundle.png",
    alt: "Quantix restaurant platform workflow",
  };
};

const WORKFLOW_IMAGE_MAP: Record<string, { src: string; alt: string; badge: string }> = {
  "Table management": { src: "/images/nav_restaurant_bundle.png", alt: "Interactive table layout and floor management system", badge: "Floor hardware" },
  "Kitchen display system": { src: "/images/ent_global_pos_bundle.png", alt: "Commercial kitchen display system KDS workflow", badge: "Kitchen routing" },
  "Direct online ordering": { src: "/images/ent_omnichannel_bundle.png", alt: "Online ordering web storefront workflow", badge: "Web ordering" },
  "QR code ordering": { src: "/images/rest_qr_table_bundle.png", alt: "Mobile QR code self-ordering workflow", badge: "QR ordering" },
  "Delivery dispatch": { src: "/images/ent_delivery_dispatch_bundle.png", alt: "Delivery dispatch and courier route workflow", badge: "Delivery dispatch" },
  "Loyalty workflows": { src: "/images/rest_loyalty_crm_bundle.png", alt: "Customer dining CRM and loyalty workflow", badge: "Customer loyalty" },
  "Menu & modifier management": { src: "/images/rest_menu_modifier_bundle.png", alt: "Restaurant digital menu and modifier workflow", badge: "Menu controls" },
  "Payments & split bills": { src: "/images/nav_payment_bundle.png", alt: "Clean POS billing terminal and receipt peripherals", badge: "Payment hardware" },
  "Staff & shift controls": { src: "/images/ent_franchise_portal.png", alt: "Restaurant staff roster and shift scheduling dashboard", badge: "Staff controls" },
  "Inventory & recipe costing": { src: "/images/ent_supply_chain_bundle.png", alt: "Restaurant recipe ingredient costing and inventory workflow", badge: "Recipe costing" },
  "Reservations & waitlist": { src: "/images/ent_fine_dining_bundle.png", alt: "Restaurant host stand reservations and waitlist workflow", badge: "Guest flow" },
  "Restaurant analytics": { src: "/images/ent_bi_analytics_bundle.png", alt: "Restaurant revenue analytics and telemetry dashboard", badge: "Live telemetry" },
  "Offline register": { src: "/images/nav_retail_bundle.png", alt: "Offline retail register workflow", badge: "Offline till" },
  "Smart inventory": { src: "/images/ent_supply_chain_bundle.png", alt: "Smart inventory sync workflow", badge: "Inventory sync" },
  "Barcode lookup": { src: "/images/nav_retail_bundle.png", alt: "Barcode lookup retail POS workflow", badge: "Fast barcode" },
  "Returns and discounts": { src: "/images/ent_venues_pos.png", alt: "Retail returns and discounts workflow", badge: "Cashier control" },
  "Product catalog & variants": { src: "/images/ent_supply_chain_bundle.png", alt: "Retail product catalog and variants workflow", badge: "Catalog control" },
  "Purchase orders": { src: "/images/ent_roi_analytics.png", alt: "Retail purchase order workflow", badge: "Supplier ordering" },
  "Multi-location dashboards": { src: "/images/ent_franchise_portal.png", alt: "Multi-location dashboard workflow", badge: "Branch dashboards" },
  "Central menu control": { src: "/images/rest_menu_modifier_bundle.png", alt: "Central menu control dashboard", badge: "Central controls" },
  "Cloud reporting": { src: "/images/ent_bi_analytics_bundle.png", alt: "Cloud reporting workflow", badge: "Live reporting" },
  "Branded storefront": { src: "/images/ent_omnichannel_bundle.png", alt: "Branded online storefront workflow", badge: "Storefront" },
  "Pickup and delivery": { src: "/images/ent_delivery_dispatch_bundle.png", alt: "Pickup and delivery ordering workflow", badge: "Order channels" },
  "Server handhelds": { src: "/images/nav_restaurant_bundle.png", alt: "Server handheld POS workflow", badge: "Handheld POS" },
  "Custom workflow design": { src: "/images/ent_guide_blueprint.png", alt: "Custom POS workflow design dashboard", badge: "Workflow design" },
  "API bridge development": { src: "/images/ent_guide_blueprint.png", alt: "Custom API bridge and middleware workflow", badge: "API bridge" },
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
  "Offline register": [
    "Process sales, barcode scans, receipts, and cash drawer actions completely offline during internet outages.",
    "Local SQLite/IndexedDB queue buffers transactions and syncs automatically when network returns.",
  ],
  "Smart inventory": [
    "Real-time stock deduction on every transaction, low-stock threshold triggers, and supplier PO generation.",
    "Barcode tag scanning and multi-location warehouse stock transfers.",
  ],
  "Barcode lookup": [
    "Instant barcode scanner integration for fast items lookup, weight scale integration, and serial number validation.",
    "Support 1D/2D barcodes, custom shelf labels, and price embedded barcodes.",
  ],
  "Returns and discounts": [
    "Manager PIN overrides for cash refunds, item exchanges, damaged goods logging, and promotional discounts.",
    "Audit trail logging for all refund transactions and cashier drawer variances.",
  ],
  "Product catalog & variants": [
    "Manage matrix items (size, color, material), bundle packs, volume discounts, and supplier SKU mappings.",
    "Central catalog updates pushed instantly across physical registers and web channels.",
  ],
  "Purchase orders": [
    "Generate purchase orders from reorder points, receive stock against POs, and update inventory valuation.",
    "Track supplier lead times, partial shipments, and cost price histories.",
  ],
  "Multi-location dashboards": [
    "Consolidated real-time revenue performance, hourly sales telemetry, and stock levels across all branches.",
    "Branch vs branch comparisons, manager performance metrics, and centralized reporting exports.",
  ],
  "Central menu control": [
    "Push prices, new items, promotional combos, and tax rules to all store registers from a central dashboard.",
    "Schedule menu changes and time-based happy-hour price tiers.",
  ],
  "Cloud reporting": [
    "Access P&L reports, gross profit margin analysis, staff shift audits, and tax summaries on phone or desktop.",
    "Export clean accounting files for QuickBooks, Xero, and CSV reporting tools.",
  ],
  "Branded storefront": [
    "Publish a mobile-friendly web storefront with custom branding, item photos, and zero marketplace commission.",
    "Integrated web checkout with Stripe, card terminals, and mobile wallets.",
  ],
  "Pickup and delivery": [
    "Support pickup time windows, delivery zones, order status tracking, and kitchen ticket injection.",
    "Connect direct customer web orders directly to KDS displays and register queues.",
  ],
  "Server handhelds": [
    "Equip servers with mobile handheld tablets for tableside ordering, ticket firing, and mobile card payment collection.",
    "Reduce server trips to counter registers and speed up table turn times.",
  ],
  "Custom workflow design": [
    "Tailor order states, cashier screens, KDS routing rules, and terminal UX to fit non-standard business models.",
    "Dedicated technical onboarding and custom workflow configuration.",
  ],
  "API bridge development": [
    "Open REST/GraphQL APIs, webhooks, and middleware connectors to bridge Quantix POS with custom ERPs and legacy tools.",
    "Developer sandbox, webhook logs, and dedicated integration engineering support.",
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
      { title: "Online ordering", desc: "Branded web orders routed into POS and KDS.", icon: Globe },
      { title: "Scheduled orders", desc: "Advance orders for pickup windows, parties, and planned service.", icon: Smartphone },
    ],
    orderModesContent: {
      badge: "Kitchen Routing & Service",
      title: "Real-time Multi-Station KDS & Kitchen Dispatch",
      description:
        "Orders from tables, QR codes, takeaway registers, and online apps route directly to station screens with prep timers, modifier badges, and one-tap bump bars.",
      imageSrc: "/images/ent_global_pos_bundle.png",
      imageAlt: "Restaurant Kitchen Display System KDS monitor interface",
      topBadge: "Multi-station KDS",
      bottomBadge: "Sub-second order firing",
    },
    billingCheckout: [
      { title: "Guest receipt printing", desc: "Print table receipts, reprint guest bills, and counter invoices from checkout.", icon: ReceiptText },
      { title: "Kitchen ticket printing", desc: "Route prep tickets to kitchen, bar, grill, and expo printers.", icon: Printer },
      { title: "Dining cash drawer", desc: "Track server and cashier cash payments, drawer openings, shifts, and close-out totals.", icon: Banknote },
      { title: "Table card terminal", desc: "Keep terminal payment status tied to each table, split check, or counter bill.", icon: CreditCard },
      { title: "Tax, tips & service charge", desc: "Apply tax, tips, service charges, discounts, voids, and bill adjustments.", icon: Calculator },
      { title: "Shift close reports", desc: "Close the day with totals for cash, refunds, voids, and staff activity.", icon: Clock },
    ],
    billingCheckoutContent: {
      badge: "Split Billing & Payments",
      title: "Split Checks & Instant Tap-to-Pay Checkout",
      description:
        "Print guest receipts, split bills by seat or amount, apply custom tip percentages (15%, 18%, 20%), and accept contactless Apple Pay, Google Pay & card terminals.",
      imageSrc: "/images/nav_payment_bundle.png",
      imageAlt: "Restaurant POS split check and payment terminal",
      topBadge: "Contactless NFC + EMV",
      bottomBadge: "Clean bill splitting",
    },
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
    advancedControlsContent: {
      badge: "Telemetry & Inventory Control",
      title: "Recipe Costing, Low-Stock Alerts & Peak Turnover Telemetry",
      description:
        "Monitor peak-hour table turnover, ingredient deduction alerts, staff shift summaries, and gross profit margins from one unified console.",
      imageSrc: "/images/ent_supply_chain_bundle.png",
      imageAlt: "Restaurant recipe costing and live analytics telemetry",
      topBadge: "Real-time Telemetry",
      bottomBadge: "Live recipe costing",
    },
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
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Commercial dual-screen restaurant POS countertop terminal with receipt printer and card reader",
    topBadge: "Commercial EPOS Hardware",
    bottomBadge: "Dual-Screen Countertop POS",
    ctaLabel: "Start Restaurant POS Trial",
    ctaHref: "/sign-up",
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
    title: "Retail POS & Inventory Register",
    description:
      "Rapid barcode billing, stock deductions, cashier drawer controls, shelf label printing, and offline till continuity for retail stores.",
    points: [
      { title: "Barcode Checkout Speed", desc: "Scan items instantly with handheld or USB barcode readers." },
      { title: "Offline Till Continuity", desc: "Process checkout and print receipts even during internet dropouts." },
      { title: "Real-time Stock Control", desc: "Track stock levels, matrix items (size/color), and automatic low-stock alerts." },
    ],
    workflows: [
      { title: "Offline register", desc: "Process sales, receipts, and cash drawers offline during network outages." },
      { title: "Smart inventory", desc: "Real-time inventory deduction, PO generation, and stock level tracking." },
      { title: "Barcode lookup", desc: "High-speed 1D/2D barcode scanning and price lookup." },
      { title: "Returns and discounts", desc: "Manager PIN overrides, item exchanges, and promotional discounts." },
      { title: "Product catalog & variants", desc: "Manage item matrices, variants, supplier SKUs, and bundle pricing." },
      { title: "Purchase orders", desc: "Automated reorder triggers, PO creation, and stock receiving." },
    ],
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Retail POS checkout register",
    topBadge: "Barcode ready",
    bottomBadge: "Built for retail checkout",
    ctaLabel: "Start Retail POS Trial",
    ctaHref: "/sign-up",
    icon: Store,
    faqs: [
      { id: "retail-offline", question: "Does Retail POS work when internet is down?", answer: "Yes. Local register sync allows continuous barcode checkout, receipt printing, and drawer access during network outages." },
      { id: "retail-barcodes", question: "Can it print barcode shelf labels?", answer: "Yes. Quantix supports printing barcode stickers, shelf tags, and custom price labels directly from inventory." },
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
      { title: "Multi-location dashboards", desc: "Consolidated sales telemetry, revenue breakdown, and branch comparison." },
      { title: "Central menu control", desc: "Instant pricing, menu item, and tax updates pushed across all store registers." },
      { title: "Cloud reporting", desc: "Real-time P&L analytics, inventory valuation, and accounting exports." },
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Cloud POS back-office dashboard",
    topBadge: "Multi-store cloud hub",
    bottomBadge: "Real-time store telemetry",
    ctaLabel: "Explore Cloud POS Hub",
    ctaHref: "/sign-up",
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
      { title: "Multi-location dashboards", desc: "Enterprise branch performance, live telemetry, and unified ledger reports." },
      { title: "Central menu control", desc: "Push catalog versions, combo rules, and regional pricing to 50+ stores in seconds." },
      { title: "Cloud reporting", desc: "P&L dashboards, inventory COGS audits, and automatic ERP ledger sync." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Enterprise POS hardware bundle",
    topBadge: "Enterprise SLA",
    bottomBadge: "Built for 50+ Locations",
    ctaLabel: "Schedule Enterprise Demo",
    ctaHref: "/contact/sales",
    icon: Server,
    faqs: [
      { id: "ent-erp", question: "Does Enterprise POS support SAP and NetSuite?", answer: "Yes, native gRPC and REST webhook pipelines post daily sales, taxes, and COGS journal entries automatically." },
    ],
  },
  "websites": {
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
      { title: "Branded storefront", desc: "Mobile-responsive ordering website with item photos, modifiers, and cart checkout." },
      { title: "Pickup and delivery", desc: "Scheduled pickup time windows, delivery zones, and courier dispatch links." },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Website ordering and digital storefront platform",
    topBadge: "Direct web sales",
    bottomBadge: "Zero commission",
    ctaLabel: "Launch Online Store",
    ctaHref: "/sign-up",
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
      { title: "Real-time Floor Sync", desc: "Table status and split check states update across all devices instantly." },
    ],
    workflows: [
      { title: "Server handhelds", desc: "Handheld ordering tablets with instant kitchen firing and tableside payments." },
      { title: "QR code ordering", desc: "Guest mobile self-ordering without requiring separate app downloads." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Mobile server handheld terminal",
    topBadge: "Tableside ordering",
    bottomBadge: "Portable EMV payment",
    ctaLabel: "Equip Mobile Fleet",
    ctaHref: "/sign-up",
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
      { title: "Custom workflow design", desc: "Tailor checkout UI, KDS station screens, and cashier flows to exact specs." },
      { title: "API bridge development", desc: "Custom REST, GraphQL, and webhook bridges to connect legacy ERPs." },
    ],
    imageSrc: "/images/ent_guide_blueprint.png",
    imageAlt: "Custom POS engineering blueprint and architecture",
    topBadge: "Custom engineering",
    bottomBadge: "Dedicated Solutions Lead",
    ctaLabel: "Book Architecture Call",
    ctaHref: "/contact/sales",
    icon: Server,
    faqs: [
      { id: "custom-api", question: "Can you build custom API bridges for legacy ERPs?", answer: "Yes, our engineering team provides custom middleware connectors for legacy on-premise systems." },
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
  const isRight = index % 2 === 1;
  const mappedVisual = WORKFLOW_IMAGE_MAP[workflow.title];
  const visual = mappedVisual ?? {
    src: fallbackImage,
    alt: fallbackAlt,
    badge: "Quantix workflow",
  };
  const details = WORKFLOW_DETAIL_MAP[workflow.title] ?? [workflow.desc];

  return (
    <div className="border-b border-slate-100 py-10 last:border-b-0 dark:border-slate-800/80 sm:py-14">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        <motion.div
          variants={fadeSide(isRight ? -18 : 18)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={motionTransition}
          className={`space-y-4 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light shadow-xs">
              <Icon className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700">
              Module {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-syne text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {workflow.title}
          </h3>

          <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            {workflow.desc}
          </p>

          <div className="space-y-2 pt-1">
            {details.map((detail, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/60 p-2.5 text-xs text-slate-700 dark:text-slate-300 shadow-2xs"
              >
                <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5 stroke-[2.5]" />
                <span className="leading-snug">{detail}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white transition-all duration-200 text-xs font-syne font-extrabold uppercase tracking-wider shadow-xs cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </Link>
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
          <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-none sm:p-6">
            {/* 100% Free-Floating Transparent 3D Hardware Bundle */}
            <div className="relative aspect-16/11 w-full flex items-center justify-center">
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="object-contain p-2 drop-shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-black uppercase tracking-wider text-slate-900 dark:text-white shadow-md">
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
              {visual.badge}
            </div>

            <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">Certified Enterprise Ecosystem</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DEFAULT_ORDER_MODES_CONTENT: FeaturePanelContent = {
  badge: "Order modes",
  title: "Serve every order type from one POS flow",
  description:
    "Dine-in, counter service, pickup, takeaway, delivery, curbside, QR, online, and scheduled orders stay connected to kitchen, billing, and handoff workflows.",
  imageSrc: "/images/ent_global_pos_bundle.png",
  imageAlt: "POS order modes and workflow",
  topBadge: "Multi-channel ordering",
  bottomBadge: "Connected order workflow",
  icon: Sparkles,
};

const DEFAULT_BILLING_CHECKOUT_CONTENT: FeaturePanelContent = {
  badge: "Billing & checkout",
  title: "Print receipts and close every bill cleanly",
  description:
    "Receipt printers, tickets, cash drawer, card terminals, tax, tips, discounts, and shift-close reports stay connected to the same POS order.",
  imageSrc: "/images/nav_payment_bundle.png",
  imageAlt: "POS receipt printing and checkout system workflow",
  topBadge: "Receipt + payments",
  bottomBadge: "Printer, drawer and terminal ready",
  icon: ReceiptText,
};

const DEFAULT_ADVANCED_CONTROLS_CONTENT: FeaturePanelContent = {
  badge: "Advanced controls",
  title: "Add the controls busy operations actually ask for",
  description:
    "Offline billing, guest-facing display, promos, approvals, prep timers, scheduled menus, delivery integrations, and end-of-day reporting stay inside the same POS workflow.",
  imageSrc: "/images/ent_supply_chain_bundle.png",
  imageAlt: "Advanced POS controls dashboard",
  topBadge: "Manager controls",
  bottomBadge: "Built for real operations",
  icon: Sparkles,
};

const OrderModesSection: React.FC<{
  orderModes: OrderMode[];
  content?: FeaturePanelContent;
}> = ({ orderModes, content = DEFAULT_ORDER_MODES_CONTENT }) => {
  const BadgeIcon = content.icon ?? Sparkles;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeItem = orderModes[activeIdx] || orderModes[0];
  const activeVisual = getProductCardImage(activeItem.title);

  useEffect(() => {
    if (isPaused || orderModes.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % orderModes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, orderModes.length]);

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/50 py-10 sm:py-14 dark:border-slate-800/80 dark:bg-slate-900/30">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-4 lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                  {content.badge}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-800 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
                  {isPaused ? "Paused" : "Auto demo"}
                </span>
              </div>
              <h2 className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {content.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
                {content.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {orderModes.map((mode, index) => {
                const ModeIcon = mode.icon;
                const isActive = activeIdx === index;

                return (
                  <button
                    type="button"
                    key={mode.title}
                    onClick={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    className={`group/mode text-left flex flex-col justify-between rounded-xl border p-2.5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/40 shadow-md shadow-primary/10 -translate-y-0.5"
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-white border-primary shadow-xs scale-105"
                              : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border-primary/20 group-hover/mode:bg-primary group-hover/mode:text-white"
                          }`}
                        >
                          <ModeIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                        </div>
                        <span
                          className={`font-syne text-[11.5px] truncate transition-colors ${
                            isActive ? "font-black text-primary dark:text-primary-light" : "font-bold text-slate-900 dark:text-white group-hover/mode:text-primary"
                          }`}
                        >
                          {mode.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {mode.desc}
                      </p>
                    </div>

                    {isActive && (
                      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-primary/20 dark:bg-primary/30">
                        <motion.div
                          key={`progress-ordermodes-${activeIdx}-${isPaused}`}
                          initial={{ width: "0%" }}
                          animate={{ width: isPaused ? "100%" : "100%" }}
                          transition={{ duration: isPaused ? 0.2 : 4.5, ease: "linear" }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    )}
                  </button>
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
            className="lg:col-span-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-none sm:p-6 backdrop-blur-xs">
              <div className="relative aspect-16/11 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full flex items-center justify-center"
                  >
                    <Image
                      src={activeVisual.src}
                      alt={activeVisual.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      className="object-contain p-2 drop-shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                Live: {activeItem.title}
              </div>

              <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{activeItem.desc}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BillingCheckoutSection: React.FC<{
  items: OrderMode[];
  content?: FeaturePanelContent;
}> = ({ items, content = DEFAULT_BILLING_CHECKOUT_CONTENT }) => {
  const BadgeIcon = content.icon ?? ReceiptText;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeItem = items[activeIdx] || items[0];
  const activeVisual = getProductCardImage(activeItem.title);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14 dark:border-slate-800/80 dark:bg-slate-950">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-4 lg:col-span-7 lg:order-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                  {content.badge}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-800 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
                  {isPaused ? "Paused" : "Auto demo"}
                </span>
              </div>
              <h2 className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {content.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
                {content.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {items.map((item, index) => {
                const ItemIcon = item.icon;
                const isActive = activeIdx === index;

                return (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    className={`group/billing text-left flex flex-col justify-between rounded-xl border p-2.5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/40 shadow-md shadow-primary/10 -translate-y-0.5"
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-white border-primary shadow-xs scale-105"
                              : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border-primary/20 group-hover/billing:bg-primary group-hover/billing:text-white"
                          }`}
                        >
                          <ItemIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                        </div>
                        <span
                          className={`font-syne text-[11.5px] truncate transition-colors ${
                            isActive ? "font-black text-primary dark:text-primary-light" : "font-bold text-slate-900 dark:text-white group-hover/billing:text-primary"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {isActive && (
                      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-primary/20 dark:bg-primary/30">
                        <motion.div
                          key={`progress-billing-${activeIdx}-${isPaused}`}
                          initial={{ width: "0%" }}
                          animate={{ width: isPaused ? "100%" : "100%" }}
                          transition={{ duration: isPaused ? 0.2 : 4.5, ease: "linear" }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    )}
                  </button>
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
            className="lg:col-span-5 lg:order-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-none sm:p-6 backdrop-blur-xs">
              <div className="relative aspect-16/11 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full flex items-center justify-center"
                  >
                    <Image
                      src={activeVisual.src}
                      alt={activeVisual.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      className="object-contain p-2 drop-shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                Live: {activeItem.title}
              </div>

              <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{activeItem.desc}</span>
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
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeItem = items[activeIdx] || items[0];
  const activeVisual = getProductCardImage(activeItem.title);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/50 py-10 sm:py-14 dark:border-slate-800/80 dark:bg-slate-900/30">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <motion.div
            variants={fadeSide(-18)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-4 lg:col-span-7"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <BadgeIcon className="h-3 w-3 stroke-[2.4]" />
                  {content.badge}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-800 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
                  {isPaused ? "Paused" : "Auto demo"}
                </span>
              </div>
              <h2 className="font-syne text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {content.title}
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
                {content.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {items.map((item, index) => {
                const ItemIcon = item.icon;
                const isActive = activeIdx === index;

                return (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    onMouseEnter={() => {
                      setActiveIdx(index);
                      setIsPaused(true);
                    }}
                    className={`group/control text-left flex flex-col justify-between rounded-xl border p-2.5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary/40 shadow-md shadow-primary/10 -translate-y-0.5"
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                            isActive
                              ? "bg-primary text-white border-primary shadow-xs scale-105"
                              : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border-primary/20 group-hover/control:bg-primary group-hover/control:text-white"
                          }`}
                        >
                          <ItemIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                        </div>
                        <span
                          className={`font-syne text-[11.5px] truncate transition-colors ${
                            isActive ? "font-black text-primary dark:text-primary-light" : "font-bold text-slate-900 dark:text-white group-hover/control:text-primary"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-[10px] font-medium leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {isActive && (
                      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-primary/20 dark:bg-primary/30">
                        <motion.div
                          key={`progress-controls-${activeIdx}-${isPaused}`}
                          initial={{ width: "0%" }}
                          animate={{ width: isPaused ? "100%" : "100%" }}
                          transition={{ duration: isPaused ? 0.2 : 4.5, ease: "linear" }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    )}
                  </button>
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
            className="lg:col-span-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-none sm:p-6 backdrop-blur-xs">
              <div className="relative aspect-16/11 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full flex items-center justify-center"
                  >
                    <Image
                      src={activeVisual.src}
                      alt={activeVisual.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      className="object-contain p-2 drop-shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                Live: {activeItem.title}
              </div>

              <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">{activeItem.desc}</span>
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
    <main className="min-h-screen bg-white pt-24 sm:pt-32 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="border-b border-slate-200/80 bg-white py-6 dark:border-slate-800/80 dark:bg-slate-950 sm:py-10 lg:py-12">
        <div className="site-container px-4 sm:px-6">
          {/* Breadcrumb */}
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

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <motion.div
              variants={fadeSide(-22)}
              initial="hidden"
              animate="visible"
              transition={motionTransition}
              className="space-y-4 lg:col-span-7"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <Icon className="h-3.5 w-3.5 stroke-[2.4]" />
                  {solution.eyebrow}
                </span>
                <h1 className="font-syne text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-slate-950 dark:text-white">
                  {solution.title}
                </h1>
              </div>

              <p className="max-w-xl text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                {solution.description}
              </p>

              <div className="grid grid-cols-1 gap-2 pt-1 max-w-xl">
                {solution.points.map((point) => (
                  <div
                    key={point.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/60 px-3.5 py-2.5 shadow-2xs hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                      <Check className="h-3.5 w-3.5 stroke-3" />
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong className="font-extrabold text-slate-950 dark:text-white font-syne">{point.title}:</strong>{" "}
                      <span>{point.desc}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={solution.ctaHref}
                  className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 sm:px-6 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{solution.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </Link>
                <Link
                  href="/contact/sales"
                  className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 sm:px-6 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
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
              className="lg:col-span-5"
            >
              <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-slate-900/60 dark:shadow-none sm:p-6 backdrop-blur-xs">
                {/* 100% Free-Floating Transparent 3D Hardware Bundle */}
                <div className="relative aspect-16/11 w-full flex items-center justify-center">
                  <Image
                    src={solution.imageSrc}
                    alt={solution.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 40vw"
                    className="object-contain p-2 drop-shadow-2xl transition-transform duration-700 group-hover/image:scale-105"
                  />
                </div>

                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                  {solution.topBadge}
                </div>

                <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
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

      {/* --- 3. BILLING & CHECKOUT SECTION --- */}
      {solution.billingCheckout && (
        <BillingCheckoutSection items={solution.billingCheckout} content={solution.billingCheckoutContent} />
      )}

      {/* --- 4. ADVANCED CONTROLS --- */}
      {solution.advancedControls && (
        <AdvancedControlsSection items={solution.advancedControls} content={solution.advancedControlsContent} />
      )}

      {/* --- 5. INCLUDED WORKFLOWS --- */}
      <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 sm:py-20 dark:border-slate-800/80 dark:bg-slate-900/30">
        <div className="site-container px-4 sm:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="mx-auto mb-8 max-w-3xl text-center sm:mb-12"
          >
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
              <Sparkles className="h-3.5 w-3.5 stroke-[2.4]" />
              Included workflows
            </span>
            <h2 className="font-syne text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
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

      {/* --- 5.5 FOODHUB STYLE TOOLS ECOSYSTEM SECTION --- */}
      <section className="border-b border-slate-200/80 bg-white py-14 sm:py-20 dark:border-slate-800/80 dark:bg-slate-950">
        <div className="site-container px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="font-syne text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              Power your operations with more Quantix tools
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              From ordering and payments to kitchen routing and telemetry, explore a complete ecosystem designed to streamline enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {[
              { title: "PDQ Terminal", desc: "Wireless EMV tap-to-pay", img: "/images/nav_payment_bundle.png", bg: "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/30" },
              { title: "Self-Order Kiosk", desc: "Line-busting touchscreen", img: "/images/ent_qsr_kiosk_bundle.png", bg: "bg-teal-50/70 dark:bg-teal-950/20 border-teal-200/60 dark:border-teal-900/30" },
              { title: "Kitchen Display", desc: "Prep tickets & routing", img: "/images/ent_global_pos_bundle.png", bg: "bg-slate-50/80 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800" },
              { title: "Digital Board", desc: "4K live menu signage", img: "/images/rest_menu_modifier_bundle.png", bg: "bg-purple-50/70 dark:bg-purple-950/20 border-purple-200/60 dark:border-purple-900/30" },
              { title: "Management App", desc: "Shift & sales telemetry", img: "/images/ent_franchise_portal.png", bg: "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/30" },
              { title: "Online Storefront", desc: "Direct branded web store", img: "/images/ent_omnichannel_bundle.png", bg: "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/30" },
            ].map((tool) => (
              <div
                key={tool.title}
                className={`group rounded-2xl border p-3.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${tool.bg}`}
              >
                <div className="relative aspect-square w-full flex items-center justify-center p-2 mb-3 bg-transparent">
                  <Image
                    src={tool.img}
                    alt={tool.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                    className="object-contain p-1 drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-syne text-xs sm:text-[13px] font-extrabold text-slate-900 dark:text-white">
                    {tool.title}
                  </h4>
                  <p className="mt-0.5 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                    {tool.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. FAQS --- */}
      <FAQSection faqs={solution.faqs} isLoading={false} />

      {/* --- 7. CTA BANNER --- */}
      <CTABanner />
    </main>
  );
}
