"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const MAX_RECENT_SEARCHES = 5;
const STORAGE_KEY = "finscope_recent_searches";

export interface SearchContextType {
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (search: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Save recent searches to localStorage
  const saveToStorage = useCallback((searches: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Add a new search
  const addRecentSearch = useCallback((search: string) => {
    const trimmedSearch = search.trim();
    if (!trimmedSearch) return;

    setRecentSearches((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter(s => s.toLowerCase() !== trimmedSearch.toLowerCase());
      // Add to beginning and limit to MAX_RECENT_SEARCHES
      const updated = [trimmedSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  // Remove a specific search
  const removeRecentSearch = useCallback((search: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter(s => s !== search);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const value: SearchContextType = {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    removeRecentSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// Custom hook to use Search Context
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

