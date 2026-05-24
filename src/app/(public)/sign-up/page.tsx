"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import SignUpFormWrapper from "@/components/organisms/SignUpSection/SignUpFormWrapper";

export default function SignUpPage() {
  return (
    <PublicLayout>
      <Navbar />

      <main className="pt-20 bg-slate-950 min-h-[70vh]">
        <SignUpFormWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
