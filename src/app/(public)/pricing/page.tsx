// src/app/(public)/pricing/page.tsx
"use client";

import React from "react";
import PricingWrapper from "@/features/Pricing/components/PricingWrapper";
import FAQWrapper from "@/features/FAQ/FAQWrapper";

export default function PricingPage() {
  return (
    <main className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-[70vh]">
      <PricingWrapper />
      <FAQWrapper />
    </main>
  );
}
