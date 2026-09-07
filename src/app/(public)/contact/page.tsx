import React from "react";
import type { Metadata } from "next";
import { ContactView } from "@/features/Contact/components/ContactView";

export const metadata: Metadata = {
  title: "Contact Enterprise Sales & Solutions | Quantix POS",
  description:
    "Connect directly with a Quantix Enterprise Solution Architect. Discuss multi-location rollouts, ERP integrations, custom SLAs, and zero-downtime migration.",
};

export default function ContactPage() {
  return <ContactView />;
}
