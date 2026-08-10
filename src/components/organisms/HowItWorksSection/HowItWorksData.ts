export interface HowItWorksStep {
  number: string;
  iconName: "users" | "settings" | "trending";
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    iconName: "users",
    title: "Create your account",
    description:
      "Choose your path for retail, restaurant, cloud enterprise, or standalone terminal workflows.",
  },
  {
    number: "02",
    iconName: "settings",
    title: "Configure your store",
    description:
      "Set up products, menu items, tax rules, staff access, printers, scanners, and payment methods.",
  },
  {
    number: "03",
    iconName: "trending",
    title: "Go live and grow",
    description:
      "Run checkout, kitchen routing, inventory sync, and analytics from one connected POS platform.",
  },
];
