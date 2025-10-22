"use client";

import React from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import type { Company } from "@/types/company";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";
import Link from "next/link";
import LazyImage from "../LazyImage";
import { getCategoryName } from "@/utils/category";

interface CompanyCardHorizontalProps {
  company: Company;
  translations: TranslationKeys;
  lang: Locale;
}

export default function CompanyCardHorizontal({ company, translations: t, lang }: CompanyCardHorizontalProps) {
  // Render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${company.id}`}>
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${company.id})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fintech":
        return "primary";
      case "Broker":
        return "secondary";
      case "Payment":
        return "success";
      case "Bank":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <article className="h-full">
      <Card 
        className="min-h-[200px] min-w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
        isPressable
        role="article"
        aria-label={`${company.name} - ${t.companies.rating} ${company.averageScore.toFixed(1)}`}
      >
        <CardBody className="p-6">
          {/* Horizontal Layout */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left Side - Logo */}
            <div className="shrink-0">
              <div className="w-[100px] h-[70px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                <LazyImage
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="object-cover w-full h-full"
                  quality={85}
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              {/* Top - Name, Category, Description */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {company.name}
                  </h3>
                  <Chip 
                    color={getCategoryColor(company.category)}
                    variant="flat"
                    size="sm"
                    className="shrink-0"
                  >
                    {getCategoryName(company.category, t)}
                  </Chip>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                  {company.description[lang]}
                </p>
              </div>

              {/* Bottom - Rating and Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Rating */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      role="img" 
                      aria-label={`${t.companies.rating}: ${company.averageScore.toFixed(1)} ${t.pagination.of} 5`}
                    >
                      {renderStars(company.averageScore)}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {company.averageScore.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span aria-label={`${company.reviewCount} ${t.companies.reviews}`}>
                      {company.reviewCount} {t.companies.reviews}
                    </span>
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  as={Link}
                  href={`/${lang}/companies/${company.id}`}
                  color="primary"
                  variant="flat"
                  className="w-full sm:w-auto shrink-0"
                  aria-label={`${t.companies.readMore} ${company.name}`}
                  endContent={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                >
                  {t.companies.readMore}
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </article>
  );
}

