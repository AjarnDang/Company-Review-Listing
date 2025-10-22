"use client";

import React, { useRef } from "react";
import { Input } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import type { TranslationKeys } from "@/locales/th";
import { useCountUp } from "@/hooks/useCountUp";

interface HeroSectionProps {
  translations: TranslationKeys;
  onScrollToCompanies: () => void;
  onSearchClick: () => void;
}

export default function HeroSection({ translations: t, onScrollToCompanies, onSearchClick }: HeroSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Count up animations for stats
  const companiesCount = useCountUp({
    end: 15,
    duration: 2000,
    suffix: '+',
  });

  const reviewsCount = useCountUp({
    end: 2000,
    duration: 2500,
    separator: ',',
    suffix: '+',
  });

  const ratingCount = useCountUp({
    end: 4.2,
    duration: 2000,
    decimals: 1,
  });

  // Start animations when stats come into view
  React.useEffect(() => {
    if (isInView) {
      companiesCount.startAnimation();
      reviewsCount.startAnimation();
      ratingCount.startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <section 
      className="relative py-20 px-4 md:py-32 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Additional ambient light effects */}
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-pink-500/5 rounded-full blur-2xl"
          animate={{
            x: [0, -70, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        /> */}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {t.home.heroTitle}
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white py-4 mb-2">
            {t.home.title}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary-600 dark:text-primary-400">
                {t.home.titleHighlight}
              </span>
              {/* Hand-written underline */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-primary-600 dark:text-primary-400"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C25 3 50 1 75 3C100 5 125 8 150 6C165 5 180 4 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.home.heroSubtitle}
          </p>

          {/* Search Input */}
          <motion.div 
            className="pt-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input
              type="text"
              placeholder={t.search.placeholder}
              size="lg"
              onClick={onSearchClick}
              readOnly
              classNames={{
                base: "cursor-pointer",
                input: "cursor-pointer text-base border-none",
                inputWrapper: "h-14 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent"
              }}
              startContent={
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </motion.div>

          {/* Stats */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto"
            aria-label="Platform statistics"
          >
            <motion.div 
              className="p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 tabular-nums"
                aria-label="15 plus companies"
              >
                {companiesCount.formattedCount}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.navbar.companies}
              </div>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold text-secondary-600 dark:text-secondary-400 tabular-nums"
                aria-label="2000 plus reviews"
              >
                {reviewsCount.formattedCount}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.companies.reviews}
              </div>
            </motion.div>
            <motion.div 
              className="p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div 
                className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 tabular-nums"
                aria-label="Average rating 4.2 out of 5"
              >
                {ratingCount.formattedCount}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
                {t.companies.rating}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with Click Action */}
      <motion.button
        onClick={onScrollToCompanies}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to companies section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm font-medium text-gray-400 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {t.cta.exploreCompanies}
          </span>
          <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.button>
    </section>
  );
}