"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Chip,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";
import { useSearch } from "@/contexts/SearchContext";
import type { Company } from "@/types/company";
import { useAsyncData } from "@/hooks/useAsyncData";
import { StateWrapper } from "@/components/states";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: TranslationKeys;
  lang: Locale;
  companies?: Company[];
}

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const companies = await import("@/data/companies.json");
  return companies.default as Company[];
}

// Helper function to highlight matched text
function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        className="bg-yellow-200 dark:bg-yellow-800/50 text-gray-900 dark:text-gray-100 rounded px-0.5"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchModal({
  isOpen,
  onClose,
  translations: t,
  lang,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    removeRecentSearch,
  } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch companies data for search
  const {
    data: companies,
    isLoading,
    error,
  } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [isOpen],
  });

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Popular search suggestions
  const suggestions = [
    {
      key: "bestTradingPlatforms",
      label: t.search.searchSuggestions.bestTradingPlatforms,
      icon: "📊",
    },
    {
      key: "personalLoans",
      label: t.search.searchSuggestions.personalLoans,
      icon: "💵",
    },
    {
      key: "bestSavingsAccounts",
      label: t.search.searchSuggestions.bestSavingsAccounts,
      icon: "🏦",
    },
    {
      key: "cryptoExchange",
      label: t.search.searchSuggestions.cryptoExchange,
      icon: "₿",
    },
    {
      key: "stockBrokers",
      label: t.search.searchSuggestions.stockBrokers,
      icon: "📈",
    },
    {
      key: "digitalWallet",
      label: t.search.searchSuggestions.digitalWallet,
      icon: "👛",
    },
    {
      key: "investmentApps",
      label: t.search.searchSuggestions.investmentApps,
      icon: "📱",
    },
    {
      key: "paymentGateway",
      label: t.search.searchSuggestions.paymentGateway,
      icon: "💳",
    },
  ];

  // Filter companies based on search query with match info
  const filteredCompanies = React.useMemo(() => {
    if (!searchQuery.trim() || !companies) return [];

    const query = searchQuery.toLowerCase();

    return companies
      .map((company) => {
        const nameMatch = company.name.toLowerCase().includes(query);
        const categoryMatch = company.category.toLowerCase().includes(query);
        const descEnMatch = company.description.en
          .toLowerCase()
          .includes(query);
        const descThMatch = company.description.th
          .toLowerCase()
          .includes(query);

        // Get matched text snippet from description
        let matchedSnippet = "";
        let matchSource: "name" | "category" | "description" = "name";

        if (nameMatch) {
          matchedSnippet = company.name;
          matchSource = "name";
        } else if (categoryMatch) {
          matchedSnippet = company.category;
          matchSource = "category";
        } else if (descEnMatch || descThMatch) {
          const description =
            lang === "en" ? company.description.en : company.description.th;
          const index = description.toLowerCase().indexOf(query);
          if (index !== -1) {
            // Extract snippet around the match
            const start = Math.max(0, index - 30);
            const end = Math.min(description.length, index + query.length + 30);
            matchedSnippet =
              (start > 0 ? "..." : "") +
              description.substring(start, end) +
              (end < description.length ? "..." : "");
            matchSource = "description";
          }
        }

        return {
          company,
          matchedSnippet,
          matchSource,
          hasMatch: nameMatch || categoryMatch || descEnMatch || descThMatch,
        };
      })
      .filter((item) => item.hasMatch)
      .slice(0, 5);
  }, [searchQuery, companies, lang]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      addRecentSearch(trimmedQuery);
      // Navigate to companies page with query
      router.push(
        `/${lang}/companies?query=${encodeURIComponent(trimmedQuery)}`
      );
      onClose();
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleCompanyClick = (company: Company) => {
    handleSearch(company.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      placement="top"
      classNames={{
        base: "mt-20",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 pb-2">
              <Input
                ref={inputRef}
                type="search"
                placeholder={t.search.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                size="lg"
                autoFocus
                className="border-none mt-6"
                startContent={
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
                isClearable
                onClear={() => setSearchQuery("")}
              />
            </ModalHeader>
            <ModalBody className="py-4">
              {/* Search Results with StateWrapper (when typing) */}
              {searchQuery.trim() ? (
                <StateWrapper
                  translations={t}
                  lang={lang}
                  isLoading={isLoading}
                  error={error}
                  isEmpty={
                    filteredCompanies.length === 0 && companies !== undefined
                  }
                  loadingType="list"
                  loadingCount={3}
                  loadingMessage={t.states.loading.companies}
                  emptyTitle={t.states.empty.noResults}
                  emptyIcon="🔍"
                >
                  <AnimatePresence mode="wait">
                    {filteredCompanies.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6"
                      >
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          {t.companies.searchCompanies}
                        </h3>
                        <div className="space-y-2">
                          {filteredCompanies.map((item) => (
                            <button
                              key={item.company.id}
                              onClick={() => handleCompanyClick(item.company)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                            >
                              <div className="shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <span className="text-xl">🏢</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {item.matchSource === "name"
                                    ? highlightText(
                                        item.company.name,
                                        searchQuery
                                      )
                                    : item.company.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.matchSource === "category"
                                    ? highlightText(
                                        item.company.category,
                                        searchQuery
                                      )
                                    : item.company.category}{" "}
                                  • ⭐ {item.company.averageScore}
                                </p>
                                {item.matchSource === "description" && (
                                  <p className="text-xs text-gray-600 dark:text-gray-500 mt-1 line-clamp-2">
                                    {highlightText(
                                      item.matchedSnippet,
                                      searchQuery
                                    )}
                                  </p>
                                )}
                              </div>
                              <svg
                                className="w-5 h-5 text-gray-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StateWrapper>
              ) : (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {t.search.recentSearches}
                        </h3>
                        <Button
                          size="sm"
                          variant="light"
                          onPress={clearRecentSearches}
                          className="text-xs"
                        >
                          {t.search.clearAll}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-2 group"
                          >
                            <button
                              onClick={() => handleSearch(search)}
                              className="flex-1 flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                            >
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {search}
                              </span>
                            </button>
                            <button
                              onClick={() => removeRecentSearch(search)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
                              aria-label="Remove"
                            >
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Recent Searches Message */}
                  {recentSearches.length === 0 && (
                    <div className="mb-6 text-center py-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t.search.noRecentSearches}
                      </p>
                    </div>
                  )}

                  {/* Popular Suggestions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {t.search.suggestions}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <motion.div
                          key={suggestion.key}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Chip
                            variant="flat"
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            onClick={() =>
                              handleSuggestionClick(suggestion.label)
                            }
                            startContent={
                              <span className="text-base">
                                {suggestion.icon}
                              </span>
                            }
                          >
                            {suggestion.label}
                          </Chip>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Categories Quick Access */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {t.companies.filterByCategory}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Fintech", "Broker", "Payment", "Bank"].map(
                        (category) => (
                          <Button
                            key={category}
                            size="sm"
                            variant="bordered"
                            onPress={() => handleSearch(category)}
                          >
                            {category}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
