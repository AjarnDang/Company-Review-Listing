'use client'

import {HeroUIProvider} from '@heroui/react'
import type { Locale } from '@/i18n.config'

export function Providers({
  children,
  lang
}: { 
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}