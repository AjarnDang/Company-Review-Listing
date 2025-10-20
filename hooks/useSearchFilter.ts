"use client";

import { useState, useMemo, useCallback } from "react";

interface UseSearchFilterOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  initialSearch?: string;
}

interface UseSearchFilterReturn<T> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredData: T[];
  clearSearch: () => void;
  isEmpty: boolean;
}

/**
 * Custom hook for client-side search and filtering
 * 
 * @example
 * ```tsx
 * const { searchTerm, setSearchTerm, filteredData, clearSearch, isEmpty } = useSearchFilter({
 *   data: companies,
 *   searchKeys: ['name', 'description'],
 * });
 * ```
 */
export function useSearchFilter<T = any>({
  data,
  searchKeys,
  initialSearch = "",
}: UseSearchFilterOptions<T>): UseSearchFilterReturn<T> {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return data.filter((item) => {
      return searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerSearchTerm);
        }
        if (typeof value === "number") {
          return value.toString().includes(lowerSearchTerm);
        }
        return false;
      });
    });
  }, [data, searchTerm, searchKeys]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const isEmpty = filteredData.length === 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    clearSearch,
    isEmpty,
  };
}

