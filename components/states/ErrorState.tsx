"use client";

import React from "react";
import { Button } from "@heroui/react";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";

interface ErrorStateProps {
  translations: TranslationKeys;
  lang: Locale;
  error?: Error | string | null;
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
}

export default function ErrorState({
  translations: t,
  lang,
  error,
  title,
  message,
  onRetry,
  showRetryButton = true,
  showHomeButton = false,
}: ErrorStateProps) {
  // Extract error message
  const getErrorMessage = () => {
    if (message) return message;
    if (!error) return t.states.error.message;
    
    if (typeof error === 'string') {
      return error;
    }
    
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return t.states.error.networkError;
      }
      if (error.message.includes('500') || error.message.includes('server')) {
        return t.states.error.serverError;
      }
      if (error.message.includes('404')) {
        return t.states.error.notFound;
      }
      return error.message;
    }
    
    return t.states.error.message;
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {title || t.states.error.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {getErrorMessage()}
        </p>
        
        {/* Error details (in development) */}
        {process.env.NODE_ENV === 'development' && error instanceof Error && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto max-h-40">
              {error.stack || error.message}
            </pre>
          </details>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        {showRetryButton && onRetry && (
          <Button
            color="primary"
            onPress={onRetry}
            className="min-w-32"
          >
            {t.states.error.retry}
          </Button>
        )}
        {showHomeButton && (
          <Button
            variant="bordered"
            onPress={() => window.location.href = `/${lang}`}
            className="min-w-32"
          >
            {t.states.error.goHome}
          </Button>
        )}
        {!showRetryButton && !showHomeButton && (
          <Button
            variant="bordered"
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

