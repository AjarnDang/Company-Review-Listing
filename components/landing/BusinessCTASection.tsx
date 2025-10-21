"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n.config";
import type { TranslationKeys } from "@/locales/th";

interface BusinessCTASectionProps {
  lang: Locale;
  translations: TranslationKeys;
}

export default function BusinessCTASection({
  lang,
  translations: t,
}: BusinessCTASectionProps) {
  const router = useRouter();

  return (
    <section className="py-12 px-4 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Business CTA Card */}
        <div className="relative bg-primary-100 rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative px-8 py-8 md:px-12 md:py-8">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="flex justify-between flex-wrap gap-4 items-center">
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-dark mb-3">
                    {t.businessCta.headline}
                  </h2>
                  <p className="text-lg md:text-xl text-dark leading-relaxed">
                    {t.businessCta.description}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-secondary-600 font-semibold hover:bg-gray-50 shadow-lg"
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
                  {t.businessCta.ctaButton}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
