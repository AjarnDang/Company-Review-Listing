'use client'

import {HeroUIProvider} from '@heroui/react'
import type { Locale } from '@/i18n.config'
import { AppStateProvider } from '@/contexts/AppStateContext'
import { SearchProvider } from '@/contexts/SearchContext'

export function Providers({
  children,
  lang
}: { 
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <HeroUIProvider>
      <AppStateProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </AppStateProvider>
    </HeroUIProvider>
  )
}