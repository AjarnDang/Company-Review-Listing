"use client";

import React from "react";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

interface StateWrapperProps {
  translations: TranslationKeys;
  lang: Locale;
  
  // State flags
  isLoading?: boolean;
  error?: Error | string | null;
  isEmpty?: boolean;
  data?: any;
  
  // Loading customization
  loadingType?: "list" | "card" | "table" | "default";
  loadingCount?: number;
  loadingMessage?: string;
  
  // Empty state customization
  emptyTitle?: string;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onClearFilters?: () => void;
  onReset?: () => void;
  showClearButton?: boolean;
  showResetButton?: boolean;
  
  // Error state customization
  errorTitle?: string;
  errorMessage?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  
  // Content
  children: React.ReactNode;
}

/**
 * StateWrapper Component
 * 
 * Automatically handles loading, empty, and error states.
 * Only renders children when data is successfully loaded.
 * 
 * @example
 * ```tsx
 * <StateWrapper
 *   translations={t}
 *   lang={lang}
 *   isLoading={isLoading}
 *   error={error}
 *   isEmpty={!companies.length}
 *   loadingType="card"
 *   onRetry={fetchCompanies}
 *   onClearFilters={clearFilters}
 * >
 *   <CompanyList companies={companies} />
 * </StateWrapper>
 * ```
 */
export default function StateWrapper({
  translations: t,
  lang,
  isLoading = false,
  error = null,
  isEmpty = false,
  data,
  loadingType = "default",
  loadingCount = 3,
  loadingMessage,
  emptyTitle,
  emptyMessage,
  emptyIcon,
  onClearFilters,
  onReset,
  showClearButton = true,
  showResetButton = false,
  errorTitle,
  errorMessage,
  onRetry,
  showRetryButton = true,
  showHomeButton = false,
  children,
}: StateWrapperProps) {
  // Priority: Loading > Error > Empty > Content
  
  // 1. Loading state
  if (isLoading) {
    return (
      <LoadingSkeleton
        translations={t}
        type={loadingType}
        count={loadingCount}
        message={loadingMessage}
      />
    );
  }

  // 2. Error state
  if (error) {
    return (
      <ErrorState
        translations={t}
        lang={lang}
        error={error}
        title={errorTitle}
        message={errorMessage}
        onRetry={onRetry}
        showRetryButton={showRetryButton}
        showHomeButton={showHomeButton}
      />
    );
  }

  // 3. Empty state
  // Check both isEmpty flag and data array length
  const isActuallyEmpty = isEmpty || (Array.isArray(data) && data.length === 0);
  
  if (isActuallyEmpty) {
    return (
      <EmptyState
        translations={t}
        title={emptyTitle}
        message={emptyMessage}
        icon={emptyIcon}
        onClearFilters={onClearFilters}
        onReset={onReset}
        showClearButton={showClearButton}
        showResetButton={showResetButton}
      />
    );
  }

  // 4. Success - render content
  return <>{children}</>;
}

