import React from "react";
import type { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "Enterprise Capabilities & Core Features | Quantix Enterprise",
  description:
    "Explore the complete suite of enterprise POS capabilities: Multi-store HQ, live BI analytics, SAP/Oracle ERP sync, and zero-latency offline mesh.",
};

export default function FeaturesOverviewPage() {
  return <FeaturesClient />;
}
