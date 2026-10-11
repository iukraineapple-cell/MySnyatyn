import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/partner/', '/courier/'],
    },
    sitemap: 'https://mysnyatyn.vercel.app/sitemap.xml',
  };
}
