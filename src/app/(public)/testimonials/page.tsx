"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection/TestimonialsSection";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-white min-h-[70vh]">
        <TestimonialsSection />
      </main>

      <Footer />
    </PublicLayout>
  );
}
