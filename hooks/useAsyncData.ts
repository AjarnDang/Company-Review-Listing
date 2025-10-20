"use client";

import { useState, useEffect, useCallback } from "react";

interface UseAsyncDataOptions<T> {
  fetchFn: () => Promise<T>;
  dependencies?: any[];
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseAsyncDataReturn<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for handling async data fetching with built-in state management
 * 
 * @example
 * ```tsx
 * const { data, isLoading, error, isEmpty, refetch } = useAsyncData({
 *   fetchFn: async () => {
 *     const response = await fetch('/api/companies');
 *     return response.json();
 *   },
 *   dependencies: [filters],
 * });
 * ```
 */
export function useAsyncData<T = any>({
  fetchFn,
  dependencies = [],
  initialData = null as T,
  onSuccess,
  onError,
}: UseAsyncDataOptions<T>): UseAsyncDataReturn<T> {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await fetchFn();
      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, onSuccess, onError]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  // Check if data is empty
  const isEmpty = !isLoading && !error && (
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && Object.keys(data).length === 0)
  );

  return {
    data,
    isLoading,
    error,
    isEmpty,
    refetch: fetchData,
    reset,
  };
}

