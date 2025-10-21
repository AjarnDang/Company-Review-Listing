"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { Company } from '@/types/company';
import { Button, Card, CardBody, Chip } from '@heroui/react';
import { StateWrapper } from '@/components/states';
import Image from 'next/image';

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const companies = await import('@/data/companies.json');
  return companies.default as Company[];
}

interface CompanyDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { lang, id } = use(params);
  const t = getDictionary(lang);
  const router = useRouter();

  // Fetch companies data
  const { data: companies, isLoading, error, refetch } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Find the specific company
  const company = companies?.find(c => c.id === id);

  // If not loading and company not found, show not found state
  const isEmpty = !isLoading && !company;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StateWrapper
        translations={t}
        lang={lang}
        isLoading={isLoading}
        error={error}
        isEmpty={isEmpty}
        loadingType="card"
        loadingCount={1}
        loadingMessage={t.states.loading.companies}
        emptyTitle={t.states.empty.companyNotFound}
        emptyMessage={t.states.empty.companyNotFoundMessage}
        onRetry={refetch}
        onClearFilters={() => router.push(`/${lang}/companies`)}
        showClearButton={true}
      >
        {company && (
          <div className="max-w-5xl mx-auto px-4 py-12">
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="light"
                onPress={() => router.push(`/${lang}/companies`)}
                startContent={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                {t.states.empty.goBack}
              </Button>
            </div>

            {/* Company Header Card */}
            <Card className="mb-8">
              <CardBody className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Company Logo */}
                  <div className="shrink-0">
                    <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center p-4">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {company.name}
                        </h1>
                        <Chip 
                          color="primary" 
                          variant="flat"
                          className="mb-2"
                        >
                          {company.category}
                        </Chip>
                      </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {company.averageScore.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                          ({company.reviewCount} {t.companies.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Website Link */}
                    <div className="mb-4">
                      <Button
                        as="a"
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        variant="flat"
                        startContent={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        }
                      >
                        {t.companies.visitWebsite}
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {lang === 'en' ? company.description.en : company.description.th}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Stats */}
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t.companies.statistics}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t.companies.category}</span>
                      <Chip color="primary" variant="flat">{company.category}</Chip>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t.companies.rating}</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {company.averageScore.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">{t.companies.totalReviews}</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {company.reviewCount}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Reviews Section Placeholder */}
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t.companies.recentReviews}
                  </h2>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t.companies.reviewsComingSoon}
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Write Review CTA */}
            <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardBody className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t.companies.shareExperience}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t.companies.shareExperienceDescription}
                </p>
                <Button 
                  color="primary" 
                  size="lg"
                  className="font-semibold"
                >
                  {t.companies.writeReview}
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </StateWrapper>
    </div>
  );
}

