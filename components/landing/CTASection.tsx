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

  return (
    <section className="py-20 px-4  dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* CTA Card */}
        <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>

          {/* Animated Gradient Orbs */}
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="relative px-8 py-16 md:px-12 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t.cta.badge}
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {t.cta.title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t.cta.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.cta.features.transparent.title}</h3>
              <p className="text-sm text-white/80">
                {t.cta.features.transparent.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left"
            >
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.cta.features.community.title}</h3>
              <p className="text-sm text-white/80">
                {t.cta.features.community.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left"
            >
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.cta.features.improving.title}</h3>
              <p className="text-sm text-white/80">
                {t.cta.features.improving.description}
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 font-semibold hover:bg-gray-100 shadow-lg"
              onPress={() => router.push(`/${lang}/companies`)}
              endContent={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              {t.cta.exploreCompanies}
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-2 border-white text-white font-semibold hover:bg-white/10"
              onPress={() => router.push(`/${lang}/about`)}
            >
              {t.cta.learnMore}
            </Button>
          </motion.div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

