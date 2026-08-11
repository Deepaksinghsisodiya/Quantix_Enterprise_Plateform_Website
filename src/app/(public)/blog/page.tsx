// src/app/(public)/blog/page.tsx
import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import BlogPostsWrapper from "@/features/Blog/components/BlogPostsWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Quantix Platform",
  description: "Read up on industry checkout optimization guides, restaurant matrix configurations, and modern REST API payment engineering.",
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <Navbar />

      <BlogPostsWrapper />

      <Footer />
    </PublicLayout>
  );
}
