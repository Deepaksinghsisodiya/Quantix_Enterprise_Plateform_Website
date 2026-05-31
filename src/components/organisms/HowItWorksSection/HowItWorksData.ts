// src/components/organisms/HowItWorksSection/HowItWorksData.ts
// Static step data for the "How It Works" section.
import { Users2, Settings2, TrendingUp } from "lucide-react";
import React from "react";

export interface HowItWorksStep {
  number: string;
  iconName: 'users' | 'settings' | 'trending';
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    iconName: "users",
    title: "Create your account",
    description:
      "Sign up in 2 minutes. Choose your industry — retail or restaurant. No credit card needed for your free trial.",
  },
  {
    number: "02",
    iconName: "settings",
    title: "Configure your store",
    description:
      "Add products, menu items, pricing, tax rates, and payment methods. Import existing data via CSV or API.",
  },
  {
    number: "03",
    iconName: "trending",
    title: "Go live and grow",
    description:
      "Start accepting payments immediately. Real-time analytics help you make smarter decisions from day one.",
  },
];
