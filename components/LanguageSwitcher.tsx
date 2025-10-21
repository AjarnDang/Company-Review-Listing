"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { Locale } from "@/i18n.config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

interface LanguageOption {
  key: Locale;
  label: string;
  flag: string;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const languages: LanguageOption[] = [
    { key: "th", label: "ภาษาไทย", flag: "🇹🇭" },
    { key: "en", label: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find(lang => lang.key === currentLang);

  const switchLocale = (newLang: Locale) => {
    if (!pathname) return;
    
    const segments = pathname.split('/');
    segments[1] = newLang;
    
    const newPath = segments.join('/');
    
    // Preserve query parameters
    const queryString = searchParams.toString();
    const finalPath = queryString ? `${newPath}?${queryString}` : newPath;
    
    router.push(finalPath);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          size="sm"
          className="min-w-20"
          startContent={
            <span className="text-lg">{currentLanguage?.flag}</span>
          }
          endContent={
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          }
        >
          <span className="inline">{currentLanguage?.label}</span>
          {/* <span className="sm:hidden">{currentLang.toUpperCase()}</span> */}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={new Set([currentLang])}
        selectionMode="single"
        onAction={(key) => switchLocale(key as Locale)}
      >
        {languages.map((lang) => (
          <DropdownItem
            key={lang.key}
            startContent={<span className="text-lg">{lang.flag}</span>}
          >
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
