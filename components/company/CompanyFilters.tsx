"use client";

import React from "react";
import { Input, Select, SelectItem, Button, Chip } from "@heroui/react";
import type { CompanyCategory, COMPANY_CATEGORIES } from "@/types/company";
import type { TranslationKeys } from "@/locales/th";

interface CompanyFiltersProps {
  translations: TranslationKeys;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategories: CompanyCategory[];
  onCategoriesChange: (categories: CompanyCategory[]) => void;
  onClear: () => void;
  totalResults: number;
  filteredResults: number;
}

const CATEGORIES: CompanyCategory[] = ["Fintech", "Broker", "Payment"];

export default function CompanyFilters({
  translations: t,
  searchTerm,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  onClear,
  totalResults,
  filteredResults,
}: CompanyFiltersProps) {
  const toggleCategory = (category: CompanyCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const hasActiveFilters = searchTerm.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-6" role="search" aria-label={t.companies.searchCompanies}>
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={t.home.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="lg"
            aria-label={t.companies.searchCompanies}
            startContent={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            isClearable
            onClear={() => onSearchChange("")}
          />
        </div>
        
        {hasActiveFilters && (
          <Button
            color="default"
            variant="flat"
            size="lg"
            onPress={onClear}
            startContent={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          >
            {t.states.empty.clearFilters}
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div role="group" aria-label={t.companies.filterByCategory}>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" id="category-filter-label">
          {t.companies.filterByCategory}
        </h3>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="category-filter-label">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <Chip
                key={category}
                variant={isSelected ? "solid" : "bordered"}
                color={isSelected ? "primary" : "default"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
                role="checkbox"
                aria-checked={isSelected}
                aria-label={`${isSelected ? 'Deselect' : 'Select'} ${category}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCategory(category);
                  }
                }}
              >
                {category}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
          {t.pagination.showing} <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredResults}</span> {t.pagination.of} <span className="font-semibold text-gray-900 dark:text-gray-100">{totalResults}</span> {t.companies.title.toLowerCase()}
        </p>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {selectedCategories.length > 0 && (
              <span>{selectedCategories.length} {t.companies.category.toLowerCase()}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

