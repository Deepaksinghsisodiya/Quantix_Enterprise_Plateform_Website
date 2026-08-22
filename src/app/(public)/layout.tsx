import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";

export default function PublicLayoutRoot({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PublicLayout>
      <Navbar />
      {children}
      <Footer />
    </PublicLayout>
  );
}
