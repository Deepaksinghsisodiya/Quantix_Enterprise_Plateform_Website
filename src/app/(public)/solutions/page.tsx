import React from "react";
import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
  title: "Enterprise Solutions & Sector POS | Quantix Enterprise",
  description:
    "Explore purpose-built POS and cloud HQ infrastructure for 50+ unit franchise groups, high-capacity stadiums, and retail conglomerates.",
};

export default function SolutionsOverviewPage() {
  return <SolutionsClient />;
}
