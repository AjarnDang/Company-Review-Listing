"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";
import { useSearch } from "@/contexts/SearchContext";
import type { Company } from "@/types/company";
import { useAsyncData } from "@/hooks/useAsyncData";

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
  const companies = await import('@/data/companies.json');
  return companies.default as Company[];
}

export default function SearchModal({ 
  isOpen, 
  onClose, 
  translations: t,
  lang,
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { recentSearches, addRecentSearch, clearRecentSearches, removeRecentSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch companies data for search
  const { data: companies, isLoading, error } = useAsyncData({
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
    { key: "bestTradingPlatforms", label: t.search.searchSuggestions.bestTradingPlatforms, icon: "📊" },
    { key: "personalLoans", label: t.search.searchSuggestions.personalLoans, icon: "💵" },
    { key: "bestSavingsAccounts", label: t.search.searchSuggestions.bestSavingsAccounts, icon: "🏦" },
    { key: "cryptoExchange", label: t.search.searchSuggestions.cryptoExchange, icon: "₿" },
    { key: "stockBrokers", label: t.search.searchSuggestions.stockBrokers, icon: "📈" },
    { key: "digitalWallet", label: t.search.searchSuggestions.digitalWallet, icon: "👛" },
    { key: "investmentApps", label: t.search.searchSuggestions.investmentApps, icon: "📱" },
    { key: "paymentGateway", label: t.search.searchSuggestions.paymentGateway, icon: "💳" },
  ];

  // Filter companies based on search query
  const filteredCompanies = searchQuery.trim() && companies
    ? companies.filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      addRecentSearch(trimmedQuery);
      // Navigate to search page with query
      router.push(`/${lang}/search?query=${encodeURIComponent(trimmedQuery)}`);
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
                className="border-none"
                startContent={
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                isClearable
                onClear={() => setSearchQuery("")}
              />
            </ModalHeader>
            <ModalBody className="py-4">
              {/* Loading State */}
              {isLoading && searchQuery.trim() && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.states.loading.companies}</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && searchQuery.trim() && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.states.error.message}</p>
                  </div>
                </div>
              )}

              {/* Search Results (when typing) */}
              {!isLoading && !error && (
                <AnimatePresence mode="wait">
                  {searchQuery.trim() && filteredCompanies.length > 0 && (
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
                        {filteredCompanies.map((company) => (
                          <button
                            key={company.id}
                            onClick={() => handleCompanyClick(company)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                          >
                            <div className="shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-xl">🏢</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {company.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {company.category} • ⭐ {company.averageScore}
                              </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* No Results */}
                  {searchQuery.trim() && filteredCompanies.length === 0 && companies && companies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-center py-8"
                    >
                      <div className="text-4xl mb-2">🔍</div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.states.empty.noResults}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t.states.empty.tryAdjusting}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Recent Searches */}
              {!searchQuery.trim() && recentSearches.length > 0 && (
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
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                        </button>
                        <button
                          onClick={() => removeRecentSearch(search)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-all"
                          aria-label="Remove"
                        >
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Recent Searches Message */}
              {!searchQuery.trim() && recentSearches.length === 0 && (
                <div className="mb-6 text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.search.noRecentSearches}
                  </p>
                </div>
              )}

              {/* Popular Suggestions */}
              {!searchQuery.trim() && (
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
                          onClick={() => handleSuggestionClick(suggestion.label)}
                          startContent={<span className="text-base">{suggestion.icon}</span>}
                        >
                          {suggestion.label}
                        </Chip>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Quick Access */}
              {!searchQuery.trim() && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    {t.companies.filterByCategory}
                  </h3>
                  <div className="flex gap-2">
                    {["Fintech", "Broker", "Payment"].map((category) => (
                      <Button
                        key={category}
                        size="sm"
                        variant="bordered"
                        onPress={() => handleSearch(category)}
                        className="flex-1"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

