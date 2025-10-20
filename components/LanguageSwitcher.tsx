"use client";

import React from "react";
import { Button } from "@heroui/react";
import { useLocale } from "@/contexts/LocaleContext";
import type { Locale } from "@/locales";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  const toggleLocale = () => {
    const newLocale: Locale = locale === "th" ? "en" : "th";
    setLocale(newLocale);
  };

  return (
    <Button
      variant="light"
      size="sm"
      onClick={toggleLocale}
      className="min-w-16"
    >
      {locale === "th" ? "EN" : "TH"}
    </Button>
  );
}

