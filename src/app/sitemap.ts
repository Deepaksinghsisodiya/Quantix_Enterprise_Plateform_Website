import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_APP_URL || 'https://www.qauntix.com';
  const routes = [
    '',
    '/sign-in',
    '/sign-up',
  ];
  return routes.map((route) => ({
    url: `${host}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
