"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import CompanyCardHorizontal from '@/components/company/CompanyCardHorizontal';
import CompanyFilters from '@/components/company/CompanyFilters';
import CompanyPagination from '@/components/company/CompanyPagination';
import { StateWrapper } from '@/components/states';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useCompanies } from '@/hooks/useCompanies';
import type { Company, CompanyCategory } from '@/types/company';
import { Button, Input } from '@heroui/react';
import SearchModal from '@/components/search/SearchModal';

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
  const searchParams = useSearchParams();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Get query parameters
  const query = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category');
  
  const initialCategory = useMemo(() => {
    if (!categoryParam) return [];
    const normalized = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
    return [normalized as CompanyCategory];
  }, [categoryParam]);

  // Fetch companies data
  const { data: companies, isLoading, error, refetch } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Manage filters and pagination
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
    initialCategories: initialCategory,
    initialSearchTerm: query,
  });

  // Update search term when query param changes
  useEffect(() => {
    if (query !== searchTerm) {
      setSearchTerm(query);
    }
  }, [query]);

  // Custom clear filters that also clears URL params
  const handleClearFilters = () => {
    clearFilters();
    router.push(`/${lang}/companies`);
  };

  const categoryName = categoryParam ? 
    categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase() : 
    null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        translations={t}
        lang={lang}
      />

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
                {query ? (
                  <>
                    {t.companies.searchCompanies}: <span className="text-blue-600 dark:text-blue-400">{query}</span>
                  </>
                ) : (
                  t.companies.title
                )}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {query 
                  ? `${t.pagination.showing} ${filteredCount} ${t.pagination.results}`
                  : categoryName 
                    ? t.category.exploreText.replace('{{category}}', categoryName.toLowerCase())
                    : t.companies.exploreAll
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search Input */}
          <div className="mb-6 w-full">
            <Input
              type="text"
              placeholder={t.search.placeholder}
              size="lg"
              value={query}
              onClick={() => setIsSearchModalOpen(true)}
              readOnly
              classNames={{
                base: "cursor-pointer w-full",
                input: "cursor-pointer",
                inputWrapper: "bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
              }}
              startContent={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>

          {/* Active Filters Display */}
          {(query || selectedCategories.length > 0) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t.companies.activeFilters}:
              </span>
              {query && (
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>{query}</span>
                  <button
                    onClick={() => router.push(`/${lang}/companies${categoryParam ? `?category=${categoryParam}` : ''}`)}
                    className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
                    aria-label={`Remove search: ${query}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                    className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full p-0.5"
                    aria-label={`Remove category: ${category}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {(query || selectedCategories.length > 0) && (
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={handleClearFilters}
                  className="text-xs"
                >
                  {t.companies.clearAllFilters}
                </Button>
              )}
            </div>
          )}

          {/* Filters */}
          <div className="mb-8">
            <CompanyFilters
              translations={t}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              onClear={handleClearFilters}
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
              query 
                ? `${t.states.empty.noResults}: "${query}"`
                : selectedCategories.length > 0
                  ? t.states.empty.noResults
                  : categoryName
                    ? `${t.states.empty.companies} in ${categoryName}`
                    : t.states.empty.companies
            }
            emptyMessage={
              selectedCategories.length > 0 || query
                ? t.states.empty.tryAdjusting
                : undefined
            }
            onClearFilters={handleClearFilters}
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

