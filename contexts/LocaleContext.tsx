"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Locale } from "@/locales";
import type { TranslationKeys } from "@/locales/th";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "th" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  };

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

// Custom hook for easier translation access
export function useTranslation() {
  const { t } = useLocale();
  return t;
}

