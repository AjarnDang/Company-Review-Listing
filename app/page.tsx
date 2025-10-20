"use client";

import React from 'react'
import { useTranslation } from '@/contexts/LocaleContext'
import { Button, Input } from '@heroui/react'

function Home() {
  const t = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
            {t.home.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            {t.home.subtitle}
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder={t.home.searchPlaceholder}
              size="lg"
              className="flex-1"
            />
            <Button color="primary" size="lg">
              {t.home.searchButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.home.featuredCompanies}
          </h2>
          {/* Add your company cards here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for company cards */}
          </div>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t.home.latestReviews}
          </h2>
          {/* Add your review cards here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for review cards */}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home