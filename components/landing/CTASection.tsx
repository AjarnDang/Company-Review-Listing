"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n.config";
import type { TranslationKeys } from "@/locales/th";

interface CTASectionProps {
  lang: Locale;
  translations: TranslationKeys;
}

export default function CTASection({ lang, translations: t }: CTASectionProps) {
  const router = useRouter();

  const features = [
    {
      title: t.cta.features.transparent.title,
      description: t.cta.features.transparent.description,
    },
    {
      title: t.cta.features.community.title,
      description: t.cta.features.community.description,
    },
    {
      title: t.cta.features.improving.title,
      description: t.cta.features.improving.description,
    },
  ];

  return (
    <section className="py-20 px-4 bg-primary-500">
      <div className="max-w-7xl mx-auto">
        {/* Header - Outside Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t.cta.badge}
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t.cta.description}
          </p>
        </motion.div>

        {/* CTA Card - White Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden lg:w-4xl mx-auto"
        >
          {/* Features Table */}
          <div className="px-8 py-12 md:px-12 md:py-16">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
                >
                  {/* Left Side - Icon & Title */}
                  <div className="flex items-start justify-end gap-4 col-span-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Right Side - Description */}
                  <div className="md:pl-8 col-span-2">
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button
            size="lg"
            className="bg-white text-primary-600 font-semibold hover:bg-gray-50 shadow-lg"
            onPress={() => router.push(`/${lang}/companies`)}
            endContent={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            }
          >
            {t.cta.exploreCompanies}
          </Button>
          <Button
            size="lg"
            variant="bordered"
            className="border-2 border-white text-white font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20"
            onPress={() => router.push(`/${lang}/about`)}
          >
            {t.cta.learnMore}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
