"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Footer from "@/components/organisms/Footer/Footer";
import SignInFormWrapper from "@/components/organisms/SignInSection/SignInFormWrapper";

export default function SignInPage() {
  return (
    <PublicLayout>
      <Navbar />
      
      <main className="pt-20 bg-slate-950 min-h-[70vh]">
        <SignInFormWrapper />
      </main>

      <Footer />
    </PublicLayout>
  );
}
