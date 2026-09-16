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
  stat: {
    value: string;
    label: string;
  };
  telemetryChips: {
    label: string;
    sublabel: string;
    status: "active" | "ready" | "verified";
  }[];
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    badgeLabel: "Step 01 — Connect",
    badgeIconName: "reach",
    badgeColor: "bg-orange-500/10 text-[#FF4F00] dark:bg-orange-500/15 dark:text-orange-400 border-orange-500/25",
    title: "Connect Enterprise Nodes & Catalogs",
    description: "Plug in dual-screen tills, barcode scanners, and import multi-store catalogs, price tiers, and inventory ledgers with zero downtime.",
    imageSrc: "/images/ent_bi_analytics_bundle_v2.png",
    imageAlt: "Connect enterprise terminals and sync catalogs",
    bullets: [
      "Bulk schema migration for legacy POS, ERP, and regional price lists.",
      "Instant plug-and-play setup for tills, cash drawers, and payment pinpads.",
    ],
    stat: {
      value: "< 15 min",
      label: "Average Lane Setup",
    },
    telemetryChips: [
      {
        label: "POS Terminals",
        sublabel: "Auto-detected & Paired",
        status: "active",
      },
      {
        label: "ERP Data Ledger",
        sublabel: "Catalog Synced 100%",
        status: "verified",
      },
    ],
  },
  {
    number: "02",
    badgeLabel: "Step 02 — Configure",
    badgeIconName: "process",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-500/25",
    title: "Configure Multi-Store Routing & Controls",
    description: "Set up automated commissary reorder triggers, offline LAN mesh failover, role-based cashier permissions, and regional tax groups.",
    imageSrc: "/images/nav_cloud_bundle_v2.png",
    imageAlt: "Configure franchise rules, mesh routing, and security permissions",
    bullets: [
      "Automated branch replenishment and inter-store inventory transfers.",
      "Granular RBAC cashier controls, shift limits, and manager overrides.",
    ],
    stat: {
      value: "100% LAN Mesh",
      label: "Zero-Downtime Resilience",
    },
    telemetryChips: [
      {
        label: "LAN Mesh Failover",
        sublabel: "Peer-to-Peer Standby",
        status: "ready",
      },
      {
        label: "Role-Based RBAC",
        sublabel: "Manager PINs Active",
        status: "verified",
      },
    ],
  },
  {
    number: "03",
    badgeLabel: "Step 03 — Operate",
    badgeIconName: "delivery",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-500/25",
    title: "Deploy Fleet & Monitor Central Cloud HQ",
    description: "Execute lightning-fast transactions across 500+ terminals, maintain continuous offline sales, and track real-time telemetry from Cloud HQ.",
    imageSrc: "/images/ent_global_pos_bundle.png",
    imageAlt: "Monitor global sales velocity and real-time cloud operations",
    bullets: [
      "100% offline billing keeps lanes moving during WAN drops with auto-sync.",
      "Real-time enterprise dashboard with hourly velocity and automated GL reconciliation.",
    ],
    stat: {
      value: "500+ Nodes",
      label: "Real-Time Fleet Scale",
    },
    telemetryChips: [
      {
        label: "Offline WAN Bypass",
        sublabel: "Local Queues Live",
        status: "active",
      },
      {
        label: "Central Cloud HQ",
        sublabel: "Instant Telemetry Sync",
        status: "verified",
      },
    ],
  },
];
