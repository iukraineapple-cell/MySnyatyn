import { MetadataRoute } from 'next';
import { SAMPLE_LISTINGS, SAMPLE_BUSINESSES } from '@/lib/data/sample-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mysnyatyn.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/announcements`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/businesses`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/delivery`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/rules`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = SAMPLE_LISTINGS.map((l) => ({
    url: `${baseUrl}/announcements/${l.id}`,
    lastModified: new Date(l.created_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const businessRoutes: MetadataRoute.Sitemap = SAMPLE_BUSINESSES.map((b) => ({
    url: `${baseUrl}/businesses/${b.slug}`,
    lastModified: new Date(b.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...listingRoutes, ...businessRoutes];
}
