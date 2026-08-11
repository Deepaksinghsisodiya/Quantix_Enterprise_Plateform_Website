'use client';

// src/features/Blog/BlogPostsWrapper.tsx
import React from 'react';
import { useGetBlogPostsQuery } from './services/BlogServices';
import BlogPostsSection from './BlogPostsSection';

export const BlogPostsWrapper: React.FC = () => {
  const { data: posts = [], isLoading } = useGetBlogPostsQuery();

  return <BlogPostsSection posts={posts} isLoading={isLoading} />;
};

export default BlogPostsWrapper;
