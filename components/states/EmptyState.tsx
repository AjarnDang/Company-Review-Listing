"use client";

import React from "react";
import { Button } from "@heroui/react";
import type { TranslationKeys } from "@/locales/th";

interface EmptyStateProps {
  translations: TranslationKeys;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  onClearFilters?: () => void;
  onReset?: () => void;
  showClearButton?: boolean;
  showResetButton?: boolean;
}

export default function EmptyState({
  translations: t,
  title,
  message,
  icon,
  onClearFilters,
  onReset,
  showClearButton = true,
  showResetButton = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Icon */}
      <div className="mb-6">
        {icon ? (
          icon
        ) : (
          <svg
            className="w-24 h-24 text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title || t.states.empty.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          {message || t.states.empty.message}. <br />
          {t.states.empty.tryAdjusting}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        {showClearButton && onClearFilters && (
          <Button
            variant="bordered"
            onPress={onClearFilters}
            className="min-w-32"
          >
            {t.states.empty.clearFilters}
          </Button>
        )}
        {showResetButton && onReset && (
          <Button
            color="primary"
            variant="flat"
            onPress={onReset}
            className="min-w-32"
          >
            {t.states.empty.resetSearch}
          </Button>
        )}
        {!showClearButton && !showResetButton && (
          <Button
            color="primary"
            variant="flat"
            onPress={() => window.history.back()}
            className="min-w-32"
          >
            {t.states.empty.goBack}
          </Button>
        )}
      </div>
    </div>
  );
}

