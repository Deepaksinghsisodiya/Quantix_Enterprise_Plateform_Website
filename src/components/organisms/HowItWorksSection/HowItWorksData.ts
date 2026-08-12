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
    badgeLabel: "Create",
    badgeIconName: "reach",
    badgeColor: "bg-purple-100/90 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60",
    title: "Create your account",
    description: "Choose your path for retail, restaurant, cloud enterprise, or standalone terminal workflows.",
    imageSrc: "/images/how_it_works_step1.png",
    imageAlt: "Quantix POS account creation and business setup dashboard",
    bullets: [
      "Select your industry model for retail, restaurant, cafe, or multi-store enterprise.",
      "Register your workspace and access cloud control dashboards instantly.",
    ],
  },
  {
    number: "02",
    badgeLabel: "Configure",
    badgeIconName: "process",
    badgeColor: "bg-amber-100/90 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
    title: "Configure your store",
    description: "Set up products, menu items, tax rules, staff access, printers, scanners, and payment methods.",
    imageSrc: "/images/how_it_works_step2.png",
    imageAlt: "Configure POS catalog, hardware devices and store settings",
    bullets: [
      "Add products, menu modifiers, tax rules, and receipt printer hardware.",
      "Set up employee roles, cashier permissions, and card payment terminals.",
    ],
  },
  {
    number: "03",
    badgeLabel: "Operate",
    badgeIconName: "delivery",
    badgeColor: "bg-cyan-100/90 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200/80 dark:border-cyan-800/60",
    title: "Go live and grow",
    description: "Run checkout, kitchen routing, inventory sync, and analytics from one connected POS platform.",
    imageSrc: "/images/how_it_works_step3.png",
    imageAlt: "Go live with POS billing, kitchen routing and cloud analytics",
    bullets: [
      "Process fast counter sales, tableside orders, and kitchen display ticket routing.",
      "Track live sales telemetry, inventory deductions, and automated daily reports.",
    ],
  },
];
