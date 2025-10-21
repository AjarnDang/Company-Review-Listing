"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import CompanyCardHorizontal from '@/components/company/CompanyCardHorizontal';
import CompanyFilters from '@/components/company/CompanyFilters';
import CompanyPagination from '@/components/company/CompanyPagination';
import { StateWrapper } from '@/components/states';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useCompanies } from '@/hooks/useCompanies';
import type { Company } from '@/types/company';
import { Button } from '@heroui/react';

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const companies = await import('@/data/companies.json');
  return companies.default as Company[];
}

export default function CompaniesPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const resolvedParams = React.use(params);
  const { lang } = resolvedParams;
  const t = getDictionary(lang);
  const router = useRouter();

  // Fetch companies data
  const { data: companies, isLoading, error, refetch } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Manage filters and pagination
  const {
    displayedCompanies,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalCount,
    filteredCount,
    clearFilters,
  } = useCompanies({
    companies: companies || [],
    itemsPerPage: 12,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="light"
              onPress={() => router.push(`/${lang}`)}
              startContent={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            >
              {t.states.empty.goBack}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t.companies.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t.companies.exploreAll}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-8">
            <CompanyFilters
              translations={t}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              onClear={clearFilters}
              totalResults={totalCount}
              filteredResults={filteredCount}
            />
          </div>

          {/* Company Grid with State Management */}
          <StateWrapper
            translations={t}
            lang={lang}
            isLoading={isLoading}
            error={error}
            isEmpty={filteredCount === 0}
            loadingType="card"
            loadingCount={12}
            loadingMessage={t.states.loading.companies}
            emptyTitle={
              selectedCategories.length > 0
                ? t.states.empty.noResults
                : t.states.empty.companies
            }
            emptyMessage={
              selectedCategories.length > 0
                ? t.states.empty.tryAdjusting
                : undefined
            }
            onClearFilters={clearFilters}
            onRetry={refetch}
            showClearButton={selectedCategories.length > 0}
          >
            <>
              {/* Company List - Horizontal Cards */}
              <div 
                className="space-y-6 mb-8"
                role="list"
                aria-label={t.companies.title}
              >
                {displayedCompanies.map((company) => (
                  <div key={company.id} role="listitem">
                    <CompanyCardHorizontal
                      company={company}
                      translations={t}
                      lang={lang}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <CompanyPagination
                translations={t}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={12}
                totalItems={filteredCount}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            </>
          </StateWrapper>
        </div>
      </section>
    </div>
  );
}

