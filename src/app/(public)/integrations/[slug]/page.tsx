import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
  RefreshCw,
  ShieldCheck,
  Clock,
  Settings,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { FAQWrapper } from "@/features/FAQ";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import { ConnectIntegrationButton } from "@/components/atoms/ConnectIntegrationButton";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";

type IntegrationStep = {
  step: string;
  title: string;
  desc: string;
};

type IntegrationDetail = {
  id: string;
  name: string;
  category: string;
  color: string;
  tagline: string;
  description: string;
  features: { title: string; desc: string }[];
  howItWorks: IntegrationStep[];
  benefits: string[];
  faqs: FAQItem[];
};

const INTEGRATIONS_DATA: Record<string, IntegrationDetail> = {
  stripe: {
    id: "stripe",
    name: "Stripe",
    category: "PAYMENTS",
    color: "#635BFF",
    tagline: "Accept card payments tableside, online, and via QR — powered by Stripe's world-class payment infrastructure.",
    description: "Connect Stripe to Quantix POS for seamless card reader integration, online checkout processing, and automatic daily payouts. No manual reconciliation needed.",
    features: [
      { title: "Tableside Card Readers", desc: "Push order totals to Stripe Terminal card readers for tap, chip, and swipe payments at the table." },
      { title: "Online Order Checkout", desc: "Process credit card, Apple Pay, and Google Pay payments on your direct online ordering page." },
      { title: "Automatic Daily Payouts", desc: "Stripe deposits your restaurant revenue daily into your bank account with full transaction breakdown." },
      { title: "Split Check Support", desc: "Split bills across multiple Stripe card transactions by seat, item, or custom amount." },
      { title: "Tip Processing", desc: "Custom tip prompts (15%, 18%, 20%, custom) display on the card reader before payment confirmation." },
      { title: "Refund Management", desc: "Process partial or full refunds directly from the POS — Stripe handles the reversal automatically." },
    ],
    howItWorks: [
      { step: "01", title: "Connect Your Stripe Account", desc: "Link your existing Stripe account to Quantix in Settings → Payment Integrations. Takes under 2 minutes." },
      { step: "02", title: "Pair Your Card Readers", desc: "Connect Stripe Terminal readers (BBPOS, Verifone) via Bluetooth or USB to your POS terminals." },
      { step: "03", title: "Start Accepting Payments", desc: "Order totals push automatically to the card reader. Guests tap, dip, or swipe to pay. Tips and splits work out of the box." },
      { step: "04", title: "Track Revenue in Real-Time", desc: "All transactions sync to your Quantix dashboard and Stripe dashboard simultaneously. Z-reports reconcile automatically." },
    ],
    benefits: [
      "Zero manual entry — totals push from POS to reader automatically",
      "Support for 135+ currencies and international cards",
      "PCI-DSS Level 1 compliant — enterprise-grade security",
      "Detailed per-transaction reporting in both Quantix and Stripe dashboards",
      "Instant connection — go live in under 5 minutes",
    ],
    faqs: [
      { id: "s-1", question: "Do I need a separate Stripe account?", answer: "Yes, you'll need a Stripe account. If you don't have one, you can create it for free during the connection process." },
      { id: "s-2", question: "What card readers does Stripe support?", answer: "Stripe Terminal supports BBPOS WisePOS E, Verifone P400, and the Stripe Reader M2 for tap/chip/swipe." },
      { id: "s-3", question: "Are Stripe processing fees included?", answer: "No, Stripe charges its standard processing fees (typically 2.9% + 30¢). Quantix does not add any extra charges on top." },
    ],
  },
  "authorize-net": {
    id: "authorize-net",
    name: "Authorize.Net",
    category: "PAYMENTS",
    color: "#1E3A5F",
    tagline: "Secure merchant account processing for enterprises — PCI-compliant card transactions and web ordering payments.",
    description: "Integrate Authorize.Net for merchant account credit card processing, fraud detection, and secure web checkout on your online ordering page.",
    features: [
      { title: "Merchant Account Processing", desc: "Process Visa, Mastercard, Amex, and Discover through your existing Authorize.Net merchant account." },
      { title: "Advanced Fraud Detection", desc: "Built-in AVS, CVV verification, and velocity filters to protect against fraudulent transactions." },
      { title: "Web Checkout Gateway", desc: "Secure payment gateway for your Quantix-branded online ordering page with tokenized card storage." },
      { title: "Recurring Billing", desc: "Set up recurring charges for catering contracts, subscription meal plans, or weekly delivery schedules." },
      { title: "Void & Refund Management", desc: "Process voids and refunds directly from the POS with instant gateway confirmation." },
      { title: "Batch Settlement Reports", desc: "Automatic end-of-day batch settlements with full transaction detail reports." },
    ],
    howItWorks: [
      { step: "01", title: "Enter Your API Credentials", desc: "Add your Authorize.Net API Login ID and Transaction Key in Settings → Payment Integrations." },
      { step: "02", title: "Configure Gateway Settings", desc: "Set up AVS filters, CVV verification, and batch settlement time (usually midnight)." },
      { step: "03", title: "Enable on POS & Online", desc: "Activate Authorize.Net for both in-house POS terminals and your online ordering page checkout." },
      { step: "04", title: "Monitor Transactions", desc: "Track all transactions in the Quantix dashboard and your Authorize.Net reporting panel simultaneously." },
    ],
    benefits: [
      "Trusted by 430,000+ merchants worldwide since 1996",
      "PCI-DSS Level 1 security certification",
      "Advanced fraud detection filters reduce chargebacks",
      "Same-day batch settlement for faster cash flow",
      "Supports recurring billing for catering and subscriptions",
    ],
    faqs: [
      { id: "an-1", question: "Do I need a separate merchant account?", answer: "Yes, Authorize.Net requires a merchant account from a bank or payment processor." },
      { id: "an-2", question: "What are the processing fees?", answer: "Authorize.Net charges a $25/month gateway fee plus per-transaction fees from your merchant account provider." },
    ],
  },
  square: {
    id: "square",
    name: "Square",
    category: "POS TERMINAL",
    color: "#000000",
    tagline: "Connect Square card readers and terminals to your Quantix POS for unified payment processing.",
    description: "Use Square's card readers and payment terminals with Quantix for seamless payment processing, gift card support, and multi-location settlement.",
    features: [
      { title: "Square Reader Integration", desc: "Connect Square Reader for contactless, chip, and magstripe card payments at your counter or tableside." },
      { title: "Square Terminal Support", desc: "Use the full Square Terminal device as a customer-facing payment display connected to Quantix." },
      { title: "Gift Card Balances", desc: "Accept and check Square gift card balances directly from the Quantix POS screen." },
      { title: "Multi-Location Processing", desc: "Process payments across multiple locations with centralized Square reporting." },
      { title: "Instant Deposits", desc: "Get your money faster with Square's instant deposit feature (1.5% fee for same-day transfers)." },
      { title: "Dispute Management", desc: "Handle payment disputes and chargebacks directly from the Square Dashboard with Quantix transaction references." },
    ],
    howItWorks: [
      { step: "01", title: "Connect Your Square Account", desc: "OAuth-based connection — log in with your Square credentials in Quantix Settings → Integrations." },
      { step: "02", title: "Pair Square Readers", desc: "Connect Square Reader or Terminal via Bluetooth to your POS device. The pairing completes in seconds." },
      { step: "03", title: "Accept Payments", desc: "Order totals push to Square readers & terminals. Customers tap, insert, or swipe their card. Tips are configurable." },
      { step: "04", title: "Reconcile Automatically", desc: "Square deposits sync to your Quantix reports. Z-reports match your Square settlement statements." },
    ],
    benefits: [
      "No long-term contract — pay as you go",
      "Flat-rate pricing: 2.6% + 10¢ per tap/dip/swipe",
      "Free Square Dashboard for transaction monitoring",
      "Accept gift cards, Apple Pay, and Google Pay",
      "Offline mode — process payments without internet",
    ],
    faqs: [
      { id: "sq-1", question: "Can I use Square readers with Quantix?", answer: "Yes, Quantix integrates with Square Reader (2nd gen) and Square Terminal via Bluetooth." },
      { id: "sq-2", question: "Does Square work offline?", answer: "Yes, Square supports offline payments up to $50,000 in transactions, syncing when connection resumes." },
    ],
  },
  doordash: {
    id: "doordash",
    name: "DoorDash",
    category: "DELIVERY",
    color: "#FF3008",
    tagline: "Inject DoorDash marketplace orders directly into your KDS — no tablet clutter, no manual re-entry.",
    description: "Automatically receive DoorDash delivery orders on your Quantix POS and kitchen display screens. Eliminate the tablet chaos and reduce order errors.",
    features: [
      { title: "Direct KDS Ticket Injection", desc: "DoorDash orders fire automatically to your kitchen display screens with correct station routing." },
      { title: "Menu Sync", desc: "Push menu changes, price updates, and 86'd items from Quantix to your DoorDash storefront automatically." },
      { title: "Courier Status Tracking", desc: "Track DoorDash driver pickup ETA directly from your POS so kitchen times food prep accordingly." },
      { title: "Order Throttling", desc: "Pause or reduce incoming DoorDash orders during peak rush hours to protect kitchen capacity." },
      { title: "Consolidated Reporting", desc: "DoorDash revenue appears in your Quantix sales reports alongside dine-in, online, and QR orders." },
      { title: "Auto-Accept Orders", desc: "Configure auto-accept rules so DoorDash orders are confirmed instantly without staff intervention." },
    ],
    howItWorks: [
      { step: "01", title: "Apply for DoorDash Integration", desc: "Request DoorDash API access from your Quantix dashboard → Integrations → Delivery Partners." },
      { step: "02", title: "Sync Your Menu", desc: "Your Quantix menu, modifiers, prices, and availability push to DoorDash automatically." },
      { step: "03", title: "Receive Orders on KDS", desc: "DoorDash orders appear on your kitchen displays and POS register — no separate tablet needed." },
      { step: "04", title: "Track Handoff & Dispatch", desc: "Monitor driver arrival times, bump completed tickets, and hand food to couriers with matching order numbers." },
    ],
    benefits: [
      "Eliminate tablet clutter — one screen for all orders",
      "Reduce order transcription errors to 0%",
      "Faster kitchen prep times — tickets print or display instantly",
      "Real-time menu availability prevents ordering out-of-stock items",
      "Consolidated financial reporting in Quantix sales dashboard",
    ],
    faqs: [
      { id: "dd-1", question: "Do I still need a DoorDash merchant tablet?", answer: "No, the Quantix integration completely replaces the DoorDash tablet. Orders go straight to your POS." },
      { id: "dd-2", question: "How are DoorDash commissions handled?", answer: "DoorDash collects its standard commission from orders processed through its marketplace. Quantix does not charge per-order fees." },
    ],
  },
  "uber-eats": {
    id: "uber-eats",
    name: "Uber Eats",
    category: "DELIVERY",
    color: "#06C167",
    tagline: "Direct POS injection for Uber Eats orders — auto-accept, live menu sync, and kitchen station routing.",
    description: "Connect your Uber Eats store directly to Quantix POS. Orders fire to your kitchen automatically, menus sync in real-time, and daily revenue reconciles cleanly.",
    features: [
      { title: "Direct POS & KDS Routing", desc: "Incoming Uber Eats orders route straight to your POS register and kitchen displays without manual re-entry." },
      { title: "Live Menu & 86 Item Sync", desc: "Mark items out of stock in Quantix and they disappear from your Uber Eats menu within seconds." },
      { title: "Driver ETA Display", desc: "See courier arrival estimates on your POS and KDS screens to pace food preparation perfectly." },
      { title: "Auto-Accept Rules", desc: "Configure rules to auto-confirm orders based on prep time estimates and kitchen capacity." },
      { title: "Dynamic Prep Times", desc: "Adjust prep times dynamically during rush periods to manage delivery expectations." },
      { title: "Unified Z-Reports", desc: "Uber Eats sales, taxes, and commissions are itemized clearly on your daily closing reports." },
    ],
    howItWorks: [
      { step: "01", title: "Authorize Uber Eats Connection", desc: "Log in with your Uber Eats Restaurant Manager account from Quantix Settings → Integrations." },
      { step: "02", title: "Map Menu Categories", desc: "Confirm category and item mappings between Quantix and Uber Eats. Modifier groups map automatically." },
      { step: "03", title: "Enable Kitchen Routing", desc: "Choose which KDS stations and ticket printers receive Uber Eats orders." },
      { step: "04", title: "Go Live", desc: "Orders start flowing directly into your POS and kitchen screens. Monitor live orders in real-time." },
    ],
    benefits: [
      "Zero manual order re-entry saves 3-5 minutes per order",
      "Real-time 86'd item sync eliminates refunded out-of-stock items",
      "Paced kitchen ticket printing matches driver arrival",
      "Unified sales reporting across all delivery channels",
      "Auto-accept reduces order confirmation time to under 5 seconds",
    ],
    faqs: [
      { id: "ue-1", question: "Can I manage multiple Uber Eats locations?", answer: "Yes, multi-location restaurants can manage all Uber Eats stores from a single Quantix admin dashboard." },
      { id: "ue-2", question: "What happens if our internet goes down?", answer: "Orders are safely buffered on the cloud server and will sync to your POS as soon as connectivity resumes." },
    ],
  },
  quickbooks: {
    id: "quickbooks",
    name: "QuickBooks",
    category: "ACCOUNTING",
    color: "#2CA01C",
    tagline: "Automate your restaurant accounting — daily sales, taxes, tips, and inventory sync seamlessly with QuickBooks Online.",
    description: "Sync end-of-day sales data, sales tax collections, tip payouts, and inventory costs directly from Quantix POS into QuickBooks Online automatically every night.",
    features: [
      { title: "Daily Sales Journal Sync", desc: "Automatically post daily summarized sales journals with category breakdowns to QuickBooks Online." },
      { title: "Tax Breakdown Mapping", desc: "Map local, state, and special tax rates to the correct QuickBooks liability accounts." },
      { title: "Tip & Gratuity Accounting", desc: "Track tip payouts, service charges, and credit card fee deductions accurately." },
      { title: "COGS & Inventory Valuation", desc: "Sync recipe cost calculations and supplier purchase orders with your chart of accounts." },
      { title: "Payment Method Reconciliation", desc: "Separate cash, card, delivery app, and gift card deposits for clean bank reconciliation." },
      { title: "Multi-Store Consolidation", desc: "Post sales from multiple locations into separate QuickBooks classes or sub-accounts." },
    ],
    howItWorks: [
      { step: "01", title: "Connect QuickBooks Online", desc: "Authenticate your QuickBooks account via OAuth in Quantix Settings → Integrations → Accounting." },
      { step: "02", title: "Map Chart of Accounts", desc: "Map Quantix revenue categories, tax rates, and payment methods to your QuickBooks accounts." },
      { step: "03", title: "Set Sync Schedule", desc: "Choose automatic daily sync (recommended: midnight after Z-report close) or manual trigger." },
      { step: "04", title: "Review & Reconcile", desc: "Daily journals appear in QuickBooks automatically. Review matched bank deposits with zero data entry." },
    ],
    benefits: [
      "Save 10+ hours per month on bookkeeping and manual data entry",
      "Zero reconciliation errors between POS reports and QuickBooks P&L",
      "Accurate sales tax liability tracking prevents costly tax audit penalties",
      "Real-time COGS sync provides accurate monthly gross margin analysis",
      "Certified QuickBooks Online integration built with Intuit's official API",
    ],
    faqs: [
      { id: "qb-1", question: "Which QuickBooks versions are supported?", answer: "Quantix integrates with QuickBooks Online (Simple Start, Essentials, Plus, and Advanced)." },
      { id: "qb-2", question: "Does it create individual invoices or summary journals?", answer: "By default, it creates daily summary journals (recommended by CPAs). Detailed per-transaction sync is also configurable." },
    ],
  },
  xero: {
    id: "xero",
    name: "Xero",
    category: "ACCOUNTING",
    color: "#13B5EA",
    tagline: "Effortless cloud accounting for restaurants — sync daily sales, bank feeds, and tax liabilities with Xero automatically.",
    description: "Connect Quantix POS to Xero for automated daily sales journal posting, sales tax reconciliation, tip distribution tracking, and inventory cost sync.",
    features: [
      { title: "Daily Sales Sync to Xero", desc: "Automatically generate balanced daily sales invoices in Xero with category breakdowns." },
      { title: "Tax Rate Mapping", desc: "Map VAT, GST, or local sales tax rates directly to your Xero tax accounts." },
      { title: "Bank Reconciliation Match", desc: "Match card payouts and bank deposits against POS batch totals automatically." },
      { title: "Inventory & Stock Values", desc: "Sync recipe cost data and supplier purchase orders to Xero inventory tracking." },
      { title: "Tracking Categories", desc: "Use Xero Tracking Categories to analyze profitability by location, meal period, or revenue center." },
      { title: "Automated Daily Scheduling", desc: "Set automatic overnight sync after end-of-day register closeout." },
    ],
    howItWorks: [
      { step: "01", title: "Connect to Xero", desc: "Click 'Connect to Xero' in Quantix Settings and authorize with your Xero login credentials." },
      { step: "02", title: "Map Accounts & Tax Rates", desc: "Map Quantix sales categories, payment methods, and tax rates to your Xero Chart of Accounts." },
      { step: "03", title: "Test Connection", desc: "Run a test sync of yesterday's sales to verify account mappings and balanced entries." },
      { step: "04", title: "Automate Daily Posting", desc: "Enable automated overnight sync. Daily summaries post to Xero automatically every night." },
    ],
    benefits: [
      "Eliminate manual bookkeeping spreadsheets completely",
      "Seamless bank reconciliation with matched deposit amounts",
      "Accurate tax liability tracking for stress-free VAT/GST filing",
      "Multi-currency support for international restaurant operations",
      "Real-time visibility into restaurant cash flow and profitability",
    ],
    faqs: [
      { id: "xr-1", question: "How often does data sync to Xero?", answer: "Data syncs automatically once daily after your end-of-day register closeout, or on-demand at any time." },
      { id: "xr-2", question: "Can our accountant access the sync logs?", answer: "Yes, full sync logs with transaction IDs and timestamped audit trails are accessible in your Quantix admin panel." },
    ],
  },
  shopify: {
    id: "shopify",
    name: "Shopify Plus",
    category: "E-COMMERCE",
    color: "#7AB55C",
    tagline: "Omnichannel inventory, multi-warehouse routing, and BOPIS fulfillment across all enterprise retail channels.",
    description: "Connect your enterprise Shopify Plus storefront directly to Quantix POS. Automate multi-location catalog distribution, bi-directional inventory reservation, and 2-hour store pickup fulfillment.",
    features: [
      { title: "Real-Time Enterprise Stock Sync", desc: "Bi-directional stock reservation across regional warehouses and physical retail store registers." },
      { title: "Shopify Plus Multi-Storefronts", desc: "Manage multi-brand and international localized stores from one single Quantix master catalog." },
      { title: "BOPIS & Curbside Pickup", desc: "Route web orders for click-and-collect in under 2 hours with instant barcode staging scans." },
      { title: "Unified Customer Loyalty", desc: "Omnichannel customer profiles, store credits, and loyalty points usable online and in-store." },
      { title: "Cross-Channel Returns", desc: "Process online returns at physical retail counters with automatic inventory restock and refund ledgers." },
      { title: "Automated Tax & Duty Mapping", desc: "Sync regional sales taxes and international duty calculations directly to your ERP ledgers." },
    ],
    howItWorks: [
      { step: "01", title: "Install Enterprise Connector", desc: "Link your Shopify Plus organization via OAuth in Quantix Admin → Integrations → Omnichannel." },
      { step: "02", title: "Map Locations & Warehouses", desc: "Pair your physical branches and regional 3PL fulfillment centers with Shopify inventory locations." },
      { step: "03", title: "Sync Product Catalog", desc: "Quantix automatically matches SKUs, barcodes, matrix variants, and tiered wholesale pricing rules." },
      { step: "04", title: "Go Live With Webhooks", desc: "High-throughput encrypted webhooks ensure instantaneous multi-store inventory deductions." },
    ],
    benefits: [
      "Zero stock discrepancies between online storefronts and store shelves",
      "Accelerate BOPIS fulfillment speed to under 15 minutes",
      "Unified customer purchase history across retail and e-commerce",
      "Support for high-volume flash sales with rate-limit resilient sync",
      "Centralized ERP accounting entries for all digital orders",
    ],
    faqs: [
      { id: "sh-1", question: "Does this support Shopify Plus high-volume orders?", answer: "Yes, our enterprise connector is engineered for enterprise tier volume, supporting 10,000+ orders per hour during flash sales." },
      { id: "sh-2", question: "Can we fulfill web orders from physical retail stores?", answer: "Absolutely. Quantix provides store-level pick-and-pack routing for Ship-from-Store and BOPIS pickup." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(INTEGRATIONS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = INTEGRATIONS_DATA[slug] || (slug === "ubereats" ? INTEGRATIONS_DATA["uber-eats"] : undefined);
  if (!integration) {
    return { title: "Integrations | Quantix Enterprise" };
  }
  return {
    title: `${integration.name} Integration | Quantix Enterprise`,
    description: integration.description,
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let integration = INTEGRATIONS_DATA[slug] || (slug === "ubereats" ? INTEGRATIONS_DATA["uber-eats"] : undefined);
  if (!integration) {
    integration = {
      id: slug,
      name: slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      category: "ECOSYSTEM",
      color: "#f97316",
      tagline: `Connect ${slug.replace("-", " ")} directly with your Quantix POS ecosystem.`,
      description: `Integrate ${slug.replace("-", " ")} to sync orders, inventory, and transaction reports automatically with Quantix POS.`,
      features: [
        { title: "Direct POS Sync", desc: "Automated two-way data sync between Quantix and third-party tools." },
        { title: "Zero Manual Re-Entry", desc: "Eliminate error-prone manual data entry for your staff." },
        { title: "Real-Time Updates", desc: "Keep inventory, sales, and customer profiles updated continuously." },
      ],
      howItWorks: [
        { step: "01", title: "Enable Integration", desc: "Activate in your Quantix Admin Settings under Integration Manager." },
        { step: "02", title: "Authorize API Connection", desc: "Authenticate with your third-party account credentials." },
        { step: "03", title: "Configure Sync Rules", desc: "Map tax rates, menu items, and payment methods." },
        { step: "04", title: "Go Live", desc: "Sync starts automatically for all connected registers." },
      ],
      benefits: [
        "Eliminate double entry errors",
        "Save 5+ hours per week on manual data entry",
        "Automated reconciliation reporting",
      ],
      faqs: [
        { id: "int-setup", question: "How do I request early access for this integration?", answer: "Contact our sales and integration engineering team via the demo request form." },
      ],
    };
  }

  const logoPaths: Record<string, string> = {
    stripe: "/brands/integrations/stripe.svg",
    "authorize-net": "/brands/integrations/authorize.svg",
    square: "/brands/integrations/square.svg",
    doordash: "/brands/integrations/doordash.svg",
    "uber-eats": "/brands/integrations/ubereats.svg",
    ubereats: "/brands/integrations/ubereats.svg",
    grubhub: "/brands/integrations/grubhub.svg",
    quickbooks: "/brands/integrations/quickbooks.svg",
    xero: "/brands/integrations/xero.svg",
    shopify: "/brands/integrations/shopify.svg",
    "google-pay": "/brands/integrations/gpay.svg",
    "apple-pay": "/brands/integrations/applepay.svg",
    clover: "/brands/integrations/clover.svg",
  };
  const logoUrl = logoPaths[slug] || "/brands/integrations/stripe.svg";

  const imageMap: Record<string, string> = {
    stripe: "/images/ent_stripe_pos_bundle.png",
    "authorize-net": "/images/ent_venues_pos.png",
    square: "/images/nav_payment_bundle.png",
    doordash: "/images/ent_delivery_dispatch_bundle.png",
    "uber-eats": "/images/rest_ghost_kitchen_bundle.png",
    ubereats: "/images/rest_ghost_kitchen_bundle.png",
    quickbooks: "/images/ent_accounting_sync_bundle.png",
    xero: "/images/ent_accounting_sync_bundle.png",
    shopify: "/images/ent_omnichannel_bundle.png",
  };
  const heroImage =
    imageMap[slug] ||
    (integration.category === "PAYMENTS"
      ? "/images/ent_stripe_pos_bundle.png"
      : integration.category === "DELIVERY"
      ? "/images/ent_delivery_dispatch_bundle.png"
      : integration.category === "ACCOUNTING"
      ? "/images/ent_accounting_sync_bundle.png"
      : "/images/ent_global_pos_bundle.png");

  const TRUST_METRICS = [
    { label: "Webhook SLA", value: "99.99%", desc: "Enterprise SLA" },
    { label: "Injection Speed", value: "< 200ms", desc: "Direct to Kitchen" },
    { label: "Accuracy Rate", value: "100%", desc: "Zero Ticket Errors" },
    { label: "Security", value: "PCI-DSS", desc: "Level 1 Certified" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* 1. Hero Section (Aligned with globals.css .page-hero-header) */}
      <section className="bg-white page-hero-header border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle Architectural Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] pointer-events-none opacity-60" />

        {/* Soft Ambient Radial Warmth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="site-container relative z-10 px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-3.5 sm:mb-5 inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#FF4F00] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <Link href="/integrations" className="hover:text-[#FF4F00] transition-colors">Integrations</Link>
            <ChevronRight size={12} className="text-slate-400 shrink-0" />
            <span className="text-[#FF4F00] font-bold truncate max-w-[170px] sm:max-w-none">{integration.name}</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-3.5 sm:space-y-4 lg:col-span-7">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#FF4F00] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
                <Sparkles size={12} className="text-[#FF4F00]" />
                <span>{integration.category} VERIFIED CONNECTOR</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-syne text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-[1.2] sm:leading-[1.16] tracking-tight">
                Quantix + <span className="text-[#FF4F00]">{integration.name}</span>
              </h1>

              {/* Tagline */}
              <p className="max-w-xl text-xs sm:text-sm md:text-base font-medium leading-relaxed text-slate-600">
                {integration.tagline}
              </p>

              {/* Description */}
              <p className="max-w-xl text-xs sm:text-sm font-normal leading-relaxed text-slate-500">
                {integration.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2 sm:pt-4 w-full sm:w-auto">
                <ConnectIntegrationButton
                  integrationName={integration.name}
                  integrationSlug={slug}
                  className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-5 sm:px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/25 transition-all hover:bg-primary-dark active:scale-95 text-center cursor-pointer group"
                />
                <RequestDemoButton
                  title={`Setup ${integration.name} Integration`}
                  buttonText="INTEGRATION_SETUP"
                  label="Request Setup Help"
                  className="w-full sm:w-auto flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 bg-white px-5 sm:px-8 font-syne text-xs font-extrabold uppercase tracking-wider text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 cursor-pointer text-center transition-all"
                />
              </div>

              {/* 4 Trust Metrics Bar */}
              <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl">
                {TRUST_METRICS.map((metric, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-50/90 border border-slate-200/80 backdrop-blur-xs text-center shadow-2xs"
                  >
                    <div className="font-syne font-extrabold text-sm sm:text-base text-slate-950">
                      {metric.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
                      {metric.label}
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5 hidden sm:block">
                      {metric.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Hardware Bundle with Verified Connector Badge */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative aspect-4/3 w-full max-w-md lg:max-w-lg mx-auto flex items-center justify-center p-2 group">

                <Image
                  src={heroImage}
                  alt={`${integration.name} 3D integration bundle`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  className="object-contain p-2 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Verified Connector Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 inline-flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-xl backdrop-blur-md">
                  <div className="relative h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-slate-50 flex items-center justify-center p-1 border border-slate-200/60 shrink-0">
                    <Image
                      src={logoUrl}
                      alt={`${integration.name} logo`}
                      width={32}
                      height={32}
                      className="max-h-full max-w-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div>
                    <span className="block font-syne text-[11px] sm:text-xs font-black text-slate-900 leading-tight">
                      {integration.name}
                    </span>
                    <span className="block text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-[#FF4F00]">
                      Verified Connector
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Grid (Standard .section-py from globals.css) */}
      <section className="section-py bg-slate-50/50 border-b border-slate-200/80">
        <div className="site-container px-4 sm:px-6">
          <div className="text-center section-header-mb max-w-2xl mx-auto">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF4F00] block mb-2">CAPABILITIES</span>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              What You Get With {integration.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
              Full enterprise feature breakdown of the Quantix + {integration.name} integration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
            {integration.features.map((feat) => (
              <div
                key={feat.title}
                className="p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-orange-500/40 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-[#FF4F00] group-hover:bg-[#FF4F00] group-hover:text-white transition-colors duration-200">
                    <Check className="h-3.5 w-3.5 stroke-3" />
                  </span>
                  <div>
                    <h3 className="font-syne font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#FF4F00] transition-colors duration-200">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fast Onboarding Steps (2-Col Responsive Grid with .section-py) */}
      <section className="section-py bg-white border-b border-slate-200/80">
        <div className="site-container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center section-header-mb max-w-xl mx-auto">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#FF4F00] block mb-2">FAST ONBOARDING</span>
            <h2 className="font-syne text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              How to Connect {integration.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">
              Get up and running in 4 simple steps. Most locations go live in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
            {integration.howItWorks.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-orange-500/40 hover:bg-white transition-all duration-300 shadow-2xs"
              >
                <span
                  className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl font-syne font-black text-base sm:text-lg shadow-2xs"
                  style={{
                    backgroundColor: (integration.id === "square" ? "#FF4F00" : integration.color) + "15",
                    color: integration.id === "square" ? "#FF4F00" : integration.color,
                  }}
                >
                  {step.step}
                </span>
                <div>
                  <h3 className="font-syne font-extrabold text-sm sm:text-base text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. Customer Testimonials */}
      <TestimonialsWrapper />

      {/* 6. FAQ Section (Fetches Live API FAQs) */}
      <FAQWrapper fallbackFaqs={integration.faqs} />

      {/* 7. Production CTA Banner */}
      <CTABanner />
    </div>
  );
}
