import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Book,
  BookOpen,
  Building2,
  Check,
  ChefHat,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Cloud,
  Coffee,
  Flame,
  Globe,
  Hash,
  Heart,
  Layers,
  Layout,
  Monitor,
  Package,
  QrCode,
  RefreshCw,
  Ruler,
  Scale,
  Scan,
  Server,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Store,
  Trash2,
  Trophy,
  Truck,
  Tv,
  Users,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FAQSection from "@/features/FAQ/FAQSection";
import type { FAQItem } from "@/features/FAQ/Types/FAQTypes";
import { RequestDemoButton } from "@/components/atoms/RequestDemoButton";
import CTABanner from "@/components/organisms/CTABanner/CTABanner";
import TestimonialsWrapper from "@/features/Testimonials";
import { MainProductsShowcaseSection } from "@/components/organisms/MainProductsShowcaseSection/MainProductsShowcaseSection";

type IndustryPoint = {
  title: string;
  desc: string;
};

type IndustryWorkflow = {
  title: string;
  desc: string;
};

type IndustrySolution = {
  slug: string;
  eyebrow: string;
  name: string;
  title: string;
  description: string;
  points: IndustryPoint[];
  workflows: IndustryWorkflow[];
  imageSrc: string;
  imageAlt: string;
  topBadge: string;
  bottomBadge: string;
  ctaLabel: string;
  icon: LucideIcon;
  faqs: FAQItem[];
};

