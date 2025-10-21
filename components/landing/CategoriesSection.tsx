"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TranslationKeys } from "@/locales/th";

interface CategoriesSectionProps {
  translations: TranslationKeys;
  onCategoryClick: (category?: string) => void;
}

// Categories data
const categories = [
  { 
    id: "Fintech", 
    translationKey: "fintech",
    icon: "💳", 
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  { 
    id: "Broker", 
    translationKey: "broker",
    icon: "📈", 
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  { 
    id: "Payment", 
    translationKey: "payment",
    icon: "💰", 
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-600 dark:text-green-400"
  },
];

export default function CategoriesSection({ translations: t, onCategoryClick }: CategoriesSectionProps) {
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {t.companies.filterByCategory}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.companies.subtitle}
          </p>
        </div> */}

        <motion.div 
          className="flex gap-4 justify-center items-center flex-wrap max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`group relative px-6 py-4 rounded-2xl ${category.bgColor} 
                border-2 border-transparent hover:border-current transition-all
                shadow-md hover:shadow-xl`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              aria-label={`Filter ${t.companies.categories[category.translationKey as keyof typeof t.companies.categories]} companies`}
            >
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {category.icon}
                </motion.span>
                <div className="text-left">
                  <div className={`text-lg font-bold ${category.textColor}`}>
                    {t.companies.categories[category.translationKey as keyof typeof t.companies.categories]}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t.home.viewReviews}
                  </div>
                </div>
              </div>
              
              {/* Gradient overlay on hover */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl bg-linear-to-r ${category.gradient} opacity-0 
                  group-hover:opacity-10 transition-opacity`}
                aria-hidden="true"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

