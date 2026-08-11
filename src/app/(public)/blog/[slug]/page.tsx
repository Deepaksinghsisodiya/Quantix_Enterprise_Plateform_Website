"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import BlogPostDetailWrapper from "@/features/Blog/components/BlogPostDetailWrapper";

export default function BlogPostDetailPage() {
  return (
    <PublicLayout>
      <Navbar />

      <BlogPostDetailWrapper />

      <Footer />
    </PublicLayout>
  );
}
