"use client";

import { useState, useMemo } from "react";
import type { Company, CompanyCategory } from "@/types/company";

export type SortOption = "highestRated" | "lowestRated" | "mostReviews" | "alphabetical";

interface UseCompaniesOptions {
  companies: Company[];
  itemsPerPage?: number;
  initialSearchTerm?: string;
  initialCategories?: CompanyCategory[];
  initialSortBy?: SortOption;
}

interface UseCompaniesReturn {
  // Filtered and paginated data
  displayedCompanies: Company[];
  
  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // Category filter
  selectedCategories: CompanyCategory[];
  setSelectedCategories: (categories: CompanyCategory[]) => void;
  
  // Sort
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  
  // Counts
  totalCount: number;
  filteredCount: number;
  
  // Actions
  clearFilters: () => void;
}

export function useCompanies({
  companies,
  itemsPerPage = 10,
  initialSearchTerm = "",
  initialCategories = [],
  initialSortBy = "highestRated",
}: UseCompaniesOptions): UseCompaniesReturn {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategories, setSelectedCategories] = useState<CompanyCategory[]>(initialCategories);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(lowerSearch) ||
          company.description.en.toLowerCase().includes(lowerSearch) ||
          company.description.th.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((company) =>
        selectedCategories.includes(company.category)
      );
    }

    // Sort companies
    const sorted = [...filtered];
    switch (sortBy) {
      case "highestRated":
        sorted.sort((a, b) => b.averageScore - a.averageScore);
        break;
      case "lowestRated":
        sorted.sort((a, b) => a.averageScore - b.averageScore);
        break;
      case "mostReviews":
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return sorted;
  }, [companies, searchTerm, selectedCategories, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page companies
  const displayedCompanies = useMemo(() => {
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, startIndex, endIndex]);

  // Reset to page 1 when filters change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoriesChange = (categories: CompanyCategory[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSortBy("highestRated");
    setCurrentPage(1);
  };

  return {
    displayedCompanies,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedCategories,
    setSelectedCategories: handleCategoriesChange,
    sortBy,
    setSortBy: handleSortChange,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    totalCount: companies.length,
    filteredCount: filteredCompanies.length,
    clearFilters,
  };
}

