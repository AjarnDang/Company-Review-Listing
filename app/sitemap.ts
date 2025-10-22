import { MetadataRoute } from 'next';
import { i18n } from '@/i18n.config';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Generate sitemap entries for all supported locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  i18n.locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });

    // Companies page
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/companies`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // About page (if exists)
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // TODO: Add dynamic company pages
  // Example:
  // const companies = await getCompanies();
  // companies.forEach((company) => {
  //   i18n.locales.forEach((locale) => {
  //     sitemapEntries.push({
  //       url: `${baseUrl}/${locale}/companies/${company.id}`,
  //       lastModified: company.updatedAt || currentDate,
  //       changeFrequency: 'weekly',
  //       priority: 0.8,
  //     });
  //   });
  // });

  return sitemapEntries;
}

