"use client";

import { Suspense } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import type { Locale } from '@/i18n.config';
import { Button } from '@heroui/react';

interface LanguageSwitcherWrapperProps {
  currentLang: Locale;
}

function LanguageSwitcherFallback({ currentLang }: { currentLang: Locale }) {
  return (
    <Button
      variant="light"
      size="sm"
      className="min-w-20"
      isDisabled
    >
      {currentLang === 'th' ? '🇹🇭 ภาษาไทย' : '🇺🇸 English'}
    </Button>
  );
}

export default function LanguageSwitcherWrapper({ currentLang }: LanguageSwitcherWrapperProps) {
  return (
    <Suspense fallback={<LanguageSwitcherFallback currentLang={currentLang} />}>
      <LanguageSwitcher currentLang={currentLang} />
    </Suspense>
  );
}

