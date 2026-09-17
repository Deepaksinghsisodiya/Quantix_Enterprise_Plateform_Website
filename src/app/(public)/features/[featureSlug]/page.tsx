// src/app/(public)/features/[featureSlug]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChefHat,
  ChevronRight,
  Clock,
  Cloud,
  Cpu,
  CreditCard,
  Database,
  Flame,
  Globe2,
  Layers,
  Layout,
  Lock,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  RefreshCw,
  Scale,
  Scan,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Tablet,
  Terminal,
  Timer,
  Truck,
  Users,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FAQWrapper from "@/features/FAQ/FAQWrapper";
import CTABanner from "@/components/organisms/CTABanner";

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
  workflowVisual?: FeatureVisual;
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
    tagline: "Track raw ingredient costs down to the gram and calculate true gross margins.",
    desc:
      "Eliminate guesswork and margin leakage. Smart Inventory connects every POS ring to real-time ingredient depletion, batch lot tracking, automated vendor par-order replenishment, and waste logging across all branch locations.",
    benefits: [
      "Recipe costing and ingredient depletion down to the gram",
      "Automated par-level supplier draft purchase orders",
      "Integrated waste, spoilage, and shrinkage logging",
      "Central commissary prep & inter-branch transfer sync",
    ],
    techSpec:
      "Event-driven inventory depletion ledger with FIFO/LIFO cost accounting, real-time JSON webhooks for ERP/EDI suppliers, and barcode GRN scanner receiving protocols.",
    visual: {
      imageSrc: "/images/nav_retail_bundle.png",
      imageAlt: "Smart recipe costing and inventory depletion dashboard",
      topBadge: "Real-Time Depletion",
      bottomBadge: "Recipe Costing & Par POs",
    },
    workflowVisual: {
      imageSrc: "/images/ent_supply_chain_bundle.png",
      imageAlt: "Live ingredient cost breakdown and yield calculation",
      topBadge: "Gram-Level Precision",
      bottomBadge: "Margin Protection Audit",
    },
    primaryCta: { label: "Start Inventory Setup", href: "/contact/sales" },
    secondaryCta: { label: "Explore Retail POS", href: "/solutions#retail-pos" },
    overviewTitle: "Every ounce, gram, and cent accounted for",
    overviewDesc:
      "From high-volume cocktail pours and bakery flour sacks to retail barcode SKUs, Quantix keeps stock balances aligned with your actual financial ledger.",
    capabilities: [
      { title: "Gram-Level Depletion", desc: "Automatically deduct buns, patties, cheeses, and sauces as orders clear the POS register.", icon: Scale },
      { title: "Automated Par Orders", desc: "Generate supplier POs automatically the moment branch inventory hits safety buffer thresholds.", icon: Layout },
      { title: "Wastage & Spoilage Logs", desc: "Track daily kitchen prep waste, burned dishes, and expired goods with mandatory reason codes.", icon: ShieldCheck },
      { title: "Commissary Batch Prep", desc: "Track bulk prep recipes in central kitchens and dispatch pre-portioned units to satellite outlets.", icon: ChefHat },
      { title: "Loading Dock GRN Audits", desc: "Scan incoming supplier deliveries with handheld barcode scanners to catch vendor shortfalls.", icon: Scan },
      { title: "Dynamic Margin Tracking", desc: "Audit dish gross margins dynamically as supplier ingredient prices fluctuate in the market.", icon: Database },
    ],
    workflowTitle: "From vendor delivery to register checkout",
    workflowDesc:
      "Raw goods flow cleanly through purchase orders, dock receiving, recipe preparation, and POS deduction without blind spots.",
    workflowItems: [
      { title: "Define recipe formulas", desc: "Build sub-recipes and master dish yields with exact ingredient weights and unit costs.", icon: Layout },
      { title: "Receive vendor shipments", desc: "Audit incoming cases at the dock, verifying packing slips against digital purchase orders.", icon: Scan },
      { title: "Ring sales at register", desc: "Front-of-house staff take orders while ingredients deduct from stock balances in real time.", icon: ReceiptText },
      { title: "Monitor par buffers", desc: "Real-time safety stock meters flag fast-moving items before the kitchen 86s a key dish.", icon: Timer },
      { title: "Auto-draft PO replenishment", desc: "Consolidate supplier reorders across branches into scheduled vendor purchase orders.", icon: Cloud },
      { title: "Audit shrinkage variance", desc: "Compare theoretical stock calculations with physical cycle counts to eliminate theft.", icon: ShieldCheck },
    ],
    useCaseTitle: "Operational environments it protects",
    useCaseDesc:
      "Engineered for high-volume dining, central production commissaries, and fast-moving retail stores.",
    useCases: [
      { title: "Full-service restaurants", desc: "Track protein portions, high-value steaks, seafood, and liquor pour costs down to the cent.", icon: Utensils },
      { title: "Bakeries & coffee roasters", desc: "Manage flour sacks, dairy gallons, coffee beans, and daily unsold pastry batch waste.", icon: Store },
      { title: "Central commissaries", desc: "Coordinate large batch sauces, marinades, and prep distributions to multiple branches.", icon: ChefHat },
      { title: "Franchise networks", desc: "Standardize ingredient specs and supplier pricing across corporate and franchise units.", icon: Cloud },
    ],
    faqs: [
      {
        question: "How does real-time recipe depletion work?",
        answer:
          "When a cashier rings up a menu item, the recipe engine breaks it down into its constituent bill of materials (e.g. 150g beef, 1 brioche bun, 30g sauce) and deducts those exact quantities from stock in real time.",
      },
      {
        question: "Can Quantix auto-order stock from our suppliers?",
        answer:
          "Yes. You can set minimum par levels and reorder thresholds. Once stock dips below par, Quantix generates draft purchase orders ready for one-click approval or automated EDI dispatch.",
      },
      {
        question: "Does it support barcode scanning for receiving?",
        answer:
          "Yes. Staff can use standard Bluetooth or USB barcode scanners to check in vendor delivery crates and detect missing or damaged items before signing goods received notes (GRN).",
      },
      {
        question: "Can we track waste and staff meals separately?",
        answer:
          "Yes. Dedicated reason codes allow managers to log prep waste, dropped items, expired perishables, and staff comps without skewing actual sales margin calculations.",
      },
    ],
    relatedFeatures: [
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
      { title: "Enterprise Supply Chain & Replenishment", slug: "supply-chain" },
    ],
  },
  "offline-registers": {
    slug: "offline-registers",
    title: "Offline Standalone Register POS",
    tagline: "Continuous checkout, cash handling, and thermal bill printing without internet.",
    desc:
      "Eliminate revenue loss during internet disruptions. Quantix offline registers utilize encrypted local storage and SQLite till meshes to ring sales, authorize cashier PINs, and print receipts natively—syncing back to the cloud the instant connectivity is restored.",
    benefits: [
      "100% operational autonomy during broadband and fiber outages",
      "Sub-millisecond local database lookups for instant barcode scans",
      "Local thermal receipt and order ticket printing over LAN",
      "Automated background cloud reconciliation with zero data loss",
    ],
    techSpec:
      "Local IndexedDB and SQLite database engine with peer-to-peer local network till synchronization, encrypted local transaction journal queuing, and automated CRDT conflict resolution.",
    visual: {
      imageSrc: "/images/ent_global_pos_bundle.png",
      imageAlt: "Offline standalone POS terminal countertop checkout",
      topBadge: "Offline Local Mesh",
      bottomBadge: "Zero Downtime Billing",
    },
    workflowVisual: {
      imageSrc: "/images/nav_retail_bundle.png",
      imageAlt: "High-speed retail counter checkout during network outage",
      topBadge: "Continuous Ringing",
      bottomBadge: "Local Cache Protected",
    },
    primaryCta: { label: "Test Offline Till", href: "/contact/sales" },
    secondaryCta: { label: "Explore Retail POS", href: "/solutions#retail-pos" },
    overviewTitle: "Never tell a customer your system is down",
    overviewDesc:
      "When cloud-only POS systems crash during storms or ISP dropouts, Quantix keeps registers ringing, lines moving, and cash drawers opening seamlessly.",
    capabilities: [
      { title: "Local Database Engine", desc: "Product catalogs, barcodes, prices, and tax tables are cached locally on each till.", icon: Database },
      { title: "Zero-Lag Scanning", desc: "Scan barcodes and search customer lookup tables with sub-millisecond local response.", icon: Scan },
      { title: "Local Thermal Printing", desc: "Print kitchen dockets and customer receipts over local Ethernet or Bluetooth without WAN.", icon: Printer },
      { title: "Encrypted Offline Ledger", desc: "Record cash, store credit, and queued card authorizations in AES-256 encrypted local files.", icon: ShieldCheck },
      { title: "Peer Till Mesh", desc: "Registers share active tab balances over local Wi-Fi router mesh even when external internet is severed.", icon: Zap },
      { title: "Auto Cloud Sync", desc: "The moment broadband reconnects, queued sales upload in background batches without lag.", icon: Cloud },
    ],
    workflowTitle: "Failover, ringing, and background recovery",
    workflowDesc:
      "Staff experience zero interruption when the internet drops. The POS switches silently to local mode and recovers on its own.",
    workflowItems: [
      { title: "Internet disconnects", desc: "Register detects loss of connection and switches seamlessly to offline local mode.", icon: Zap },
      { title: "Cashier rings sales", desc: "Staff scan items, apply discounts, and accept tender with zero interface delay.", icon: ReceiptText },
      { title: "Print slips locally", desc: "Thermal printers spit customer receipts and kitchen tickets directly over LAN.", icon: Printer },
      { title: "Queue transactions", desc: "Every payment and balance update is secured inside the encrypted local till journal.", icon: Database },
      { title: "Connection returns", desc: "System verifies cloud handshake and streams journal entries in the background.", icon: Cloud },
      { title: "Reconcile balances", desc: "Central inventory and accounting balances reconcile automatically with zero duplicates.", icon: Check },
    ],
    useCaseTitle: "Mission-critical reliability scenarios",
    useCaseDesc:
      "Built for businesses where even a 5-minute outage results in lost revenue, walkouts, and frustrated customers.",
    useCases: [
      { title: "Peak dinner rush", desc: "Keep dining room tickets firing to the kitchen even during stormy weather dropouts.", icon: Utensils },
      { title: "High-traffic supermarkets", desc: "Process long checkout lines continuously with instant local barcode lookups.", icon: Store },
      { title: "Food trucks & pop-ups", desc: "Operate in remote festival locations and farmers markets with spotty cellular coverage.", icon: ShoppingBag },
      { title: "Subway & basement venues", desc: "Reliable cashiering in underground shopping concourses and concrete cellars.", icon: Cloud },
    ],
    faqs: [
      {
        question: "What happens when our internet connection suddenly drops?",
        answer:
          "Nothing stops. The register switches instantly to local offline mode. Cashiers can continue scanning barcodes, selecting menu items, applying discounts, and printing receipts.",
      },
      {
        question: "Can we take credit card payments while offline?",
        answer:
          "Yes. Offline store-and-forward card processing allows encrypted pre-authorizations to be queued locally and processed the moment network connection is restored.",
      },
      {
        question: "Do kitchen printers still work without internet?",
        answer:
          "Yes. As long as your local Wi-Fi router or Ethernet network is powered on, registers communicate directly with kitchen printers and KDS screens over LAN.",
      },
      {
        question: "Will offline transactions cause data conflicts when syncing back?",
        answer:
          "No. Quantix uses conflict-free replicated data types (CRDT) and sequence-numbered journals to ensure all sales and inventory deductions merge cleanly without duplicates.",
      },
    ],
    relatedFeatures: [
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
      { title: "Multi-Location Cloud HQ & Franchise Command", slug: "multi-store" },
    ],
  },
  "table-management": {
    slug: "table-management",
    title: "Table Management & Floor Layouts",
    tagline: "Interactive multi-room visual floor plans, course firing, and split checks.",
    desc:
      "Maximize dining room turns and eliminate server section chaos. Design custom multi-room floor layouts, track table occupancy timers, fire course sequences directly to kitchen stations, and split complex customer checks effortlessly.",
    benefits: [
      "Interactive drag-and-drop floor plan designer with multi-room zones",
      "Color-coded table occupancy timers and turn velocity telemetry",
      "Synchronized course pacing and direct kitchen firing triggers",
      "Flexible bill splitting by seat, item, percentage, or custom amount",
    ],
    techSpec:
      "Interactive vector canvas engine with real-time WebSocket seat state synchronization, distributed table locking, course-timer event handlers, and guest spend telemetry.",
    visual: {
      imageSrc: "/images/rest_qr_table_bundle.png",
      imageAlt: "Interactive restaurant floor plan and table management screen",
      topBadge: "Multi-Room Floor Maps",
      bottomBadge: "Course Firing & Split Bills",
    },
    workflowVisual: {
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: "Waitstaff tableside service in a fine dining floor layout",
      topBadge: "Tableside Pacing",
      bottomBadge: "Server Section Balancer",
    },
    primaryCta: { label: "Design Floor Plan", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Turn tables faster without rushing guests",
    overviewDesc:
      "From intimate bistros with outdoor patios to massive multi-floor dining halls, Quantix provides the visual clarity servers and hosts need to orchestrate service.",
    capabilities: [
      { title: "Custom Floor Canvas", desc: "Draw round tables, booths, bar counters, and outdoor patio decks with exact seat counts.", icon: Layout },
      { title: "Table Status Timers", desc: "Color-coded rings show seated time, order placed, food served, and payment pending.", icon: Timer },
      { title: "Server Section Balancing", desc: "Assign dining sections to waitstaff to balance covers and prevent server overload.", icon: Users },
      { title: "Course Pacing Firing", desc: "Hold and fire appetizers, main courses, and desserts in coordinated rhythm to the kitchen.", icon: ChefHat },
      { title: "Seat-Level Check Splits", desc: "Split bills effortlessly by individual guest seat, custom items, or equal card shares.", icon: ReceiptText },
      { title: "Live Table Telemetry", desc: "Track average turn times, spend per cover, and section revenue in real-time dashboards.", icon: Monitor },
    ],
    workflowTitle: "From host greeting to table reset",
    workflowDesc:
      "Every table moves through a clear operational sequence: seating, order capture, course pacing, bill split, and cleanup reset.",
    workflowItems: [
      { title: "Seat guests & open tab", desc: "Host assigns guests to an available table, instantly notifying the designated section server.", icon: Users },
      { title: "Take seat-level order", desc: "Waitstaff capture food choices, drink modifiers, and allergies directly tied to seat numbers.", icon: Smartphone },
      { title: "Fire course sequence", desc: "Starters fire immediately while entrees remain on hold until the server signals the KDS.", icon: ChefHat },
      { title: "Track table duration", desc: "Visual table timers alert servers when drinks run dry or courses exceed prep targets.", icon: Timer },
      { title: "Split & settle check", desc: "Guests split the check by seat or percentage; payments process tableside on mobile tablets.", icon: CreditCard },
      { title: "Bussing & table reset", desc: "Bus staff mark table clean, notifying the host stand that the table is ready for reseating.", icon: Check },
    ],
    useCaseTitle: "Hospitality setups it elevates",
    useCaseDesc:
      "Tailored for dining concepts where floor organization directly impacts guest satisfaction and table turnover.",
    useCases: [
      { title: "Full-service bistros", desc: "Coordinate multiple courses, wine pairings, and attentive server service.", icon: Utensils },
      { title: "Multi-level dining halls", desc: "Manage main dining, mezzanine seating, outdoor garden patios, and bar lounges.", icon: Store },
      { title: "Brewpubs & sports bars", desc: "Transfer guest tabs seamlessly between high-top bar tables and dining booths.", icon: Flame },
      { title: "Hotel restaurants", desc: "Route room bill charges, banquet bookings, and walk-in breakfast seatings.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Can we create custom layouts for outdoor patios and private dining rooms?",
        answer:
          "Yes. You can build separate floor tabs for multiple dining rooms, patio decks, rooftop bars, and private banquet spaces with custom table shapes and numbers.",
      },
      {
        question: "How does course pacing work with the kitchen?",
        answer:
          "Servers can enter the full order upfront and mark items as 'Hold'. When guests finish starters, a single tap fires the main course to kitchen KDS screens.",
      },
      {
        question: "Can waitstaff split a check by seat or custom percentage?",
        answer:
          "Yes. Checks can be split by guest seat, divided equally across 2 to 10 credit cards, or split by individual drinks and shared appetizer items in seconds.",
      },
      {
        question: "Does it show how long guests have been seated?",
        answer:
          "Yes. Tables feature color-coded elapsed time rings (e.g. green < 30 min, yellow 30-60 min, red > 75 min) so managers can spot delayed service or impending turns.",
      },
    ],
    relatedFeatures: [
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
      { title: "Offline Standalone Register POS", slug: "offline-registers" },
    ],
  },
  "online-ordering": {
    slug: "online-ordering",
    title: "Direct Online Ordering Portal",
    tagline: "Branded commission-free web ordering for pickup & delivery.",
    desc:
      "Launch a branded ordering website that keeps pickup, delivery, menu availability, customer checkout, and kitchen routing connected to the same POS operation. Customers order directly from your business while staff manage every order from one workflow.",
    benefits: [
      "Commission-free direct customer orders",
      "Live menu, modifier, and availability sync",
      "Pickup, delivery, scheduled, and curbside flows",
      "Order status updates connected to POS and KDS",
    ],
    techSpec:
      "Responsive web ordering portal with server-rendered menus, secure checkout handoff, POS order injection, KDS routing, availability sync, customer status messaging, and fulfillment channel rules.",
    visual: {
      imageSrc: "/images/ent_omnichannel_bundle.png",
      imageAlt: "Branded online ordering portal connected to POS workflows",
      topBadge: "Direct ordering",
      bottomBadge: "Website, POS and kitchen connected",
    },
    workflowVisual: {
      imageSrc: "/images/rest_qr_table_bundle.png",
      imageAlt: "Direct online web ordering checkout and kitchen ticket inject",
      topBadge: "Zero Marketplace Commissions",
      bottomBadge: "Direct Kitchen Inject",
    },
    primaryCta: { label: "Launch Ordering", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Everything direct online ordering needs",
    overviewDesc:
      "The portal gives customers a polished ordering journey while operators keep menu control, prep routing, payments, and handoff status inside the Quantix platform.",
    capabilities: [
      { title: "Branded storefront", desc: "Publish a customer-facing menu experience with your logo, categories, item photos, and brand tone.", icon: Globe2 },
      { title: "Menu availability", desc: "Keep sold-out items, prices, tax, modifiers, and channel-specific menus aligned with POS rules.", icon: Cloud },
      { title: "Pickup and delivery", desc: "Support pickup windows, delivery zones, curbside notes, and scheduled order timing.", icon: ShoppingBag },
      { title: "Secure checkout", desc: "Connect online payment status, cash-on-pickup rules, discounts, and order confirmation.", icon: CreditCard },
      { title: "Kitchen routing", desc: "Send paid or confirmed orders into prep stations, counter queues, and expo workflows.", icon: ChefHat },
      { title: "Customer updates", desc: "Keep customers informed with order status, pickup references, and delivery handoff cues.", icon: Smartphone },
    ],
    workflowTitle: "From customer checkout to kitchen prep",
    workflowDesc:
      "Every order moves through a clear operating path: menu selection, checkout, POS capture, kitchen routing, preparation status, and customer handoff.",
    workflowItems: [
      { title: "Menu publish", desc: "Operators control categories, images, pricing, modifiers, prep notes, and availability.", icon: Layout },
      { title: "Order capture", desc: "Customer orders arrive with channel, timing, payment, contact, and fulfillment details.", icon: ReceiptText },
      { title: "POS validation", desc: "Orders can follow tax, discount, payment, branch, and service rules before preparation.", icon: ShieldCheck },
      { title: "Kitchen dispatch", desc: "Items route to KDS stations or printers based on prep area and order type.", icon: Monitor },
      { title: "Status updates", desc: "Teams can update accepted, preparing, ready, dispatched, and completed states.", icon: Timer },
      { title: "Repeat ordering", desc: "Customer details and history help support faster reorder and loyalty journeys.", icon: Sparkles },
    ],
    useCaseTitle: "Ordering flows it supports",
    useCaseDesc:
      "Use the portal for customer journeys that need a professional digital menu and a dependable back-of-house handoff.",
    useCases: [
      { title: "Restaurant pickup", desc: "Let guests order ahead while prep teams receive kitchen-ready tickets.", icon: Utensils },
      { title: "Cafe pre-orders", desc: "Handle busy morning pickup windows with clear timing and item modifiers.", icon: Store },
      { title: "Local delivery", desc: "Route delivery orders into dispatch workflows without manual phone entry.", icon: Smartphone },
      { title: "Cloud kitchens", desc: "Operate multiple menus and brands through controlled online ordering channels.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Can online orders go directly into POS?",
        answer:
          "Yes. Direct orders can be captured into POS workflows and routed to kitchen displays or printers based on branch and order type.",
      },
      {
        question: "Can menus show live availability?",
        answer:
          "Yes. Item availability, modifiers, pricing, categories, and channel-specific rules can stay aligned with POS menu controls.",
      },
      {
        question: "Does it work well on mobile?",
        answer:
          "Yes. The ordering flow is designed for responsive mobile browsers so customers do not need to install an app.",
      },
      {
        question: "Can it support pickup and delivery together?",
        answer:
          "Yes. Pickup, delivery, scheduled orders, curbside notes, and handoff status can be managed from the same ordering workflow.",
      },
    ],
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
      imageSrc: "/images/ent_qsr_kiosk_bundle.png",
      imageAlt: "Self-service kiosk ordering workflow connected to POS and kitchen display",
      topBadge: "Guest Self-Ordering",
      bottomBadge: "Connected POS + KDS",
    },
    workflowVisual: {
      imageSrc: "/images/nav_retail_bundle.png",
      imageAlt: "Touchscreen self-checkout kiosk station and receipt printer",
      topBadge: "Guided Modifier Flow",
      bottomBadge: "Direct Kitchen Dispatch",
    },
    primaryCta: { label: "Start Kiosk Setup", href: "/contact/sales" },
    secondaryCta: { label: "Explore Retail POS", href: "/solutions#retail-pos" },
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
          "Yes. The workflow can connect kiosk checkout with card terminal payment status and thermal receipt printing where terminals are configured.",
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
      "Let guests scan a table QR code, browse a mobile-first menu, add modifiers, place orders, request service, and pay from their own browser. Staff keep table context, order routing, kitchen prep, and payment status inside Quantix.",
    benefits: [
      "No app install required for guests",
      "Table-aware order routing to POS and KDS",
      "Digital payment, tips, and split-check support",
      "Live menu changes without reprinting table cards",
    ],
    techSpec:
      "Tokenized table sessions with browser-based ordering, menu availability sync, table mapping, secure checkout handoff, POS order creation, KDS routing, and staff service alerts.",
    visual: {
      imageSrc: "/images/rest_qr_table_bundle.png",
      imageAlt: "Tableside QR ordering mobile workflow",
      topBadge: "Scan to order",
      bottomBadge: "Table session connected to POS",
    },
    workflowVisual: {
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: "Tableside QR code ordering and instant bill pay",
      topBadge: "Tableside Scan & Pay",
      bottomBadge: "Instant Table Ticket",
    },
    primaryCta: { label: "Enable QR Ordering", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "A smoother table ordering experience",
    overviewDesc:
      "QR ordering should reduce friction without removing service control. Guests get speed, while teams keep table context, prep routing, and payment visibility.",
    capabilities: [
      { title: "Table QR sessions", desc: "Map QR codes to tables, areas, branches, and service modes for accurate order context.", icon: QrCode },
      { title: "Mobile menu browsing", desc: "Show categories, item details, photos, add-ons, and live availability clearly on phones.", icon: Smartphone },
      { title: "Modifier guidance", desc: "Collect sizes, add-ons, spice levels, allergies, notes, and required choices before submit.", icon: Layout },
      { title: "KDS ticket flow", desc: "Route confirmed table orders to prep stations with table numbers and guest notes.", icon: ChefHat },
      { title: "Pay at table", desc: "Support digital checkout, tips, payment confirmation, and split-check friendly handoff.", icon: CreditCard },
      { title: "Staff visibility", desc: "Keep servers aware of new orders, service requests, ready items, and payment state.", icon: Monitor },
    ],
    workflowTitle: "Designed for dine-in service rhythm",
    workflowDesc:
      "The table session remains connected from scan to checkout so front-of-house and kitchen teams do not lose order context.",
    workflowItems: [
      { title: "Scan and identify table", desc: "Guests open the correct table menu with branch, table, and service mode attached.", icon: QrCode },
      { title: "Build the order", desc: "Menus guide guests through variants, modifiers, notes, and availability rules.", icon: Smartphone },
      { title: "Send to POS", desc: "Orders become trackable POS tickets with table, seat, payment, and prep details.", icon: ReceiptText },
      { title: "Route to kitchen", desc: "Food and drink items can route to separate prep stations, printers, or displays.", icon: Monitor },
      { title: "Update service status", desc: "Servers can watch ready, served, canceled, and payment states from the floor.", icon: Timer },
      { title: "Close the check", desc: "Guests can pay digitally or staff can close the bill from the POS terminal.", icon: CreditCard },
    ],
    useCaseTitle: "Where QR ordering works best",
    useCaseDesc:
      "Use QR ordering in dining moments where speed, accuracy, and table context matter together.",
    useCases: [
      { title: "Casual dining", desc: "Let guests reorder drinks, sides, and desserts without waiting for a server.", icon: Utensils },
      { title: "Busy cafes", desc: "Reduce counter pressure while keeping orders connected to pickup and table service.", icon: Store },
      { title: "Food courts", desc: "Let guests order from table or zone QR codes with clear pickup references.", icon: ShoppingBag },
      { title: "Hotel dining", desc: "Support room, patio, poolside, or table-based ordering through the same mobile flow.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Do guests need to install an app?",
        answer:
          "No. QR ordering runs in the mobile browser, so guests can scan, order, and pay without downloading an app.",
      },
      {
        question: "Can each QR code be tied to a table?",
        answer:
          "Yes. QR sessions can carry table, area, branch, and service context so orders reach the correct workflow.",
      },
      {
        question: "Can QR orders go to the kitchen display?",
        answer:
          "Yes. Confirmed table orders can route to KDS stations or printers with table numbers and modifiers included.",
      },
      {
        question: "Can guests pay at the table?",
        answer:
          "Yes. QR ordering can support digital checkout, tips, payment confirmation, and staff-assisted closeout.",
      },
    ],
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
      "Replace fragile paper tickets with station-based kitchen screens that organize dine-in, QR, kiosk, online, and delivery orders in real time. Prep teams see the right items, timers, modifiers, and ready status without chasing front-of-house notes.",
    benefits: [
      "Station routing for grill, bar, prep, and expo",
      "Color-coded prep timers and bump flows",
      "Modifier, allergen, and course visibility",
      "Ready-status sync back to service teams",
    ],
    techSpec:
      "Low-latency order event stream with station routing rules, prep timers, ticket bump states, local network fallback, role-specific displays, and POS/KDS status synchronization.",
    visual: {
      imageSrc: "/images/rest_ghost_kitchen_bundle.png",
      imageAlt: "Kitchen display system station workflow in commercial kitchen",
      topBadge: "Live kitchen routing",
      bottomBadge: "Prep stations and expo aligned",
    },
    workflowVisual: {
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: "Commercial kitchen display system active station tickets and bump workflow",
      topBadge: "Active Station Prep",
      bottomBadge: "Zero Lost Paper Tickets",
    },
    primaryCta: { label: "Plan KDS Setup", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Built for real kitchen pressure",
    overviewDesc:
      "KDS gives kitchen teams a clear operating screen for order priority, prep stages, station ownership, and front-of-house coordination.",
    capabilities: [
      { title: "Station routing", desc: "Send food, drink, dessert, and prep items to the right station automatically.", icon: ChefHat },
      { title: "Prep timers", desc: "Track ticket age, urgency, and service timing with color-coded visual states.", icon: Timer },
      { title: "Modifier clarity", desc: "Show add-ons, notes, allergies, substitutions, and course details with every item.", icon: Layout },
      { title: "Bump controls", desc: "Move tickets through preparing, ready, served, delayed, and completed states.", icon: Monitor },
      { title: "FOH status sync", desc: "Keep cashiers and servers updated when items are accepted, delayed, or ready.", icon: Cloud },
      { title: "Printer fallback", desc: "Support thermal tickets where stations still need printed backup or labels.", icon: Printer },
    ],
    workflowTitle: "Orders move cleanly through prep",
    workflowDesc:
      "Every channel can feed the same kitchen rhythm, from order capture to station prep, expo validation, and guest handoff.",
    workflowItems: [
      { title: "Receive tickets", desc: "Dine-in, QR, kiosk, online, and delivery orders arrive in the proper station queue.", icon: ReceiptText },
      { title: "Prioritize prep", desc: "Timers and order type labels help teams identify urgent, delayed, and scheduled items.", icon: Clock },
      { title: "Coordinate stations", desc: "Separate prep areas can work independently while expo sees the combined order.", icon: ChefHat },
      { title: "Bump and notify", desc: "Ready actions update front-of-house and delivery handoff views.", icon: Zap },
      { title: "Track delays", desc: "Teams can surface delayed tickets before they become service problems.", icon: ShieldCheck },
      { title: "Review patterns", desc: "Prep timing and order flow create better visibility for peak-hour decisions.", icon: Database },
    ],
    useCaseTitle: "Kitchen setups it supports",
    useCaseDesc:
      "Use KDS wherever printed tickets slow down communication or multiple order channels create prep confusion.",
    useCases: [
      { title: "Full-service kitchens", desc: "Coordinate courses, tables, expo, modifiers, and server updates.", icon: Utensils },
      { title: "Quick service", desc: "Keep fast-moving counter and kiosk orders organized by prep priority.", icon: Store },
      { title: "Cloud kitchens", desc: "Manage multiple brands and delivery channels from station-based screens.", icon: Cloud },
      { title: "Cafes and bakeries", desc: "Route drinks, bakery items, hot food, and pickup orders to separate stations.", icon: ShoppingBag },
    ],
    faqs: [
      {
        question: "Can orders route to different prep stations?",
        answer:
          "Yes. Items can route to stations such as grill, bar, prep, dessert, or expo based on menu and branch rules.",
      },
      {
        question: "Does KDS replace kitchen printers?",
        answer:
          "It can, but printers can still be used as backup or for labels, receipts, and station-specific workflows.",
      },
      {
        question: "Can front-of-house see ready status?",
        answer:
          "Yes. Bump actions can update POS, table, delivery, and service views so teams know when items are ready.",
      },
      {
        question: "Does it support online and QR orders?",
        answer:
          "Yes. KDS can receive orders from POS, online ordering, QR ordering, kiosk, and delivery workflows.",
      },
    ],
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
      "Bring direct delivery, pickup, curbside, in-house drivers, and partner handoffs into one operational queue. Teams can see order readiness, driver assignment, customer details, payment state, and handoff timing without switching between disconnected tools.",
    benefits: [
      "Unified delivery, pickup, and dispatch queue",
      "Driver assignment and handoff status control",
      "Customer-ready order updates and pickup references",
      "Connected kitchen readiness and fulfillment timing",
    ],
    techSpec:
      "Dispatch workflow layer with POS order state, KDS readiness events, driver assignment fields, delivery zone rules, customer notification triggers, and fulfillment status synchronization.",
    visual: {
      imageSrc: "/images/ent_delivery_dispatch_bundle.png",
      imageAlt: "Delivery dispatch and order handoff workflow",
      topBadge: "Dispatch control",
      bottomBadge: "Orders, drivers and kitchen aligned",
    },
    workflowVisual: {
      imageSrc: "/images/ent_omnichannel_bundle.png",
      imageAlt: "Real-time delivery driver assignment and dispatch hub",
      topBadge: "Driver Dispatch Queue",
      bottomBadge: "Kitchen Readiness Synced",
    },
    primaryCta: { label: "Plan Delivery Flow", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Dispatch built around the restaurant floor",
    overviewDesc:
      "Delivery management keeps fulfillment close to POS and kitchen readiness, so staff know what is accepted, preparing, ready, assigned, and completed.",
    capabilities: [
      { title: "Order queue", desc: "View delivery, pickup, curbside, online, and partner-style orders in one status board.", icon: Layout },
      { title: "Driver assignment", desc: "Assign orders, track handoff ownership, and manage delivery-ready states.", icon: Smartphone },
      { title: "Kitchen readiness", desc: "Connect KDS ready status to dispatch so drivers are not sent too early.", icon: ChefHat },
      { title: "Customer updates", desc: "Send order accepted, preparing, ready, dispatched, and completed signals.", icon: Cloud },
      { title: "Payment visibility", desc: "See paid, unpaid, refund, tip, and cash-on-delivery context at handoff.", icon: CreditCard },
      { title: "Exception handling", desc: "Manage delays, canceled orders, address notes, substitutions, and missed handoffs.", icon: ShieldCheck },
    ],
    workflowTitle: "A cleaner handoff from prep to delivery",
    workflowDesc:
      "Delivery operations depend on timing. Quantix keeps order status, kitchen prep, driver assignment, and customer communication in one path.",
    workflowItems: [
      { title: "Accept order", desc: "Orders enter dispatch with channel, customer, payment, timing, and fulfillment details.", icon: ReceiptText },
      { title: "Prepare items", desc: "Kitchen readiness signals keep dispatch aligned with actual prep progress.", icon: ChefHat },
      { title: "Assign handoff", desc: "Staff can assign a driver, pickup shelf, counter handoff, or curbside process.", icon: Smartphone },
      { title: "Notify customer", desc: "Customers can receive status cues for accepted, ready, dispatched, and completed steps.", icon: Cloud },
      { title: "Close workflow", desc: "Completed orders keep payment, fulfillment, and reporting state connected to POS.", icon: Check },
      { title: "Review performance", desc: "Managers can identify delays, peak windows, missed handoffs, and channel pressure.", icon: Database },
    ],
    useCaseTitle: "Fulfillment modes it supports",
    useCaseDesc:
      "Use delivery management anywhere order handoff needs better timing, assignment, and customer visibility.",
    useCases: [
      { title: "In-house delivery", desc: "Assign drivers and keep delivery orders visible beside kitchen status.", icon: Smartphone },
      { title: "Pickup shelves", desc: "Manage customer pickup references and ready-order organization.", icon: ShoppingBag },
      { title: "Curbside service", desc: "Capture vehicle notes, arrival cues, and handoff status cleanly.", icon: Store },
      { title: "Multi-channel kitchens", desc: "Handle online, QR, kiosk, and delivery orders from one fulfillment queue.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Can delivery orders sync with kitchen readiness?",
        answer:
          "Yes. KDS and prep status can keep dispatch teams aware of when an order is accepted, preparing, ready, or delayed.",
      },
      {
        question: "Can staff assign orders to drivers?",
        answer:
          "Yes. The dispatch flow can support in-house driver assignment and handoff ownership for delivery operations.",
      },
      {
        question: "Does it support pickup and curbside too?",
        answer:
          "Yes. Pickup, curbside, counter handoff, delivery, and scheduled order flows can live in the same fulfillment view.",
      },
      {
        question: "Can customers receive order updates?",
        answer:
          "Yes. Customer status updates can be tied to accepted, preparing, ready, dispatched, and completed order states.",
      },
    ],
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
      "Build customer profiles from real purchase history, then use rewards, offers, gift cards, and targeted campaigns to bring guests back. Loyalty stays connected to POS, online ordering, QR ordering, and customer checkout workflows.",
    benefits: [
      "Customer profiles tied to order history",
      "Points, rewards, coupons, and gift cards",
      "Segmented campaigns for repeat visits",
      "Offer redemption visible at checkout",
    ],
    techSpec:
      "Customer profile and campaign workflow with POS purchase history, reward balance tracking, offer rules, redemption controls, segment filters, and checkout-level loyalty visibility.",
    visual: {
      imageSrc: "/images/rest_loyalty_crm_bundle.png",
      imageAlt: "Marketing and loyalty customer dashboard",
      topBadge: "Customer growth",
      bottomBadge: "Rewards connected to checkout",
    },
    workflowVisual: {
      imageSrc: "/images/nav_payment_bundle.png",
      imageAlt: "Automated customer rewards and checkout coupon redemption",
      topBadge: "Automated Loyalty Rewards",
      bottomBadge: "Redeem at Register",
    },
    primaryCta: { label: "Build Loyalty", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Loyalty that operators can actually use",
    overviewDesc:
      "The marketing layer turns POS activity into useful customer context, then makes rewards and campaigns visible where staff and customers interact.",
    capabilities: [
      { title: "Customer profiles", desc: "Store customer history, order preferences, contact details, and loyalty activity.", icon: Smartphone },
      { title: "Points and rewards", desc: "Create earning, redemption, visit, item, category, and spend-based reward rules.", icon: Sparkles },
      { title: "Coupons and offers", desc: "Run discounts, promos, birthday offers, comeback offers, and limited campaigns.", icon: CreditCard },
      { title: "Gift cards", desc: "Support digital gift card balances, redemption, and customer checkout visibility.", icon: ReceiptText },
      { title: "Segments", desc: "Group customers by order history, frequency, spend, location, and channel.", icon: Database },
      { title: "Checkout redemption", desc: "Keep rewards, coupons, and customer status visible in POS and online flows.", icon: Store },
    ],
    workflowTitle: "From checkout data to repeat visits",
    workflowDesc:
      "Marketing works best when it is connected to real operations: purchase history, channels, staff checkout, customer ordering, and offer redemption.",
    workflowItems: [
      { title: "Capture customer", desc: "Profiles can be created from POS, online ordering, QR ordering, or staff entry.", icon: Smartphone },
      { title: "Track purchases", desc: "Order history informs loyalty balance, customer segments, and campaign eligibility.", icon: ReceiptText },
      { title: "Apply rewards", desc: "Offers and points can appear during checkout for staff or customer-facing flows.", icon: Sparkles },
      { title: "Target campaigns", desc: "Segments help teams reach lapsed customers, VIP guests, and high-value buyers.", icon: Cloud },
      { title: "Control approvals", desc: "Managers can control discount use, offer rules, and redemption boundaries.", icon: ShieldCheck },
      { title: "Measure response", desc: "Campaign and loyalty activity can support repeat-visit and revenue visibility.", icon: Database },
    ],
    useCaseTitle: "Growth programs it supports",
    useCaseDesc:
      "Use loyalty across restaurant, cafe, retail, and multi-location workflows where customer retention matters.",
    useCases: [
      { title: "Restaurant rewards", desc: "Reward repeat visits, favorite items, birthdays, and dining frequency.", icon: Utensils },
      { title: "Cafe subscriptions", desc: "Support coffee cards, breakfast offers, and commuter repeat-order habits.", icon: Store },
      { title: "Retail customer offers", desc: "Use product history and purchase value for personalized promos.", icon: ShoppingBag },
      { title: "Multi-location campaigns", desc: "Run branch-aware offers while keeping brand and approval rules consistent.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Can loyalty work with POS checkout?",
        answer:
          "Yes. Customer rewards, coupons, and redemption context can be visible at POS checkout and connected ordering flows.",
      },
      {
        question: "Can customers earn points from online orders?",
        answer:
          "Yes. Online, QR, and POS orders can contribute to customer history and loyalty balance where configured.",
      },
      {
        question: "Can managers control promotions?",
        answer:
          "Yes. Offer rules can be controlled around dates, branches, channels, items, customer segments, and approval needs.",
      },
      {
        question: "Does it support gift cards?",
        answer:
          "Yes. Digital gift card balance and redemption workflows can be part of the loyalty and checkout setup.",
      },
    ],
    relatedFeatures: [
      { title: "Smart Inventory & Recipe Costing", slug: "smart-inventory" },
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
    ],
  },
  "secure-payments": {
    slug: "secure-payments",
    title: "Secure Payments & PCI-Ready Checkout",
    tagline: "Tokenized payment workflows for POS, online ordering, kiosks, and QR checkout.",
    desc:
      "Keep card-present and digital payment workflows connected to POS without exposing raw card data in the register experience. Quantix payment flows are built around tokenization, controlled refunds, payment status visibility, and secure handoff between checkout channels.",
    benefits: [
      "Tokenized card-present and online payments",
      "Payment status tied to POS tickets",
      "Refund, void, tip, and split-payment controls",
      "Checkout workflows designed for PCI-conscious operations",
    ],
    techSpec:
      "Payment workflow layer using gateway tokenization, TLS-protected checkout handoff, payment status callbacks, refund and void controls, tip capture states, and POS receipt reconciliation.",
    visual: {
      imageSrc: "/images/nav_payment_bundle.png",
      imageAlt: "Secure POS payment terminal and checkout workflow",
      topBadge: "Tokenized checkout",
      bottomBadge: "Payments connected to POS",
    },
    workflowVisual: {
      imageSrc: "/images/ent_global_pos_bundle.png",
      imageAlt: "Integrated card payment terminal with tokenized checkout",
      topBadge: "Card-Present Checkout",
      bottomBadge: "PCI-DSS Tier 1 Ready",
    },
    primaryCta: { label: "Secure Checkout", href: "/contact/sales" },
    secondaryCta: { label: "Explore Retail POS", href: "/solutions#retail-pos" },
    overviewTitle: "Payment control across every channel",
    overviewDesc:
      "Secure payment workflows need clear status, staff controls, customer trust, and reliable reconciliation across POS, online ordering, kiosks, and QR checkout.",
    capabilities: [
      { title: "Card terminal status", desc: "Keep terminal payment progress connected to the current POS ticket.", icon: CreditCard },
      { title: "Online checkout", desc: "Support secure payment handoff for direct web ordering and customer flows.", icon: Globe2 },
      { title: "Refund controls", desc: "Manage refunds, voids, partial refunds, and manager approval boundaries.", icon: ShieldCheck },
      { title: "Tips and splits", desc: "Support gratuity, split payments, partial payments, and receipt clarity.", icon: ReceiptText },
      { title: "Kiosk payments", desc: "Tie self-service checkout confirmation to order release and kitchen routing.", icon: Tablet },
      { title: "Reconciliation", desc: "Keep tender groups, sales totals, payouts, and close-day reports aligned.", icon: Database },
    ],
    workflowTitle: "Checkout status stays visible",
    workflowDesc:
      "Payment flow should never feel mysterious to staff. Quantix keeps status, receipts, refunds, and order release tied together.",
    workflowItems: [
      { title: "Create bill", desc: "POS, online, kiosk, or QR checkout creates a payment-ready ticket.", icon: ReceiptText },
      { title: "Start payment", desc: "The workflow hands payment to terminal or online gateway with the right total.", icon: CreditCard },
      { title: "Confirm status", desc: "Approved, failed, pending, refunded, and voided states remain tied to the order.", icon: Check },
      { title: "Release order", desc: "Kitchen or fulfillment routing can depend on payment confirmation rules.", icon: ChefHat },
      { title: "Print receipt", desc: "Customer and merchant receipts can reflect tender, tax, tip, and refund context.", icon: Printer },
      { title: "Close day", desc: "Tender totals and payment status support cleaner end-of-day reconciliation.", icon: Database },
    ],
    useCaseTitle: "Payment moments it covers",
    useCaseDesc:
      "Use secure payment flows anywhere the order, customer, staff, and reporting need the same payment truth.",
    useCases: [
      { title: "Counter POS", desc: "Fast cashier checkout with card, cash, split, tip, and receipt handling.", icon: Store },
      { title: "Online orders", desc: "Customer checkout for pickup, delivery, and scheduled ordering.", icon: Globe2 },
      { title: "Kiosks and QR", desc: "Self-service payment tied to order release and kitchen routing.", icon: Tablet },
      { title: "Enterprise finance", desc: "Branch-level tender totals and reporting for multi-location teams.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Does Quantix store raw card numbers?",
        answer:
          "No. Payment workflows are designed around secure gateway tokenization rather than storing raw card details inside POS screens.",
      },
      {
        question: "Can payment status control kitchen release?",
        answer:
          "Yes. Kiosk, online, and QR workflows can wait for payment confirmation before sending orders to prep where needed.",
      },
      {
        question: "Can staff handle refunds and voids?",
        answer:
          "Yes. Refunds, voids, partial refunds, and sensitive payment actions can be controlled through permission and approval rules.",
      },
      {
        question: "Can payments support reporting?",
        answer:
          "Yes. Tender groups, payment states, tips, tax, refunds, and close-day totals can support POS reconciliation.",
      },
    ],
    relatedFeatures: [
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
      { title: "Self-Service Kiosk Ordering", slug: "self-service-kiosk" },
    ],
  },
  "owner-app": {
    slug: "owner-app",
    title: "Owner App & Live Business Dashboard",
    tagline: "Mobile visibility for sales, staff, orders, inventory, and branch performance.",
    desc:
      "Give owners and operators a focused mobile dashboard for the numbers and alerts that matter during the day. Track live sales, order pressure, staff actions, branch comparisons, inventory issues, and exceptions without opening the full back office.",
    benefits: [
      "Live sales and order visibility from mobile",
      "Branch, staff, and channel performance snapshots",
      "Inventory, payout, and exception alerts",
      "Owner-friendly dashboard built for quick checks",
    ],
    techSpec:
      "Role-aware owner dashboard with POS event summaries, sales snapshots, branch filters, inventory signals, staff activity, alert rules, and secure mobile session controls.",
    visual: {
      imageSrc: "/images/ent_roi_analytics.png",
      imageAlt: "Owner mobile dashboard for POS operations",
      topBadge: "Owner visibility",
      bottomBadge: "Live sales and alerts",
    },
    workflowVisual: {
      imageSrc: "/images/nav_cloud_bundle_v2.png",
      imageAlt: "Live business KPI telemetry and cashier audit alerts",
      topBadge: "Mobile Business Telemetry",
      bottomBadge: "Shift Audits & Revenue Alerts",
    },
    primaryCta: { label: "Plan Owner App", href: "/contact/sales" },
    secondaryCta: { label: "Explore Cloud POS", href: "/solutions#multi-store-pos" },
    overviewTitle: "What owners can monitor quickly",
    overviewDesc:
      "The owner app is designed for quick, trustworthy visibility instead of deep admin work. It highlights the operating signals owners check repeatedly.",
    capabilities: [
      { title: "Live sales", desc: "Track revenue, orders, average ticket, tender groups, and current trading status.", icon: Smartphone },
      { title: "Branch snapshots", desc: "Compare locations, channels, peak times, and store-level activity.", icon: Store },
      { title: "Order pressure", desc: "See active tickets, kitchen delays, delivery queues, and ready-order volume.", icon: Timer },
      { title: "Inventory alerts", desc: "Surface low stock, wastage signals, fast-moving items, and purchase needs.", icon: Database },
      { title: "Staff activity", desc: "Review clock-ins, discounts, voids, refunds, and sensitive actions.", icon: ShieldCheck },
      { title: "Daily summary", desc: "Give owners quick end-of-day totals, exceptions, and action highlights.", icon: ReceiptText },
    ],
    workflowTitle: "A fast pulse check for operators",
    workflowDesc:
      "The owner app brings together POS, kitchen, inventory, payment, and branch signals so leaders can act before small issues become visible on the floor.",
    workflowItems: [
      { title: "Connect POS events", desc: "Sales, orders, payments, discounts, and refunds flow into owner summaries.", icon: Cloud },
      { title: "Filter by branch", desc: "Owners can inspect one store, a region, or all locations depending on role.", icon: Store },
      { title: "Watch live service", desc: "Active orders, prep delays, queue pressure, and dispatch status remain visible.", icon: Monitor },
      { title: "Receive alerts", desc: "Critical stock, staff, payment, and service exceptions can be highlighted quickly.", icon: Zap },
      { title: "Review close day", desc: "Daily totals, tender groups, tax, refunds, and exception summaries support decisions.", icon: ReceiptText },
      { title: "Protect access", desc: "Role permissions keep owner data scoped to the right locations and dashboards.", icon: ShieldCheck },
    ],
    useCaseTitle: "Owner moments it supports",
    useCaseDesc:
      "Use the owner app for leadership visibility without forcing owners into operational screens during a busy day.",
    useCases: [
      { title: "Single-store owners", desc: "Check today sales, active orders, low stock, and close-day status.", icon: Store },
      { title: "Multi-location teams", desc: "Compare branch performance and identify issues by region or location.", icon: Cloud },
      { title: "Restaurant operators", desc: "See table, kitchen, delivery, and order pressure while away from the floor.", icon: Utensils },
      { title: "Retail leaders", desc: "Track checkout volume, inventory movement, and sensitive cashier actions.", icon: ShoppingBag },
    ],
    faqs: [
      {
        question: "Is the owner app for daily operations or admin setup?",
        answer:
          "It is mainly for mobile visibility: sales, alerts, branch performance, order pressure, inventory signals, and key exceptions.",
      },
      {
        question: "Can it show multiple branches?",
        answer:
          "Yes. Owner dashboards can be scoped by role to one branch, several branches, regions, or a full enterprise view.",
      },
      {
        question: "Can owners see kitchen or delivery delays?",
        answer:
          "Yes. Active order pressure, kitchen status, delivery queue signals, and delayed handoffs can be surfaced.",
      },
      {
        question: "Can access be restricted?",
        answer:
          "Yes. Role permissions can control which dashboards, branches, alerts, and reports a user can access.",
      },
    ],
    relatedFeatures: [
      { title: "Delivery Management & Dispatch Hub", slug: "delivery-management" },
      { title: "Kitchen Display System (KDS)", slug: "kitchen-display" },
    ],
  },
  "menu-boards": {
    slug: "menu-boards",
    title: "Digital Menu Boards",
    tagline: "Live menu displays for counters, cafes, restaurants, and multi-location brands.",
    desc:
      "Turn static menu screens into connected digital boards that reflect categories, pricing, availability, dayparts, combos, and promotions from the POS menu layer. Teams can keep counter displays polished without manually rebuilding slides every time the menu changes.",
    benefits: [
      "Live menu, price, and availability control",
      "Daypart, combo, and promo-ready layouts",
      "Display screens connected to branch menus",
      "Professional counter experience for guests",
    ],
    techSpec:
      "Display-ready menu board workflow with branch menu sync, layout blocks, availability flags, scheduled dayparts, promo groups, image assets, and screen assignment controls.",
    visual: {
      imageSrc: "/images/rest_digital_menu_board.png",
      imageAlt: "Digital menu board display in a cafe counter environment",
      topBadge: "Live menu display",
      bottomBadge: "Prices, promos and availability synced",
    },
    workflowVisual: {
      imageSrc: "/images/rest_qr_table_bundle.png",
      imageAlt: "Digital counter menu board synced to POS catalog",
      topBadge: "Daypart Menu Rotations",
      bottomBadge: "86'd Items Auto-Hidden",
    },
    primaryCta: { label: "Plan Menu Boards", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/solutions#restaurant-pos" },
    overviewTitle: "Display menus that stay operational",
    overviewDesc:
      "Menu boards should look good to guests and remain simple for operators. Quantix connects visual displays to menu and promotion workflows.",
    capabilities: [
      { title: "Branch menu sync", desc: "Show location-specific categories, items, pricing, and out-of-stock states.", icon: Cloud },
      { title: "Daypart scheduling", desc: "Switch breakfast, lunch, dinner, happy hour, and event menus automatically.", icon: Clock },
      { title: "Combo promotion blocks", desc: "Highlight bundles, specials, featured items, and upsell panels.", icon: Sparkles },
      { title: "Screen assignment", desc: "Map displays to counters, cafes, pickup zones, drive-throughs, or branches.", icon: Monitor },
      { title: "Image-led menus", desc: "Use responsive item photography and clean visual hierarchy for guests.", icon: Layout },
      { title: "POS availability", desc: "Hide sold-out items and keep menu changes aligned with operations.", icon: Store },
    ],
    workflowTitle: "Menu updates move from POS to screen",
    workflowDesc:
      "Operators can manage menu content once, then keep displays, online menus, QR menus, and POS items aligned across channels.",
    workflowItems: [
      { title: "Build menu groups", desc: "Organize categories, item names, descriptions, prices, photos, and modifier hints.", icon: Layout },
      { title: "Assign screens", desc: "Choose which branch or counter display should show each menu board layout.", icon: Monitor },
      { title: "Schedule changes", desc: "Daypart and promotion schedules keep screens relevant through the service day.", icon: Clock },
      { title: "Sync availability", desc: "Sold-out or hidden items can be reflected from menu controls.", icon: Cloud },
      { title: "Promote offers", desc: "Feature combos, loyalty offers, seasonal items, and high-margin products.", icon: Sparkles },
      { title: "Support scale", desc: "Multi-location teams can standardize menu boards while allowing branch-specific details.", icon: ShieldCheck },
    ],
    useCaseTitle: "Display setups it supports",
    useCaseDesc:
      "Use menu boards anywhere the guest needs quick visual clarity and the business needs controlled menu updates.",
    useCases: [
      { title: "Cafe counters", desc: "Show drinks, bakery items, combos, and pickup-friendly offers.", icon: Store },
      { title: "Quick service", desc: "Present high-volume menus with dayparts, combos, and item availability.", icon: Utensils },
      { title: "Food courts", desc: "Keep screens readable for queues and quick item decisions.", icon: ShoppingBag },
      { title: "Franchise brands", desc: "Standardize brand menu layouts while supporting branch-specific pricing.", icon: Cloud },
    ],
    faqs: [
      {
        question: "Can menu boards update from POS menus?",
        answer:
          "Yes. Item names, prices, categories, availability, and featured promotions can be connected to the menu layer.",
      },
      {
        question: "Can screens show different menus by time?",
        answer:
          "Yes. Daypart schedules can support breakfast, lunch, dinner, happy hour, and seasonal menu changes.",
      },
      {
        question: "Can one branch have different pricing?",
        answer:
          "Yes. Branch-specific menus, prices, and availability can be supported where the operating model needs it.",
      },
      {
        question: "Can menu boards work with online and QR menus?",
        answer:
          "Yes. They can share the same menu source so displays, online ordering, QR menus, and POS stay aligned.",
      },
    ],
    relatedFeatures: [
      { title: "Direct Online Ordering Portal", slug: "online-ordering" },
      { title: "Customer Loyalty & Marketing Engine", slug: "marketing-loyalty" },
    ],
  },
  "multi-store": {
    slug: "multi-store",
    title: "Multi-Location Cloud HQ & Franchise Command",
    tagline: "Centralized control for menus, regional pricing, staff security, and multi-unit telemetry.",
    desc:
      "Maintain total operational consistency across your entire franchise network. Deploy master catalog rollouts, coordinate store pricing tiers, calculate automated corporate royalties, and enforce granular role-based permissions from a single executive dashboard.",
    benefits: [
      "1-Click master catalog broadcast to 500+ locations in < 2.4s",
      "Automated franchise royalty ledger and remittance accounting",
      "Territory and regional tax/pricing tier management",
      "Granular role-based staff access controls (RBAC)",
    ],
    techSpec:
      "Distributed cloud command matrix with real-time WebSocket telemetry, bi-directional POS synchronization, automated conflict resolution, and enterprise SAML 2.0 / OAuth identity federation.",
    visual: {
      imageSrc: "/images/nav_cloud_bundle_v2.png",
      imageAlt: "Enterprise multi-store cloud management and POS terminal network",
      topBadge: "500+ Franchise Locations",
      bottomBadge: "< 2.4s Global Catalog Sync",
    },
    workflowVisual: {
      imageSrc: "/images/ent_global_pos_bundle.png",
      imageAlt: "Enterprise cloud headquarters multi-unit control matrix and till mesh",
      topBadge: "Autonomous Peer Mesh",
      bottomBadge: "Zero Downtime Till Sync",
    },
    primaryCta: { label: "Schedule HQ Demo", href: "/contact/sales" },
    secondaryCta: { label: "Explore Cloud POS", href: "/solutions#multi-store-pos" },
    overviewTitle: "Scale without operational chaos",
    overviewDesc:
      "Multi-store operations require strict standardization paired with local flexibility. Quantix provides the tools to manage 50 to 500+ locations seamlessly.",
    capabilities: [
      { title: "Master Catalog Rollout", desc: "Push menu items, combos, modifiers, and seasonal campaigns network-wide in seconds.", icon: Cloud },
      { title: "Franchise Royalty Engine", desc: "Auto-reconcile corporate sales percentages, marketing fund fees, and royalties.", icon: Layout },
      { title: "Granular RBAC Security", desc: "Define role permissions, cashier overrides, and multi-level manager refund limits.", icon: ShieldCheck },
      { title: "Regional Pricing Rules", desc: "Set location-specific tax rules, happy hours, and price tiers per territory.", icon: Layout },
      { title: "Store Peer Mesh Till", desc: "Ensure continuous offline billing even during broadband outages with peer sync.", icon: Zap },
      { title: "Consolidated BI Reporting", desc: "View real-time sales velocity, labor ratios, and branch rankings in one view.", icon: Monitor },
    ],
    workflowTitle: "Centralized governance meets store autonomy",
    workflowDesc:
      "HQ manages catalogs, pricing boundaries, and analytics, while branch managers focus on frontline service speed and guest satisfaction.",
    workflowItems: [
      { title: "Catalog updates", desc: "Draft and stage menu changes centrally before scheduling live release.", icon: Layout },
      { title: "Targeted broadcast", desc: "Deploy updates to specific store clusters, franchise territories, or all units.", icon: Cloud },
      { title: "Terminal sync", desc: "Store registers receive updates peer-to-peer without interrupting active billing.", icon: Monitor },
      { title: "Live telemetry", desc: "Sales, transaction volume, and cashier performance flow back to HQ in real time.", icon: Timer },
      { title: "Audit logging", desc: "Track every price override, discount, and manager authorization with timestamps.", icon: ShieldCheck },
      { title: "Automated closing", desc: "End-of-day batches and royalty ledgers reconcile automatically without lag.", icon: ReceiptText },
    ],
    useCaseTitle: "Enterprise networks it powers",
    useCaseDesc:
      "Designed for multi-unit restaurant operators, franchise systems, and regional retail store groups.",
    useCases: [
      { title: "Franchise networks", desc: "Maintain strict brand standards across independent franchisee operators.", icon: Cloud },
      { title: "Corporate restaurant chains", desc: "Standardize recipes, central prep commissaries, and localized menus.", icon: Utensils },
      { title: "Retail conglomerates", desc: "Control multi-tier inventory and barcode pricing across nationwide branches.", icon: ShoppingBag },
      { title: "Stadiums and arenas", desc: "Manage 100+ concession stalls and hawker mobile terminals from one server.", icon: Zap },
    ],
    faqs: [
      {
        question: "How fast do menu changes push to store registers?",
        answer:
          "Updates typically broadcast across hundreds of POS terminals within 2.4 seconds with zero billing interruption.",
      },
      {
        question: "Can individual stores have different prices?",
        answer:
          "Yes. Quantix supports regional pricing tiers, airport concessions, and territory-based tax rules.",
      },
      {
        question: "What happens if a branch loses internet?",
        answer:
          "Stores continue ringing sales normally via local offline till mesh, syncing back to HQ automatically when connection returns.",
      },
    ],
    relatedFeatures: [
      { title: "Real-Time BI Analytics & Telemetry", slug: "bi-analytics" },
      { title: "Enterprise Supply Chain & Replenishment", slug: "supply-chain" },
    ],
  },
  "bi-analytics": {
    slug: "bi-analytics",
    title: "Real-Time BI Analytics & Telemetry",
    tagline: "Live sales telemetry, labor cost ratios, and automated executive dashboards.",
    desc:
      "Turn millions of raw POS register transactions into real-time business intelligence. Monitor hourly sales velocity, store throughput, cashier discount overrides, inventory shrinkage, and margin leakage from any mobile device or executive desktop.",
    benefits: [
      "Sub-second live sales and hourly store throughput velocity",
      "COGS margin tracking and recipe cost audit alerts",
      "Cashier discount, void, and refund audit telemetry",
      "Automated scheduled executive email reports and exports",
    ],
    techSpec:
      "High-throughput event-stream data pipelines delivering live transactional aggregates, customizable SQL data connectors, and direct native bridges to Snowflake, BigQuery, and PowerBI.",
    visual: {
      imageSrc: "/images/ent_bi_analytics_bundle_v2.png",
      imageAlt: "Executive business intelligence telemetry dashboard",
      topBadge: "Real-time Telemetry",
      bottomBadge: "Sub-Second BI Pipelines",
    },
    workflowVisual: {
      imageSrc: "/images/ent_roi_analytics.png",
      imageAlt: "Real-time transactional sales velocity and hourly throughput",
      topBadge: "Live Sales Curves",
      bottomBadge: "Recipe Margin Leakage Audits",
    },
    primaryCta: { label: "Explore BI Analytics", href: "/contact/sales" },
    secondaryCta: { label: "Explore Cloud POS", href: "/solutions#multi-store-pos" },
    overviewTitle: "Complete visibility into operational profitability",
    overviewDesc:
      "Make decisions grounded in live transactional data rather than waiting for month-end accounting reports.",
    capabilities: [
      { title: "Hourly Velocity", desc: "Track sales curves, register volume, and customer ticket sizes across every branch.", icon: Timer },
      { title: "Margin Auditing", desc: "Audit dish and product gross margins dynamically against shifting ingredient costs.", icon: Database },
      { title: "Cashier Telemetry", desc: "Identify unusual refund patterns, excessive voids, and cashier discount behavior.", icon: ShieldCheck },
      { title: "Data Lake Bridges", desc: "Export clean relational transaction data to Snowflake, BigQuery, and PostgreSQL.", icon: Cloud },
      { title: "Labor Cost Sync", desc: "Measure labor spend against live sales revenue to optimize staff scheduling shifts.", icon: Clock },
      { title: "Mobile Executive View", desc: "Monitor multi-unit performance on your phone while away from the office.", icon: Smartphone },
    ],
    workflowTitle: "From store register till to executive insights",
    workflowDesc:
      "Every checkout ring, card swipe, refund, and stock transfer feeds the live analytics engine instantaneously.",
    workflowItems: [
      { title: "Transaction capture", desc: "Tills stream encrypted transaction receipts as they complete.", icon: ReceiptText },
      { title: "Instant aggregation", desc: "Sales, taxes, discounts, and costs aggregate into real-time dashboards.", icon: Database },
      { title: "Anomaly detection", desc: "Automated alerts flag stock shrinkage, unusual voids, and margin dips.", icon: ShieldCheck },
      { title: "Executive view", desc: "Executives see company-wide trends, regional benchmarks, and store rankings.", icon: Monitor },
      { title: "Automated distribution", desc: "Scheduled daily flash reports land in managerial email inboxes automatically.", icon: Cloud },
      { title: "Historical trends", desc: "Compare year-over-year seasonality, campaign lift, and promotional ROI.", icon: Timer },
    ],
    useCaseTitle: "Who relies on Quantix BI",
    useCaseDesc:
      "From single-store operators optimizing shift labor to corporate CFOs managing nationwide store profitability.",
    useCases: [
      { title: "Multi-Unit CFOs", desc: "Monitor consolidated group P&L, sales tax liabilities, and cash balances.", icon: Cloud },
      { title: "Store General Managers", desc: "Track shift targets, hourly cashier speed, and prep turnaround times.", icon: Store },
      { title: "Franchise Operators", desc: "Benchmark store profitability against corporate franchise averages.", icon: Utensils },
      { title: "Inventory Controllers", desc: "Track waste variance, unrecorded shrinkage, and supplier price inflation.", icon: ShoppingBag },
    ],
    faqs: [
      {
        question: "Is the data updated in real time or batched overnight?",
        answer:
          "Data streams continuously in real-time with sub-second latency from active POS registers.",
      },
      {
        question: "Can we export data into our corporate data warehouse?",
        answer:
          "Yes. Quantix provides direct webhooks, REST APIs, and automated nightly CSV/Parquet data lake exports.",
      },
    ],
    relatedFeatures: [
      { title: "Multi-Location Cloud HQ & Franchise Command", slug: "multi-store" },
      { title: "Owner App & Live Business Dashboard", slug: "owner-app" },
    ],
  },
  "supply-chain": {
    slug: "supply-chain",
    title: "Enterprise Supply Chain & Replenishment",
    tagline: "Central warehouse transfers, automated par-level POs, and dock GRN receiving.",
    desc:
      "Connect your store registers directly to central distribution warehouses and commissary kitchens. Automate supplier purchase orders when shelf stock dips below safety par levels, conduct barcode GRN delivery audits at loading docks, and transfer stock seamlessly between regional branches.",
    benefits: [
      "Automated par-level purchase order generation with supplier lead-time buffers",
      "Inter-store stock routing and warehouse-to-branch transfers with digital audit trails",
      "Loading dock GRN barcode receiving audits to prevent inventory shrinkage",
      "Live ingredient depletion and recipe margin costing across all locations",
    ],
    techSpec:
      "Enterprise inventory engine supporting multi-tier warehouses, lot and batch tracking, FIFO cost accounting, automated electronic data interchange (EDI) vendor purchase orders, and inter-branch transit tracking.",
    visual: {
      imageSrc: "/images/ent_supply_chain_bundle.png",
      imageAlt: "Centralized supply chain and inventory replenishment network",
      topBadge: "Central Warehouse Sync",
      bottomBadge: "Automated Par-Level POs",
    },
    workflowVisual: {
      imageSrc: "/images/nav_retail_bundle.png",
      imageAlt: "Warehouse receiving, pallet verification, and branch replenishment",
      topBadge: "Dock Receiving GRN",
      bottomBadge: "Central Commissary Network",
    },
    primaryCta: { label: "Plan Supply Chain Setup", href: "/contact/sales" },
    secondaryCta: { label: "Explore Cloud POS", href: "/solutions#multi-store-pos" },
    overviewTitle: "End-to-end stock control from vendor to till",
    overviewDesc:
      "Stop managing inventory in silos. Unify store shelves, central commissary kitchens, and supplier purchase orders in one automated flow.",
    capabilities: [
      { title: "Automated Par POs", desc: "Trigger reorders automatically when warehouse or branch stock hits safety buffers.", icon: Layout },
      { title: "Inter-Store Transfers", desc: "Transfer goods between branches or commissaries with dual-party approval trails.", icon: Store },
      { title: "Loading Dock GRN", desc: "Verify vendor delivery quantities and invoices with barcode scanners before signoff.", icon: ShieldCheck },
      { title: "Live Ingredient COGS", desc: "Deplete raw inventory down to the gram as orders ring up at the POS.", icon: ChefHat },
      { title: "Lot & Expiry Tracking", desc: "Track batch numbers, expiration dates, and FIFO rotation to minimize spoilage.", icon: Database },
      { title: "Supplier Lead Variance", desc: "Calculate predictive safety stock based on vendor reliability and seasonal spikes.", icon: Timer },
    ],
    workflowTitle: "Clean supply chain flow across all facilities",
    workflowDesc:
      "From vendor purchase orders to warehouse receiving, inter-branch transit, and customer checkout depletion.",
    workflowItems: [
      { title: "Stock monitoring", desc: "POS sales continuously update branch and central warehouse balance sheets.", icon: Database },
      { title: "Auto-PO trigger", desc: "Par levels automatically create supplier purchase orders for manager review.", icon: Layout },
      { title: "Dock verification", desc: "Store receivers scan deliveries to detect supplier shortfalls or damaged goods.", icon: ShieldCheck },
      { title: "Transit routing", desc: "Inter-branch stock transfers generate digital transfer manifests and receipt logs.", icon: Store },
      { title: "Checkout deduction", desc: "Transactions deduct inventory in real time down to the bill of materials.", icon: ReceiptText },
      { title: "Shrinkage audit", desc: "Variance reports compare theoretical stock with physical cycle counts.", icon: Monitor },
    ],
    useCaseTitle: "Supply chain operations it powers",
    useCaseDesc:
      "Built for retail supermarket chains, restaurant commissary kitchens, and regional multi-store groups.",
    useCases: [
      { title: "Central commissary kitchens", desc: "Prep bulk dishes and distribute them to dozens of satellite dining branches.", icon: Utensils },
      { title: "Retail supermarket chains", desc: "Manage centralized warehouse bulk purchases and daily branch replenishment.", icon: ShoppingBag },
      { title: "Franchise networks", desc: "Supply proprietary branded ingredients and packaging to franchisees cleanly.", icon: Cloud },
      { title: "Multi-branch retail", desc: "Rebalance stock between slow and fast-moving store locations dynamically.", icon: Store },
    ],
    faqs: [
      {
        question: "Can purchase orders be sent to vendors automatically?",
        answer:
          "Yes. Purchase orders can be generated automatically and either sent directly to vendors via EDI/email or held for manager approval.",
      },
      {
        question: "Does it support inter-store stock transfers?",
        answer:
          "Yes. Staff can request, dispatch, track transit status, and confirm receipt of items between branches with full digital audit trails.",
      },
    ],
    relatedFeatures: [
      { title: "Smart Inventory & Recipe Costing", slug: "smart-inventory" },
      { title: "Multi-Location Cloud HQ & Franchise Command", slug: "multi-store" },
    ],
  },
};

// Aliases mapping legacy or alternative feature slugs to canonical pages
const SLUG_ALIASES: Record<string, string> = {
  // Core Platform & Navigation Slugs
  "cloud-pos": "offline-registers",
  "enterprise-pos": "multi-store",
  "inventory": "smart-inventory",
  "omnichannel": "online-ordering",
  "analytics": "bi-analytics",
  "mobile-pos": "self-service-kiosk",
  "restaurant-pos": "table-management",
  "retail-pos": "supply-chain",
  "payments": "secure-payments",

  // Specialized Workflows
  "kitchen-kds": "kitchen-display",
  "offline-mesh": "offline-registers",
  "security-sso": "secure-payments",
  "loyalty-crm": "marketing-loyalty",
  "central-menu": "menu-boards",
  "erp-connectors": "multi-store",
  "purchase-orders": "supply-chain",
  "stadium-pos": "multi-store",
  "dual-pricing": "secure-payments",
  "open-api": "multi-store",
  "sla-support": "multi-store",
  "integrations": "multi-store",
  "hardware": "offline-registers",
  "reporting": "bi-analytics",
  "pos": "offline-registers",
  "mobile": "self-service-kiosk",
  "table": "table-management",
  "kitchen": "kitchen-display",
  "kds": "kitchen-display",
};

const motionTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const SoftwareStageFrame: React.FC<{
  imageSrc: string;
  imageAlt: string;
  slug: string;
  topBadge?: string;
  bottomBadge?: string;
  priority?: boolean;
}> = ({ imageSrc, imageAlt, slug, topBadge, bottomBadge, priority = false }) => (
  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-b from-slate-50/90 via-white to-slate-100/60 dark:from-slate-900/90 dark:via-slate-900/50 dark:to-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
    {/* macOS Window Chrome Header */}
    <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 px-3.5 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-rose-500/90" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-amber-400/90" />
        <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/90" />
      </div>

      <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 px-2.5 sm:px-3 py-1 font-mono text-[9px] sm:text-[10px] font-semibold text-slate-600 dark:text-slate-400 max-w-[140px] min-[400px]:max-w-[200px] sm:max-w-xs truncate shadow-2xs">
        <Lock className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
        <span className="truncate">quantix.network/cloud-hq/{slug}</span>
      </div>

      <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="hidden min-[480px]:inline">Mesh Active</span>
      </div>
    </div>

    {/* Stage Image Viewport with Floating Transparent Hardware Cutout */}
    <div className="relative h-64 min-[420px]:h-72 sm:h-84 md:h-96 w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Ambient radial glow behind the transparent cutout hardware */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-4/5 w-4/5 rounded-full bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl" />
      </div>

      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 94vw, 48vw"
        className="object-contain p-2 sm:p-5 drop-shadow-[0_18px_32px_rgba(0,0,0,0.16)] transition-transform duration-700 hover:scale-105"
      />

      {topBadge && (
        <div className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-100 max-w-[75%] sm:max-w-[85%] truncate">
          <Activity className="h-3 w-3 text-emerald-500 animate-pulse shrink-0" />
          <span className="truncate">{topBadge}</span>
        </div>
      )}

      {bottomBadge && (
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-slate-800 shadow-md backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/95 dark:text-slate-100 max-w-[75%] sm:max-w-[85%] truncate">
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate">{bottomBadge}</span>
        </div>
      )}
    </div>
  </div>
);

const CapabilitiesBentoSection: React.FC<{
  title: string;
  description: string;
  items: FeatureCard[];
  eyebrow?: string;
}> = ({ title, description, items, eyebrow = "Enterprise Capabilities" }) => (
  <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-16">
    <div className="site-container">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
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

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...motionTransition, delay: index * 0.05 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 dark:border-slate-800/90 dark:bg-slate-900/80 dark:shadow-none"
            >
              {/* Subtle top glow bar on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/5 text-primary shadow-xs transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                    <Icon className="h-5 w-5 stroke-[2.2]" />
                  </div>
                  <span className="font-mono text-xs font-black text-slate-300 transition-colors group-hover:text-primary/70 dark:text-slate-700">
                    {stepNum}
                  </span>
                </div>

                <h3 className="font-syne text-lg font-black leading-snug text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Enterprise Module
                </span>
                <span className="text-[11px] font-bold text-slate-400 transition-colors group-hover:text-primary">
                  Ready &rarr;
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const WorkflowPipelineSection: React.FC<{ feature: FeatureData; slug: string }> = ({ feature, slug }) => {
  if (!feature.workflowItems?.length) return null;

  const visual = feature.workflowVisual || feature.visual;

  return (
    <section className="border-b border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-950 sm:py-16">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={motionTransition}
            className="space-y-6 lg:col-span-6"
          >
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                <Database className="h-3 w-3 stroke-[2.4]" />
                Connected Workflow Pipeline
              </span>
              <h2 className="max-w-2xl font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
                {feature.workflowTitle}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {feature.workflowDesc}
              </p>
            </div>

            <div className="relative space-y-3 pl-2 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-primary/20 before:to-transparent">
              {feature.workflowItems.map((item, index) => {
                const Icon = item.icon;
                const stepNum = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={item.title}
                    className="relative flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900"
                  >
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-[11px] font-mono font-bold text-white shadow-sm">
                      {stepNum}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        <h4 className="font-syne text-sm font-black text-slate-950 dark:text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.desc}
                      </p>
                    </div>
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
            transition={{ ...motionTransition, delay: 0.1 }}
            className="space-y-4 lg:col-span-6"
          >
            {visual ? (
              <SoftwareStageFrame
                imageSrc={visual.imageSrc}
                imageAlt={visual.imageAlt}
                slug={slug}
                topBadge={visual.topBadge}
                bottomBadge={visual.bottomBadge}
              />
            ) : (
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
                <span className="text-[10px] font-black uppercase tracking-wider text-primary">Technical specs</span>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.techSpec}
                </p>
              </div>
            )}

            {/* Architecture Telemetry Pills */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sync Latency</div>
                <div className="mt-0.5 font-mono text-sm font-black text-slate-950 dark:text-white">&lt; 120ms</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Protocol</div>
                <div className="mt-0.5 font-mono text-sm font-black text-slate-950 dark:text-white">gRPC Mesh</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Availability</div>
                <div className="mt-0.5 font-mono text-sm font-black text-emerald-600 dark:text-emerald-400">99.99%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const UseCasesSection: React.FC<{
  title: string;
  description: string;
  items: FeatureCard[];
}> = ({ title, description, items }) => (
  <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 dark:border-slate-800/80 dark:bg-slate-900/30 sm:py-16">
    <div className="site-container">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
          <Layers className="h-3 w-3 stroke-[2.4]" />
          Industry Deployment
        </span>
        <h2 className="font-syne text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {description}
        </p>
      </div>

      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {items.map((item, index) => {
          const Icon = item.icon;
          const stepNum = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...motionTransition, delay: index * 0.05 }}
              className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800/90 dark:bg-slate-900/80"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                    <Icon className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-600">
                    USE CASE {stepNum}
                  </span>
                </div>

                <h3 className="font-syne text-base font-black leading-snug text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1.5 text-[10px] font-bold text-primary">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified Deployment</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function FeatureDetailPage() {
  const params = useParams();
  const featureSlug = params.featureSlug as string;
  const canonicalSlug = SLUG_ALIASES[featureSlug] || featureSlug;
  const feature = FEATURES_DATA[canonicalSlug] || FEATURES_DATA["multi-store"];

  const heroVisual = feature.visual;

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* ─── 1. Page Hero Header (Using site-wide standard .page-hero-header) ─── */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        {/* Ambient Radial Lighting */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-linear-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />

        <div className="site-container">
          <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[8.5px] font-black uppercase tracking-normal text-slate-400 dark:text-slate-500 sm:mb-6 sm:text-[10px] sm:tracking-wider">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <ChevronRight size={10} />
            <Link href="/features" className="transition-colors hover:text-primary">Features</Link>
            <ChevronRight size={10} />
            <span className="truncate text-primary">{feature.title}</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={motionTransition}
              className="space-y-4 lg:col-span-6"
            >
              <div>
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                  <Sparkles className="h-3 w-3 stroke-[2.4]" />
                  Enterprise Module
                </span>
                <h1 className="max-w-2xl font-syne text-[1.85rem] font-black leading-[1.08] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[2.1rem] sm:text-5xl sm:tracking-tight lg:text-[3.2rem]">
                  {feature.title}
                </h1>
              </div>

              <p className="text-xs font-black uppercase tracking-wider text-primary dark:text-primary-light sm:text-sm">
                {feature.tagline}
              </p>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {feature.desc}
              </p>

              <div className="grid gap-2 pt-1 sm:grid-cols-2">
                {feature.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-xs dark:border-slate-800 dark:bg-slate-900/70"
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
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  {feature.primaryCta && (
                    <Link
                      href={feature.primaryCta.href}
                      className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 font-syne text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:h-12 sm:rounded-full sm:px-7"
                    >
                      {feature.primaryCta.label}
                      <ArrowRight className="h-4 w-4 stroke-[2.6]" />
                    </Link>
                  )}
                  {feature.secondaryCta && (
                    <Link
                      href={feature.secondaryCta.href}
                      className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-syne text-xs font-extrabold uppercase tracking-wider text-slate-900 transition-all duration-200 hover:border-primary/40 hover:text-primary active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:h-12 sm:rounded-full sm:px-7"
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
              transition={{ ...motionTransition, delay: 0.1 }}
              className="lg:col-span-6"
            >
              {heroVisual ? (
                <SoftwareStageFrame
                  imageSrc={heroVisual.imageSrc}
                  imageAlt={heroVisual.imageAlt}
                  slug={canonicalSlug}
                  topBadge={heroVisual.topBadge}
                  bottomBadge={heroVisual.bottomBadge}
                  priority
                />
              ) : (
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 sm:p-8">
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

      {/* ─── 2. Capabilities Bento Grid (No repeated mockups) ─── */}
      {feature.capabilities?.length ? (
        <CapabilitiesBentoSection
          title={feature.overviewTitle ?? "Core feature capabilities"}
          description={feature.overviewDesc ?? feature.desc}
          items={feature.capabilities}
        />
      ) : null}

      {/* ─── 3. Connected Workflow Pipeline ─── */}
      <WorkflowPipelineSection feature={feature} slug={canonicalSlug} />

      {/* ─── 4. Industry Use Cases ─── */}
      {feature.useCases?.length ? (
        <UseCasesSection
          title={feature.useCaseTitle ?? "Enterprise Deployment Matrix"}
          description={feature.useCaseDesc ?? "Architected for high-concurrency enterprise locations and mission-critical multi-brand stores."}
          items={feature.useCases}
        />
      ) : null}

      {/* ─── 5. Technical Telemetry & Security Matrix ─── */}
      <section className="border-t border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-950 sm:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left: Terminal Specs */}
            <div className="rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-200 p-6 shadow-xl dark:border-slate-800 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-400">
                  <Terminal className="h-3.5 w-3.5" />
                  quantix_spec.json
                </span>
                <span className="text-[10px] font-mono text-slate-500">v4.18-RELEASE</span>
              </div>
              <div className="mt-4 space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-500">Architecture</span>
                  <span className="font-semibold text-emerald-400">Edge Mesh + Cloud Sync</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-500">Data Transfer</span>
                  <span className="font-semibold text-slate-200">TLS 1.3 / gRPC WebSockets</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-500">Failover Model</span>
                  <span className="font-semibold text-amber-400">Zero-Drop Local SQLite</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Compliance</span>
                  <span className="font-semibold text-slate-200">SOC2 Type II / PCI-DSS L1</span>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-xs font-medium leading-relaxed text-slate-400">
                {feature.techSpec}
              </div>
            </div>

            {/* Right: Related Features */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <span className="mb-2 inline-block text-[10px] font-black uppercase tracking-wider text-primary">
                  Interconnected Ecosystem
                </span>
                <h3 className="font-syne text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  Explore Complementary Modules
                </h3>
                <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400 sm:text-sm">
                  Every Quantix module shares unified telemetry, realtime audit records, and bi-directional catalog sync.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {feature.relatedFeatures.map((relatedFeature) => (
                  <Link key={relatedFeature.slug} href={`/features/${relatedFeature.slug}`}>
                    <div className="group flex items-center justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900">
                      <span className="text-xs font-bold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                        {relatedFeature.title}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bottom Mini CTA */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Ready to deploy across 10 to 500+ outlets?
                </div>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-syne text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-primary-dark"
                >
                  Schedule Demo
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Frequently Asked Questions (Exact matching Homepage FAQS) ─── */}
      <FAQWrapper />

      {/* ─── 7. Global Conversion CTA Banner ─── */}
      <CTABanner />
    </main>
  );
}
