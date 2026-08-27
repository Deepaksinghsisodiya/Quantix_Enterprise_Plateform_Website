import React from "react";
import type { Metadata } from "next";
import IntegrationsClient from "./IntegrationsClient";

export const metadata: Metadata = {
  title: "Enterprise Ecosystem Integrations | Quantix Enterprise",
  description:
    "Automate fleet terminal payments, ERP ledger journals, online delivery dispatching, and omnichannel inventory routing.",
};

export default function IntegrationsOverviewPage() {
  return <IntegrationsClient />;
}
