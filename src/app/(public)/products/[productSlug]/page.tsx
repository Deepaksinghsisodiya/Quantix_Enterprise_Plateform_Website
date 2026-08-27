import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Banknote,
  Calculator,
  ChefHat,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CreditCard,
  Globe2,
  Monitor,
  Printer,
  QrCode,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Timer,
  Tv,
  Store,
  Utensils,
  Cloud,
  Wrench,
  Coffee,
  Layers,
  LineChart,
  Truck,
  Users,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import FAQSection from "@/features/FAQ/FAQSection";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import { MotionPanel } from "@/components/atoms/MotionPanel";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";

type ProductPoint = {
  title: string;
  desc: string;
};

type IncludedWorkflow = {
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt?: string;
  points?: ProductPoint[];
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
      { title: "Takeout", desc: "Fast counter orders for packed meals and quick handoff.", icon: Store },
      { title: "QR table ordering", desc: "Guests order from table QR menus without app installs.", icon: QrCode },
      { title: "Online ordering", desc: "Branded web orders routed into POS and KDS.", icon: Globe2 },
    ],
    billingCheckout: [
      { title: "Guest receipt printing", desc: "Print table receipts, reprint guest bills, and counter invoices.", icon: ReceiptText },
      { title: "Kitchen ticket printing", desc: "Route prep tickets to kitchen, bar, grill, and expo printers.", icon: Printer },
      { title: "Dining cash drawer", desc: "Track server and cashier cash payments, shifts, and close-out totals.", icon: Banknote },
      { title: "Table card terminal", desc: "Keep terminal payment status tied to each table or split check.", icon: CreditCard },
      { title: "Tax, tips & service charge", desc: "Apply tax, tips, service charges, discounts, and bill adjustments.", icon: Calculator },
    ],
    advancedControls: [
      { title: "Offline billing mode", desc: "Keep dine-in tables, counter orders, and receipts moving during outages.", icon: Cloud },
      { title: "Customer display screen", desc: "Show table items, tips, service charge, tax, totals, and payment status.", icon: Monitor },
      { title: "Void/refund approvals", desc: "Control voids, refunds, discounts, and manager approval logs.", icon: RotateCcw },
      { title: "Kitchen prep timers", desc: "Track ticket age, prep time, bump actions, and station readiness.", icon: Timer },
    ],
    workflows: [
      {
        title: "Table management",
        desc: "Interactive floor layouts, table status, course pacing, and split checks.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Interactive table layout and floor management system",
        points: [
          { title: "Visual Floor Status", desc: "Create floor sections, assign table status, and keep servers aligned on active, seated, and ready-to-clear tables." },
          { title: "Split Bill Workflows", desc: "Support split checks, course pacing, modifiers, and visual service flow from one restaurant-ready workspace." },
          { title: "FOH Coordination", desc: "Give managers a cleaner view of table movement so dining-room decisions do not depend on manual notes." }
        ]
      },
      {
        title: "Kitchen display system",
        desc: "Station-based prep tickets for grill, bar, assembly, and expo screens.",
        imageSrc: "/images/ent_global_pos_bundle.png",
        imageAlt: "Kitchen display system KDS screens for prep stations",
        points: [
          { title: "Station Ticket Routing", desc: "Route orders to prep stations such as grill, bar, assembly, and expo without relying on printed tickets." },
          { title: "Live Order Modifiers", desc: "Keep kitchen teams aware of item modifiers, ticket timing, and order status as service volume changes." },
          { title: "Order Status Sync", desc: "Help front-of-house teams see when items are being prepared, completed, or ready for handoff." }
        ]
      },
      {
        title: "Direct online ordering",
        desc: "Direct branded ordering with pickup and delivery routing.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        imageAlt: "Direct online restaurant web ordering storefront",
        points: [
          { title: "Branded Direct Sales", desc: "Publish branded ordering flows for pickup and delivery so customers can order directly from your business." },
          { title: "Connected POS Queue", desc: "Send customer orders into the connected POS and kitchen workflow instead of creating a separate manual queue." },
          { title: "Live Menu Controls", desc: "Keep menu availability, ordering channels, and fulfillment steps closer to the live restaurant operation." }
        ]
      },
      {
        title: "QR code ordering",
        desc: "Guest self-ordering from table QR codes without installing an app.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        imageAlt: "QR code table ordering and digital restaurant menu",
        points: [
          { title: "Mobile Guest Ordering", desc: "Let guests browse menus and place table orders from their phone without installing a separate application." },
          { title: "Tableside Efficiency", desc: "Connect self-ordering with table service so staff can focus on service quality and order accuracy." },
          { title: "Dynamic Modifiers Support", desc: "Support quick updates to menu items, modifiers, and availability for high-change restaurant operations." }
        ]
      },
      {
        title: "Menu & modifier management",
        desc: "Control items, add-ons, variants, combos, spice levels, and availability.",
        imageSrc: "/images/ent_cafe_bakery_bundle.png",
        imageAlt: "Menu management and item modifier editor",
        points: [
          { title: "Flexible Item Options", desc: "Manage menu items, variants, add-ons, spice levels, combo meals, prep notes, and availability from one control layer." },
          { title: "Station-Specific Modifiers", desc: "Keep modifiers attached to the right kitchen station so custom orders do not turn into verbal instructions." },
          { title: "Zero-Downtime Menu Updates", desc: "Support item changes, happy-hour pricing, out-of-stock states, and menu updates without rebuilding the workflow." }
        ]
      },
      {
        title: "Payments & split bills",
        desc: "Close checks with tips, discounts, partial payments, and split-bill workflows.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Restaurant payment checkout and bill splitting screen",
        points: [
          { title: "Custom Bill Splitting", desc: "Handle split checks by item, seat, table, or custom amount for dining-room and group-order scenarios." },
          { title: "Tips & Taxes Sync", desc: "Support tips, discounts, refunds, service charges, tax handling, and partial payment workflows around the same bill." },
          { title: "Register Reconciliation", desc: "Keep payment actions connected to the POS ticket so cashiers and servers can close checks cleanly." }
        ]
      },
      {
        title: "Staff & shift controls",
        desc: "Manage role permissions, shift handovers, drawer accountability, and team activity.",
        imageSrc: "/images/ent_franchise_portal.png",
        imageAlt: "Restaurant staff and shift control dashboard",
        points: [
          { title: "Role Permission Matrices", desc: "Control server, cashier, kitchen, and manager permissions so each role sees the actions they actually need." },
          { title: "Work Shift Handover", desc: "Track clock-in, clock-out, shift handover, drawer accountability, and end-of-day operating reports." },
          { title: "FOH Performance Signals", desc: "Give managers better visibility into staff performance, table coverage, and exception actions during service." }
        ]
      },
      {
        title: "Inventory & recipe costing",
        desc: "Connect recipe ingredients, stock deduction, wastage, and margin visibility.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        imageAlt: "Restaurant recipe costing and inventory sync dashboard",
        points: [
          { title: "Raw Ingredient Mapping", desc: "Connect menu items to ingredient usage, recipe cost, stock deduction, wastage, and low-stock alerts." },
          { title: "Plate Margin Analysis", desc: "Help kitchens understand ingredient movement and margin impact across dine-in, takeout, and online orders." },
          { title: "Dynamic Stock Reordering", desc: "Support more accurate purchasing decisions by tying restaurant sales back to raw inventory consumption." }
        ]
      },
      {
        title: "Reservations & waitlist",
        desc: "Coordinate bookings, walk-ins, queue status, seating, and table handoff.",
        imageSrc: "/images/ent_fine_dining_bundle.png",
        imageAlt: "Restaurant reservations and waitlist workflow",
        points: [
          { title: "Interactive Reservations", desc: "Manage bookings, walk-ins, guest queue status, seating preferences, and wait-time communication from one workflow." },
          { title: "Floor Availability Sync", desc: "Help hosts coordinate table availability with actual floor status instead of disconnected reservation notes." },
          { title: "Front-of-House Handoff", desc: "Support smoother handoff between reservations, seating, table service, and dining-room operations." }
        ]
      },
      {
        title: "Restaurant analytics",
        desc: "Track table turns, item sales, staff performance, voids, discounts, and peak hours.",
        imageSrc: "/images/ent_franchise_portal.png",
        imageAlt: "Restaurant analytics and sales performance dashboard",
        points: [
          { title: "Performance Tracking", desc: "Track item performance, peak hours, table turn time, staff activity, discounts, voids, and sales trends." },
          { title: "Visual Operations Auditing", desc: "Give owners a clearer view of what is selling, when teams are busiest, and where operations slow down." },
          { title: "Real-Time Register Data", desc: "Connect reporting with POS activity so decisions are based on live restaurant workflows, not manual summaries." }
        ]
      }
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Restaurant POS and kitchen display system",
    topBadge: "Kitchen-ready workflow",
    bottomBadge: "Built for dining operations",
    ctaLabel: "Start Restaurant POS Trial",
    ctaHref: "/sign-up",
    icon: ChefHat,
    faqs: [
      { id: "restaurant-kds", question: "Does Restaurant POS include kitchen display routing?", answer: "Yes. Restaurant POS includes KDS routing for prep stations, bar tickets, grill tickets, and front-of-house status updates." },
      { id: "restaurant-qr", question: "Can guests place orders with QR codes?", answer: "Yes. Guests can scan a table QR code, browse the menu, place orders, and send them into the POS and KDS workflow." },
      { id: "restaurant-floor", question: "Can it manage tables and split bills?", answer: "Yes. The restaurant workflow supports visual floor mapping, table status, split checks, modifiers, and course-paced service." },
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
      {
        title: "Branded storefront",
        desc: "Custom web ordering site with branded logo, menu categories, and checkout.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        imageAlt: "Branded restaurant online storefront builder",
        points: [
          { title: "White-Label Storefront", desc: "Publish a mobile-friendly web storefront with custom branding, item photos, and zero marketplace commission." },
          { title: "Integrated Payments Checkout", desc: "Integrated web checkout with Stripe, card terminals, and mobile wallets." }
        ]
      },
      {
        title: "Pickup and delivery",
        desc: "Delivery radius controls, pickup time windows, and live order status messaging.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        imageAlt: "Pickup and delivery configurations editor",
        points: [
          { title: "Operations Dispatch", desc: "Support pickup time windows, delivery zones, order status tracking, and kitchen ticket injection." },
          { title: "Direct Register Queueing", desc: "Connect direct customer web orders directly to KDS displays and register queues." }
        ]
      },
      {
        title: "Direct online ordering",
        desc: "Connected online ordering with POS pricing, tax, and stock availability.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Direct online order POS routing console",
        points: [
          { title: "Connected Menu Channels", desc: "Keep menu availability, ordering channels, and fulfillment steps closer to the live restaurant operation." },
          { title: "Real-Time POS Sync", desc: "Send customer orders into the connected POS and kitchen workflow instead of creating a separate manual queue." }
        ]
      },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Online ordering website storefront",
    topBadge: "direct",
    bottomBadge: "Direct POS + KDS sync",
    ctaLabel: "Launch Online Storefront",
    ctaHref: "/sign-up",
    icon: Globe2,
    faqs: [
      { id: "website-commission", question: "Are there third-party order commissions?", answer: "No. Quantix online ordering is direct with zero third-party per-order commissions." },
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
      {
        title: "Server handhelds",
        desc: "Mobile server POS tablets for ordering, modifiers, and payment collection.",
        imageSrc: "/images/ent_qsr_kiosk_bundle.png",
        imageAlt: "Server handheld waiter POS tablet screens",
        points: [
          { title: "Tableside Order Fire", desc: "Equip servers with mobile handheld tablets for tableside ordering, ticket firing, and mobile card payment collection." },
          { title: "FOH Order Efficiency", desc: "Reduce server trips to counter registers and speed up table turn times." }
        ]
      },
      {
        title: "Table management",
        desc: "Live table status and seating timers updated right on handheld server devices.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Handheld table layout management screen",
        points: [
          { title: "Live Table Status", desc: "See seated, paid, empty, and dirty tables in color-coded sections on server screens." },
          { title: "Server Assignments", desc: "Manage server table sections and coordinate host bookings instantly." }
        ]
      },
      {
        title: "Payments & split bills",
        desc: "Split checks tableside and process mobile payment transactions.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Handheld mobile payment processing and bill splitting",
        points: [
          { title: "Tap-to-Pay Processing", desc: "Collect contactless card taps, Apple Pay, and chip cards right at the table." },
          { title: "Easy Check Splitting", desc: "Drag items to separate check registers right in front of restaurant guests." }
        ]
      },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
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
      {
        title: "Custom workflow design",
        desc: "Tailored cashier UI, custom receipt formats, and non-standard register logic.",
        imageSrc: "/images/ent_franchise_portal.png",
        imageAlt: "White-label custom POS dashboard layout",
        points: [
          { title: "Tailored Register UX", desc: "Tailor order states, cashier screens, KDS routing rules, and terminal UX to fit non-standard business models." },
          { title: "Onboarding Support", desc: "Dedicated technical onboarding and custom workflow configuration." }
        ]
      },
      {
        title: "API bridge development",
        desc: "Custom middleware connectors, webhook endpoints, and ERP synchronization.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        imageAlt: "Custom REST and GraphQL API middleware logs console",
        points: [
          { title: "Connected API Middleware", desc: "Open REST/GraphQL APIs, webhooks, and middleware connectors to bridge Quantix POS with custom ERPs and legacy tools." },
          { title: "Developer Sandbox", desc: "Developer sandbox, webhook logs, and dedicated integration engineering support." }
        ]
      },
    ],
    imageSrc: "/images/ent_guide_blueprint.png",
    imageAlt: "Custom POS development and API platform",
    topBadge: "White-label & API",
    bottomBadge: "Custom engineering",
    ctaLabel: "Request Custom Proposal",
    ctaHref: "/contact",
    icon: Wrench,
    faqs: [
      { id: "custom-api", question: "Do you provide developer API access?", answer: "Yes. We provide full API keys, developer sandboxes, and webhook documentation for custom integrations." },
    ],
  },
  "takeout-pos": {
    slug: "takeout-pos",
    eyebrow: "Takeout POS - High Speed till operations",
    title: "High-Speed Takeout Till POS",
    description: "Engineered for rapid order entry, fast payment collection, and direct kitchen routing for takeouts and fast food.",
    points: [
      { title: "Sub-Second Counter Till", desc: "Fast layout with custom shortcut hotkeys for high-volume orders." },
      { title: "Online Aggregates Sync", desc: "Consolidate Uber Eats, Deliveroo, and online orders directly on the till screen." },
      { title: "Lobby order paging", desc: "Sync ticket numbers with guest pagers to manage busy queue queues." }
    ],
    workflows: [
      {
        title: "Sub-Second Cashier Billing",
        desc: "Maximize lobby order throughput during peak rush hours with custom hotkey grids and cashier fast-pins.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        points: [
          { title: "Fast Modifier Grids", desc: "Apply food modifications, size selections, and meal deals in a single tap." },
          { title: "Cash & Card Handoff", desc: "Trigger cash drawers instantly and sync card payouts directly to the till." }
        ]
      },
      {
        title: "Online Platforms Integration",
        desc: "Inject takeout orders from your branded app and aggregator platforms directly to one POS screen.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        points: [
          { title: "Aggregator Ingestion", desc: "No more maintaining 5 tablets. Uber Eats, Just Eat, and web orders flow into one queue." },
          { title: "Live Auto-Acceptance", desc: "Configure rules to auto-accept online orders based on kitchen capacity." }
        ]
      },
      {
        title: "Driver Management Console",
        desc: "Coordinate in-house delivery dispatching, track driver runs, and print map slips.",
        imageSrc: "/images/ent_qsr_kiosk_bundle.png",
        points: [
          { title: "Driver Ticket Assigning", desc: "Assign orders in batches to drivers and monitor delivery run durations." },
          { title: "Map Slips Printing", desc: "Print customer delivery addresses and directions automatically on checkout." }
        ]
      }
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "High speed takeout POS screen",
    topBadge: "High Speed",
    bottomBadge: "Fast Food Till",
    ctaLabel: "Get Takeout POS",
    ctaHref: "/sign-up",
    icon: Utensils,
    faqs: [
      { id: "tk-1", question: "Does it support fast cashier logins?", answer: "Yes, cashier pins or RFID cards log staff in instantly." }
    ]
  },
  "cafe-pos": {
    slug: "cafe-pos",
    eyebrow: "Cafe & Bar POS - Quick tabs & modifiers",
    title: "Cafe & Coffee Shop POS System",
    description: "Syrup & milk modifier grids, bar tabs, and pastry barcode scanner sync built for cafes.",
    points: [
      { title: "Drink Grids", desc: "One-tap modifiers for milk choices, sizes, and syrup shots." },
      { title: "Bar Tabs", desc: "Open, hold, and close tabs for bar and cafe guests." },
      { title: "Lobby customer screens", desc: "Display drink statuses clearly on a secondary display console." }
    ],
    workflows: [
      {
        title: "Drink & Prep Customization",
        desc: "Serve custom coffees and beverages quickly with dedicated milk, syrup, and extra shots modifier matrices.",
        imageSrc: "/images/ent_cafe_bakery_bundle.png",
        points: [
          { title: "Barista Hot-Keys", desc: "Custom order buttons for espresso modifications, iced blends, and brew methods." },
          { title: "Stock Hiding Controls", desc: "Hide sold-out pastries or specials across counter and online menus with one tap." }
        ]
      },
      {
        title: "Cafe Loyalty Cards",
        desc: "Reward regular coffee drinkers with digital stamp cards and points directly at checkout.",
        imageSrc: "/images/ent_cafe_bakery_bundle.png",
        points: [
          { title: "Frictionless Sign-Up", desc: "Enter phone numbers at checkout to register guests for loyalty cards." },
          { title: "Custom Coffee Rewards", desc: "Offer automatic free drinks or discount tags after a set number of stamp collections." }
        ]
      },
      {
        title: "Bakery Barcode Scanning",
        desc: "Process pre-packaged goods, coffee bags, and pastries using plug-and-play barcode scanners.",
        imageSrc: "/images/ent_cafe_bakery_bundle.png",
        points: [
          { title: "Fast Lobby Scanning", desc: "Scan items to add them to check invoices instantly instead of searching menus." },
          { title: "Weight Scale Sync", desc: "Sync digital scales for custom-weight pastry or coffee bean sales." }
        ]
      }
    ],
    imageSrc: "/images/ent_cafe_bakery_bundle.png",
    imageAlt: "Cafe and coffee shop POS workflow",
    topBadge: "Cafe & Bakery",
    bottomBadge: "Barista Workflows",
    ctaLabel: "Get Cafe POS",
    ctaHref: "/sign-up",
    icon: Coffee,
    faqs: [
      { id: "cf-1", question: "Can we print labels for cups?", answer: "Yes, we support automatic sticky label printing for cups." }
    ]
  },
  "kds": {
    slug: "kds",
    eyebrow: "Kitchen Display System - Paperless order routing",
    title: "Kitchen Display System (KDS)",
    description: "Replace paper tickets with real-time station displays, expo screens, and prep timer bump screens.",
    points: [
      { title: "Expo Station KDS", desc: "Track total ticket preparation and coordinate front-of-house collections." },
      { title: "Bump Bar Inputs", desc: "Physical or digital bump controls to mark items prepared." },
      { title: "Multi-station routing", desc: "Direct items from a single order to different screens in the kitchen automatically." }
    ],
    workflows: [
      {
        title: "Station-Based Prep Routing",
        desc: "Route items from a single order to different screens in the kitchen (grill, salad, assembly, expo).",
        imageSrc: "/images/ent_global_pos_bundle.png",
        points: [
          { title: "Prep Screen Isolation", desc: "Grill cooks see only steaks/burgers, while baristas see only drink tickets." },
          { title: "Expo Coordination Screen", desc: "FOH expo displays show order status when all stations finish preparing items." }
        ]
      },
      {
        title: "Interactive Bump Bars & Timers",
        desc: "Keep kitchen teams moving with color-coded ticket timers, priority alerts, and physical bump bars.",
        imageSrc: "/images/ent_global_pos_bundle.png",
        points: [
          { title: "Visual Color Alerts", desc: "Tickets turn amber or red when prep times exceed targets, helping chefs manage speed." },
          { title: "Tactile Bump Controls", desc: "Deploy rugged bump bars or touchscreen tapping to clear tickets from display boards." }
        ]
      },
      {
        title: "FOH Ready Alerts",
        desc: "Sync kitchen completions with lobby status boards and server handheld devices automatically.",
        imageSrc: "/images/ent_global_pos_bundle.png",
        points: [
          { title: "Lobby Status TV Sync", desc: "Trigger TV screen notifications showing customer order numbers ready for pickup." },
          { title: "Server Tablet Pings", desc: "Send direct notifications to table servers when courses are plated." }
        ]
      }
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Kitchen display system KDS screens for prep stations",
    topBadge: "Paperless Kitchen",
    bottomBadge: "Zero Delay Routing",
    ctaLabel: "Get KDS",
    ctaHref: "/sign-up",
    icon: Tv,
    faqs: [
      { id: "kds-1", question: "How many screens can I connect?", answer: "You can connect unlimited station screens to one central system." }
    ]
  },
  "waiter-app": {
    slug: "waiter-app",
    eyebrow: "Waiter Mobile App - Mobile tableside ordering",
    title: "Waiter Handheld POS App",
    description: "Equip floor staff with mobile ordering apps to take orders at the table and accept card payments instantly.",
    points: [
      { title: "Tableside Orders", desc: "Add modifiers and fire tickets directly from table to kitchen KDS." },
      { title: "Mobile Payments", desc: "Accept tap-to-pay, card, and digital wallets at the table." },
      { title: "Live floor map sync", desc: "View seating timers, open checks, and table waiter assignments on your screen." }
    ],
    workflows: [
      {
        title: "Tableside Order Collection",
        desc: "Equip waitstaff with mobile handhelds to take table orders, add custom prep notes, and fire to KDS.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        points: [
          { title: "Zero Travel Delay", desc: "FOH servers fire drink and starter tickets tableside, reducing customer wait times." },
          { title: "Prep Modifier Prompt", desc: "Automatic prompts for steak temperatures, side choices, and allergy warnings." }
        ]
      },
      {
        title: "Contactless Tableside Checkout",
        desc: "Close checks right at the table with integrated card readers, Apple Pay, and digital receipts.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        points: [
          { title: "Tap-To-Pay Processing", desc: "Accept card taps, PIN entries, and mobile wallets on handheld tablets." },
          { title: "Digital Invoice Slips", desc: "SMS or email bills to dining guests directly from FOH handhelds." }
        ]
      },
      {
        title: "Visual Floor Plans Sync",
        desc: "Check table seating status, order ages, and bill totals on a live pocket floor plan map.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        points: [
          { title: "Table Seating Status", desc: "FOH staff view seating times, course stages, and waiter assignments on their screens." },
          { title: "FOH Handover Controls", desc: "Transfer tables or split item balances between servers on the floor." }
        ]
      }
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Mobile waiter handheld POS tablet app",
    topBadge: "Waiter App",
    bottomBadge: "Tableside Order & Pay",
    ctaLabel: "Get Waiter App",
    ctaHref: "/sign-up",
    icon: Smartphone,
    faqs: [
      { id: "wt-1", question: "Does it work on Android and iOS?", answer: "Yes, it is fully compatible with both platforms." }
    ]
  },
  "qr-ordering": {
    slug: "qr-ordering",
    eyebrow: "QR Table Ordering - Contactless guest checkout",
    title: "QR Code Table Ordering System",
    description: "Let diners scan table codes to browse your digital menu, order courses, and pay from their phone.",
    points: [
      { title: "Direct Menus", desc: "Beautiful digital mobile menu with zero third-party platform fees." },
      { title: "Fast Guest Payments", desc: "Supports Apple Pay, Google Pay, and card checkouts at the table." },
      { title: "Auto-upsell widgets", desc: "Promote chef specials, extras, and drinks during checkout to increase margins." }
    ],
    workflows: [
      {
        title: "Scan-to-Order Digital Menus",
        desc: "Let diners scan QR codes on tables to load the interactive restaurant menu without download delays.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        points: [
          { title: "Instant Mobile Menus", desc: "Responsive, high-contrast web menu with allergen details and chef specials." },
          { title: "Direct Table Tagging", desc: "Orders map to specific table numbers automatically, preventing delivery errors." }
        ]
      },
      {
        title: "Frictionless Mobile Checkout",
        desc: "Guests pay for their courses instantly using Apple Pay, Google Pay, or credit card forms.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        points: [
          { title: "Dine-and-Dash Protection", desc: "Payments process before orders are sent to the kitchen KDS, preventing unpaid checks." },
          { title: "Split-Bill Customer Flow", desc: "Diners split bills or pay for their own items directly from their phone." }
        ]
      },
      {
        title: "Smart Modifiers Promotion",
        desc: "Increase average ticket value with automatic modifier prompts and dessert upsell screens.",
        imageSrc: "/images/ent_omnichannel_bundle.png",
        points: [
          { title: "Suggested Side Adds", desc: "Promote dipping sauces, extra toppings, and drinks during guest checkout." },
          { title: "Auto-Happy Hour Sync", desc: "Discount parameters apply automatically to table orders at set hours." }
        ]
      }
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "QR code table ordering and digital restaurant menu",
    topBadge: "QR Ordering",
    bottomBadge: "Self-service Checkout",
    ctaLabel: "Get QR Ordering",
    ctaHref: "/sign-up",
    icon: QrCode,
    faqs: [
      { id: "qr-1", question: "Do guests need to install an app?", answer: "No, the QR menu loads directly in any mobile web browser." }
    ]
  },
  "kiosk": {
    slug: "kiosk",
    eyebrow: "Order Kiosk - Self-checkout touchscreen terminals",
    title: "Self-Ordering Checkout Kiosks",
    description: "Deploy self-service touchscreen kiosks to reduce queue times and increase average order values.",
    points: [
      { title: "Upsell Modifier Flow", desc: "Auto-prompts for combo upgrades, extra toppings, and drinks." },
      { title: "Card Terminal Sync", desc: "Fully integrated payment kiosk terminals for quick customer checkouts." },
      { title: "Multi-language menu", desc: "Let customers toggle menu language options instantly with one click." }
    ],
    workflows: [
      {
        title: "Interactive Touchscreen Menu",
        desc: "A stunning, responsive kiosk interface that keeps queues moving and reduces counter labor costs.",
        imageSrc: "/images/ent_qsr_kiosk_bundle.png",
        points: [
          { title: "High-Contrast Menu", desc: "Large visual product cards, combo item selections, and modifier prompts." },
          { title: "Zero Language Barrier", desc: "Offer customer menu browsing in multiple languages with one toggle." }
        ]
      },
      {
        title: "Automated Upsell Engine",
        desc: "Boost average ticket value by prompting diners to add extra toppings, drinks, or sides before paying.",
        imageSrc: "/images/ent_qsr_kiosk_bundle.png",
        points: [
          { title: "Upsell Promotion Cards", desc: "Auto-prompts suggesting upgrades like double patties or dessert add-ons." },
          { title: "Cashier Mode Sync", desc: "Orders inject directly into kitchen KDS queues with a Kiosk identifier tag." }
        ]
      },
      {
        title: "Integrated Card Checkout",
        desc: "Integrated payment terminals for secure credit card taps and Apple Pay checkouts.",
        imageSrc: "/images/ent_qsr_kiosk_bundle.png",
        points: [
          { title: "Direct Payment Capture", desc: "No manual entry needed; payment terminals handle transactions securely." },
          { title: "Custom Receipt Printing", desc: "Prints order summary and receipt invoices for queue handoff." }
        ]
      }
    ],
    imageSrc: "/images/ent_qsr_kiosk_bundle.png",
    imageAlt: "Lobby self-service ordering kiosk",
    topBadge: "Lobby Kiosk",
    bottomBadge: "Line Buster",
    ctaLabel: "Get Kiosk",
    ctaHref: "/sign-up",
    icon: Smartphone,
    faqs: [
      { id: "ki-1", question: "Can it print orders directly?", answer: "Yes, it has a built-in receipt printer." }
    ]
  },
  "menu-boards": {
    slug: "menu-boards",
    eyebrow: "Menu Board Sync - Digital TV menu boards",
    title: "Digital TV Menu Boards",
    description: "Sync your POS menu items and pricing automatically to digital TV screens in your lobby.",
    points: [
      { title: "Live Price Sync", desc: "Change pricing or mark items sold-out and TV boards update instantly." },
      { title: "Promo Slide Banners", desc: "Display digital food banners, active combo offers, and combo graphics." }
    ],
    workflows: [
      {
        title: "POS-Synced Price Updates",
        desc: "Change item pricing, descriptions, or availability in the POS and digital TV boards update instantly.",
        imageSrc: "/images/rest_digital_menu_board.png",
        points: [
          { title: "Lobby Price Sync", desc: "Say goodbye to manual blackboard corrections. Menu boards update across all lobby TVs." },
          { title: "Sold-Out Hiding", desc: "Mark items out-of-stock on the POS till and they instantly disappear from TV boards." }
        ]
      },
      {
        title: "Digital Promo Banners",
        desc: "Display eye-catching promotional banners, food graphics, and combo meal promotions.",
        imageSrc: "/images/rest_digital_menu_board.png",
        points: [
          { title: "Dynamic Ad Carousel", desc: "Rotate daily specials, breakfast offers, and dessert promotions." },
          { title: "Multi-Screen Layouts", desc: "Deploy menu boards across multiple lobby TV screens with unified branding." }
        ]
      }
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Lobby digital TV menu boards",
    topBadge: "Lobby Boards",
    bottomBadge: "Live Pricing Sync",
    ctaLabel: "Get Menu Boards",
    ctaHref: "/sign-up",
    icon: Tv,
    faqs: [
      { id: "mb-1", question: "What screens do I need?", answer: "Any standard smart TV with a web browser or HDMI input works." }
    ]
  },
  "portal": {
    slug: "portal",
    eyebrow: "Cloud Manager Portal - Multi-store back-office control",
    title: "Cloud Portal Management",
    description: "Centralized recipe costing, analytics, inventory tracking, and franchise menu rollouts.",
    points: [
      { title: "Recipe Cost Control", desc: "Track raw ingredient prices and monitor profit margins." },
      { title: "Central Menu Push", desc: "Push new items and menu configurations to all branches at once." }
    ],
    workflows: [
      {
        title: "Recipe Costing & Inventory",
        desc: "Connect menu items to ingredient weights, track cost variations, and trigger reorder alerts.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        points: [
          { title: "Cost Variation Audits", desc: "Track raw ingredient purchase costs and monitor gross profit margins." },
          { title: "Stock Reorder Triggers", desc: "Configure alerts when ingredients drop below minimum inventory counts." }
        ]
      },
      {
        title: "Consolidated Group Reports",
        desc: "Access sales reports, labor costs, void logs, and store performance comparisons.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Cross-Store Analysis", desc: "Compare revenue charts, check averages, and peak hours across multiple stores." },
          { title: "Manager Audit Trail", desc: "Track cash drawer corrections, discounts, and exception void logs remotely." }
        ]
      }
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Cloud management back-office console",
    topBadge: "Cloud Portal",
    bottomBadge: "Central Control",
    ctaLabel: "Explore Portal",
    ctaHref: "/sign-up",
    icon: Layers,
    faqs: [
      { id: "po-1", question: "Can I manage multiple locations?", answer: "Yes, you can manage 1 to 100+ stores from one login." }
    ]
  },
  "sales-app": {
    slug: "sales-app",
    eyebrow: "Live Sales App - Real-time store performance tracking",
    title: "My Sales Live Dashboard App",
    description: "Track peak rush transactions, hourly sales, and employee clock-ins on your personal mobile phone.",
    points: [
      { title: "Live Sales Dashboard", desc: "See order volumes, ticket values, and revenue charts update in real time." },
      { title: "Roster Audit", desc: "Track staff check-ins, active cash drawers, and exception void logs." }
    ],
    workflows: [
      {
        title: "Live Sales Dashboards",
        desc: "See real-time transaction updates, order channel breakdowns, and hourly revenue charts on your phone.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Live Revenue Tracking", desc: "Revenue totals, average ticket values, and transactions update in real-time." },
          { title: "Order Channel Audit", desc: "Track whether sales are coming from walk-ins, online apps, or kiosks." }
        ]
      },
      {
        title: "Shift & Attendance Control",
        desc: "See active cash drawers, staff check-in times, and FOH shift handovers.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        points: [
          { title: "Roster Check-In Audit", desc: "Track which cashiers are logged in and view active register totals." },
          { title: "Exception Alerts", desc: "Receive immediate notifications when manager void approvals are triggered." }
        ]
      }
    ],
    imageSrc: "/images/ent_bi_analytics_bundle.png",
    imageAlt: "My business hub mobile sales tracker",
    topBadge: "Live Dashboard",
    bottomBadge: "Owner Mobile App",
    ctaLabel: "Get Sales App",
    ctaHref: "/sign-up",
    icon: LineChart,
    faqs: [
      { id: "sa-1", question: "Is the data encrypted?", answer: "Yes, all data streams are secured with bank-grade encryption." }
    ]
  },
  "driver-app": {
    slug: "driver-app",
    eyebrow: "Driver App - Delivery dispatch & tracking",
    title: "Driver Dispatch & Delivery App",
    description: "Optimize delivery routes, assign tickets to drivers, and track delivery statuses on a live map.",
    points: [
      { title: "Driver Route Navigation", desc: "Assign orders, print delivery slips, and send map directions to drivers." },
      { title: "Order Delivery Sync", desc: "Update customers automatically when their order is out for delivery." }
    ],
    workflows: [
      {
        title: "Driver Map Dispatching",
        desc: "Assign customer order batches to delivery drivers and optimize routes on a live dispatch map.",
        imageSrc: "/images/ent_delivery_dispatch_bundle.png",
        points: [
          { title: "Batch Delivery Assignments", desc: "Assign orders in zip code zones to drivers, reducing delivery times." },
          { title: "Live Map Slips", desc: "Verify driver locations, route progress, and estimated delivery times." }
        ]
      },
      {
        title: "Driver Route Navigation",
        desc: "Turn-by-turn Google Maps navigation, phone contact shortcuts, and customer delivery alerts.",
        imageSrc: "/images/ent_delivery_dispatch_bundle.png",
        points: [
          { title: "Google Maps Nav Sync", desc: "Drivers navigate to delivery addresses with one tap in the driver app." },
          { title: "SMS Handoff Alert", desc: "Customers receive automated SMS alerts when their driver departs." }
        ]
      }
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Delivery dispatch live map tracking screen",
    topBadge: "Driver Sync",
    bottomBadge: "Route Optimizer",
    ctaLabel: "Get Driver App",
    ctaHref: "/sign-up",
    icon: Truck,
    faqs: [
      { id: "da-1", question: "Does it integrate with Google Maps?", answer: "Yes, drivers get turn-by-turn Google Maps navigation." }
    ]
  },
  "customers": {
    slug: "customers",
    eyebrow: "Customer Management - CRM & Loyalty Engine",
    title: "Customer CRM & Loyalty Platform",
    description: "Automatically build rich guest profiles from card payments and online orders. Track visit frequency, favorite dishes, and dietary preferences to drive personalized marketing.",
    points: [
      { title: "Auto Profile Creation", desc: "Build CRM profiles passively from card dips, phone orders, and online checkouts." },
      { title: "Visit Frequency Charts", desc: "Identify VIP regulars and at-risk guests who haven't visited in 30+ days." },
      { title: "Points & Stamp Loyalty", desc: "Reward diners with digital stamp cards and redeemable point balances." }
    ],
    workflows: [
      {
        title: "Guest Profile Builder",
        desc: "Create rich customer cards automatically from card payments, delivery orders, and loyalty registrations.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Passive Data Collection", desc: "No manual entry needed — guest profiles build from every transaction." },
          { title: "Favorite Orders & Allergies", desc: "Alert FOH staff to VIP guests, favorite drinks, or allergy warnings." }
        ]
      },
      {
        title: "Loyalty & Rewards Engine",
        desc: "Drive repeat visits with digital stamp cards, points balances, and automated birthday rewards.",
        imageSrc: "/images/nav_restaurant_bundle.png",
        points: [
          { title: "Frictionless Enrollment", desc: "Guests join loyalty programs by entering their phone number at checkout." },
          { title: "Automated Rewards", desc: "Trigger free items or discount vouchers after a set number of visits." }
        ]
      },
      {
        title: "Marketing & Re-Engagement",
        desc: "Segment guests by visit frequency, average spend, or order type and launch targeted campaigns.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Automated Re-Engage Promos", desc: "Send SMS promo vouchers to customers who haven't ordered in 30+ days." },
          { title: "VIP Loyalty Tiers", desc: "Grant custom perks to your top 10% highest-spending dining room regulars." }
        ]
      }
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "Customer CRM and loyalty management dashboard",
    topBadge: "Guest CRM",
    bottomBadge: "Loyalty Engine",
    ctaLabel: "Get Customer CRM",
    ctaHref: "/sign-up",
    icon: Users,
    faqs: [
      { id: "crm-1", question: "Does the CRM integrate with loyalty programs?", answer: "Yes, customer profiles automatically accrue and display loyalty points." },
      { id: "crm-2", question: "Can I export customer data?", answer: "Yes, you can export CSV files of guest profiles, order history, and marketing segments." }
    ]
  },
  "inventory": {
    slug: "inventory",
    eyebrow: "Inventory & Food Cost - Recipe-Level Tracking",
    title: "Inventory Tracking & Food Cost Control",
    description: "Connect menu items to raw ingredient weights, track real-time food cost ratios, monitor kitchen wastage, and trigger automated reorder alerts.",
    points: [
      { title: "Recipe-Level Deductions", desc: "Each order automatically deducts exact raw ingredient quantities from inventory." },
      { title: "Live Food Cost Analysis", desc: "Calculate profit margins for every dish using real-time supplier pricing." },
      { title: "Low-Stock Alerts", desc: "Receive push notifications when ingredients fall below minimum thresholds." }
    ],
    workflows: [
      {
        title: "Recipe Costing Engine",
        desc: "Link menu items to raw ingredient weights and calculate exact per-dish food cost percentages.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        points: [
          { title: "Ingredient Weight Mapping", desc: "Map flour, cheese, protein, and sauce weights to each recipe." },
          { title: "Modifier Cost Tracking", desc: "Adding extra cheese deducts the extra weight from raw inventory automatically." }
        ]
      },
      {
        title: "Wastage & Variance Reports",
        desc: "Track kitchen waste, unexpected shrinkage, and variance between theoretical vs actual inventory counts.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        points: [
          { title: "Daily Wastage Logs", desc: "Kitchen staff log expired, dropped, or damaged ingredients for variance tracking." },
          { title: "Actual vs Theoretical", desc: "Compare expected stock usage from sales against physical count results." }
        ]
      },
      {
        title: "Supplier Purchase Orders",
        desc: "Generate automated supplier purchase orders when raw ingredients reach reorder thresholds.",
        imageSrc: "/images/ent_supply_chain_bundle.png",
        points: [
          { title: "Auto-Reorder Triggers", desc: "Configure minimum stock levels that generate purchase order drafts instantly." },
          { title: "Vendor Price Tracking", desc: "Compare supplier prices over time and select the best-value vendors." }
        ]
      }
    ],
    imageSrc: "/images/ent_supply_chain_bundle.png",
    imageAlt: "Inventory tracking and food cost control dashboard",
    topBadge: "Smart Inventory",
    bottomBadge: "Food Cost Control",
    ctaLabel: "Get Inventory Tools",
    ctaHref: "/sign-up",
    icon: Boxes,
    faqs: [
      { id: "inv-1", question: "Can recipe costing handle item modifier deductions?", answer: "Yes. Adding extra cheese automatically deducts the extra raw weight." },
      { id: "inv-2", question: "Does it integrate with supplier ordering?", answer: "Yes, you can generate purchase orders directly from low-stock alerts." }
    ]
  },
  "analytics": {
    slug: "analytics",
    eyebrow: "Restaurant Analytics - Sales & Performance",
    title: "Real-Time Sales & Performance Analytics",
    description: "Access live sales dashboards, automated Z-reports, staff performance metrics, and item-level profitability heatmaps from any device.",
    points: [
      { title: "Live Sales Dashboards", desc: "View real-time revenue, transaction counts, and average ticket values." },
      { title: "Automated Z-Reports", desc: "Generate end-of-day summaries automatically with tax breakdowns." },
      { title: "Staff Performance", desc: "Track which servers drive the most upsells and fastest table turns." }
    ],
    workflows: [
      {
        title: "Live Revenue Monitoring",
        desc: "See real-time transaction updates, hourly sales charts, and order channel breakdowns on your phone.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Hourly Sales Charts", desc: "Identify peak rush hours and slow periods to optimize staff scheduling." },
          { title: "Channel Mix Analysis", desc: "Track whether revenue is coming from dine-in, delivery, kiosks, or online orders." }
        ]
      },
      {
        title: "End-of-Day Z-Reports",
        desc: "Automatically generate comprehensive closing reports with tax summaries, payment splits, and void logs.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Tax Reconciliation", desc: "Automatic VAT/GST/Sales Tax calculations grouped by payment method." },
          { title: "Void & Discount Audits", desc: "Track manager-approved voids, refunds, and discount usage rates." }
        ]
      },
      {
        title: "Staff & Menu Performance",
        desc: "Benchmark server performance, track upsell rates, and identify your most profitable menu items.",
        imageSrc: "/images/ent_franchise_portal.png",
        points: [
          { title: "Server Leaderboards", desc: "Rank servers by total sales, average ticket value, and table turn speed." },
          { title: "Item Profitability Heatmap", desc: "See which dishes earn the highest margins and which ones lose money." }
        ]
      }
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Restaurant sales analytics and reporting dashboard",
    topBadge: "Live Analytics",
    bottomBadge: "Performance Insights",
    ctaLabel: "Get Analytics",
    ctaHref: "/sign-up",
    icon: LineChart,
    faqs: [
      { id: "an-1", question: "Can I access reports on my phone?", answer: "Yes, our cloud dashboard is fully optimized for mobile devices." },
      { id: "an-2", question: "Do Z-reports generate automatically?", answer: "Yes, end-of-day reports are generated automatically at your configured closing time." }
    ]
  }
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
      eyebrow: productSlug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      title: productSlug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      description: `Tailored workflows for ${productSlug.replace('-', ' ')} are currently being mapped out for our enterprise POS platform.`,
      points: [
        { title: "Features Coming Soon", desc: "This product module is being integrated into our next core update." }
      ],
      workflows: [
        {
          title: "Connected Modules",
          desc: "Integrate with the rest of our POS ecosystem seamlessly.",
          imageSrc: "/images/nav_restaurant_bundle.png",
          points: [
            { title: "Connected till system", desc: "Keep menu and inventory in sync across all devices." }
          ]
        }
      ],
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: productSlug,
      topBadge: "Quantix POS",
      bottomBadge: "All-in-one",
      ctaLabel: "Contact Sales",
      ctaHref: "/contact",
      icon: Store,
      faqs: [
        { id: "coming-soon", question: "When will this module be released?", answer: "This product module is part of our upcoming release pipeline. Contact our sales team for an early-access demo." }
      ],
    };
  }
  const Icon = product.icon;

  return (
    <>
      {/* 1. Hero Section */}
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
            <MotionPanel
              x={-18}
              className="space-y-4 lg:col-span-7"
            >
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
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-primary px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark active:scale-95 text-center min-w-0"
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
            </MotionPanel>

            <MotionPanel
              x={18}
              className="lg:col-span-5"
            >
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
            </MotionPanel>
          </div>
        </div>
      </section>

      {/* 2. Included Workflows Section */}
      <section className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-2">INCLUDED WORKFLOWS</span>
            <h2 className="font-syne text-3xl font-black text-slate-900 dark:text-white sm:text-4xl leading-tight">
              Capabilities Built Into {product.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
              Explore the core enterprise capabilities and workflows configured ready for service.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {product.workflows.map((wf, idx) => {
              const isLeftImage = idx % 2 === 0;
              return (
                <div
                  key={wf.title}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                >
                  {/* Text Column */}
                  <div className={`space-y-5 lg:col-span-6 ${isLeftImage ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      <Sparkles size={11} className="stroke-[2.5]" />
                      <span>{`Workflow 0${idx + 1}`}</span>
                    </div>

                    <h3 className="font-syne text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {wf.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                      {wf.desc}
                    </p>

                    {wf.points && wf.points.length > 0 && (
                      <div className="grid gap-3 pt-3">
                        {wf.points.map((pt) => (
                          <div key={pt.title} className="flex items-start gap-3">
                            <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary-light">
                              <Check className="h-3 w-3 stroke-3" />
                            </span>
                            <div className="space-y-0.5">
                              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                                {pt.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                {pt.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isLeftImage ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative aspect-4/3 w-full flex items-center justify-center p-2 group">
                      <Image
                        src={wf.imageSrc}
                        alt={wf.imageAlt || wf.title}
                        fill
                        className="object-contain p-2 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <FAQSection faqs={product.faqs} />

      {/* 4. Production CTA Banner */}
      <CTABanner />
    </>
  );
}
