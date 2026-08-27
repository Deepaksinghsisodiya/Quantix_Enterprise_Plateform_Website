import React from "react";
import type { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Enterprise Resources & Playbooks | Quantix Enterprise",
  description:
    "Technical blueprints, ERP telemetry guidelines, and shift settlement SOPs for multi-unit enterprise operations.",
};

export default function EnterpriseResourcesPage() {
  return <ResourcesClient />;
}
