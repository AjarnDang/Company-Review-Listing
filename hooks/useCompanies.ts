"use client";

import { useState, useMemo } from "react";
import type { Company, CompanyCategory } from "@/types/company";

interface UseCompaniesOptions {
  companies: Company[];
  itemsPerPage?: number;
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
  itemsPerPage = 9,
}: UseCompaniesOptions): UseCompaniesReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CompanyCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter companies based on search and categories
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // Filter by search term
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(lowerSearch) ||
          company.description.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((company) =>
        selectedCategories.includes(company.category)
      );
    }

    return filtered;
  }, [companies, searchTerm, selectedCategories]);

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

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  return {
    displayedCompanies,
    searchTerm,
    setSearchTerm: handleSearchChange,
    selectedCategories,
    setSelectedCategories: handleCategoriesChange,
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

