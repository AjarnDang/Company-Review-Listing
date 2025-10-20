"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// State types
export type LoadingState = boolean;
export type ErrorState = Error | string | null;
export type EmptyState = boolean;

export interface AppState {
  isLoading: LoadingState;
  error: ErrorState;
  isEmpty: EmptyState;
}

export interface AppStateContextType {
  // State values
  state: AppState;
  
  // Loading actions
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
  
  // Error actions
  setError: (error: ErrorState) => void;
  clearError: () => void;
  
  // Empty actions
  setEmpty: (empty: boolean) => void;
  
  // Utility actions
  reset: () => void;
  setSuccess: () => void; // Clears loading, error, and empty
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  isEmpty: false,
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  // Loading actions
  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading }));
  }, []);

  const startLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, isEmpty: false }));
  }, []);

  const stopLoading = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: false }));
  }, []);

  // Error actions
  const setError = useCallback((error: ErrorState) => {
    setState((prev) => ({ 
      ...prev, 
      error, 
      isLoading: false,
      isEmpty: false 
    }));
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // Empty actions
  const setEmpty = useCallback((empty: boolean) => {
    setState((prev) => ({ 
      ...prev, 
      isEmpty: empty,
      isLoading: false,
      error: null
    }));
  }, []);

  // Utility actions
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const setSuccess = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      isEmpty: false,
    });
  }, []);

  const value: AppStateContextType = {
    state,
    setLoading,
    startLoading,
    stopLoading,
    setError,
    clearError,
    setEmpty,
    reset,
    setSuccess,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

// Custom hook to use AppState
export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}

// Convenience hooks
export function useLoading() {
  const { state, startLoading, stopLoading } = useAppState();
  return { isLoading: state.isLoading, startLoading, stopLoading };
}

export function useError() {
  const { state, setError, clearError } = useAppState();
  return { error: state.error, setError, clearError };
}

export function useEmpty() {
  const { state, setEmpty } = useAppState();
  return { isEmpty: state.isEmpty, setEmpty };
}

