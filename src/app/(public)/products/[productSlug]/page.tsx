"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  { keywords: ["table", "dine", "floor", "counter", "pos", "terminal"], src: "/images/foodhub_pos_terminal.jpg", alt: "Foodhub-style commercial dual-screen restaurant POS countertop terminal" },
  { keywords: ["kitchen", "grill", "bar", "prep", "kds"], src: "/images/hero_kitchen_kds.jpg", alt: "Commercial stainless steel mounted kitchen display KDS system" },
  { keywords: ["handheld", "waiter", "card terminal", "terminal", "pay"], src: "/images/retail_hardware_peripherals.jpg", alt: "POS card reader and billing peripherals" },
  { keywords: ["delivery", "dispatch", "courier", "route"], src: "/images/product_delivery_driver.jpg", alt: "Food delivery management and courier dispatch tracking" },
  { keywords: ["stock", "inventory", "recipe", "costing", "cost"], src: "/images/rest_recipe_costing.jpg", alt: "Recipe costing and inventory control" },
  { keywords: ["qr", "mobile", "phone"], src: "/images/hero_qr_ordering.jpg", alt: "Mobile QR code ordering interface on restaurant table" },
  { keywords: ["online", "web", "storefront", "pickup"], src: "/images/rest_online_ordering.jpg", alt: "Online web ordering portal" },
  { keywords: ["kiosk", "self-service"], src: "/images/solution_qsr_kiosk.jpg", alt: "Restaurant free-standing self-ordering kiosk" },
  { keywords: ["menu", "modifier", "topping", "variant", "scheduled", "board"], src: "/images/product_menu_board.jpg", alt: "Restaurant digital menu board and modifier management" },
  { keywords: ["staff", "shift", "permission", "drawer", "roster"], src: "/images/rest_staff_shifts.jpg", alt: "Staff roster and shift scheduling dashboard" },
  { keywords: ["reservation", "waitlist", "booking", "guest queue"], src: "/images/rest_reservations_waitlist.jpg", alt: "Table reservations and waitlist host stand" },
  { keywords: ["loyalty", "crm", "rewards", "vip"], src: "/images/rest_loyalty_crm.jpg", alt: "Customer loyalty and dining CRM" },
  { keywords: ["analytics", "telemetry", "reports", "margin", "p&l"], src: "/images/rest_analytics_inventory.jpg", alt: "Restaurant revenue analytics and telemetry" },
  { keywords: ["payment", "receipt", "cash", "bill", "split", "tip"], src: "/images/retail_hardware_peripherals.jpg", alt: "POS checkout and split check terminal" },
];

const getProductCardImage = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  return PRODUCT_CARD_IMAGES.find(({ keywords }) => keywords.some((keyword) => normalizedTitle.includes(keyword))) ?? {
    src: "/images/foodhub_pos_terminal.jpg",
    alt: "Quantix restaurant platform workflow",
  };
};

