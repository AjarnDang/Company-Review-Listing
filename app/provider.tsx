// app/providers.tsx
'use client'

import {HeroUIProvider} from '@heroui/react'
import { LocaleProvider } from '@/contexts/LocaleContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <LocaleProvider>
        {children}
      </LocaleProvider>
    </HeroUIProvider>
  )
}