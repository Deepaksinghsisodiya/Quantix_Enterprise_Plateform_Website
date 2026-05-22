"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { PlatformDemoSection } from "@/components/organisms/PlatformDemoSection/PlatformDemoSection";
import { FeaturesSection } from "@/components/organisms/FeaturesSection/FeaturesSection";
import { Footer } from "@/components/organisms/Footer/Footer";
import { cn } from "@/lib/utils";

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <Navbar />

      <div className="pt-20 bg-slate-950 text-white">
        <section className={cn("bg-white text-slate-900")}>
          <PlatformDemoSection />
        </section>

        <section className={cn("bg-gray-50 text-slate-900 border-t border-gray-100")}>
          <FeaturesSection />
        </section>
      </div>

      <Footer />
    </PublicLayout>
  );
}
