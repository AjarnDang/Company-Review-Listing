"use client";

import React, { useRef, use, useEffect, useState } from 'react';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { generateCompanyListSchema } from '@/lib/seo';
import HeroSection from '@/components/landing/HeroSection';
import CategoriesSection from '@/components/landing/CategoriesSection';
import SearchModal from '@/components/search/SearchModal';
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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  // Handle category click
  const handleCategoryClick = (category?: string) => {
    if (category && (category === "Fintech" || category === "Broker" || category === "Payment")) {
      // Set the selected category and scroll to companies
      setSelectedCategories([category]);
    }
    scrollToCompanies();
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    scrollToCompanies();
  };

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add structured data for company list
  useEffect(() => {
    if (companies && companies.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(generateCompanyListSchema(lang, companies));
      script.id = 'company-list-schema';
      document.head.appendChild(script);

      return () => {
        const existingScript = document.getElementById('company-list-schema');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [companies, lang]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        translations={t} 
        onScrollToCompanies={scrollToCompanies}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        translations={t}
        onSearch={handleSearch}
        companies={companies}
      />

      {/* Categories Section */}
      <CategoriesSection 
        translations={t}
        onCategoryClick={handleCategoryClick}
      />

      {/* Companies Section */}
      <section 
        ref={companiesRef}
        className="py-16 px-4 bg-gray-50 dark:bg-gray-900"
        aria-labelledby="companies-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 id="companies-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                role="list"
                aria-label={t.companies.title}
              >
                {displayedCompanies.map((company) => (
                  <div key={company.id} role="listitem">
                    <CompanyCard
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
