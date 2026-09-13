// src/components/organisms/CTABanner/CTAData.ts
// Static copy and telemetry data for the Enterprise CTA Banner.

export const CTA_DATA = {
  badge: "RUN EVERY LOCATION FROM ONE PLATFORM",
  heading: "Ready to Run Every Location From",
  headingAccent: "One Unified Platform?",
  subheading:
    "Connect your POS terminals, inventory ledger, kitchen dispatch, and real-time sales across 1 to 500+ outlets. Zero migration risk with dedicated white-glove onboarding.",
  primaryCta: { label: "Start 14-Day Free Trial", href: "/contact" },
  secondaryCta: { label: "Book Enterprise Consultation", href: "/contact" },
  telemetryChips: [
    {
      id: "offline-mesh",
      label: "100% Offline LAN Mesh",
      dotColor: "bg-emerald-500",
      pingColor: "bg-emerald-400",
    },
    {
      id: "cloud-sync",
      label: "Real-Time Cloud HQ Sync",
      dotColor: "bg-[#FF4F00]",
      pingColor: "bg-orange-400",
    },
    {
      id: "security",
      label: "SOC-2 & PCI-DSS Certified",
      dotColor: "bg-blue-500",
      pingColor: "bg-blue-400",
    },
  ],
  trustBadges: [
    "14-Day Full Enterprise Access",
    "Zero Setup Fees or Hidden Costs",
    "Dedicated White-Glove Onboarding",
  ],
};
