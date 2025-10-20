import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
      locales: ['en-US', 'TH',],
      defaultLocale: 'en-US',
      // localeDetection: false,
      domains: [
        {
          domain: 'example.en',
          defaultLocale: 'en-US',
        },
        {
          domain: 'example.th',
          defaultLocale: 'TH',
      },
    ],
  },
};

export default nextConfig;
