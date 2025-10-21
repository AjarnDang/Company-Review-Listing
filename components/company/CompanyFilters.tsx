"use client";

import React from "react";
import { Button, Chip, Select, SelectItem } from "@heroui/react";
import type { CompanyCategory } from "@/types/company";
import type { TranslationKeys } from "@/locales/th";

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
}: CompanyFiltersProps) {
  const toggleCategory = (category: CompanyCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const hasActiveFilters = selectedCategories.length > 0;

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: "highestRated", label: t.companies.highestRated },
    { key: "lowestRated", label: t.companies.lowestRated },
    { key: "mostReviews", label: t.companies.mostReviews },
    { key: "alphabetical", label: t.companies.alphabetical },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-3">
        {/* Category Filter */}
        <div role="group" className="flex-1" aria-label={t.companies.filterByCategory}>
          <div className="flex items-center justify-between">
            {/* <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300" id="category-filter-label">
            {t.companies.filterByCategory}
          </h3> */}
            {hasActiveFilters && (
              <Button
                size="sm"
                variant="light"
                onPress={onClear}
                className="text-xs"
              >
                {t.states.empty.clearFilters}
              </Button>
            )}
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-labelledby="category-filter-label"
          >
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
                  aria-label={`${
                    isSelected ? "Deselect" : "Select"
                  } ${category}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
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
      <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
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

        {hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
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
            {selectedCategories.length > 0 && (
              <span>
                {selectedCategories.length} {t.companies.category.toLowerCase()}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
