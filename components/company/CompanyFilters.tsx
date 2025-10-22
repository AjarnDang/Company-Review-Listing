"use client";

import React from "react";
import { Button, Chip, Select, SelectItem } from "@heroui/react";
import type { CompanyCategory } from "@/types/company";
import type { TranslationKeys } from "@/locales/th";
import { getCategoryName } from "@/utils/category";

export type SortOption =
  | "highestRated"
  | "lowestRated"
  | "mostReviews"
  | "alphabetical";

interface CompanyFiltersProps {
  translations: TranslationKeys;
  selectedCategories: CompanyCategory[];
  onCategoriesChange: (categories: CompanyCategory[]) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
  totalResults: number;
  filteredResults: number;
  searchTerm?: string;
}

const CATEGORIES: CompanyCategory[] = ["Fintech", "Broker", "Payment", "Bank"];

export default function CompanyFilters({
  translations: t,
  selectedCategories,
  onCategoriesChange,
  sortBy,
  onSortChange,
  onClear,
  totalResults,
  filteredResults,
  searchTerm = "",
}: CompanyFiltersProps) {
  const toggleCategory = (category: CompanyCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  // hasActiveFilters ตรวจสอบทั้ง search term และ categories
  const hasActiveFilters =
    selectedCategories.length > 0 || searchTerm.trim().length > 0;
  const activeFiltersCount =
    selectedCategories.length + (searchTerm.trim() ? 1 : 0);

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: "highestRated", label: t.companies.highestRated },
    { key: "lowestRated", label: t.companies.lowestRated },
    { key: "mostReviews", label: t.companies.mostReviews },
    { key: "alphabetical", label: t.companies.alphabetical },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Category Filter */}
        <div
          role="group"
          className="flex-1"
          aria-label={t.companies.filterByCategory}
        >
          <h3 className="sr-only" id="category-filter-label">
            {t.companies.filterByCategory}
          </h3>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-labelledby="category-filter-label"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategories.includes(category);
              const categoryLabel = getCategoryName(category, t);
              return (
                <Chip
                  key={category}
                  variant={isSelected ? "solid" : "bordered"}
                  color={isSelected ? "primary" : "default"}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                  role="checkbox"
                  aria-checked={isSelected}
                  aria-label={`${
                    isSelected ? "Deselect" : "Select"
                  } ${categoryLabel}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCategory(category);
                    }
                  }}
                >
                  {categoryLabel}
                </Chip>
              );
            })}
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <Select
            label={t.companies.sortBy}
            selectedKeys={[sortBy]}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="max-w-xs min-w-48 w-full"
            size="sm"
            aria-label={t.companies.sortBy}
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="py-4 border-t border-gray-200 dark:border-gray-700">
        {/* Active Filters Summary & Clear Button */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between py-2 px-4 mb-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 flex-wrap">
              <svg
                className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                {activeFiltersCount}{" "}
                {activeFiltersCount === 1 ? "filter" : "filters"} active
                {searchTerm.trim() && (
                  <span className="text-xs ml-2 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full">
                    Search: "{searchTerm.trim().substring(0, 20)}
                    {searchTerm.trim().length > 20 ? "..." : ""}"
                  </span>
                )}
                {selectedCategories.length > 0 && (
                  <span className="text-xs ml-2 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full">
                    {selectedCategories.length}{" "}
                    {selectedCategories.length === 1
                      ? "category"
                      : "categories"}
                  </span>
                )}
              </span>
            </div>
            <Button
              size="sm"
              variant="light"
              onPress={onClear}
              className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              aria-label={t.states.empty.clearFilters}
            >
              {t.states.empty.clearFilters}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <p
            className="text-sm text-gray-600 dark:text-gray-400"
            role="status"
            aria-live="polite"
          >
            {t.pagination.showing}{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {filteredResults}
            </span>{" "}
            {t.pagination.of}{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {totalResults}
            </span>{" "}
            {t.companies.title.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
