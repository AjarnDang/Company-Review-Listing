"use client";

import React, { use, useEffect, useState, useRef } from 'react';
import type { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/get-dictionary';
import { generateCompanyListSchema } from '@/lib/seo';
import HeroSection from '@/components/landing/HeroSection';
import CategoriesSection from '@/components/landing/CategoriesSection';
import CTASection from '@/components/landing/CTASection';
import BusinessCTASection from '@/components/landing/BusinessCTASection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import SearchModal from '@/components/search/SearchModal';
import CategorySection from '@/components/company/CategorySection';
import { StateWrapper } from '@/components/states';
import { useAsyncData } from '@/hooks/useAsyncData';
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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const companiesRef = useRef<HTMLDivElement>(null);

  // Fetch companies data
  const { data: companies, isLoading, error, refetch } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Scroll to companies section
  const scrollToCompanies = () => {
    companiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Handle category click - navigate to category page
  const handleCategoryClick = (category?: string) => {
    if (category && (category === "Fintech" || category === "Broker" || category === "Payment")) {
      window.location.href = `/${lang}/category/${category.toLowerCase()}`;
    }
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
        lang={lang}
      />

      {/* Categories Section */}
      <CategoriesSection 
        translations={t}
        onCategoryClick={handleCategoryClick}
      />

      {/* Business CTA Section */}
      <BusinessCTASection lang={lang} translations={t} />

      {/* Category Sections - Best in Each Category */}
      <div ref={companiesRef} className="max-w-7xl mx-auto">
        <StateWrapper
          translations={t}
          lang={lang}
          isLoading={isLoading}
          error={error}
          isEmpty={!companies || companies.length === 0}
          loadingType="card"
          loadingCount={12}
          loadingMessage={t.states.loading.companies}
          emptyTitle={t.states.empty.companies}
          onRetry={refetch}
        >
          <>
            <CategorySection
              category="Broker"
              companies={companies || []}
              translations={t}
              lang={lang}
              maxItems={4}
            />
            <CategorySection
              category="Payment"
              companies={companies || []}
              translations={t}
              lang={lang}
              maxItems={4}
            />
          </>
        </StateWrapper>
      </div>

      {/* CTA Section */}
      <CTASection lang={lang} translations={t} />

      {/* Reviews Section */}
      <ReviewsSection lang={lang} translations={t} />
    </div>
  );
}