const WORKFLOW_IMAGE_MAP: Record<string, { src: string; alt: string; badge: string }> = {
  "Table management": { src: "/images/foodhub_pos_terminal.jpg", alt: "Commercial dual-screen restaurant POS countertop terminal", badge: "Floor hardware" },
  "Kitchen display system": { src: "/images/hero_kitchen_kds.jpg", alt: "Commercial kitchen display system KDS workflow", badge: "Kitchen routing" },
  "Direct online ordering": { src: "/images/rest_online_ordering.jpg", alt: "Online ordering web storefront workflow", badge: "Web ordering" },
  "QR code ordering": { src: "/images/hero_qr_ordering.jpg", alt: "Mobile QR code self-ordering workflow", badge: "QR ordering" },
  "Delivery dispatch": { src: "/images/product_delivery_driver.jpg", alt: "Delivery dispatch and courier route workflow", badge: "Delivery dispatch" },
  "Loyalty workflows": { src: "/images/rest_loyalty_crm.jpg", alt: "Customer dining CRM and loyalty workflow", badge: "Customer loyalty" },
  "Menu & modifier management": { src: "/images/product_menu_board.jpg", alt: "Restaurant digital menu and modifier workflow", badge: "Menu controls" },
  "Payments & split bills": { src: "/images/nav_payment_bundle.png", alt: "Clean POS billing terminal and receipt peripherals", badge: "Payment hardware" },
  "Staff & shift controls": { src: "/images/rest_staff_shifts.jpg", alt: "Restaurant staff roster and shift scheduling dashboard", badge: "Staff controls" },
  "Inventory & recipe costing": { src: "/images/rest_recipe_costing.jpg", alt: "Restaurant recipe ingredient costing and inventory workflow", badge: "Recipe costing" },
  "Reservations & waitlist": { src: "/images/rest_reservations_waitlist.jpg", alt: "Restaurant host stand reservations and waitlist workflow", badge: "Guest flow" },
  "Restaurant analytics": { src: "/images/ent_bi_analytics_bundle.png", alt: "Restaurant revenue analytics and telemetry dashboard", badge: "Live telemetry" },
  "Offline register": { src: "/images/nav_retail_bundle.png", alt: "Offline retail register workflow", badge: "Offline till" },
  "Smart inventory": { src: "/images/ent_supply_chain_bundle.png", alt: "Smart inventory sync workflow", badge: "Inventory sync" },
  "Barcode lookup": { src: "/images/retail_grocery_scale.jpg", alt: "Barcode lookup retail POS workflow", badge: "Fast barcode" },
  "Returns and discounts": { src: "/images/retail_convenience_store.jpg", alt: "Retail returns and discounts workflow", badge: "Cashier control" },
  "Product catalog & variants": { src: "/images/retail_fashion_boutique.jpg", alt: "Retail product catalog and variants workflow", badge: "Catalog control" },
  "Purchase orders": { src: "/images/ent_supply_chain_bundle.png", alt: "Retail purchase order workflow", badge: "Supplier ordering" },
  "Multi-location dashboards": { src: "/images/ent_franchise_portal.png", alt: "Multi-location dashboard workflow", badge: "Branch dashboards" },
  "Central menu control": { src: "/images/product_menu_board.jpg", alt: "Central menu control dashboard", badge: "Central controls" },
  "Cloud reporting": { src: "/images/ent_bi_analytics_bundle.png", alt: "Cloud reporting workflow", badge: "Live reporting" },
  "Branded storefront": { src: "/images/ent_omnichannel_bundle.png", alt: "Branded online storefront workflow", badge: "Storefront" },
  "Pickup and delivery": { src: "/images/product_delivery_driver.jpg", alt: "Pickup and delivery ordering workflow", badge: "Order channels" },
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
      { title: "Online ordering", desc: "Branded web orders routed into POS and KDS.", icon: Globe2 },
      { title: "Scheduled orders", desc: "Advance orders for pickup windows, parties, and planned service.", icon: Smartphone },
    ],
    orderModesContent: {
      badge: "Kitchen Routing & Service",
      title: "Real-time Multi-Station KDS & Kitchen Dispatch",
      description:
        "Orders from tables, QR codes, takeaway registers, and online apps route directly to station screens with prep timers, modifier badges, and one-tap bump bars.",
      imageSrc: "/images/rest_kds_kitchen.jpg",
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
      imageSrc: "/images/rest_checkout_payments.jpg",
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
      imageSrc: "/images/rest_analytics_inventory.jpg",
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
    imageSrc: "/images/foodhub_pos_terminal.jpg",
    imageAlt: "Foodhub-style commercial dual-screen restaurant POS countertop terminal with receipt printer and PDQ card reader",
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
    imageSrc: "/images/nav_retail_register.png",
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
    imageSrc: "/images/prod_inventory_sync.png",
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
      { title: "Multi-location dashboards", desc: "Regional enterprise views, consolidated financial audits, and multi-branch control." },
      { title: "Central menu control", desc: "Enterprise rollout controls for catalog updates across franchise branches." },
      { title: "Cloud reporting", desc: "Custom BI dashboards, enterprise tax reporting, and automated payout ledger exports." },
    ],
    imageSrc: "/images/prod_enterprise_hub.png",
    imageAlt: "Enterprise POS network management hub",
    topBadge: "Enterprise SLA",
    bottomBadge: "Multi-branch governance",
    ctaLabel: "Contact Enterprise Sales",
    ctaHref: "/contact/sales",
    icon: Server,
    faqs: [
      { id: "enterprise-sla", question: "Do you offer custom SLA support for franchises?", answer: "Yes. Enterprise plans include 24/7 dedicated support phone lines, custom SLA agreements, and dedicated engineering." },
    ],
  },
  "websites": {
    slug: "websites",
    eyebrow: "Direct Online Ordering & Web Storefront",
    title: "Website Ordering & Online Storefront",
    description:
      "Commission-free branded web ordering for pickup and delivery, QR code menus, and direct order injection into POS and kitchen KDS.",
    points: [
      { title: "Zero App Commission", desc: "Keep 100% of your online food and retail sales without third-party fees." },
      { title: "Direct POS & KDS Routing", desc: "Online orders bypass manual entry and print straight to kitchen screens." },
      { title: "Mobile Responsive Portal", desc: "Stunning web storefront that works seamlessly on customer mobile browsers." },
    ],
    workflows: [
      { title: "Branded storefront", desc: "Custom web ordering site with branded logo, menu categories, and checkout." },
      { title: "Pickup and delivery", desc: "Delivery radius controls, pickup time windows, and live order status messaging." },
      { title: "Direct online ordering", desc: "Connected online ordering with POS pricing, tax, and stock availability." },
    ],
    imageSrc: "/images/prod_online_ordering.png",
    imageAlt: "Online ordering website storefront",
    topBadge: "Zero commission",
    bottomBadge: "Direct POS + KDS sync",
    ctaLabel: "Launch Online Storefront",
    ctaHref: "/sign-up",
    icon: Globe2,
    faqs: [
      { id: "website-commission", question: "Are there third-party order commissions?", answer: "No. Quantix online ordering is 100% commission-free." },
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
      { title: "Server handhelds", desc: "Mobile server POS tablets for ordering, modifiers, and payment collection." },
      { title: "Table management", desc: "Live table status and seating timers updated right on handheld server devices." },
      { title: "Payments & split bills", desc: "Split checks tableside and process mobile payment transactions." },
    ],
    imageSrc: "/images/prod_mobile_app.png",
    imageAlt: "Mobile waiter handheld POS tablet app",
    topBadge: "Handheld POS",
    bottomBadge: "Tableside order + pay",
    ctaLabel: "Explore Handheld POS",
    ctaHref: "/sign-up",
    icon: Smartphone,
    faqs: [
      { id: "mobile-devices", question: "What devices run the handheld server app?", answer: "Quantix handheld POS runs on standard Android tablets, mobile POS terminals, and iOS devices." },
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
      { title: "Custom workflow design", desc: "Tailored cashier UI, custom receipt formats, and non-standard register logic." },
      { title: "API bridge development", desc: "Custom middleware connectors, webhook endpoints, and ERP synchronization." },
    ],
    imageSrc: "/images/demo-thumb-ai.png",
    imageAlt: "Custom POS development and API platform",
    topBadge: "White-label & API",
    bottomBadge: "Custom engineering",
    ctaLabel: "Request Custom Proposal",
    ctaHref: "/contact/sales",
    icon: Wrench,
    faqs: [
      { id: "custom-api", question: "Do you provide developer API access?", answer: "Yes. We provide full API keys, developer sandboxes, and webhook documentation for custom integrations." },
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
    <div className="border-t border-slate-200/80 py-12 dark:border-slate-800/80 sm:py-16">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        <motion.div
          variants={fadeSide(isRight ? -18 : 18)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...motionTransition, delay: 0.04 }}
          className={`space-y-4 lg:col-span-6 ${!isRight ? "lg:order-2" : "lg:order-1"}`}
        >
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-syne font-black uppercase tracking-widest text-primary">
              <Icon className="h-3.5 w-3.5 stroke-[2.5]" />
              THE ONE PLATFORM TO MANAGE IT ALL · WORKFLOW {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-syne text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
              {workflow.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
              {workflow.desc}
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {details.map((detail, dIdx) => (
              <div
                key={dIdx}
                className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed"
              >
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>{detail}</span>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 text-xs font-syne font-extrabold uppercase tracking-wider shadow-xs hover:shadow-primary/20 hover:scale-105 active:scale-95"
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
          <div className="relative">
            {/* Ambient soft studio aura */}
            <div className="absolute -inset-3 rounded-3xl bg-linear-to-tr from-primary/10 via-orange-500/5 to-purple-500/5 blur-xl pointer-events-none" />

            <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-2.5 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-darkSurface/60 dark:shadow-none">
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                />
              </div>

              {/* Floating Foodhub style badge */}
              <div className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-syne font-black uppercase tracking-wider text-slate-900 dark:text-white shadow-lg">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
                {visual.badge}
              </div>

              <div className="absolute bottom-5 left-5 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3.5 py-1.5 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-lg">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">Certified Quantix Ecosystem</span>
              </div>
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
  imageSrc: "/images/ss2-ai.png",
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
  imageSrc: "/images/pos_counter_3d.png",
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
  imageSrc: "/images/ss1-ai.png",
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
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-darkSurface/60 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
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
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-darkSurface/60 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-darkSurface"
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

                    {/* Auto-advancing linear progress bar */}
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
            <div className="relative">
              {/* Ambient radial gradient aura */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-primary/15 via-orange-500/10 to-purple-500/10 blur-2xl dark:from-primary/25 dark:via-orange-500/15 dark:to-purple-500/15" />

              <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-darkSurface/60 dark:shadow-none sm:p-2.5 backdrop-blur-xs">
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <Image
                        src={activeVisual.src}
                        alt={activeVisual.alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                  Live: {activeItem.title}
                </div>

                <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{activeItem.desc}</span>
                </div>
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
    <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14 dark:border-slate-800/80 dark:bg-darkBg">
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
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-darkSurface/60 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
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
                        : "border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-darkSurface/60 hover:border-primary/40 hover:bg-slate-100/80 dark:hover:bg-darkSurface"
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

                    {/* Auto-advancing linear progress bar */}
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
            <div className="relative">
              {/* Ambient radial gradient aura */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-primary/15 via-orange-500/10 to-purple-500/10 blur-2xl dark:from-primary/25 dark:via-orange-500/15 dark:to-purple-500/15" />

              <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50/80 p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-darkSurface/60 dark:shadow-none sm:p-2.5 backdrop-blur-xs">
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <Image
                        src={activeVisual.src}
                        alt={activeVisual.alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                  Live: {activeItem.title}
                </div>

                <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{activeItem.desc}</span>
                </div>
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
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-darkSurface/60 px-2.5 py-0.5 text-[9px] font-bold text-slate-500 dark:text-slate-400">
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
                        : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-darkSurface/60 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-darkSurface"
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

                    {/* Auto-advancing linear progress bar */}
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
            <div className="relative">
              {/* Ambient radial gradient aura */}
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-r from-primary/15 via-orange-500/10 to-purple-500/10 blur-2xl dark:from-primary/25 dark:via-orange-500/15 dark:to-purple-500/15" />

              <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/80 p-2 shadow-xl shadow-slate-200/60 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-darkSurface/60 dark:shadow-none sm:p-2.5 backdrop-blur-xs">
                <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full"
                    >
                      <Image
                        src={activeVisual.src}
                        alt={activeVisual.alt}
                        fill
                        sizes="(max-width: 1024px) 92vw, 40vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                  Live: {activeItem.title}
                </div>

                <div className="absolute bottom-4 left-4 z-20 inline-flex max-w-[85%] items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="truncate">{activeItem.desc}</span>
                </div>
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
    <main className="min-h-screen bg-white pt-28 sm:pt-36 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
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
                className="space-y-3.5 lg:col-span-7"
              >
                <div>
                  <div className="mb-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[9px] font-black uppercase leading-none tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light sm:mb-2.5 sm:gap-2 sm:px-3 sm:text-[10px]">
                    <Icon className="h-3 w-3 shrink-0 stroke-[2.4] sm:h-3.5 sm:w-3.5" />
                    {solution.eyebrow}
                  </div>
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
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-darkSurface/60 px-3.5 py-2.5 shadow-2xs hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-200"
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

                <div className="flex flex-row gap-3 pt-2">
                  <Link
                    href={solution.ctaHref}
                    className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl sm:rounded-full bg-primary px-5 sm:px-6 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:scale-105 active:scale-95"
                  >
                    <span>{solution.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </Link>
                  <Link
                    href="/contact/sales"
                    className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl sm:rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkSurface px-5 sm:px-6 font-syne text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 transition-all duration-300 hover:border-primary/40 hover:text-primary hover:scale-105 active:scale-95 shadow-2xs"
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
                <div className="group/image relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/70 p-2 shadow-2xl shadow-slate-200/70 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl dark:border-slate-800/90 dark:bg-darkSurface/50 dark:shadow-none sm:p-2.5">
                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">
                    <Image
                      src={solution.imageSrc}
                      alt={solution.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-[1.02]"
                    />
                  </div>

                  <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[9px] font-syne font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 shadow-md">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                    {solution.topBadge}
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-darkBg/95 backdrop-blur-md px-3 py-1 text-[10px] font-syne font-bold text-slate-700 dark:text-slate-200 shadow-md">
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
          <div className="site-container">
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
          <div className="site-container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-syne text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                Power your restaurant with more Quantix tools
              </h2>
              <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                From ordering and payments to kitchen routing and telemetry, explore a complete ecosystem designed to streamline operations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {[
                { title: "PDQ Terminal", desc: "Wireless EMV tap-to-pay", img: "/images/retail_hardware_peripherals.jpg", bg: "bg-amber-50/70 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/30" },
                { title: "Self-Order Kiosk", desc: "Line-busting touchscreen", img: "/images/solution_qsr_kiosk.jpg", bg: "bg-teal-50/70 dark:bg-teal-950/20 border-teal-200/60 dark:border-teal-900/30" },
                { title: "Kitchen Display", desc: "Prep tickets & routing", img: "/images/hero_kitchen_kds.jpg", bg: "bg-slate-50/80 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800" },
                { title: "Digital Board", desc: "4K live menu signage", img: "/images/product_menu_board.jpg", bg: "bg-purple-50/70 dark:bg-purple-950/20 border-purple-200/60 dark:border-purple-900/30" },
                { title: "Management App", desc: "Shift & sales telemetry", img: "/images/rest_staff_shifts.jpg", bg: "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/30" },
                { title: "Online Storefront", desc: "Direct branded web store", img: "/images/rest_online_ordering.jpg", bg: "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/30" },
              ].map((tool) => (
                <div
                  key={tool.title}
                  className={`group rounded-2xl border p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${tool.bg}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/80 dark:bg-darkSurface/60 mb-3 border border-slate-200/50 dark:border-slate-800/50">
                    <Image
                      src={tool.img}
                      alt={tool.title}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      </main>
  );
}
