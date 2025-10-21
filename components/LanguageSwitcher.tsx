"use client";

import React from "react";
import { Button } from "@heroui/react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const switchLocale = () => {
    if (!pathname) return '/';
    
    const segments = pathname.split('/');
    const newLang = currentLang === 'th' ? 'en' : 'th';
    segments[1] = newLang;
    
    const newPath = segments.join('/');
    
    // Preserve query parameters
    const queryString = searchParams.toString();
    return queryString ? `${newPath}?${queryString}` : newPath;
  };

  return (
    <Button
      as={Link}
      href={switchLocale()}
      variant="light"
      size="sm"
      className="min-w-16"
    >
      {currentLang === "th" ? "EN" : "TH"}
    </Button>
  );
}
