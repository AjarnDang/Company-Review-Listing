"use client";

import React from 'react'
import type { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/get-dictionary'
import { Link } from '@heroui/react'

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const t = getDictionary(lang);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.about}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.home.subtitle}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.navbar.companies}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.navbar.features}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.navbar.reviews}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.menu.helpFeedback}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.navbar.about}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.privacy}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}`} size="sm" color="foreground">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
