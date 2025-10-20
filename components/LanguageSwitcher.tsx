"use client";

import React from "react";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const switchLocale = () => {
    if (!pathname) return '/';
    
    const segments = pathname.split('/');
    const newLang = currentLang === 'th' ? 'en' : 'th';
    segments[1] = newLang;
    
    return segments.join('/');
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
