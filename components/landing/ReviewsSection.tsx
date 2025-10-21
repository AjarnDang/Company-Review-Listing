"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ReviewCard from "./ReviewCard";
import type { Locale } from "@/i18n.config";

interface ReviewsSectionProps {
  lang: Locale;
}

const reviews = [
  {
    name: "Sarah Anderson",
    role: "Financial Analyst",
    company: "Tech Corp",
    rating: 5,
    review: "FinScope has been invaluable in helping me compare different financial services. The reviews are detailed and genuine, making it easy to make informed decisions.",
    date: "2 weeks ago",
  },
  {
    name: "Michael Chen",
    role: "Small Business Owner",
    company: "Chen Enterprises",
    rating: 5,
    review: "As a business owner, finding the right payment gateway was crucial. FinScope's comprehensive reviews and ratings helped me choose the perfect solution for my needs.",
    date: "1 month ago",
  },
  {
    name: "Emily Rodriguez",
    role: "Investment Manager",
    company: "Global Investments",
    rating: 4,
    review: "The platform offers honest, unbiased reviews from real users. It's refreshing to see a review platform that prioritizes transparency and community feedback.",
    date: "3 weeks ago",
  },
  {
    name: "David Thompson",
    role: "Entrepreneur",
    company: "StartupXYZ",
    rating: 5,
    review: "FinScope helped me navigate the complex world of fintech solutions. The detailed comparisons and user experiences saved me countless hours of research.",
    date: "1 week ago",
  },
  {
    name: "Lisa Park",
    role: "Finance Director",
    company: "Park Industries",
    rating: 5,
    review: "The community-driven approach makes all the difference. I trust FinScope reviews because they come from real people with real experiences.",
    date: "2 months ago",
  },
  {
    name: "James Wilson",
    role: "Freelance Consultant",
    company: "Self-Employed",
    rating: 4,
    review: "Great platform for comparing brokers and financial services. The user interface is clean, and the information is well-organized and easy to understand.",
    date: "3 weeks ago",
  },
];

export default function ReviewsSection({ lang }: ReviewsSectionProps) {
  const router = useRouter();

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust FinScope for honest, reliable financial service reviews
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to share your experience?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              color="primary"
              className="font-semibold"
              onPress={() => router.push(`/${lang}/companies`)}
              endContent={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            >
              Write a Review
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="font-semibold"
              onPress={() => router.push(`/${lang}/companies`)}
            >
              Browse All Companies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

