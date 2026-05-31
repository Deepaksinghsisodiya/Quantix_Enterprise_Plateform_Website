// src/features/Blog/BlogPostDetailWrapper.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetBlogPostBySlugQuery } from './Service/BlogService';
import BlogPostDetail from './BlogPostDetail';

export const BlogPostDetailWrapper: React.FC = () => {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const { data: post = null, isLoading } = useGetBlogPostBySlugQuery(slug, {
    skip: !slug,
  });

  return <BlogPostDetail slug={slug} post={post} isLoading={isLoading} />;
};

export default BlogPostDetailWrapper;
