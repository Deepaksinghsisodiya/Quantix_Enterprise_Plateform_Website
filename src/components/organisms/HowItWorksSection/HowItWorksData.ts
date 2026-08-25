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
    badgeLabel: "Integration Setup",
    badgeIconName: "reach",
    badgeColor: "bg-indigo-100/90 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60",
    title: "Connect core ERP & legacy systems",
    description: "Our solutions engineering team helps you bridge existing ERPs, payment gateways, and CRM platforms into the central Hub.",
    imageSrc: "/images/retail_hardware_peripherals.jpg",
    imageAlt: "Quantix Enterprise integration setup",
    bullets: [
      "Establish secure API connections to SAP, NetSuite, and Workday.",
      "Import master data, product catalogs, and historical transactional records.",
    ],
  },
  {
    number: "02",
    badgeLabel: "Hierarchy Mapping",
    badgeIconName: "process",
    badgeColor: "bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    title: "Map multi-location structures",
    description: "Designate regional zones, franchise vs corporate groupings, tax profiles, and dynamic pricing tiers across the network.",
    imageSrc: "/images/hero_multi_location_hq.jpg",
    imageAlt: "Enterprise branch and hierarchy mapping",
    bullets: [
      "Define granular role-based access control (RBAC) and managerial permissions.",
      "Set up automatic data synchronization and global catalog inheritance rules.",
    ],
  },
  {
    number: "03",
    badgeLabel: "Network Rollout",
    badgeIconName: "delivery",
    badgeColor: "bg-blue-100/90 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60",
    title: "Deploy POS & centralize operations",
    description: "Deploy modernized POS endpoints to physical stores while headquarters monitors live telemetry and controls operations.",
    imageSrc: "/images/foodhub_pos_terminal.jpg",
    imageAlt: "Enterprise cloud network rollout",
    bullets: [
      "Push menu changes, pricing updates, and promotions instantly to all branches.",
      "Monitor real-time omnichannel sales, supply chain deductions, and live labor costs.",
    ],
  },
];
