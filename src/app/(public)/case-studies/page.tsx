"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { CaseStudiesWrapper } from "@/features/CaseStudies";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function CaseStudiesPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="bg-white dark:bg-slate-950 transition-colors duration-300 min-h-[70vh] pt-6 sm:pt-10">
        <CaseStudiesWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
