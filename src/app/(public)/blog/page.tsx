// src/app/(public)/blog/page.tsx
"use client";

import React from "react";
import { PublicLayout } from "@/components/organisms/PublicLayout/PublicLayout";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Footer } from "@/components/organisms/Footer/Footer";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogPostsWrapper from "@/features/Blog/BlogPostsWrapper";

export default function BlogPage() {
  return (
    <PublicLayout>
      <Navbar />

      <BlogPostsWrapper />

      <Footer />
    </PublicLayout>
  );
}
