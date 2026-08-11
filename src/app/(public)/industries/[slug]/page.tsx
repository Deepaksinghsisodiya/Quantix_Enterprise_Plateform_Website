// src/app/(public)/industries/[slug]/page.tsx
"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { 
  Store, Utensils, ShoppingBag, Coffee, Truck, 
  ArrowLeft, CheckCircle2, ChevronRight, Settings, Award 
} from "lucide-react";
import Link from "next/link";
import IndustryDetailWrapper from "@/features/Industries/components/IndustryDetailWrapper";

export default function IndustryDetailPage() {
  return (
    <PublicLayout>
      <Navbar />

      <IndustryDetailWrapper />

      <Footer />
    </PublicLayout>
  );
}
