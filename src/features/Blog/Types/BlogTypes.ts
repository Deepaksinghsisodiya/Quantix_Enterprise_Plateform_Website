// src/features/Blog/Types/BlogTypes.ts

export interface BlogPostDto {
  postId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  categoryId?: string;
  categoryName?: string;
  tags?: string;
  featuredImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface ApiBlogPostsResponse {
  success: boolean;
  data: BlogPostDto[];
}

export interface ApiBlogPostResponse {
  success: boolean;
  data: BlogPostDto;
}
