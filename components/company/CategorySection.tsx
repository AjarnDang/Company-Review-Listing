"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CompanyCard from "./CompanyCard";
import type { Company } from "@/types/company";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";

interface CategorySectionProps {
  category: "Fintech" | "Broker" | "Payment" | "Bank";
  companies: Company[];
  translations: TranslationKeys;
  lang: Locale;
  maxItems?: number;
}

export default function CategorySection({
  category,
  companies,
  translations: t,
  lang,
  maxItems = 4,
}: CategorySectionProps) {
  const router = useRouter();
  
  // Filter and limit companies by category
  const categoryCompanies = companies
    .filter((c) => c.category === category)
    .sort((a, b) => b.averageScore - a.averageScore) // Sort by rating
    .slice(0, maxItems);

  if (categoryCompanies.length === 0) return null;

  const handleSeeMore = () => {
    router.push(`/${lang}/category/${category.toLowerCase()}`);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t.category.bestIn.replace('{{category}}', category)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t.category.topRated.replace('{{category}}', category.toLowerCase())}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button
              onPress={handleSeeMore}
              variant="flat"
              className="font-semibold"
              endContent={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              {t.category.seeMore}
            </Button>
          </motion.div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <CompanyCard company={company} translations={t} lang={lang} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

