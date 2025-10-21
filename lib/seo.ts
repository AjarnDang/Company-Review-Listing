import type { Metadata } from "next";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "./get-dictionary";

interface SEOProps {
  lang: Locale;
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

const siteConfig = {
  name: {
    th: "FinScope - แพลตฟอร์มรีวิวบริษัทการเงิน",
    en: "FinScope - Financial Company Review Platform",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
};

export function generateSEOMetadata({
  lang,
  title,
  description,
  path = "",
  image,
  type = "website",
}: SEOProps): Metadata {
  const t = getDictionary(lang);
  const siteTitle = siteConfig.name[lang];
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || t.home.heroDescription;
  const url = `${siteConfig.url}/${lang}${path}`;
  const ogImage = image || `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: fullTitle,
    description: finalDescription,
    
    // Open Graph
    openGraph: {
      type,
      locale: lang === "th" ? "th_TH" : "en_US",
      url,
      title: fullTitle,
      description: finalDescription,
      siteName: siteTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: finalDescription,
      images: [ogImage],
    },

    // Alternate languages
    alternates: {
      canonical: url,
      languages: {
        "th": `${siteConfig.url}/th${path}`,
        "en": `${siteConfig.url}/en${path}`,
      },
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification (add your codes)
    // verification: {
    //   google: "your-google-verification-code",
    //   yandex: "your-yandex-verification-code",
    // },
  };
}

// Structured Data (JSON-LD)
export function generateOrganizationSchema(lang: Locale) {
  const t = getDictionary(lang);
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name[lang],
    url: `${siteConfig.url}/${lang}`,
    description: t.home.heroDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/${lang}?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateCompanyListSchema(lang: Locale, companies: any[]) {
  const t = getDictionary(lang);
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.companies.title,
    description: t.companies.subtitle,
    numberOfItems: companies.length,
    itemListElement: companies.map((company, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: company.name,
        description: company.description,
        url: company.website,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: company.averageScore,
          reviewCount: company.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };
}

