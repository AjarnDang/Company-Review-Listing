"use client";

import Link from 'next/link';
import { Button } from '@heroui/react';
import { useParams } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as Locale) || 'en';
  const t = getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-gray-200 dark:text-gray-800">
            404
          </h1>
        </div>

        {/* Error Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg 
              className="w-12 h-12 text-red-600 dark:text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t.notFound.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t.notFound.message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            href={`/${lang}`}
            color="primary"
            size="lg"
            className="font-semibold"
          >
            {t.notFound.goHome}
          </Button>
          <Button
            as={Link}
            href={`/${lang}/companies`}
            variant="bordered"
            size="lg"
          >
            {t.notFound.browseCompanies}
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.notFound.needHelp} <Link href={`/${lang}`} className="text-blue-600 dark:text-blue-400 hover:underline">{t.notFound.contactSupport}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

