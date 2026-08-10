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
import FAQSection from "@/features/FAQ/FAQSection";
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
  "Offline register": {
    src: "/images/demo-thumb.jpg",
    alt: "Offline retail register workflow",
    badge: "Offline register",
  },
  "Smart inventory": {
    src: "/images/ss3.jpg",
    alt: "Smart inventory sync workflow",
    badge: "Inventory sync",
  },
  "Barcode lookup": {
    src: "/images/ss2-ai.png",
    alt: "Barcode lookup retail POS workflow",
    badge: "Fast lookup",
  },
  "Returns and discounts": {
    src: "/images/ss1.jpg",
    alt: "Retail returns and discounts workflow",
    badge: "Cashier control",
  },
  "Product catalog & variants": {
    src: "/images/hero-local.png",
    alt: "Retail product catalog and variants workflow",
    badge: "Catalog control",
  },
  "Purchase orders": {
    src: "/images/enterprise_hub_3d.png",
    alt: "Retail purchase order workflow",
    badge: "Supplier ordering",
  },
  "Supplier receiving": {
    src: "/images/ss2.jpg",
    alt: "Retail supplier receiving workflow",
    badge: "Stock receiving",
  },
  "Multi-store transfers": {
    src: "/images/ss1-ai.png",
    alt: "Retail multi-store transfer dashboard",
    badge: "Store transfers",
  },
  "Promotions and loyalty": {
    src: "/images/hero-cafe.jpg",
    alt: "Retail promotions and loyalty workflow",
    badge: "Customer offers",
  },
  "Customer profiles": {
    src: "/images/mobile_app_3d.png",
    alt: "Retail customer profile workflow",
    badge: "Customer history",
  },
  "Shelf labels & barcode printing": {
    src: "/images/demo-thumb-ai.png",
    alt: "Retail shelf label and barcode printing workflow",
    badge: "Label printing",
  },
  "Accounting export": {
    src: "/images/online_ordering_3d.png",
    alt: "Retail accounting export dashboard",
    badge: "Finance export",
  },
  "Retail accounting export": {
    src: "/images/kitchen_display_3d.png",
    alt: "Retail accounting export dashboard",
    badge: "Retail finance",
  },
  "Retail analytics": {
    src: "/images/hero-restaurant.jpg",
    alt: "Retail analytics workflow",
    badge: "Store analytics",
  },
  "Multi-location dashboards": {
    src: "/images/enterprise_hub_3d.png",
    alt: "Multi-location dashboard workflow",
    badge: "Branch dashboards",
  },
  "Central menu control": {
    src: "/images/ss2-ai.png",
    alt: "Central menu control dashboard",
    badge: "Central controls",
  },
  "Cloud reporting": {
    src: "/images/demo-thumb-ai.png",
    alt: "Cloud reporting workflow",
    badge: "Live reporting",
  },
  "Operational visibility": {
    src: "/images/ss3-ai.png",
    alt: "Operational visibility workflow",
    badge: "Cloud visibility",
  },
  "Multi-store governance": {
    src: "/images/hero-local.png",
    alt: "Enterprise multi-store governance dashboard",
    badge: "Governance",
  },
  "Central rollout controls": {
    src: "/images/ss2-ai.png",
    alt: "Enterprise rollout control workflow",
    badge: "Rollout control",
  },
  "Consolidated reporting": {
    src: "/images/demo-thumb-ai.png",
    alt: "Consolidated enterprise reporting workflow",
    badge: "Reporting",
  },
  "Enterprise support path": {
    src: "/images/hero-retail.jpg",
    alt: "Enterprise support workflow",
    badge: "SLA path",
  },
  "Role permission matrix": {
    src: "/images/ss1.jpg",
    alt: "Enterprise role permission matrix dashboard",
    badge: "Role governance",
  },
  "Regional dashboards": {
    src: "/images/inventory_sync_3d.png",
    alt: "Enterprise regional dashboard workflow",
    badge: "Regional view",
  },
  "Branch hardware rollout": {
    src: "/images/demo-thumb.jpg",
    alt: "Enterprise branch hardware rollout workflow",
    badge: "Hardware rollout",
  },
  "API and ERP governance": {
    src: "/images/online_ordering_3d.png",
    alt: "Enterprise API and ERP governance dashboard",
    badge: "ERP governance",
  },
  "Audit and compliance": {
    src: "/images/ss3.jpg",
    alt: "Enterprise audit and compliance workflow",
    badge: "Audit trail",
  },
  "Franchise menu governance": {
    src: "/images/kitchen_display_3d.png",
    alt: "Franchise menu governance dashboard",
    badge: "Franchise controls",
  },
  "Location onboarding": {
    src: "/images/hero-cafe.jpg",
    alt: "Enterprise location onboarding workflow",
    badge: "Branch launch",
  },
  "Accounting and payout exports": {
    src: "/images/mobile_app_3d.png",
    alt: "Enterprise accounting and payout export dashboard",
    badge: "Finance export",
  },
  "Support SLA operations": {
    src: "/images/ss2.jpg",
    alt: "Enterprise support SLA operations workflow",
    badge: "SLA operations",
  },
  "Branded storefront": {
    src: "/images/hero-local.png",
    alt: "Branded online storefront workflow",
    badge: "Storefront",
  },
  "Pickup and delivery": {
    src: "/images/demo-thumb-ai.png",
    alt: "Pickup and delivery ordering workflow",
    badge: "Order channels",
  },
  "POS and KDS routing": {
    src: "/images/kitchen_display_3d.png",
    alt: "POS and KDS routing workflow",
    badge: "Order routing",
  },
  "Mobile web experience": {
    src: "/images/mobile_app_3d.png",
    alt: "Mobile web ordering experience",
    badge: "Mobile web",
  },
  "Server handhelds": {
    src: "/images/ss2-ai.png",
    alt: "Server handheld POS workflow",
    badge: "Handheld POS",
  },
  "Customer ordering": {
    src: "/images/hero-local.png",
    alt: "Customer mobile ordering workflow",
    badge: "Customer app",
  },
  "Mobile-first layouts": {
    src: "/images/ss3-ai.png",
    alt: "Mobile-first POS layouts",
    badge: "Mobile layout",
  },
  "Connected sync": {
    src: "/images/inventory_sync_3d.png",
    alt: "Connected mobile sync workflow",
    badge: "Connected sync",
  },
  "ERP sync": {
    src: "/images/demo-thumb-ai.png",
    alt: "ERP sync dashboard workflow",
    badge: "ERP bridge",
  },
  "White-label portals": {
    src: "/images/online_ordering_3d.png",
    alt: "White-label POS portal workflow",
    badge: "White-label",
  },
  "Hardware workflows": {
    src: "/images/hero-retail.jpg",
    alt: "Hardware POS workflow",
    badge: "Hardware ready",
  },
  "Dedicated builds": {
    src: "/images/hero-local.png",
    alt: "Dedicated custom POS build workflow",
    badge: "Custom build",
  },
  "Custom workflow design": {
    src: "/images/ss2-ai.png",
    alt: "Custom POS workflow design dashboard",
    badge: "Workflow design",
  },
  "API bridge development": {
    src: "/images/ss1.jpg",
    alt: "Custom API bridge and middleware workflow",
    badge: "API bridge",
  },
  "Web and mobile portals": {
    src: "/images/mobile_app_3d.png",
    alt: "Custom web and mobile portal workflow",
    badge: "Web + mobile",
  },
  "Payment and delivery integrations": {
    src: "/images/hero-cafe.jpg",
    alt: "Custom payment and delivery integration workflow",
    badge: "Integration flow",
  },
  "Device and hardware integrations": {
    src: "/images/demo-thumb.jpg",
    alt: "Custom device and hardware integration workflow",
    badge: "Device ready",
  },
  "Data migration": {
    src: "/images/inventory_sync_3d.png",
    alt: "Custom data migration workflow",
    badge: "Data migration",
  },
  "Custom reporting": {
    src: "/images/ss3.jpg",
    alt: "Custom reporting and BI dashboard workflow",
    badge: "BI reporting",
  },
  "Security and access rules": {
    src: "/images/kitchen_display_3d.png",
    alt: "Custom security and access rules workflow",
    badge: "Access control",
  },
  "Dedicated rollout support": {
    src: "/images/ss2.jpg",
    alt: "Dedicated custom POS rollout support workflow",
    badge: "Rollout support",
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
  "Offline register": [
    "Keep checkout, receipt printing, and counter sales moving during unreliable internet windows.",
    "Store sales locally and keep cashier workflows usable until connectivity is ready for sync.",
    "Protect basic retail operations from network interruptions during peak billing hours.",
  ],
  "Smart inventory": [
    "Track item movement, stock deductions, supplier signals, and inventory visibility across store workflows.",
    "Connect register activity with stock updates so inventory does not depend only on manual counting.",
    "Help teams identify low stock, fast-moving items, and operational stock gaps faster.",
  ],
  "Barcode lookup": [
    "Support scanner-ready billing with SKU lookup, category search, and item-level checkout controls.",
    "Speed up cashier workflows for retail counters, supermarkets, and high-volume stores.",
    "Reduce manual product entry by keeping barcode and catalog data close to the checkout flow.",
  ],
  "Returns and discounts": [
    "Give cashiers controlled workflows for refunds, discounts, voids, and manager approval actions.",
    "Keep sensitive actions visible so store teams can handle exceptions without losing accountability.",
    "Support cleaner retail operations where checkout speed and control both matter.",
  ],
  "Product catalog & variants": [
    "Manage SKUs, barcodes, categories, brands, variants, units, prices, taxes, and item availability in one catalog.",
    "Support size, color, pack, and bundle-style retail products without slowing down checkout teams.",
    "Keep product data connected to inventory, barcode lookup, shelf labels, and store-level reporting.",
  ],
  "Purchase orders": [
    "Create purchase orders for supplier restock needs based on low-stock signals and store demand.",
    "Keep incoming stock planning closer to actual sales movement instead of manual notes.",
    "Support cleaner purchasing workflows for stores that need better replenishment discipline.",
  ],
  "Supplier receiving": [
    "Receive supplier deliveries, update stock counts, and keep accepted quantities visible to store teams.",
    "Support receiving workflows for partial deliveries, stock checks, and inventory corrections.",
    "Help teams reduce stock mismatch between what was ordered, received, and available for sale.",
  ],
  "Multi-store transfers": [
    "Move inventory between branches, track transfer status, and keep store-level stock more accurate.",
    "Give managers a clearer way to rebalance stock when one location is overstocked and another is short.",
    "Keep transfer activity connected to inventory history and operational reporting.",
  ],
  "Promotions and loyalty": [
    "Run coupons, gift cards, promo pricing, customer rewards, and offer-based checkout workflows.",
    "Keep discount behavior controlled so staff can apply offers without losing approval visibility.",
    "Support repeat customer growth through profiles, purchase history, and loyalty signals.",
  ],
  "Customer profiles": [
    "Keep customer purchase history, contact details, loyalty activity, and return context in one workflow.",
    "Help cashiers identify returning customers and support better service without separate notes.",
    "Use customer history to support rewards, targeted offers, and cleaner post-sale support.",
  ],
  "Shelf labels & barcode printing": [
    "Print barcode labels, shelf tags, product stickers, and price labels around the active catalog.",
    "Support faster product setup when teams need labels for new SKUs, variants, or price updates.",
    "Keep label workflows tied to item data so stores avoid mismatched prices and scanner issues.",
  ],
  "Accounting export": [
    "Export retail sales, tax, payouts, discounts, refunds, register close totals, and payment summaries.",
    "Give finance teams cleaner close-day data without depending on manual spreadsheet rebuilds.",
    "Support accounting handoff around the same POS activity that cashiers and managers use daily.",
  ],
  "Retail accounting export": [
    "Export retail sales, tender totals, refund activity, discount usage, tax summaries, and register close reports.",
    "Give finance teams cleaner store-level data without rebuilding register activity by hand.",
    "Keep retail finance handoff connected to the same checkout, returns, and cashier workflows.",
  ],
  "Retail analytics": [
    "Track top-selling products, slow-moving stock, cashier activity, discounts, refunds, and branch performance.",
    "Help owners understand product movement, margin signals, and checkout behavior from one reporting layer.",
    "Keep store decisions grounded in live POS and inventory activity rather than delayed summaries.",
  ],
  "Multi-location dashboards": [
    "Compare branch activity, store performance, inventory movement, and operational signals in one place.",
    "Give owners a clearer view of what is happening across every location without switching systems.",
    "Support distributed teams with reporting that is built around store-level visibility.",
  ],
  "Central menu control": [
    "Push pricing, product, menu, and role updates across locations from a central control layer.",
    "Reduce repetitive branch-by-branch updates when operating models need consistency.",
    "Keep store teams aligned with current catalog, menu, and operational rules.",
  ],
  "Cloud reporting": [
    "Surface sales, inventory, staff activity, and performance trends through connected cloud reports.",
    "Help owners understand performance without waiting for manual exports or daily summaries.",
    "Keep reporting tied to live POS and inventory activity for better operational visibility.",
  ],
  "Operational visibility": [
    "Bring sales, stock, staff, and location workflows into one management view for business owners.",
    "Make remote oversight easier for teams running multiple stores, kitchens, or fulfillment models.",
    "Support faster decisions by keeping operational signals organized and readable.",
  ],
  "Multi-store governance": [
    "Standardize branch permissions, menu rules, manager actions, and operational workflows across locations.",
    "Give enterprise teams a stronger control model while still letting stores run day-to-day service.",
    "Keep multi-store operations consistent without turning every change into a manual rollout.",
  ],
  "Central rollout controls": [
    "Roll out price, menu, role, and workflow changes across stores from one managed platform layer.",
    "Support staged updates for growing teams that need consistency across franchise or branch models.",
    "Reduce operational drift between locations when menus, pricing, or access rules change.",
  ],
  "Consolidated reporting": [
    "View store performance, inventory patterns, and operating signals across branches in one report layer.",
    "Help leadership compare locations without depending on disconnected spreadsheets.",
    "Keep reporting useful for owners, managers, and operational teams at different levels.",
  ],
  "Enterprise support path": [
    "Plan rollout, onboarding, support, and implementation workflows for larger POS deployments.",
    "Give enterprise teams a clearer path for setup, service continuity, and operational handover.",
    "Support custom deployment needs without moving away from the main Quantix platform model.",
  ],
  "Role permission matrix": [
    "Control owner, regional manager, branch manager, cashier, kitchen, warehouse, and support roles from one access model.",
    "Keep sensitive actions such as refunds, voids, price overrides, exports, and branch settings behind approval rules.",
    "Help enterprise teams reduce permission drift as locations, roles, and operating teams grow.",
  ],
  "Regional dashboards": [
    "Compare sales, stock, staff activity, branch performance, and exception signals by region or location group.",
    "Give area managers a focused view without exposing every corporate-level control to every team.",
    "Support faster operational reviews for growing multi-store or franchise networks.",
  ],
  "Branch hardware rollout": [
    "Plan register terminals, receipt printers, scanners, card terminals, customer displays, and local sync devices by location.",
    "Keep hardware requirements tied to branch setup so new sites launch with a cleaner checklist.",
    "Support multi-branch device rollout without treating every store as a disconnected install.",
  ],
  "API and ERP governance": [
    "Connect enterprise POS data with ERP, accounting, inventory, warehouse, reporting, and finance workflows.",
    "Keep integration ownership clearer with controlled export, sync, and back-office data flows.",
    "Support custom business systems while keeping branch teams inside the same operating platform.",
  ],
  "Audit and compliance": [
    "Track manager overrides, refunds, voids, discounts, role changes, exports, and branch configuration updates.",
    "Give leadership clearer visibility into sensitive actions across locations and teams.",
    "Support operational compliance without forcing managers to rebuild activity history manually.",
  ],
  "Franchise menu governance": [
    "Standardize master menus, pricing, product catalogs, tax settings, and promotion rules across franchise groups.",
    "Allow branch-level execution while keeping corporate-approved catalog and pricing rules consistent.",
    "Reduce manual rollout work when product, menu, or promotion changes need to reach many stores.",
  ],
  "Location onboarding": [
    "Set up new branches with roles, catalog, hardware requirements, payment settings, reports, and operating rules.",
    "Support rollout checklists for implementation teams, managers, and support staff.",
    "Help new locations go live with a repeatable setup process instead of one-off manual setup.",
  ],
  "Accounting and payout exports": [
    "Export sales, tax, payouts, refunds, discounts, service charges, register close totals, and branch-level summaries.",
    "Give finance teams cleaner data across stores, regions, and brands without relying on manual spreadsheets.",
    "Keep close-day reporting connected to live POS activity and approval history.",
  ],
  "Support SLA operations": [
    "Create clearer support paths for enterprise onboarding, escalation, rollout assistance, and branch continuity.",
    "Support larger deployments with structured implementation, service handoff, and operational follow-up.",
    "Keep support workflows connected to branch setup, hardware readiness, and platform usage context.",
  ],
  "Branded storefront": [
    "Create a customer-facing ordering experience that uses your business identity and menu structure.",
    "Support direct orders without making the website feel disconnected from POS operations.",
    "Keep the storefront focused on ordering, pickup, delivery, and customer conversion.",
  ],
  "Pickup and delivery": [
    "Handle customer order types for pickup and delivery in a clear operational queue.",
    "Keep fulfillment status closer to restaurant and retail workflows instead of spreading it across tools.",
    "Support order handoff from customer checkout to preparation and delivery handling.",
  ],
  "POS and KDS routing": [
    "Route website orders into POS and kitchen display workflows so staff can act on them quickly.",
    "Keep online orders visible alongside in-store orders to reduce missed kitchen tickets.",
    "Support better coordination between web ordering, counter teams, and kitchen operations.",
  ],
  "Mobile web experience": [
    "Give customers a clean ordering experience from phone browsers without requiring app installation.",
    "Keep menus readable, checkout flows compact, and customer journeys easy on smaller screens.",
    "Support mobile-first ordering behavior while keeping the POS workflow connected.",
  ],
  "Server handhelds": [
    "Let staff take orders from the table, floor, or queue using compact mobile-first workflows.",
    "Keep order capture connected to POS, kitchen routing, and reporting instead of separate notes.",
    "Support faster service for teams that move around the venue instead of staying at one counter.",
  ],
  "Customer ordering": [
    "Create mobile customer journeys for browsing, ordering, account access, and checkout flows.",
    "Connect customer-facing actions with the operational POS workflow behind the counter.",
    "Keep self-service simple while preserving the business controls needed by the team.",
  ],
  "Mobile-first layouts": [
    "Use compact POS screens that stay readable on handheld devices and smaller displays.",
    "Prioritize the controls staff need most when working from a mobile or tablet interface.",
    "Keep mobile workflows practical for quick actions, ordering, billing, and status checks.",
  ],
  "Connected sync": [
    "Keep mobile workflows aligned with POS, kitchen, inventory, and reporting systems.",
    "Reduce duplicate entry by connecting handheld actions back into the main platform workflow.",
    "Support field-friendly operations while preserving central visibility.",
  ],
  "ERP sync": [
    "Bridge POS data with ERP, accounting, inventory, warehouse, and back-office workflows.",
    "Support cleaner operational reporting by reducing manual exports and duplicate data entry.",
    "Keep custom integrations focused around the business systems already in use.",
  ],
  "White-label portals": [
    "Create branded staff, customer, partner, or operator portals around the Quantix workflow.",
    "Support custom navigation, interface labels, and branded experiences for specialized teams.",
    "Give businesses a tailored platform layer without starting from a blank system.",
  ],
  "Hardware workflows": [
    "Plan workflows around printers, scanners, terminals, cash drawers, and venue-specific devices.",
    "Keep device needs connected to checkout, billing, receipt, and inventory operations.",
    "Support custom hardware behavior when standard POS flows are not enough.",
  ],
  "Dedicated builds": [
    "Design custom modules around business-specific workflows, reporting, and operational constraints.",
    "Support implementation planning for teams that need a tailored POS or platform extension.",
    "Keep custom work connected to the larger Quantix product direction instead of a standalone one-off tool.",
  ],
  "Custom workflow design": [
    "Map the business process first, then shape POS screens, approvals, reporting, and handoff states around real operations.",
    "Support non-standard flows such as multi-step fulfillment, approval routing, branch-specific rules, and custom statuses.",
    "Keep custom work connected to the main platform so the business does not end up with disconnected one-off tools.",
  ],
  "API bridge development": [
    "Create controlled API bridges for ERP, accounting, warehouse, delivery, payments, reporting, and internal systems.",
    "Support data sync decisions around what moves, when it moves, and which system remains the source of truth.",
    "Reduce duplicate entry by connecting operational POS data to the systems the business already depends on.",
  ],
  "Web and mobile portals": [
    "Build staff, customer, partner, manager, or operator portals around the Quantix platform workflow.",
    "Support web and mobile access patterns for teams that need role-specific tools outside the main register screen.",
    "Keep custom portals tied to POS data, access rules, and reporting instead of a separate disconnected app.",
  ],
  "Payment and delivery integrations": [
    "Plan integrations for card payments, online payments, delivery partners, order channels, and payout reporting.",
    "Keep payment and delivery status visible inside the operational workflow so teams do not chase external dashboards.",
    "Support cleaner handoff between customer checkout, preparation, delivery, payment status, and reporting.",
  ],
  "Device and hardware integrations": [
    "Connect printers, scanners, terminals, displays, local devices, and venue-specific hardware workflows.",
    "Support custom routing or device behavior when standard POS hardware flows are not enough for the operation.",
    "Keep device readiness and usage tied to billing, checkout, inventory, and branch workflows.",
  ],
  "Data migration": [
    "Plan migration of products, menus, customers, stock, branches, users, historical orders, and operational records.",
    "Reduce launch risk by treating data cleanup, import rules, and validation as part of the rollout workflow.",
    "Help teams move from old systems without losing the structure needed for reporting and daily operations.",
  ],
  "Custom reporting": [
    "Create reporting views for owners, finance, operations, branch managers, and support teams.",
    "Support custom metrics around sales, stock, payouts, tax, exceptions, fulfillment, and workflow performance.",
    "Keep business intelligence connected to live POS activity instead of delayed manual spreadsheets.",
  ],
  "Security and access rules": [
    "Define access rules for admins, managers, staff, support users, customers, and partner roles.",
    "Support approvals, audit visibility, permission boundaries, and sensitive workflow controls.",
    "Keep custom interfaces aligned with the same security expectations as the main platform.",
  ],
  "Dedicated rollout support": [
    "Plan discovery, implementation, testing, launch, training, support handoff, and iteration around the custom build.",
    "Support custom projects with a clearer delivery path instead of treating them as loose feature requests.",
    "Keep launch planning connected to data, hardware, integrations, users, and reporting readiness.",
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
      { title: "Delivery", desc: "Dispatch-ready delivery orders with prep, driver, and handoff status.", icon: Truck },
      { title: "Curbside pickup", desc: "Prepared orders for parking-lot or outside handoff workflows.", icon: Truck },
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
      { title: "Gift cards & coupons", desc: "Support gift card balances, coupon codes, promo offers, and loyalty rewards.", icon: Gift },
      { title: "Void/refund approvals", desc: "Control voids, refunds, discounts, and manager approval logs.", icon: RotateCcw },
      { title: "Kitchen prep timers", desc: "Track ticket age, prep time, bump actions, and station readiness.", icon: Timer },
      { title: "Menu scheduling", desc: "Schedule breakfast, lunch, dinner, happy-hour pricing, and item availability.", icon: CalendarClock },
      { title: "Allergen & nutrition labels", desc: "Display allergens, dietary notes, calories, and ingredient guidance.", icon: BadgePercent },
      { title: "Supplier stock orders", desc: "Support purchase orders, supplier restock signals, and stock receiving.", icon: PackageCheck },
      { title: "Delivery integrations", desc: "Connect online and delivery-channel orders into POS and kitchen routing.", icon: Truck },
      { title: "End-of-day Z reports", desc: "Summarize sales, cash, cards, taxes, discounts, voids, refunds, and shifts.", icon: ClipboardCheck },
      { title: "Waitlist + SMS updates", desc: "Send wait-time, table-ready, pickup, and order-status updates to guests.", icon: Smartphone },
      { title: "Tip pooling & distribution", desc: "Track service-charge splits, tip pooling, and staff payout summaries.", icon: Banknote },
      { title: "Restaurant accounting export", desc: "Export restaurant sales, service charges, tips, tax, payouts, discounts, refunds, and close-day totals.", icon: ReceiptText },
    ],
    workflows: [
      { title: "Table management", desc: "Interactive floor layouts, table status, course pacing, and split checks." },
      { title: "Kitchen display system", desc: "Station-based prep tickets for grill, bar, assembly, and expo screens." },
      { title: "Direct online ordering", desc: "Commission-free branded ordering with pickup and delivery routing." },
      { title: "QR code ordering", desc: "Guest self-ordering from table QR codes without installing an app." },
      { title: "Delivery dispatch", desc: "Track delivery orders, driver assignment, and live customer updates." },
      { title: "Loyalty workflows", desc: "Customer profiles, digital rewards, targeted offers, and repeat-visit flows." },
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
      {
        id: "restaurant-promos-delivery",
        question: "Can it handle promos, customer displays, and delivery integrations?",
        answer:
          "Yes. It can support customer display screens, gift cards, coupons, promo codes, waitlist SMS updates, menu scheduling, happy-hour pricing, third-party delivery integrations, and kitchen prep timer workflows.",
      },
      {
        id: "restaurant-accounting-tip-pooling",
        question: "Can it support tip pooling and accounting exports?",
        answer:
          "Yes. Restaurant POS can support tip pooling, service charge distribution, staff payout summaries, and restaurant finance exports for sales, tax, payouts, discounts, refunds, tips, and close-day totals.",
      },
      {
        id: "restaurant-staff-analytics",
        question: "Does it include staff and restaurant analytics?",
        answer:
          "Yes. It can support role permissions, shift controls, staff activity, item sales, peak hours, discounts, voids, and table turn reporting.",
      },
    ],
  },
  "retail-pos": {
    slug: "retail-pos",
    eyebrow: "Retail POS - counters, stores and supermarkets",
    title: "Retail POS & Inventory Register",
    description:
      "A fast retail checkout system for barcode billing, cashier permissions, stock deductions, returns, and offline counter sales.",
    points: [
      { title: "Barcode checkout", desc: "Scan products quickly with category lookup and item-level controls." },
      { title: "Cashier governance", desc: "Handle discounts, voids, returns, and manager approvals with confidence." },
      { title: "Inventory sync", desc: "Keep stock movement connected across counters, stores, and cloud reports." },
    ],
    orderModesContent: {
      badge: "Retail channels",
      title: "Sell across every retail counter and fulfillment flow",
      description:
        "In-store checkout, barcode sales, pickup, local delivery, pop-up counters, returns desk, wholesale orders, and online store sync stay connected to inventory and reporting.",
      imageSrc: "/images/hero-retail.jpg",
      imageAlt: "Retail POS selling channels and checkout workflow",
      topBadge: "Counter to pickup",
      bottomBadge: "Built for store operations",
      icon: Store,
    },
    orderModes: [
      { title: "In-store checkout", desc: "Fast walk-in billing for counters, stores, and supermarkets.", icon: Store },
      { title: "Barcode counter sales", desc: "Scanner-ready checkout with SKU lookup and category search.", icon: Scan },
      { title: "Pickup orders", desc: "Prepare customer pickup orders with clear handoff status.", icon: ShoppingBag },
      { title: "Local delivery", desc: "Track delivery orders, packing status, and customer handoff.", icon: Truck },
      { title: "Online store sync", desc: "Connect web orders with store stock and register workflows.", icon: Globe2 },
      { title: "Pop-up kiosk", desc: "Run temporary counters, events, and compact selling points.", icon: Monitor },
      { title: "Returns desk", desc: "Process returns, exchanges, refunds, and manager approval flows.", icon: RotateCcw },
      { title: "Wholesale orders", desc: "Handle bulk orders, account customers, and packaged stock movement.", icon: PackageCheck },
    ],
    billingHardwareContent: {
      badge: "Scanner & checkout hardware",
      title: "Keep every register fast, printable, and payment-ready",
      description:
        "Barcode scanners, receipt printers, label printing, cash drawers, customer displays, card terminals, tax rules, and close reports stay connected to the same retail register.",
      imageSrc: "/images/ss3-ai.png",
      imageAlt: "Retail POS scanner printer and payment terminal workflow",
      topBadge: "Scanner + printer ready",
      bottomBadge: "Built for retail checkout",
      icon: Scan,
    },
    billingHardware: [
      { title: "Counter barcode scanners", desc: "Scan SKUs, variants, packed items, and shelf labels quickly.", icon: Scan },
      { title: "Counter receipt printing", desc: "Print customer receipts, reprints, returns, and register invoices.", icon: ReceiptText },
      { title: "Label printing", desc: "Print barcode labels, shelf tags, product stickers, and price labels.", icon: Printer },
      { title: "Register cash drawer", desc: "Track retail cash payments, drawer actions, cashier sessions, and register close totals.", icon: Banknote },
      { title: "Checkout card terminal", desc: "Keep card payment status tied to each scanned basket and checkout transaction.", icon: CreditCard },
      { title: "Customer display", desc: "Show scanned items, discounts, totals, tax, and payment status.", icon: Monitor },
      { title: "Tax & discount rules", desc: "Apply taxes, coupons, markdowns, manager discounts, and promos.", icon: Calculator },
      { title: "Register close reports", desc: "Close shifts with cash, card, tax, refund, and discount totals.", icon: Clock },
    ],
    advancedControlsContent: {
      badge: "Advanced retail controls",
      title: "Control stock, promos, suppliers, and store exceptions",
      description:
        "Offline register mode, SKU catalog, low-stock alerts, supplier receiving, transfers, returns approvals, loyalty, audit logs, and accounting exports stay inside one retail POS workflow.",
      imageSrc: "/images/inventory_sync_3d.png",
      imageAlt: "Retail inventory and advanced store controls dashboard",
      topBadge: "Inventory command",
      bottomBadge: "Built for growing stores",
      icon: PackageCheck,
    },
    advancedControls: [
      { title: "Offline register mode", desc: "Keep counter billing usable during short internet outages.", icon: Cloud },
      { title: "SKU catalog & variants", desc: "Manage SKUs, colors, sizes, packs, brands, categories, and prices.", icon: Tags },
      { title: "Stock level sync", desc: "Deduct stock from checkout and keep store inventory updated.", icon: PackageCheck },
      { title: "Low-stock alerts", desc: "Spot items that need restock before the shelf runs empty.", icon: Timer },
      { title: "Purchase orders", desc: "Create supplier restock orders from inventory demand signals.", icon: Warehouse },
      { title: "Supplier receiving", desc: "Receive incoming stock and update accepted quantities cleanly.", icon: Truck },
      { title: "Multi-store transfers", desc: "Move stock between branches and track transfer status.", icon: Store },
      { title: "Returns/refund approvals", desc: "Control refunds, exchanges, voids, and manager overrides.", icon: RotateCcw },
      { title: "Coupons & gift cards", desc: "Support promo codes, gift cards, discounts, and customer offers.", icon: Gift },
      { title: "Customer loyalty profiles", desc: "Track purchase history, rewards, customer details, and return context.", icon: Users },
      { title: "Audit logs", desc: "Review sensitive cashier actions, discounts, refunds, and approval history.", icon: ShieldCheck },
      { title: "Retail accounting export", desc: "Export retail sales, tender totals, refund activity, tax summaries, and register close reports.", icon: ReceiptText },
    ],
    workflows: [
      { title: "Offline register", desc: "Continue checkout and receipt printing during unreliable internet windows." },
      { title: "Smart inventory", desc: "Track stock levels, deductions, supplier signals, and inventory movement." },
      { title: "Barcode lookup", desc: "Speed up billing with scanner-ready SKU and category lookup flows." },
      { title: "Returns and discounts", desc: "Control refunds, voids, discounts, and cashier approvals." },
      { title: "Product catalog & variants", desc: "Manage SKUs, barcodes, categories, brands, variants, pricing, and taxes." },
      { title: "Purchase orders", desc: "Create supplier restock orders from low-stock signals and demand." },
      { title: "Supplier receiving", desc: "Receive stock deliveries, update quantities, and track accepted inventory." },
      { title: "Multi-store transfers", desc: "Move stock between branches and keep inventory history visible." },
      { title: "Promotions and loyalty", desc: "Run coupons, gift cards, promo pricing, rewards, and customer offers." },
      { title: "Customer profiles", desc: "Track customer purchase history, loyalty activity, and return context." },
      { title: "Shelf labels & barcode printing", desc: "Print barcode labels, shelf tags, stickers, and price labels." },
      { title: "Retail accounting export", desc: "Export retail sales, tender totals, refund activity, discounts, tax, and register close reports." },
      { title: "Retail analytics", desc: "Track product movement, cashier activity, discounts, refunds, and store performance." },
    ],
    imageSrc: "/images/pos_counter_3d.png",
    imageAlt: "Retail POS and inventory register",
    topBadge: "Retail-ready register",
    bottomBadge: "Scanner and printer ready",
    ctaLabel: "Start Retail POS Trial",
    ctaHref: "/sign-up",
    icon: Store,
    faqs: [
      {
        id: "retail-offline",
        question: "Can Retail POS work offline?",
        answer:
          "Yes. Retail POS supports offline-first register workflows so counter billing can continue and sync later when connectivity returns.",
      },
      {
        id: "retail-hardware",
        question: "Does it support barcode scanners and receipt printers?",
        answer:
          "Yes. The retail register is built for common barcode scanners, thermal receipt printers, cash drawers, and counter hardware.",
      },
      {
        id: "retail-stock",
        question: "Will checkout update inventory?",
        answer:
          "Yes. Checkout workflows can deduct stock and keep inventory signals connected across stores and cloud reports.",
      },
      {
        id: "retail-channels",
        question: "Can Retail POS support pickup, delivery, and online store orders?",
        answer:
          "Yes. Retail POS can support in-store checkout, barcode counter sales, pickup orders, local delivery, online store sync, pop-up counters, returns desk, and wholesale order workflows.",
      },
      {
        id: "retail-label-printing",
        question: "Can it print barcode labels and shelf tags?",
        answer:
          "Yes. Retail workflows can support receipt printing, barcode labels, shelf tags, product stickers, price labels, scanner-ready SKUs, and reprints.",
      },
      {
        id: "retail-supplier-transfers",
        question: "Does it support purchase orders and stock transfers?",
        answer:
          "Yes. Retail POS can support purchase orders, supplier receiving, low-stock alerts, accepted quantities, stock adjustments, and multi-store transfers.",
      },
      {
        id: "retail-promos-loyalty",
        question: "Can stores run coupons, gift cards, and loyalty?",
        answer:
          "Yes. It can support coupons, gift cards, promo pricing, markdowns, customer loyalty profiles, purchase history, and targeted customer offers.",
      },
      {
        id: "retail-accounting-audit",
        question: "Can it export accounting data and track cashier actions?",
        answer:
          "Yes. Retail POS can support retail finance exports for sales, tender totals, tax summaries, refunds, discounts, register close reports, and audit logs for cashier actions and manager approvals.",
      },
    ],
  },
  "cloud-pos": {
    slug: "cloud-pos",
    eyebrow: "Cloud POS - branches, teams and enterprise control",
    title: "Cloud POS & Multi-Location Management",
    description:
      "Give owners and enterprise teams a single cloud control layer for branch performance, inventory visibility, staff access, and reporting.",
    points: [
      { title: "Branch visibility", desc: "Monitor sales, stock, and operating signals across every location." },
      { title: "Central controls", desc: "Push menu, price, role, and workflow updates from one dashboard." },
      { title: "Live analytics", desc: "Track performance trends with connected sales and inventory reporting." },
    ],
    workflows: [
      { title: "Multi-location dashboards", desc: "Compare branches, stores, sales, stock, and team activity." },
      { title: "Central menu control", desc: "Push pricing, menus, roles, and operating changes to every location." },
      { title: "Cloud reporting", desc: "Review live performance trends from sales and inventory telemetry." },
      { title: "Operational visibility", desc: "Give owners a connected layer for distributed branch management." },
    ],
    imageSrc: "/images/inventory_sync_3d.png",
    imageAlt: "Cloud POS multi-location inventory dashboard",
    topBadge: "Cloud command center",
    bottomBadge: "Multi-location ready",
    ctaLabel: "Explore Cloud POS",
    ctaHref: "/enterprise-vs-standalone",
    icon: Cloud,
    faqs: [
      {
        id: "cloud-locations",
        question: "Can Cloud POS manage multiple locations?",
        answer:
          "Yes. Cloud POS is designed for branch visibility, centralized controls, reporting, and inventory oversight across multiple locations.",
      },
      {
        id: "cloud-control",
        question: "Can menu and pricing updates be pushed centrally?",
        answer:
          "Yes. Enterprise teams can push menu, price, role, and workflow updates from a central dashboard.",
      },
      {
        id: "cloud-reports",
        question: "Does it include live analytics?",
        answer:
          "Yes. Cloud POS includes live analytics for sales, inventory, staff activity, and location-level performance trends.",
      },
    ],
  },
  "enterprise-pos": {
    slug: "enterprise-pos",
    eyebrow: "Enterprise POS - branch controls and multi-store teams",
    title: "Enterprise POS for Multi-Store Teams",
    description:
      "Centralize branch operations with menu rollouts, staff controls, inventory visibility, and reporting for growing multi-store teams.",
    points: [
      { title: "Branch controls", desc: "Manage roles, operating settings, and branch workflows from a central platform." },
      { title: "Menu rollouts", desc: "Push menus, price changes, and product updates across locations with less manual work." },
      { title: "Central analytics", desc: "Review inventory, sales, and performance signals for every store from one place." },
    ],
    orderModesContent: {
      badge: "Enterprise operating models",
      title: "Control every store, region, and brand from one POS layer",
      description:
        "Multi-location branches, franchise groups, restaurant networks, retail chains, cloud-managed registers, warehouses, and mobile teams stay connected to the same enterprise control layer.",
      imageSrc: "/images/enterprise_hub_3d.png",
      imageAlt: "Enterprise POS operating model and branch network",
      topBadge: "Multi-location hub",
      bottomBadge: "Built for enterprise rollouts",
      icon: Server,
    },
    orderModes: [
      { title: "Multi-location branches", desc: "Run many stores with central visibility and branch-level execution.", icon: Store },
      { title: "Franchise groups", desc: "Standardize catalog, pricing, approvals, and reporting across franchise teams.", icon: Server },
      { title: "Regional teams", desc: "Give area managers dashboards for region-level operations.", icon: Users },
      { title: "Restaurant networks", desc: "Support kitchen, table, delivery, and branch reporting workflows at scale.", icon: Utensils },
      { title: "Retail chains", desc: "Control checkout, inventory, returns, and store performance across locations.", icon: ShoppingBag },
      { title: "Cloud-managed registers", desc: "Keep register rules, role access, and reporting aligned from the cloud.", icon: Cloud },
      { title: "Warehouse and stock hubs", desc: "Connect supplier, receiving, transfers, and branch inventory movement.", icon: Warehouse },
      { title: "Mobile field teams", desc: "Support managers and branch teams working across sites and devices.", icon: Smartphone },
    ],
    billingHardwareContent: {
      badge: "Rollout & hardware governance",
      title: "Standardize registers, terminals, and branch device readiness",
      description:
        "Register terminals, printers, scanners, card terminals, cash drawer rules, local sync, customer displays, and hardware checklists stay planned per branch rollout.",
      imageSrc: "/images/pos_counter_3d.png",
      imageAlt: "Enterprise POS branch hardware rollout workflow",
      topBadge: "Branch device rollout",
      bottomBadge: "Registers, printers and terminals ready",
      icon: Monitor,
    },
    billingHardware: [
      { title: "Register terminals", desc: "Plan terminal setup, branch assignment, and register readiness.", icon: Monitor },
      { title: "Receipt printers", desc: "Standardize customer receipts, kitchen tickets, and branch print routing.", icon: Printer },
      { title: "Branch scanner rollout", desc: "Standardize scanner-ready retail and inventory workflows across every branch.", icon: Scan },
      { title: "Payment terminals", desc: "Keep card terminal setup and payment status aligned with branches.", icon: CreditCard },
      { title: "Cash drawer policy", desc: "Track cash handling, close totals, and manager accountability by location.", icon: Banknote },
      { title: "Customer displays", desc: "Show customer-facing totals, tax, discounts, and payment states.", icon: Monitor },
      { title: "Branch local sync", desc: "Support branch continuity with register coordination and location-level sync rules.", icon: Server },
      { title: "Hardware checklists", desc: "Track device readiness during new branch onboarding and rollout.", icon: ClipboardCheck },
    ],
    advancedControlsContent: {
      badge: "Enterprise governance",
      title: "Run permissions, rollouts, audits, and exports with control",
      description:
        "Role matrices, central rollouts, regional dashboards, franchise controls, API/ERP governance, audit trails, location onboarding, accounting exports, and SLA operations stay managed in one place.",
      imageSrc: "/images/ss1-ai.png",
      imageAlt: "Enterprise POS governance and reporting dashboard",
      topBadge: "Governance layer",
      bottomBadge: "Built for multi-store leadership",
      icon: ShieldCheck,
    },
    advancedControls: [
      { title: "Role permission matrix", desc: "Control owner, regional, branch, cashier, kitchen, warehouse, and support roles.", icon: ShieldCheck },
      { title: "Central catalog rollout", desc: "Push products, menus, prices, taxes, and promotions across locations.", icon: Tags },
      { title: "Regional dashboards", desc: "Compare branch sales, stock, staff activity, and exceptions by region.", icon: BarChart3 },
      { title: "Franchise governance", desc: "Keep approved menus, pricing, brand rules, and branch controls consistent.", icon: Server },
      { title: "API and ERP governance", desc: "Connect POS data with ERP, accounting, warehouse, and reporting systems.", icon: Code2 },
      { title: "Audit and compliance", desc: "Track refunds, voids, overrides, exports, role changes, and approvals.", icon: ClipboardCheck },
      { title: "Location onboarding", desc: "Launch new branches with setup checklists, roles, devices, and rules.", icon: CalendarClock },
      { title: "Accounting and payouts", desc: "Export branch sales, tender groups, payouts, refunds, tax summaries, and regional close reports.", icon: ReceiptText },
      { title: "Support SLA operations", desc: "Plan rollout support, escalation paths, and service continuity.", icon: Headset },
      { title: "Multi-brand controls", desc: "Separate brands, branches, catalogs, roles, and reports under one platform.", icon: Store },
      { title: "Approval workflows", desc: "Require manager approval for refunds, discounts, voids, and sensitive actions.", icon: RotateCcw },
      { title: "Enterprise reporting", desc: "Consolidate sales, inventory, staff, branch, and performance data.", icon: BarChart3 },
    ],
    workflows: [
      { title: "Multi-store governance", desc: "Standardize permissions, menu rules, and operational workflows across branches." },
      { title: "Central rollout controls", desc: "Push updates across restaurants, stores, teams, and enterprise locations." },
      { title: "Consolidated reporting", desc: "Track store performance, sales trends, and stock visibility from one dashboard." },
      { title: "Enterprise support path", desc: "Plan implementation, rollout, and service workflows for larger deployments." },
      { title: "Role permission matrix", desc: "Manage enterprise access rules for leadership, regions, branches, and staff." },
      { title: "Regional dashboards", desc: "Give area teams focused reporting across branch groups and regions." },
      { title: "Branch hardware rollout", desc: "Plan registers, printers, scanners, terminals, displays, and sync devices." },
      { title: "API and ERP governance", desc: "Connect POS data with ERP, accounting, warehouse, and reporting workflows." },
      { title: "Audit and compliance", desc: "Track sensitive actions, approvals, exports, overrides, and branch changes." },
      { title: "Franchise menu governance", desc: "Keep menus, pricing, catalog rules, and promotions consistent across franchise groups." },
      { title: "Location onboarding", desc: "Launch new stores with repeatable setup, hardware, role, and reporting checklists." },
      { title: "Accounting and payout exports", desc: "Export branch sales, tender groups, payouts, refunds, taxes, and regional finance summaries." },
      { title: "Support SLA operations", desc: "Plan rollout assistance, escalation workflows, and enterprise support continuity." },
    ],
    imageSrc: "/images/ss3-ai.png",
    imageAlt: "Enterprise POS branch management dashboard",
    topBadge: "Enterprise-ready workflow",
    bottomBadge: "Built for multi-store teams",
    ctaLabel: "Explore Enterprise POS",
    ctaHref: "/enterprise-vs-standalone",
    icon: Server,
    faqs: [
      {
        id: "enterprise-locations",
        question: "Is Enterprise POS made for multi-store teams?",
        answer:
          "Yes. Enterprise POS is designed for centralized branch controls, menu rollouts, inventory visibility, and reporting across multiple locations.",
      },
      {
        id: "enterprise-rollouts",
        question: "Can updates be rolled out across every branch?",
        answer:
          "Yes. Enterprise workflows can support centralized menu, price, role, and operating updates for branch teams.",
      },
      {
        id: "enterprise-reporting",
        question: "Does it include consolidated reporting?",
        answer:
          "Yes. Enterprise POS can surface sales, inventory, staff, and performance reporting from multiple stores in one operating layer.",
      },
      {
        id: "enterprise-permissions",
        question: "Can Enterprise POS control roles and approvals?",
        answer:
          "Yes. Enterprise POS can support role permission matrices, manager approvals, refund and void controls, branch access rules, and sensitive action audit logs.",
      },
      {
        id: "enterprise-hardware-rollout",
        question: "Can it help standardize branch hardware rollouts?",
        answer:
          "Yes. Enterprise workflows can plan register terminals, receipt printers, barcode scanners, payment terminals, cash drawers, customer displays, local sync services, and device readiness checklists.",
      },
      {
        id: "enterprise-erp-accounting",
        question: "Can it connect with ERP and accounting workflows?",
        answer:
          "Yes. Enterprise POS can support API and ERP governance, branch finance exports, payout summaries, tax reporting, refunds, discounts, regional close reports, and location-level finance handoff.",
      },
      {
        id: "enterprise-franchise",
        question: "Can it support franchise or multi-brand operations?",
        answer:
          "Yes. Enterprise POS can support franchise menu governance, multi-brand controls, central catalog rollout, regional dashboards, branch onboarding, and consolidated reporting.",
      },
      {
        id: "enterprise-sla",
        question: "Does it include support and rollout planning?",
        answer:
          "Yes. Enterprise workflows can include location onboarding, rollout planning, escalation paths, support SLA operations, and implementation handoff for larger deployments.",
      },
    ],
  },
  websites: {
    slug: "websites",
    eyebrow: "Websites - online menus and direct ordering",
    title: "Website Ordering & Online Menu Platform",
    description:
      "Launch branded online menus, customer ordering websites, pickup workflows, delivery routing, and order sync around your POS.",
    points: [
      { title: "Online menus", desc: "Publish branded menus for pickup, delivery, and customer self-service." },
      { title: "Direct ordering", desc: "Route commission-free orders into POS and kitchen workflows." },
      { title: "Order status updates", desc: "Keep customers informed through clean web ordering flows." },
    ],
    workflows: [
      { title: "Branded storefront", desc: "Use your brand for direct online ordering instead of marketplace-only ordering." },
      { title: "Pickup and delivery", desc: "Support ordering flows for customer pickup and delivery operations." },
      { title: "POS and KDS routing", desc: "Send online orders into register and kitchen display workflows." },
      { title: "Mobile web experience", desc: "Give customers a responsive ordering experience from any phone browser." },
    ],
    imageSrc: "/images/online_ordering_3d.png",
    imageAlt: "Online ordering website application",
    topBadge: "Web ordering ready",
    bottomBadge: "Menus, pickup and delivery",
    ctaLabel: "Launch Website Ordering",
    ctaHref: "/contact",
    icon: Globe2,
    faqs: [
      {
        id: "website-orders",
        question: "Can website orders route into POS?",
        answer:
          "Yes. Website ordering can route customer orders into POS and kitchen display workflows for pickup and delivery.",
      },
      {
        id: "website-brand",
        question: "Can the website use my brand?",
        answer:
          "Yes. The website ordering flow is built for branded menus, customer-facing ordering, and direct business control.",
      },
      {
        id: "website-mobile",
        question: "Does it work on mobile browsers?",
        answer:
          "Yes. Customer ordering pages are designed for responsive mobile web usage without requiring a downloaded app.",
      },
    ],
  },
  "mobile-application": {
    slug: "mobile-application",
    eyebrow: "Mobile application - handheld and customer workflows",
    title: "Mobile Application Workflows",
    description:
      "Support handheld ordering, mobile billing, customer app journeys, and field-friendly POS workflows connected to your platform.",
    points: [
      { title: "Handheld ordering", desc: "Take table or counter orders from mobile-first screens." },
      { title: "Mobile billing", desc: "Support compact billing workflows for teams that move around the floor." },
      { title: "Customer app flows", desc: "Build customer ordering and account experiences around your POS." },
    ],
    workflows: [
      { title: "Server handhelds", desc: "Give staff a mobile workflow for taking orders away from the counter." },
      { title: "Customer ordering", desc: "Support self-service journeys and mobile-friendly checkout flows." },
      { title: "Mobile-first layouts", desc: "Keep POS screens compact, readable, and operational on smaller devices." },
      { title: "Connected sync", desc: "Keep mobile workflows aligned with POS, kitchen, and reporting systems." },
    ],
    imageSrc: "/images/mobile_app_3d.png",
    imageAlt: "Mobile POS application screens",
    topBadge: "Mobile-ready workflows",
    bottomBadge: "Handheld and customer app ready",
    ctaLabel: "Plan Mobile App",
    ctaHref: "/contact",
    icon: Smartphone,
    faqs: [
      {
        id: "mobile-staff",
        question: "Can staff use handheld ordering?",
        answer:
          "Yes. Mobile workflows can support handheld ordering for table service, counter movement, and floor operations.",
      },
      {
        id: "mobile-customer",
        question: "Can Quantix support customer app flows?",
        answer:
          "Yes. Mobile application workflows can support customer ordering, account journeys, and app-like business experiences.",
      },
      {
        id: "mobile-sync",
        question: "Does mobile sync with POS and kitchen workflows?",
        answer:
          "Yes. Mobile workflows can stay connected to POS, kitchen display, reporting, and order management systems.",
      },
    ],
  },
  "custom-service": {
    slug: "custom-service",
    eyebrow: "Custom service - APIs, white-label and ERP bridges",
    title: "Custom POS Solutions & Integrations",
    description:
      "Build white-label POS experiences, API bridges, ERP sync, hardware integrations, and dedicated workflows around your operating model.",
    points: [
      { title: "Custom workflows", desc: "Build flows for complex operations that standard POS pages cannot cover." },
      { title: "API bridges", desc: "Connect POS data with ERP, accounting, inventory, and external platforms." },
      { title: "White-label options", desc: "Package branded POS portals, dashboards, and customer workflows." },
    ],
    orderModesContent: {
      badge: "Custom solution types",
      title: "Shape POS around the workflow your business actually runs",
      description:
        "White-label POS, custom workflow modules, API bridges, web portals, mobile tools, dashboards, hardware integrations, and data migration can be planned around your operating model.",
      imageSrc: "/images/ss1-ai.png",
      imageAlt: "Custom POS solution types and workflow dashboard",
      topBadge: "Custom build paths",
      bottomBadge: "Built around your operation",
      icon: Wrench,
    },
    orderModes: [
      { title: "White-label POS", desc: "Branded POS portals, staff screens, dashboards, and customer experiences.", icon: Layers },
      { title: "Custom workflow module", desc: "Build operational flows that standard POS pages cannot cover.", icon: Workflow },
      { title: "ERP/API bridge", desc: "Connect POS data with ERP, accounting, warehouse, and internal systems.", icon: Webhook },
      { title: "Web portal", desc: "Create staff, customer, partner, manager, or operator web portals.", icon: Globe2 },
      { title: "Mobile workflow", desc: "Support custom mobile screens for field, floor, or customer workflows.", icon: Smartphone },
      { title: "Custom dashboard", desc: "Create reporting views for owners, finance, operations, and support teams.", icon: BarChart3 },
      { title: "Hardware integration", desc: "Plan device-specific behavior for printers, scanners, terminals, and displays.", icon: Monitor },
      { title: "Data migration", desc: "Move products, menus, customers, branches, stock, users, and history cleanly.", icon: Database },
    ],
    billingHardwareContent: {
      badge: "Integration & device layer",
      title: "Connect custom APIs, devices, payments, and back-office systems",
      description:
        "API endpoints, webhooks, ERP bridges, accounting exports, payment flows, delivery channels, hardware routing, and local sync can be shaped around the systems already in use.",
      imageSrc: "/images/pos_counter_3d.png",
      imageAlt: "Custom POS integrations and device workflow",
      topBadge: "API + hardware ready",
      bottomBadge: "Connected device and system workflows",
      icon: Webhook,
    },
    billingHardware: [
      { title: "API endpoints", desc: "Expose controlled data flows for POS, orders, stock, customers, and reporting.", icon: Code2 },
      { title: "Webhooks", desc: "Trigger downstream workflows when orders, payments, stock, or status changes.", icon: Webhook },
      { title: "ERP connector", desc: "Bridge inventory, finance, branch, warehouse, and operational data.", icon: Server },
      { title: "Custom finance export", desc: "Shape export files for sales, tax, payouts, refunds, discounts, close totals, and back-office needs.", icon: ReceiptText },
      { title: "Payment integration", desc: "Connect online, card, payout, refund, and payment-status workflows.", icon: CreditCard },
      { title: "Delivery integration", desc: "Route delivery-channel orders and fulfillment status into POS workflows.", icon: Truck },
      { title: "Device routing", desc: "Connect printers, scanners, terminals, customer displays, and local devices.", icon: Printer },
      { title: "Custom local sync", desc: "Coordinate branch, register, background, or middleware sync behavior when the workflow needs it.", icon: Cloud },
    ],
    advancedControlsContent: {
      badge: "Delivery governance",
      title: "Plan, secure, test, and launch custom work properly",
      description:
        "Discovery, UX/UI prototypes, access rules, data migration, QA, staged rollout, admin training, documentation, analytics, and SLA support keep custom projects production-ready.",
      imageSrc: "/images/enterprise_hub_3d.png",
      imageAlt: "Custom solution rollout governance dashboard",
      topBadge: "Delivery plan",
      bottomBadge: "Built with rollout and support",
      icon: ClipboardCheck,
    },
    advancedControls: [
      { title: "Discovery and scope", desc: "Map workflows, users, systems, data, constraints, and launch priorities.", icon: ClipboardCheck },
      { title: "UX/UI prototype", desc: "Shape custom screens before build so teams can review the flow early.", icon: Monitor },
      { title: "Role and security rules", desc: "Define admin, manager, staff, support, customer, and partner access.", icon: LockKeyhole },
      { title: "Data migration plan", desc: "Prepare import rules, cleanup, validation, and launch-ready datasets.", icon: Database },
      { title: "Testing and QA", desc: "Validate workflows, integrations, edge cases, roles, devices, and reports.", icon: ShieldCheck },
      { title: "Staged rollout", desc: "Launch by branch, team, module, or workflow to reduce go-live risk.", icon: CalendarClock },
      { title: "Admin training", desc: "Prepare managers and operators for daily use, changes, and support paths.", icon: Users },
      { title: "Documentation", desc: "Document workflows, settings, handoff rules, and operational procedures.", icon: ReceiptText },
      { title: "Custom reporting", desc: "Track operational KPIs, finance exports, exceptions, and workflow usage.", icon: BarChart3 },
      { title: "Change request path", desc: "Keep future iterations organized instead of turning every update into chaos.", icon: Wrench },
      { title: "Audit visibility", desc: "Track sensitive actions, approvals, exports, and configuration changes.", icon: ShieldCheck },
      { title: "Dedicated support", desc: "Plan implementation support, escalation, maintenance, and SLA-style handoff.", icon: Headset },
    ],
    workflows: [
      { title: "ERP sync", desc: "Bridge POS workflows with accounting, finance, warehouse, or back-office platforms." },
      { title: "White-label portals", desc: "Create branded staff, customer, or partner-facing interfaces." },
      { title: "Hardware workflows", desc: "Connect custom terminal, printer, scanner, and device-specific needs." },
      { title: "Dedicated builds", desc: "Plan custom modules with implementation support and defined business workflows." },
      { title: "Custom workflow design", desc: "Map unique business operations into screens, statuses, approvals, and handoffs." },
      { title: "API bridge development", desc: "Create controlled middleware between POS, ERP, accounting, warehouse, and apps." },
      { title: "Web and mobile portals", desc: "Build role-specific portals for staff, customers, partners, and managers." },
      { title: "Payment and delivery integrations", desc: "Connect payments, payouts, refunds, delivery channels, and order status." },
      { title: "Device and hardware integrations", desc: "Support printers, scanners, terminals, displays, and local device behavior." },
      { title: "Data migration", desc: "Move products, menus, stock, customers, branches, users, and historical records." },
      { title: "Custom reporting", desc: "Create dashboards and exports for owners, operations, finance, and support." },
      { title: "Security and access rules", desc: "Define permissions, approvals, audit visibility, and role boundaries." },
      { title: "Dedicated rollout support", desc: "Plan discovery, implementation, QA, launch, training, and support handoff." },
    ],
    imageSrc: "/images/ss3-ai.png",
    imageAlt: "Custom POS platform dashboard",
    topBadge: "Custom digital workflows",
    bottomBadge: "Web, mobile and API ready",
    ctaLabel: "Talk to Custom Team",
    ctaHref: "/contact",
    icon: Code2,
    faqs: [
      {
        id: "custom-api",
        question: "Can Quantix connect with existing business systems?",
        answer:
          "Yes. Custom services can include API bridges for ERP, accounting, warehouse, reporting, and business workflow tools.",
      },
      {
        id: "custom-white-label",
        question: "Can the POS be white-labeled?",
        answer:
          "Yes. Custom service can support branded portals, POS experiences, and customer-facing workflows.",
      },
      {
        id: "custom-hardware",
        question: "Can custom hardware workflows be supported?",
        answer:
          "Yes. Custom integrations can be planned around printers, scanners, terminals, and device-specific operations.",
      },
      {
        id: "custom-workflow-modules",
        question: "Can Custom Solution support workflows that standard POS pages do not cover?",
        answer:
          "Yes. Custom Solution can support custom workflow modules, approval flows, operational statuses, branch-specific rules, role-specific screens, and business-specific handoffs.",
      },
      {
        id: "custom-web-mobile",
        question: "Can it include custom web and mobile portals?",
        answer:
          "Yes. Custom Solution can include web portals, mobile workflows, white-label dashboards, customer portals, staff tools, partner screens, and manager interfaces.",
      },
      {
        id: "custom-payments-delivery",
        question: "Can it connect payments, delivery, and back-office systems?",
        answer:
          "Yes. Custom integrations can support payment flows, delivery channels, ERP bridges, accounting exports, warehouse systems, reporting tools, webhooks, and controlled API endpoints.",
      },
      {
        id: "custom-data-migration",
        question: "Can old product, customer, stock, and branch data be migrated?",
        answer:
          "Yes. Custom Solution can include data migration planning for products, menus, customers, branches, users, stock, historical orders, import rules, cleanup, and validation.",
      },
      {
        id: "custom-security-reporting",
        question: "Can custom access rules and reporting be added?",
        answer:
          "Yes. Custom Solution can include role and security rules, approvals, audit visibility, custom dashboards, finance exports, operational KPIs, and workflow usage reporting.",
      },
      {
        id: "custom-rollout-support",
        question: "Does Custom Solution include rollout and support planning?",
        answer:
          "Yes. Custom projects can include discovery, scoping, UX/UI prototypes, QA, staged rollout, admin training, documentation, support handoff, and ongoing change request planning.",
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

              return (
                <motion.div
                  key={mode.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ ...motionTransition, delay: index * 0.04 }}
                  className="group/mode flex items-start gap-2.5 border-t border-slate-200/90 pt-2.5 transition-colors hover:border-primary/35 dark:border-slate-800"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/mode:bg-primary group-hover/mode:text-white dark:bg-primary/15 dark:text-primary-light">
                    <ModeIcon className="h-4 w-4 stroke-[2.4]" />
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

                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ ...motionTransition, delay: index * 0.04 }}
                    className="group/hardware flex items-start gap-2.5 border-t border-slate-200/90 pt-2.5 transition-colors hover:border-primary/35 dark:border-slate-800"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/hardware:bg-primary group-hover/hardware:text-white dark:bg-primary/15 dark:text-primary-light">
                      <ItemIcon className="h-4 w-4 stroke-[2.4]" />
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

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ ...motionTransition, delay: index * 0.035 }}
                  className="group/control flex items-start gap-2.5 border-t border-slate-200/90 pt-2.5 transition-colors hover:border-primary/35 dark:border-slate-800"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/control:bg-primary group-hover/control:text-white dark:bg-primary/15 dark:text-primary-light">
                    <ItemIcon className="h-4 w-4 stroke-[2.4]" />
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
              <Link href="/#products-showcase" className="transition-colors hover:text-primary">
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

        {solution.orderModes && (
          <OrderModesSection orderModes={solution.orderModes} content={solution.orderModesContent} />
        )}
        {solution.billingHardware && (
          <BillingHardwareSection items={solution.billingHardware} content={solution.billingHardwareContent} />
        )}
        {solution.advancedControls && (
          <AdvancedControlsSection items={solution.advancedControls} content={solution.advancedControlsContent} />
        )}

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

        <FAQSection faqs={solution.faqs} isLoading={false} />
      </main>

      <Footer />
    </PublicLayout>
  );
}
