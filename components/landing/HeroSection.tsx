"use client";

import React from "react";
import { Button } from "@heroui/react";
import type { TranslationKeys } from "@/locales/th";

interface HeroSectionProps {
  translations: TranslationKeys;
  onScrollToCompanies: () => void;
}

export default function HeroSection({ translations: t, onScrollToCompanies }: HeroSectionProps) {
  return (
    <section className="relative py-20 px-4 md:py-32 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {t.home.heroTitle}
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
            {t.home.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.home.heroSubtitle}
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t.home.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              color="primary"
              className="text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-shadow"
              onPress={onScrollToCompanies}
            >
              {t.home.viewReviews}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            <Button
              size="lg"
              variant="bordered"
              className="text-lg px-8 py-6 font-semibold"
              onPress={onScrollToCompanies}
            >
              {t.home.scrollToCompanies}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                15+
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.navbar.companies}
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">
                2,000+
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.companies.reviews}
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400">
                4.2
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.companies.rating}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

