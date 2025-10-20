"use client";

import React, { useRef, use } from 'react';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import HeroSection from '@/components/landing/HeroSection';
import CompanyCard from '@/components/company/CompanyCard';
import CompanyFilters from '@/components/company/CompanyFilters';
import CompanyPagination from '@/components/company/CompanyPagination';
import { StateWrapper } from '@/components/states';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useCompanies } from '@/hooks/useCompanies';
import type { Company } from '@/types/company';

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Import JSON data
  const companies = await import('@/data/companies.json');
  return companies.default as Company[];
}

export default function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = use(params);
  const t = getDictionary(lang);
  const companiesRef = useRef<HTMLDivElement>(null);

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
    itemsPerPage: 9,
  });

  // Scroll to companies section
  const scrollToCompanies = () => {
    companiesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        translations={t} 
        onScrollToCompanies={scrollToCompanies}
      />

      {/* Companies Section */}
      <section 
        ref={companiesRef}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t.companies.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.companies.subtitle}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <CompanyFilters
              translations={t}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
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
            loadingCount={9}
            loadingMessage={t.states.loading.companies}
            emptyTitle={t.states.empty.companies}
            emptyMessage={
              searchTerm || selectedCategories.length > 0
                ? t.states.empty.tryAdjusting
                : undefined
            }
            onClearFilters={clearFilters}
            onRetry={refetch}
            showClearButton={searchTerm.length > 0 || selectedCategories.length > 0}
          >
            <>
              {/* Company Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedCompanies.map((company) => (
                  <CompanyCard
                    key={company.id}
                    company={company}
                    translations={t}
                    lang={lang}
                  />
                ))}
              </div>

              {/* Pagination */}
              <CompanyPagination
                translations={t}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={9}
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
