"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import PricingWrapper from "@/features/Pricing/components/PricingWrapper";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function PricingPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300 min-h-[70vh]">
        <PricingWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
