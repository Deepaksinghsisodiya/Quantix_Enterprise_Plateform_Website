export interface HowItWorksStep {
  number: string;
  badgeLabel: string;
  badgeIconName: "reach" | "process" | "delivery";
  badgeColor: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bullets: string[];
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    badgeLabel: "Step 01 — Connect",
    badgeIconName: "reach",
    badgeColor: "bg-indigo-100/90 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60",
    title: "Connect Your Systems",
    description: "Connect your existing POS terminals, ERP, payment gateways, CRM, and business systems into one unified platform without disruption.",
    imageSrc: "/images/ent_bi_analytics_bundle.png",
    imageAlt: "Connect your existing POS, ERP and business systems",
    bullets: [
      "Zero-downtime data migration for menus, product catalogs, and historical sales.",
      "Direct API integrations with existing enterprise systems, accounting, and payment processors.",
    ],
  },
  {
    number: "02",
    badgeLabel: "Step 02 — Configure",
    badgeIconName: "process",
    badgeColor: "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    title: "Configure Your Organization",
    description: "Set up store locations, centralized menus, pricing tiers, staff permissions, regional taxes, and automated inventory rules.",
    imageSrc: "/images/nav_cloud_bundle.png",
    imageAlt: "Configure store locations, menus, pricing and permissions",
    bullets: [
      "Define granular manager permissions and role-based access across branches.",
      "Establish automated warehouse reorder points and inter-store transfer routes.",
    ],
  },
  {
    number: "03",
    badgeLabel: "Step 03 — Launch",
    badgeIconName: "delivery",
    badgeColor: "bg-blue-100/90 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60",
    title: "Launch Across Your Network",
    description: "Deploy POS to your locations and manage your entire multi-store operation centrally from Cloud HQ with real-time telemetry.",
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Deploy POS and manage operations from Cloud HQ",
    bullets: [
      "Push menu, catalog, and price updates instantly across all branches in one click.",
      "Track live consolidated revenue, inventory levels, and labor margins from anywhere.",
    ],
  },
];
