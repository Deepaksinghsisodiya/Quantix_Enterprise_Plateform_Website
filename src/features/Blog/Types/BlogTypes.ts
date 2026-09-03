// src/features/Blog/Types/BlogTypes.ts
export interface BlogPostDto {
  id?: string;
  postId?: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  content?: string;
  coverImage?: string;
  featuredImageUrl?: string;
  category?: string;
  categoryName?: string;
  author: string;
  readTime?: string;
  publishedAt?: string;
  createdAt?: string;
  tags?: string[] | string;
}

export interface ApiBlogPostsResponse {
  success: boolean;
  data: BlogPostDto[];
  total?: number;
}

export interface ApiBlogPostResponse {
  success: boolean;
  data: BlogPostDto | null;
}
