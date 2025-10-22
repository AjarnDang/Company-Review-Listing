"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import CompanyCardHorizontal from '@/components/company/CompanyCardHorizontal';
import CompanyFilters from '@/components/company/CompanyFilters';
import CompanyPagination from '@/components/company/CompanyPagination';
import { StateWrapper } from '@/components/states';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useCompanies, type SortOption } from '@/hooks/useCompanies';
import type { Company, CompanyCategory } from '@/types/company';
import { Input } from '@heroui/react';
import SearchModal from '@/components/search/SearchModal';
import Breadcrumb from '@/components/Breadcrumb';

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const companies = await import('@/data/companies.json');
  return companies.default as Company[];
}

interface CompaniesClientProps {
  lang: Locale;
  initialQuery?: string;
  initialCategory?: string;
}

export default function CompaniesClient({ lang, initialQuery = '', initialCategory }: CompaniesClientProps) {
  const t = getDictionary(lang);
  const router = useRouter();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const initialCategoryArray = useMemo(() => {
    if (!initialCategory) return [];
    const normalized = initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1).toLowerCase();
    return [normalized as CompanyCategory];
  }, [initialCategory]);

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
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredCount,
    totalCount,
    startIndex,
    endIndex,
  } = useCompanies({
    companies: companies || [],
    initialSearchTerm: initialQuery,
    initialCategories: initialCategoryArray,
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('query', searchTerm);
    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories[0].toLowerCase());
    }
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/${lang}/companies${newUrl}`, { scroll: false });
  }, [searchTerm, selectedCategories, lang, router]);

  // Handle category change
  const handleCategoryChange = (categories: CompanyCategory[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortBy(sort as SortOption);
    setCurrentPage(1);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSortBy('highestRated');
    setCurrentPage(1);
  };

  return (
    <>
      <SearchModal
        lang={lang}
        translations={t}
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumb
              items={[
                { label: t.breadcrumb.home, href: `/${lang}` },
                { label: t.breadcrumb.companies }
              ]}
              lang={lang}
              translations={t}
            />
            <div className="mt-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.companies.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t.companies.description}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder={t.search.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                startContent={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Filters */}
          <CompanyFilters
            translations={t}
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onClear={handleClearFilters}
            totalResults={totalCount}
            filteredResults={filteredCount}
          />

          {/* Companies List */}
          <StateWrapper
            translations={t}
            lang={lang}
            isLoading={isLoading}
            error={error}
            isEmpty={!displayedCompanies || displayedCompanies.length === 0}
            onRetry={refetch}
            loadingType="list"
            loadingCount={6}
            emptyMessage={
              searchTerm || selectedCategories.length > 0
                ? t.states.empty.tryAdjusting
                : t.companies.subtitle
            }
          >
            <div className="space-y-6">
              {displayedCompanies.map((company) => (
                <CompanyCardHorizontal
                  key={company.id}
                  company={company}
                  translations={t}
                  lang={lang}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <CompanyPagination
                  translations={t}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={10}
                  totalItems={filteredCount}
                  startIndex={startIndex}
                  endIndex={endIndex}
                />
              </div>
            )}
          </StateWrapper>
        </section>
      </div>
    </>
  );
}

