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
  Globe2,
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

const CARD_IMAGE_BY_KEYWORD: Array<{ keywords: string[]; src: string; alt: string }> = [
  { keywords: ["kitchen", "prep", "recipe", "food", "dining"], src: "/images/kitchen_display_3d.png", alt: "Restaurant kitchen workflow" },
  { keywords: ["order", "ordering", "checkout", "customer", "guest", "pickup", "delivery"], src: "/images/online_ordering_3d.png", alt: "Connected ordering workflow" },
  { keywords: ["table", "floor", "cafe", "restaurant"], src: "/images/hero-restaurant.jpg", alt: "Restaurant service floor" },
  { keywords: ["stock", "inventory", "supplier", "catalog", "product", "barcode", "shelf"], src: "/images/inventory_sync_3d.png", alt: "Inventory and catalog workflow" },
  { keywords: ["mobile", "handheld", "app", "portal"], src: "/images/mobile_app_3d.png", alt: "Mobile POS workflow" },
  { keywords: ["payment", "bill", "cash", "refund", "discount", "loyalty", "reward"], src: "/images/pos_counter_3d.png", alt: "POS checkout workflow" },
];

const getCardImage = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  return CARD_IMAGE_BY_KEYWORD.find(({ keywords }) => keywords.some((keyword) => normalizedTitle.includes(keyword))) ?? {
    src: "/images/demo-thumb-ai.png",
    alt: "Quantix platform workflow",
  };
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
      imageSrc: "/images/online_ordering_3d.png",
      imageAlt: "Branded online ordering portal connected to POS workflows",
      topBadge: "Direct ordering",
      bottomBadge: "Website, POS and kitchen connected",
    },
    primaryCta: { label: "Launch Ordering", href: "/contact/sales" },
    secondaryCta: { label: "View Website Platform", href: "/products/websites" },
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
      imageSrc: "/images/mobile_app_3d.png",
      imageAlt: "Tableside QR ordering mobile workflow",
      topBadge: "Scan to order",
      bottomBadge: "Table session connected to POS",
    },
    primaryCta: { label: "Enable QR Ordering", href: "/contact/sales" },
    secondaryCta: { label: "Explore Table POS", href: "/products/restaurant-pos" },
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
      imageSrc: "/images/kitchen_display_3d.png",
      imageAlt: "Kitchen display system station workflow",
      topBadge: "Live kitchen routing",
      bottomBadge: "Prep stations and expo aligned",
    },
    primaryCta: { label: "Plan KDS Setup", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/products/restaurant-pos" },
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
      imageSrc: "/images/hero-local.png",
      imageAlt: "Delivery dispatch and order handoff workflow",
      topBadge: "Dispatch control",
      bottomBadge: "Orders, drivers and kitchen aligned",
    },
    primaryCta: { label: "Plan Delivery Flow", href: "/contact/sales" },
    secondaryCta: { label: "View Online Ordering", href: "/products/websites" },
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
      imageSrc: "/images/demo-thumb-ai.png",
      imageAlt: "Marketing and loyalty customer dashboard",
      topBadge: "Customer growth",
      bottomBadge: "Rewards connected to checkout",
    },
    primaryCta: { label: "Build Loyalty", href: "/contact/sales" },
    secondaryCta: { label: "Explore Online Ordering", href: "/products/websites" },
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
      imageSrc: "/images/demo-thumb.jpg",
      imageAlt: "Secure POS payment terminal and checkout workflow",
      topBadge: "Tokenized checkout",
      bottomBadge: "Payments connected to POS",
    },
    primaryCta: { label: "Secure Checkout", href: "/contact/sales" },
    secondaryCta: { label: "PCI Details", href: "/pci" },
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
      imageSrc: "/images/mobile_app_3d.png",
      imageAlt: "Owner mobile dashboard for POS operations",
      topBadge: "Owner visibility",
      bottomBadge: "Live sales and alerts",
    },
    primaryCta: { label: "Plan Owner App", href: "/contact/sales" },
    secondaryCta: { label: "View Enterprise POS", href: "/products/enterprise-pos" },
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
      imageSrc: "/images/hero-cafe.jpg",
      imageAlt: "Digital menu board display in a cafe counter environment",
      topBadge: "Live menu display",
      bottomBadge: "Prices, promos and availability synced",
    },
    primaryCta: { label: "Plan Menu Boards", href: "/contact/sales" },
    secondaryCta: { label: "Explore Restaurant POS", href: "/products/restaurant-pos" },
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
  <section className="border-b border-slate-200/80 bg-slate-50/70 py-5 dark:border-slate-800/80 dark:bg-slate-900/45 sm:py-8">
    <div className="site-container">
      <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-7">
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

      <div className="grid auto-rows-fr grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          const image = getCardImage(item.title);

          return (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-70px" }}
              transition={{ ...motionTransition, delay: index * 0.04 }}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-slate-200/70 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none"
            >
              <div className="relative aspect-[16/8] overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/5 to-transparent" />
                <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
                  <Icon className="h-3 w-3 text-primary" />
                  Quantix workflow
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:text-primary-light">
                  <Icon className="h-4 w-4 stroke-[2.4]" />
                </div>
                <h3 className="font-syne text-base font-black leading-tight text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                  {item.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-3 text-[9px] font-black uppercase tracking-wider text-primary/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Connected operations
                </div>
              </div>
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
    <section className="border-b border-slate-200/80 bg-white py-5 dark:border-slate-800/80 dark:bg-slate-950 sm:py-8">
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
                    className="flex h-full items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 sm:gap-3 sm:p-3.5"
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
                    src={visual.imageSrc}
                    alt={visual.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 44vw"
                    className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                  />
                </div>
                <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {visual.topBadge}
                </div>
                <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                  <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                  {visual.bottomBadge}
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

    <main className="min-h-screen bg-white pt-[5.75rem] text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:pt-24">
        <section className="border-b border-slate-200/80 bg-white py-5 dark:border-slate-800/80 dark:bg-slate-950 sm:py-8 lg:py-10">
          <div className="site-container">
            <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[8.5px] font-black uppercase tracking-normal text-slate-400 dark:text-slate-500 sm:mb-6 sm:text-[10px] sm:tracking-wider">
              <Link href="/" className="transition-colors hover:text-primary">Home</Link>
              <ChevronRight size={10} />
              <Link href="/features" className="transition-colors hover:text-primary">Features</Link>
              <ChevronRight size={10} />
              <span className="truncate text-primary">{feature.title}</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10 xl:gap-12">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={motionTransition}
                className="space-y-3.5 lg:col-span-6"
              >
                <div>
                  <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light">
                    <Sparkles className="h-3 w-3 stroke-[2.4]" />
                    Feature breakdown
                  </span>
                  <h1 className="max-w-2xl font-syne text-[1.72rem] font-black leading-[1.05] tracking-normal text-slate-950 dark:text-white min-[380px]:text-[1.95rem] sm:text-5xl sm:tracking-tight lg:text-[3.2rem]">
                    {feature.title}
                  </h1>
                </div>

                <p className="text-[10px] font-black uppercase tracking-wider text-primary dark:text-primary-light sm:text-sm">
                  {feature.tagline}
                </p>
                <p className="max-w-xl text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                  {feature.desc}
                </p>

                <div className="grid gap-2 pt-0.5 sm:grid-cols-2">
                  {feature.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 shadow-xs dark:border-slate-800 dark:bg-slate-900/70 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5"
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
                        className="inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-2.5 font-syne text-[9px] font-extrabold uppercase tracking-normal text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary-dark active:scale-95 sm:h-12 sm:flex-none sm:gap-2.5 sm:rounded-full sm:px-6 sm:text-xs sm:tracking-wider"
                      >
                        {feature.primaryCta.label}
                        <ArrowRight className="h-4 w-4 stroke-[2.6]" />
                      </Link>
                    )}
                    {feature.secondaryCta && (
                      <Link
                        href={feature.secondaryCta.href}
                        className="inline-flex h-10 min-w-0 flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-2.5 font-syne text-[9px] font-extrabold uppercase tracking-normal text-slate-900 transition-all duration-200 hover:border-primary/40 hover:text-primary active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:h-12 sm:flex-none sm:rounded-full sm:px-6 sm:text-xs sm:tracking-wider"
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
                  <div className="group/image relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800/90 dark:bg-slate-900/70 dark:shadow-none sm:rounded-2xl sm:p-2 sm:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-50 dark:bg-slate-950 min-[430px]:aspect-[16/11] sm:rounded-xl sm:aspect-[16/10]">
                      <Image
                        src={heroVisual.imageSrc}
                        alt={heroVisual.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 92vw, 44vw"
                        className="object-cover transition-transform duration-700 group-hover/image:scale-[1.03]"
                      />
                    </div>
                    <div className="absolute right-2 top-2 z-20 inline-flex max-w-[74%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8px] font-extrabold uppercase tracking-normal text-slate-800 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 sm:right-4 sm:top-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {heroVisual.topBadge}
                    </div>
                    <div className="absolute bottom-2 left-2 z-20 inline-flex max-w-[78%] items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2 py-1 text-[8.5px] font-extrabold leading-none text-slate-700 shadow-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-200 sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-[11px]">
                      <ShieldCheck className="h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
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
                  {feature.title} FAQs
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
