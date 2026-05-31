"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import TestimonialsSectionWrapper from "@/features/Testimonials/TestimonialsSectionWrapper";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function TestimonialsPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-[70vh]">
        <TestimonialsSectionWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
