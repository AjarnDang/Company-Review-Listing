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
    bgColor: "bg-primary-100 dark:bg-primary-900/30",
    textColor: "text-primary-600 dark:text-primary-400",
    hoverBg: "hover:bg-primary-200 dark:hover:bg-primary-800/40"
  },
  { 
    id: "Broker", 
    translationKey: "broker",
    icon: "📈", 
    bgColor: "bg-secondary-100 dark:bg-secondary-900/30",
    textColor: "text-secondary-600 dark:text-secondary-400",
    hoverBg: "hover:bg-secondary-200 dark:hover:bg-secondary-800/40"
  },
  { 
    id: "Payment", 
    translationKey: "payment",
    icon: "💰", 
    bgColor: "bg-success-100 dark:bg-success-900/30",
    textColor: "text-success-600 dark:text-success-400",
    hoverBg: "hover:bg-success-200 dark:hover:bg-success-800/40"
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
              className={`px-6 py-4 rounded-2xl ${category.bgColor} ${category.hoverBg}
                border-2 border-transparent ${category.textColor}
                shadow-md hover:shadow-xl transition-all`}
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
                  <div className="text-lg font-bold">
                    {t.companies.categories[category.translationKey as keyof typeof t.companies.categories]}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