const INDUSTRIES_DATA: Record<string, IndustrySolution> = {
  "restaurants": {
    slug: "restaurants",
    eyebrow: "Full-Service & Dine-In Hospitality",
    name: "Dine-In Restaurants",
    title: "Enterprise Restaurant POS & Table Management",
    description:
      "Empower your dining operations with multi-room visual floor plans, course-paced kitchen firing, tableside mobile checkouts, and split-check flexibility across single or multi-unit restaurants.",
    points: [
      { title: "Course-Paced Ticket Routing", desc: "Fire starters, mains, and desserts in synchronized sequences to station KDS screens." },
      { title: "Interactive Visual Floor Plans", desc: "Track table status, guest seat counts, server section balance, and real-time turn times." },
      { title: "Seamless Tableside Checkouts", desc: "Equip waitstaff with handheld tablets for mobile ordering, tip adjustments, and split checks." },
    ],
    workflows: [
      { title: "Visual Floor Plan Management", desc: "Manage multi-room dining layouts, seat occupancy timers, and server section assignments." },
      { title: "Kitchen Display Routing (KDS)", desc: "Route grill, bar, cold prep, and expo tickets automatically with color-coded timers." },
      { title: "Advanced Bill & Seat Splitting", desc: "Split checks by seat, course, percentage, or custom item selections effortlessly." },
      { title: "Direct Commission-Free Web Orders", desc: "Inject online pickup and delivery orders straight into kitchen queues." },
      { title: "Live Recipe & Food Costing", desc: "Deduct raw ingredients automatically as orders clear the POS to maintain dish margins." },
      { title: "Central Multi-Location Reporting", desc: "Monitor sales velocity, food costs, and labor productivity across all branches." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Enterprise restaurant POS terminal with floor mapping and kitchen routing",
    topBadge: "Full-Service Dining",
    bottomBadge: "Table Ops & Course Pacing",
    ctaLabel: "Start Restaurant POS Trial",
    icon: Utensils,
    faqs: [
      { id: "rest-1", question: "Can I manage multiple dining rooms and patio layouts?", answer: "Yes. You can design custom floor maps for multiple dining rooms, outdoor patios, private banquet halls, and bar lounges." },
      { id: "rest-2", question: "Does it support course pacing and firing to the kitchen?", answer: "Yes. Servers can hold and fire individual courses or set automated timers that alert kitchen prep stations in sequence." },
      { id: "rest-3", question: "How does bill splitting work at the table?", answer: "Servers can split bills evenly, split by guest seat, or transfer individual drinks and dishes between tickets in seconds." },
    ],
  },
  "cafes": {
    slug: "cafes",
    eyebrow: "Cafes, Bakeries & Coffee Bars",
    name: "Cafes & Bakeries",
    title: "Enterprise Cafe POS & Barista Speed Station",
    description:
      "Accelerate morning rushes with one-tap beverage modifiers, barista espresso KDS routing, sticky cup label printing, pastry inventory tracking, and digital stamp loyalty.",
    points: [
      { title: "One-Tap Beverage Modifiers", desc: "Instant choices for dairy alternatives, drink sizes, syrup pumps, and brewing methods." },
      { title: "Espresso Barista KDS", desc: "Route beverage tickets to barista displays while pastry orders print to the kitchen." },
      { title: "Automated Sticky Cup Labels", desc: "Print sticky drink tags with guest name and modifier notes the instant order is paid." },
    ],
    workflows: [
      { title: "Barista Speed Screen", desc: "Bold, high-contrast modifier highlights for syrup shots, dairy alternatives, and extra shots." },
      { title: "Sticky Cup & Bag Labels", desc: "Fire sticky thermal label printers automatically at counter checkout." },
      { title: "Digital Menu Board Sync", desc: "Update prices and automatically hide 86'd sold-out pastries in real time." },
      { title: "Pre-Order Mobile Web", desc: "Let customers order ahead from mobile web to skip the morning coffee line." },
      { title: "Bean & Milk Recipe Costing", desc: "Calculate exact milk and espresso bean consumption per drink to protect profit margins." },
      { title: "Barista Tip Pooling", desc: "Automate tip collection, hours allocation, and shift distribution among staff." },
    ],
    imageSrc: "/images/ent_cafe_bakery_bundle.png",
    imageAlt: "Cafe and bakery coffee shop POS terminal",
    topBadge: "Barista Speed Station",
    bottomBadge: "Modifiers & Sticky Labels",
    ctaLabel: "Start Cafe POS Trial",
    icon: Coffee,
    faqs: [
      { id: "cafe-1", question: "Can baristas view drink modifiers clearly on KDS screens?", answer: "Yes. Espresso KDS displays highlight milk choices, syrups, and temperature instructions in bold color-coded text." },
      { id: "cafe-2", question: "Does Quantix support sticky label printers for coffee cups?", answer: "Yes. Quantix pairs with commercial sticky label printers to print cup tags with guest names and modifiers instantly." },
      { id: "cafe-3", question: "Can we track daily pastry wastage and spoilage?", answer: "Yes. Log daily unsold bakery items with reason codes to optimize baking batch quantities." },
    ],
  },
  "bars": {
    slug: "bars",
    eyebrow: "Bars, Pubs & Nightclubs",
    name: "Bars & Nightclubs",
    title: "High-Speed Bar POS & Tab Management",
    description:
      "Handle high-volume night rushes with sub-second bartender tap-to-pay, pre-authorized credit card tab holding, quick cocktail reorders, and pour cost inventory tracking.",
    points: [
      { title: "Pre-Authorized Card Tabs", desc: "Swipe guest card once to open tabs securely without holding physical plastic cards." },
      { title: "Speed Screen Cocktail Ordering", desc: "Single-tap reorders, liquor pour sizes, speed rack shortcuts, and round repeats." },
      { title: "Spirits & Bottle Inventory", desc: "Track bottle levels, draft keg weights, and bar pour cost percentages in real time." },
    ],
    workflows: [
      { title: "Pre-Auth Card Holding", desc: "Hold tabs digitally and automatically verify card funds to eliminate walkouts." },
      { title: "Repeat Round Shortcuts", desc: "Reorder an entire round of drinks for a group with a single button tap." },
      { title: "Fast Cash & Card Checkout", desc: "Sub-second tap-to-pay with pre-calculated fast cash tender buttons." },
      { title: "Bottle & Keg Inventory Sync", desc: "Track shot pours, bottle bin numbers, and draft keg depletion rates." },
      { title: "Bartender Shift & Tip Out", desc: "Enforce blind drawer drops, automated tip pooling, and hourly sales leaderboards." },
      { title: "Age Verification Scanning", desc: "Scan ID cards and driver's licenses to verify age and detect expired identification." },
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "Bar and nightclub POS speed terminal",
    topBadge: "High-Velocity Bar POS",
    bottomBadge: "Card Tabs & Keg Sync",
    ctaLabel: "Start Bar POS Trial",
    icon: Flame,
    faqs: [
      { id: "bar-1", question: "How does pre-authorized tab holding work?", answer: "Bartenders swipe or tap a card to open a tab. The system securely tokenizes the card and authorizes an initial hold amount without keeping physical cards behind the bar." },
      { id: "bar-2", question: "Can bartenders split tabs or repeat rounds quickly?", answer: "Yes. Bartenders can repeat an entire round with one tap, split drinks between guests, or transfer tabs to dining tables." },
      { id: "bar-3", question: "Does it support liquor bottle and keg inventory tracking?", answer: "Yes. Track shot-level deductions, bottle weights, and keg taps to calculate real-time pour cost variance." },
    ],
  },
  "apparel": {
    slug: "apparel",
    eyebrow: "Fashion, Boutiques & Apparel",
    name: "Boutiques & Apparel",
    title: "Fashion Retail POS & Size/Color Matrix",
    description:
      "Unify in-store boutique checkout with eCommerce inventory. Manage multi-dimensional size/color/style grids, barcode clothing tags, VIP clienteling CRM, and seasonal markdowns.",
    points: [
      { title: "Multidimensional SKU Matrix", desc: "Generate full size, color, and fit variant grids with unique barcode tags in seconds." },
      { title: "Omnichannel eCommerce Sync", desc: "Real-time stock synchronization between boutique registers and online web stores." },
      { title: "VIP Clienteling & Purchase History", desc: "Capture customer sizing preferences, past purchases, and style wishlists." },
    ],
    workflows: [
      { title: "Barcode & RFID Tag Scanning", desc: "Rapid barcode scanning for clothing tags and expedited inventory count audits." },
      { title: "Omnichannel Buy-Online-Pick-In-Store", desc: "Process BOPIS orders and reserve in-store items for web shoppers." },
      { title: "Seasonal Clearance & BOGO Promos", desc: "Deploy scheduled markdown rules, category discounts, and loyalty perks." },
      { title: "Exchanges, Returns & Store Credits", desc: "Process receipted or unreceipted returns and issue digital store vouchers." },
      { title: "Inter-Boutique Stock Transfers", desc: "Check stock across all branch locations and transfer items with tracking." },
      { title: "Supplier Purchase Order Automation", desc: "Generate reorder POs automatically when seasonal stock hits low-threshold triggers." },
    ],
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Fashion boutique apparel POS terminal with barcode scanner",
    topBadge: "Apparel Variant Matrix",
    bottomBadge: "Omnichannel Sync & CRM",
    ctaLabel: "Start Apparel POS Trial",
    icon: ShoppingBag,
    faqs: [
      { id: "app-1", question: "How does the size and color matrix work for clothing?", answer: "Create one parent garment and automatically generate all color/size combinations with unique SKUs and barcode labels." },
      { id: "app-2", question: "Can customer purchase histories be viewed at the register?", answer: "Yes. Cashiers can look up customer profiles by phone or name to see previous sizes, brands bought, and store credit balance." },
      { id: "app-3", question: "Does stock sync in real time with web stores like Shopify?", answer: "Yes. In-store and online sales update inventory simultaneously to prevent overselling." },
    ],
  },
  "smoke-shops": {
    slug: "smoke-shops",
    eyebrow: "Vape, Tobacco & Smoke Shops",
    name: "Vape & Smoke Shops",
    title: "Smoke & Vape Shop POS with Age Verification",
    description:
      "Purpose-built POS for high-SKU vape and smoke shops. Mandatory 21+ ID barcode age verification, serial number tracking for hardware, multi-pack pricing, and state excise tax compliance.",
    points: [
      { title: "21+ ID Barcode Age Verification", desc: "Scan driver's licenses and state IDs to enforce legal age compliance at checkout." },
      { title: "High-SKU E-Liquid & Coil Matrix", desc: "Manage thousands of flavors, nicotine strengths, coil types, and disposable variants." },
      { title: "Serial & IMEI Hardware Tracking", desc: "Capture device serial numbers during scan for warranty validation and returns." },
    ],
    workflows: [
      { title: "Driver's License Age Verification", desc: "Instant barcode scanner age verification to prevent underage sales and fines." },
      { title: "High-SKU Flavor & Nicotine Matrix", desc: "Organize thousands of e-liquid bottles by brand, volume, flavor, and nicotine strength." },
      { title: "Multi-Pack & Mix-and-Match Discounts", desc: "Automate 2-for-1, bundle discounts, and loyalty points on accessories." },
      { title: "Excise & Tobacco Tax Engine", desc: "Apply specific state, county, and product-tier tobacco excise taxes automatically." },
      { title: "Hardware Warranty & Serial Logs", desc: "Store serial numbers on sales receipts to verify authentic warranty returns." },
      { title: "Cash Drawer Float Security", desc: "Timed drawer drops, blind shift closes, and manager override PIN protection." },
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "Vape and smoke shop POS register with barcode scanner and ID check",
    topBadge: "Age Verified POS",
    bottomBadge: "High-SKU & Serial Tracking",
    ctaLabel: "Start Smoke Shop POS Trial",
    icon: Layers,
    faqs: [
      { id: "smoke-1", question: "Does Quantix support ID scanner age verification?", answer: "Yes. Cashiers can scan 2D barcodes on driver's licenses and IDs. The POS instantly calculates age and blocks checkout if the customer is underage." },
      { id: "smoke-2", question: "Can it handle mix-and-match promos for vape pods and coils?", answer: "Yes. You can configure multi-buy rules (e.g. buy 3 disposables for $40 or mix 5 juice flavors) that apply automatically at the register." },
      { id: "smoke-3", question: "How does it handle state-specific tobacco excise taxes?", answer: "Quantix allows you to set up flat-rate or percentage-based excise taxes tailored to state and local tobacco compliance regulations." },
    ],
  },
  "fine-dining": {
    slug: "fine-dining",
    eyebrow: "Fine Dining & Premium Venues",
    name: "Fine Dining",
    title: "Fine Dining POS & Reservation Sync",
    description:
      "Deliver white-glove table service with multi-course pacing, sommelier tasting notes, VIP guest preference tracking, and floor plan mapping.",
    points: [
      { title: "Course-Paced Routing", desc: "Fire starters, mains, desserts, and digestifs in perfect kitchen synchronization." },
      { title: "Visual Floor Plans", desc: "Track table status, guest seat counts, split checks, and server section balance." },
      { title: "VIP Guest CRM", desc: "Track dietary preferences, wine tasting histories, and spend tiers automatically." },
    ],
    workflows: [
      { title: "Tableside Server Tablets", desc: "Mobile server handhelds for tableside ordering, wine selections, and contactless checkouts." },
      { title: "Sommelier & Cellar Sync", desc: "Real-time bottle inventory tracking, vintage management, and bin numbers." },
      { title: "Host Stand & Reservations", desc: "Seamless reservation integration with table holding and guest arrival alerts." },
      { title: "Split Checks by Seat", desc: "Advanced check splitting by course, guest seat, or fractional percentage." },
      { title: "Kitchen Pacing Timers", desc: "Color-coded course countdown timers on station KDS displays." },
      { title: "End-of-Night Financials", desc: "Tip pooling distribution, shift reconciliation, and ERP journal sync." },
    ],
    imageSrc: "/images/ent_fine_dining_bundle.png",
    imageAlt: "Fine dining restaurant POS and maitre d stand",
    topBadge: "Premium Dining",
    bottomBadge: "White-Glove Hospitality",
    ctaLabel: "Start Fine Dining Trial",
    icon: Sparkles,
    faqs: [
      { id: "fd-1", question: "Can server tablets control kitchen course timing?", answer: "Yes. Servers can fire courses individually or set automatic delays for station KDS screens." },
      { id: "fd-2", question: "Can I manage multiple dining rooms and private banquet areas?", answer: "Yes, you can create unlimited custom floor plans for main dining rooms, private dining salons, patios, and bar lounges." },
      { id: "fd-3", question: "Does it track guest allergy notes and VIP preferences?", answer: "Yes. Guest profiles flag severe allergies, dietary restrictions, favorite tables, and wine preferences automatically." },
    ],
  },
  "quick-service": {
    slug: "quick-service",
    eyebrow: "QSR & Fast Casual Chains",
    name: "Quick Service Restaurants",
    title: "High-Volume Quick Service (QSR) POS System",
    description:
      "Supercharge your counter, drive-thru, and delivery throughput. Engineered to process orders in sub-seconds, manage queue flow, and sync with online delivery aggregators.",
    points: [
      { title: "Sub-Second Cashier Billing", desc: "Lightning-fast touchscreen layout with shortcut hotkeys for high-volume rush hours." },
      { title: "Multi-Channel Delivery Sync", desc: "Direct injection of Uber Eats, Deliveroo, and online orders into one unified queue." },
      { title: "Lobby & Drive-Thru Paging", desc: "Sync order ticket numbers with customer display boards and guest pagers." },
    ],
    workflows: [
      { title: "Kitchen Expo Bump Bars", desc: "Keep kitchen staff moving with tactile bump bars and real-time station order displays." },
      { title: "Interactive Self-Order Kiosks", desc: "Automated combo upsell engine and integrated contactless payment hardware." },
      { title: "Driver Dispatch Telemetry", desc: "Real-time courier dispatch map, order grouping, and automated delivery slips." },
      { title: "Sold-Out Menu Hiding", desc: "Instantly hide out-of-stock items across counter till, web, and kiosks with one tap." },
      { title: "Cashier Speed Metrics", desc: "Live leaderboards tracking cashier transaction turnaround speed and throughput." },
      { title: "Consolidated Group Inventory", desc: "Central raw ingredient replenishment and cross-store warehouse transfers." },
    ],
    imageSrc: "/images/ent_qsr_kiosk_bundle.png",
    imageAlt: "Quick service QSR POS and counter checkout",
    topBadge: "High-Speed QSR",
    bottomBadge: "Sub-Second Checkout",
    ctaLabel: "Start QSR POS Trial",
    icon: Zap,
    faqs: [
      { id: "qsr-1", question: "How fast is counter order processing?", answer: "Cashiers can enter orders, apply modifiers, and collect payment in under 2 seconds." },
      { id: "qsr-2", question: "Does it support offline billing during internet outages?", answer: "Yes, the QSR POS is built offline-capable, syncing sales data automatically when connection returns." },
    ],
  },
  "fashion-retail": {
    slug: "fashion-retail",
    eyebrow: "Apparel, Footwear & Boutiques",
    name: "Fashion & Apparel",
    title: "Fashion Retail POS & Variant Matrix",
    description:
      "Unified inventory matrix for sizes, colors, and styles. Connect physical boutique checkout with eCommerce inventory, clienteling CRM, and automated stock replenishment.",
    points: [
      { title: "Size & Color Matrix", desc: "Fast grid entry for multidimensional product variants and supplier SKUs." },
      { title: "Omnichannel Stock Sync", desc: "Real-time synchronization between in-store registers and online eCommerce web stores." },
      { title: "VIP Clienteling CRM", desc: "Customer purchase histories, fitting notes, and personalized styling recommendations." },
    ],
    workflows: [
      { title: "Barcode Scanner & RFID", desc: "Fast barcode scanning for clothing tags and inventory count audits." },
      { title: "Seasonal Collection Markdown", desc: "Automated clearance schedules and category-wide promotional rules." },
      { title: "Store Transfers & BOPIS", desc: "In-store pickup fulfillment and multi-boutique stock transfers." },
      { title: "Returns & Gift Card Engine", desc: "Manager-approved returns, store credit vouchers, and digital gift cards." },
      { title: "Cashier Drawer & Shift Audits", desc: "Blind count register reconciliation and daily sales summaries." },
      { title: "Supplier Purchase Orders", desc: "Low-stock reorder triggers and warehouse goods-received matching." },
    ],
    imageSrc: "/images/nav_retail_bundle.png",
    imageAlt: "Fashion apparel boutique retail POS terminal",
    topBadge: "Apparel Matrix",
    bottomBadge: "Omnichannel Retail",
    ctaLabel: "Start Fashion POS Trial",
    icon: ShoppingBag,
    faqs: [
      { id: "fr-1", question: "How does the size and color matrix work?", answer: "Create one parent product and generate full color/size matrix grids with independent SKU codes and stock tracking." },
      { id: "fr-2", question: "Does it sync with Shopify and WooCommerce?", answer: "Yes, two-way inventory sync updates product counts across retail registers and web stores automatically." },
    ],
  },
  "grocery": {
    slug: "grocery",
    eyebrow: "Supermarkets & Convenience Stores",
    name: "Grocery & Convenience",
    title: "Grocery POS & High-Speed Barcode Checkout",
    description:
      "Process high-volume shopping carts with barcode scanner scale sync, produce PLU lookups, perishable batch expiration tracking, and multi-lane cashier controls.",
    points: [
      { title: "Certified Scale & Scanner Sync", desc: "Instant weight scale calculation and sub-second 1D/2D barcode checkout." },
      { title: "Perishables & Batch Tracking", desc: "Expiration date monitoring, discount markdowns, and spoilage reduction." },
      { title: "Automated Supplier Reordering", desc: "EDI vendor order drafts and central warehouse replenishment." },
    ],
    workflows: [
      { title: "Multi-Lane Cashier Lanes", desc: "High-speed barcode scanning with dual-screen customer checkout displays." },
      { title: "PLU Lookup Matrix", desc: "Visual hotkey grids for unbarcoded fruits, vegetables, and bakery items." },
      { title: "Offline Till Mesh", desc: "Uninterrupted checkout and receipt printing during network broadband dropouts." },
      { title: "Shelf Label Printing", desc: "Print barcode shelf tags and promotional price labels directly from inventory." },
      { title: "Cash Drawer Security", desc: "Cash drop limits, drawer opening sensors, and supervisor override PINs." },
      { title: "Multi-Store Grocery Telemetry", desc: "Central price book distribution and regional margin analytics." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Grocery and supermarket POS barcode system",
    topBadge: "Supermarket POS",
    bottomBadge: "Scale & Barcode Ready",
    ctaLabel: "Start Grocery POS Trial",
    icon: Store,
    faqs: [
      { id: "gr-1", question: "Can it integrate with weighing scales?", answer: "Yes, certified scale drivers read weight measurements automatically to calculate item cost in milliseconds." },
      { id: "gr-2", question: "Can we print shelf price tags and barcode stickers?", answer: "Yes, print barcode labels and price tags directly from the inventory product manager." },
    ],
  },
  "cafe-bakery": {
    slug: "cafe-bakery",
    eyebrow: "Cafes, Bakeries & Coffee Shops",
    name: "Cafés & Bakeries",
    title: "Cafe & Coffee Shop POS System",
    description:
      "Speed up your morning rush with custom milk & syrup modifier matrices, espresso barista KDS, pastry barcode scanning, and digital stamp loyalty.",
    points: [
      { title: "Drink Modifier Grids", desc: "One-tap choices for milk alternatives, sizes, syrup shots, and brew methods." },
      { title: "Espresso Barista KDS", desc: "Split beverage orders to espresso bar displays while bakery orders print to kitchen." },
      { title: "Digital Stamp Loyalty", desc: "Phone-based stamp cards and reward points directly at checkout." },
    ],
    workflows: [
      { title: "Barista Station KDS", desc: "Clear visual modifier highlights for dairy choices and flavor shots." },
      { title: "Digital TV Menu Boards", desc: "Real-time price updates and automated sold-out item hiding." },
      { title: "Recipe Costing & Ingredients", desc: "Calculate bean and milk usage to track per-cup gross profit margins." },
      { title: "Pre-Order Mobile Web", desc: "Allow customers to order coffee ahead for quick morning pickup." },
      { title: "Bakery Weight & Label Printing", desc: "Sync digital scales and print sticky labels for cups and pastry bags." },
      { title: "Tip Pooling Shift Ledgers", desc: "Automatic service tip distribution across barista shifts." },
    ],
    imageSrc: "/images/ent_cafe_bakery_bundle.png",
    imageAlt: "Cafe and coffee shop POS workflow",
    topBadge: "Cafe & Bakery",
    bottomBadge: "Barista Workflows",
    ctaLabel: "Start Cafe POS Trial",
    icon: Coffee,
    faqs: [
      { id: "cb-1", question: "Can baristas see custom drink modifiers clearly?", answer: "Yes, espresso KDS screens highlight milk choices, extra shots, and syrups in bold high-contrast text." },
      { id: "cb-2", question: "Can we print sticky labels for coffee cups?", answer: "Yes, automated sticky cup label printers fire as soon as payment is collected at the counter." },
    ],
  },
  "fast-casual": {
    slug: "fast-casual",
    eyebrow: "Fast Casual & Bowl Concepts",
    name: "Fast Casual",
    title: "Fast Casual POS & Custom Bowl Builder",
    description:
      "Interactive step-by-step bowl and burrito modifiers, kitchen assembly line screens, counter tap-to-pay, and customer self-pickup boards.",
    points: [
      { title: "Interactive Combo Builder", desc: "Guide cashiers through proteins, bases, toppings, and premium add-ons." },
      { title: "Assembly Line Routing", desc: "Send custom ingredient steps to prep screens along the serving line." },
      { title: "Pickup Status Board Sync", desc: "Trigger TV screen alerts when orders are bagged and ready." },
    ],
    workflows: [
      { title: "Counter Service Speed", desc: "Process custom combinations and tap-to-pay checkouts in seconds." },
      { title: "QR Order & Pay at Table", desc: "Diners re-order drinks and sides from their seats via table QR codes." },
      { title: "Prep Batch Waste Tracking", desc: "Log daily prep pan wastage to refine daily par levels." },
      { title: "Delivery Courier Dispatch", desc: "Manage in-house drivers and delivery aggregators from one screen." },
      { title: "Loyalty Tier Automation", desc: "Auto-award free bowl perks after target visit milestones." },
      { title: "Multi-Unit Menu Syndication", desc: "Push new seasonal menu concepts across all locations at once." },
    ],
    imageSrc: "/images/nav_restaurant_bundle.png",
    imageAlt: "Fast casual restaurant POS counter till",
    topBadge: "Fast Casual",
    bottomBadge: "Combo & Bowl Builder",
    ctaLabel: "Start Fast Casual Trial",
    icon: Utensils,
    faqs: [
      { id: "fc-1", question: "How does the custom combo builder work?", answer: "The till prompts cashiers through base, protein, sauce, and topping steps with automatic upcharge calculations." },
    ],
  },
  "electronics": {
    slug: "electronics",
    eyebrow: "Consumer Electronics & Tech Retail",
    name: "Electronics & Tech",
    title: "Electronics Retail POS & Serial Number Tracking",
    description:
      "Serial number capture on checkout, warranty plans, repair service ticketing, trade-in credit evaluation, and multi-location warehouse sync.",
    points: [
      { title: "Serial & IMEI Number Sync", desc: "Capture device serial numbers during scan for warranty and return verification." },
      { title: "Automated Warranty Prompts", desc: "Prompt cashiers to offer extended protection plans and accessory bundles." },
      { title: "Trade-In & Store Credit", desc: "Evaluate pre-owned devices at register and apply trade-in credit instantly." },
    ],
    workflows: [
      { title: "Repair & Service Ticketing", desc: "Create work orders, track technician repair statuses, and SMS customers." },
      { title: "High-Value Security Controls", desc: "Mandatory manager authorization on high-value price overrides and returns." },
      { title: "Supplier RMA & Warranty Log", desc: "Track defective items sent back to manufacturers for credit." },
      { title: "Multi-Store SKU Transfers", desc: "Move inventory between stores with barcode verification at dispatch and receipt." },
      { title: "Installment & Split Finance", desc: "Integrate third-party financing and split-card payment checkout." },
      { title: "Serial Number Audit Trails", desc: "Search transaction history by IMEI or serial number instantly." },
    ],
    imageSrc: "/images/ent_venues_pos.png",
    imageAlt: "Electronics and technology retail POS dashboard",
    topBadge: "Serial Number Ready",
    bottomBadge: "Warranty & Repairs",
    ctaLabel: "Start Electronics POS Trial",
    icon: Monitor,
    faqs: [
      { id: "el-1", question: "Can we track serial numbers on receipts and invoices?", answer: "Yes, individual IMEI and serial numbers are stored on customer receipts and searchable in the sales ledger." },
    ],
  },
  "franchise": {
    slug: "franchise",
    eyebrow: "Franchise Networks & Multi-Unit Groups",
    name: "Franchise & Multi-Location",
    title: "Franchise POS & Central Cloud Telemetry",
    description:
      "Total head office control over 10 to 500+ franchise locations. Centralized catalog versioning, automated royalty fee audits, and regional performance telemetry.",
    points: [
      { title: "Central Menu & Price Push", desc: "Roll out new products, prices, and combos to all stores with one click." },
      { title: "Franchise Royalty Audits", desc: "Automated gross sales calculation and percentage-based franchise fee ledgers." },
      { title: "Role Permission Governance", desc: "Define exact permissions for cashiers, store managers, and franchise owners." },
    ],
    workflows: [
      { title: "Multi-Location Live Telemetry", desc: "Compare hourly sales, average ticket size, and labor efficiency across branches." },
      { title: "Global Loyalty & Gift Cards", desc: "Let customers earn and redeem rewards at any franchise location." },
      { title: "Central Supply Chain POs", desc: "Consolidate supplier orders from all locations to negotiate volume pricing." },
      { title: "Regional Tax & Pricing Tiers", desc: "Set different price books and tax rates by city, region, or airport venue." },
      { title: "Store Audit & Compliance Logs", desc: "Track manager overrides, drawer openings, and void exceptions remotely." },
      { title: "Automated ERP Financial Sync", desc: "Native gRPC and REST webhook pipelines into SAP, NetSuite, and Oracle." },
    ],
    imageSrc: "/images/ent_franchise_portal.png",
    imageAlt: "Franchise and multi-location management portal",
    topBadge: "Franchise HQ",
    bottomBadge: "Multi-Location Scale",
    ctaLabel: "Schedule Franchise Demo",
    icon: Building2,
    faqs: [
      { id: "fr-1", question: "Can franchise store managers override corporate pricing?", answer: "Only if head office explicitly grants price-override permission in the central role manager." },
    ],
  },
  "cloud-kitchen": {
    slug: "cloud-kitchen",
    eyebrow: "Ghost Kitchens & Virtual Brands",
    name: "Cloud Kitchens",
    title: "Cloud Kitchen POS & Multi-Brand Hub",
    description:
      "Run 5+ virtual delivery brands from one shared kitchen, single POS terminal, and unified KDS prep line.",
    points: [
      { title: "Multi-Brand Aggregation", desc: "Direct ingestion of orders from Uber Eats, DoorDash, and direct web into one screen." },
      { title: "Unified Kitchen Routing", desc: "Direct food items from multiple virtual menus to the right grill or fryer station." },
      { title: "Driver Dispatch Handoff", desc: "TV screen in driver waiting area displaying order readiness by delivery platform." },
    ],
    workflows: [
      { title: "Expo Packing Station", desc: "Verification screens to ensure all bags contain correct items before driver handoff." },
      { title: "Virtual Brand Analytics", desc: "Break down revenue, food costs, and platform commission by individual brand." },
      { title: "Aggregator Live Menu Sync", desc: "Turn off menu items across all delivery platforms with a single button." },
      { title: "Virtual Recipe Par Levels", desc: "Shared ingredient stock tracking across multiple virtual menu offerings." },
      { title: "Automated Delivery Labels", desc: "Print order summary stickers with customer name, bag count, and courier ID." },
      { title: "Central Kitchen Ledger", desc: "Daily sales reconciliation grouped by third-party delivery channel." },
    ],
    imageSrc: "/images/ent_omnichannel_bundle.png",
    imageAlt: "Cloud kitchen virtual brand management POS",
    topBadge: "Ghost Kitchens",
    bottomBadge: "Multi-Brand Hub",
    ctaLabel: "Start Cloud Kitchen Trial",
    icon: Cloud,
    faqs: [
      { id: "ck-1", question: "Do I need separate tablets for every delivery app?", answer: "No, all delivery app orders flow into one unified queue and print to the correct kitchen stations." },
    ],
  },
  "multi-location": {
    slug: "multi-location",
    eyebrow: "Multi-Location Chains",
    name: "Multi-Location Enterprise",
    title: "Enterprise Chain POS & Group Operations",
    description:
      "Scale from 5 to 100+ stores with central menu management, cross-store inventory balancing, and enterprise SLA reliability.",
    points: [
      { title: "Central Menu Syndication", desc: "Update menus, pricing, and allergen data across all restaurants instantly." },
      { title: "Cross-Store Sales Telemetry", desc: "Compare hourly sales, table turn times, and food costs across all outlets." },
      { title: "Enterprise SLA & Offline Mesh", desc: "Sub-4ms local till caching with guaranteed 99.99% uptime SLA." },
    ],
    workflows: [
      { title: "Central Purchasing & Warehouse", desc: "Coordinate central commissary stock orders and store replenishment." },
      { title: "Universal Gift Card Engine", desc: "Sell and redeem gift cards across all physical stores and web portals." },
      { title: "Regional Store Manager Portal", desc: "Store-level dashboard for rosters, shifts, and drawer reconciliations." },
      { title: "Consolidated P&L Reporting", desc: "Group-level financial analytics exported to enterprise accounting software." },
      { title: "KDS Station Standardization", desc: "Standardize prep times and station routing across all chain kitchens." },
      { title: "Dedicated Account Support", desc: "24/7 priority enterprise support and named technical account manager." },
    ],
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Multi-location restaurant enterprise POS dashboard",
    topBadge: "Enterprise Scale",
    bottomBadge: "Multi-Unit Control",
    ctaLabel: "Schedule Enterprise Demo",
    icon: Building2,
    faqs: [
      { id: "ml-1", question: "How does cross-store inventory transfer work?", answer: "Create transfer orders from the central portal and receive goods with barcode verification at the destination." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(INDUSTRIES_DATA).map((industrySlug) => ({ industrySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}): Promise<Metadata> {
  const { industrySlug } = await params;
  const industry = INDUSTRIES_DATA[industrySlug];
  if (!industry) {
    return { title: "Solutions | Quantix Enterprise" };
  }
  return {
    title: `${industry.title} | Quantix Enterprise`,
    description: industry.description,
  };
}

export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<{ industrySlug: string }>;
}) {
  const { industrySlug } = await params;

  if (!industrySlug) {
    notFound();
  }

  let industry = INDUSTRIES_DATA[industrySlug];
  if (!industry) {
    industry = {
      slug: industrySlug,
      eyebrow: industrySlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      name: industrySlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
      title: `${industrySlug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")} POS System`,
      description: `Tailored enterprise workflows for ${industrySlug.replace("-", " ")} businesses with central telemetry, offline mesh reliability, and multi-unit controls.`,
      points: [
        { title: "Core Workflows Ready", desc: "Engineered specifically for high-throughput enterprise scale." },
        { title: "Sub-4ms Offline Till Mesh", desc: "Maintain continuous operations during broadband interruptions." },
        { title: "Central HQ Telemetry", desc: "Real-time visibility into branch revenue, inventory, and staff." },
      ],
      workflows: [
        { title: "Connected Till Systems", desc: "Keep menu and inventory in sync across all store registers." },
        { title: "Live Real-Time Sync", desc: "Stream real-time transactions into cloud telemetry consoles." },
        { title: "24/7 SLA Operations", desc: "Backed by enterprise support and uptime guarantees." },
      ],
      imageSrc: "/images/nav_restaurant_bundle.png",
      imageAlt: industrySlug,
      topBadge: "Quantix Solution",
      bottomBadge: "All-in-One POS",
      ctaLabel: "Contact Sales",
      icon: Store,
      faqs: [
        { id: "coming-soon", question: "When will this solution be released?", answer: "This sector solution is fully supported. Contact our sales team for an immediate walkthrough." },
      ],
    };
  }
  const Icon = industry.icon;

  return (
    <>
      {/* 1. Hero Section (Matching Exact Product Detail Standard) */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-950 page-hero-header">
        <div className="site-container relative z-10 px-4 sm:px-6">
          <div className="mb-4 inline-flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-55 sm:max-w-none">{industry.eyebrow || industry.name}</span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary dark:border-primary/30 dark:bg-primary/15 dark:text-primary-light shadow-xs">
                <Icon size={14} className="stroke-[2.5]" />
                <span>{industry.eyebrow}</span>
              </div>

              <h1 className="font-syne text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {industry.title}
              </h1>

              <p className="max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                {industry.description}
              </p>

              <div className="grid gap-2.5 pt-2">
                {industry.points.map((point) => (
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
                  <span className="truncate">{industry.ctaLabel}</span>
                  <ArrowRight size={13} className="shrink-0" />
                </Link>
                <RequestDemoButton
                  title={`Request Demo for ${industry.name}`}
                  buttonText="SOLUTION_DETAIL_DEMO"
                  className="flex-1 sm:flex-initial flex h-11 sm:h-12 items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 sm:px-8 font-syne text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-center min-w-0"
                />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 w-full flex items-center justify-center p-2">
                <Image
                  src={industry.imageSrc}
                  alt={industry.imageAlt}
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

      {/* 2. Core Workflows Bento Grid Section */}
      <section className="section-py bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="site-container px-4 sm:px-6">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary block mb-2">INDUSTRY WORKFLOWS</span>
            <h2 className="font-syne text-2xl font-black text-slate-900 dark:text-white sm:text-3xl leading-tight">
              Engineered For {industry.name}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Purpose-built capabilities engineered to streamline operations and scale multi-unit performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {industry.workflows.map((wf) => (
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

      {/* 5. Sector FAQ Section */}
      <FAQSection faqs={industry.faqs} />

      {/* 6. Production CTA Banner */}
      <CTABanner />
    </>
  );
}
