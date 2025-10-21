"use client";

import React, { use, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

export default function SearchPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionary(lang);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('query') || '';

  // Fetch companies data
  const { data: companies, isLoading, error, refetch } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Manage filters and pagination with initial search term from URL
  const {
    displayedCompanies,
    searchTerm,
    setSearchTerm,
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
    initialSearchTerm: query,
  });

  // Update search term when query param changes
  useEffect(() => {
    if (query !== searchTerm) {
      setSearchTerm(query);
    }
  }, [query]);

  // Determine what we're searching for
  const searchContext = useMemo(() => {
    if (!query) return null;
    
    const lowerQuery = query.toLowerCase();
    
    // Check if it's a category
    if (["fintech", "broker", "payment", "bank"].includes(lowerQuery)) {
      return { type: 'category', value: query };
    }
    
    // Check if it matches any company
    const matchingCompany = companies?.find(c => 
      c.name.toLowerCase() === lowerQuery
    );
    if (matchingCompany) {
      return { type: 'company', value: matchingCompany.name };
    }
    
    // Otherwise it's a general search
    return { type: 'general', value: query };
  }, [query, companies]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
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

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {query ? (
                <>
                  {t.companies.searchCompanies}: <span className="text-blue-600 dark:text-blue-400">{query}</span>
                </>
              ) : (
                t.companies.searchCompanies
              )}
            </h1>
            {searchContext && (
              <p className="text-gray-600 dark:text-gray-400">
                {searchContext.type === 'category' && `${t.companies.category}: ${searchContext.value}`}
                {searchContext.type === 'company' && `${t.companies.viewDetails}: ${searchContext.value}`}
                {searchContext.type === 'general' && `${t.pagination.showing} ${filteredCount} ${t.pagination.results}`}
              </p>
            )}
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
            emptyTitle={query ? `${t.states.empty.noResults}: "${query}"` : t.states.empty.companies}
            emptyMessage={
              selectedCategories.length > 0 || query
                ? t.states.empty.tryAdjusting
                : undefined
            }
            onClearFilters={clearFilters}
            onRetry={refetch}
            showClearButton={selectedCategories.length > 0 || query.length > 0}
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

