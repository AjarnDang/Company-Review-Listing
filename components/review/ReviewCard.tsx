"use client";

import React, { useState } from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import type { Review } from "@/types/review";
import type { TranslationKeys } from "@/locales/th";
import type { Locale } from "@/i18n.config";

interface ReviewCardProps {
  review: Review;
  translations: TranslationKeys;
  lang: Locale;
}

export default function ReviewCard({ review, translations: t, lang }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 dark:text-gray-600 fill-current"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t.reviews.today;
    if (diffDays === 1) return t.reviews.yesterday;
    if (diffDays < 30) return t.reviews.daysAgo.replace("{{count}}", diffDays.toString());
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return t.reviews.monthsAgo.replace("{{count}}", months.toString());
    }
    const years = Math.floor(diffDays / 365);
    return t.reviews.yearsAgo.replace("{{count}}", years.toString());
  };

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpful(helpful + 1);
      setHasVoted(true);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody className="p-6">
        {/* Reviewer Info */}
        <div className="flex items-start gap-4 mb-4">
          {/* Avatar */}
          <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {review.reviewerInitials}
          </div>

          {/* Name, Rating, Date */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {review.reviewerName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {review.verified && (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="success"
                    startContent={
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                  >
                    {t.reviews.verified}
                  </Chip>
                )}
              </div>
            </div>

            {/* Stars and Date */}
            <div className="flex items-center gap-3 mb-2">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(review.date)}
              </span>
            </div>

            {/* Review Title */}
            {review.title && (
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {review.title}
              </h4>
            )}
          </div>
        </div>

        {/* Review Content */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {review.content[lang]}
          </p>
        </div>

        {/* Helpful Button */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            size="sm"
            variant="light"
            onPress={handleHelpful}
            disabled={hasVoted}
            startContent={
              <svg
                className="w-4 h-4"
                fill={hasVoted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            }
          >
            {t.reviews.helpful} ({helpful})
          </Button>
        </div>

        {/* Company Reply */}
        {review.companyReply && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {t.reviews.companyReplied}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(review.companyReply.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {review.companyReply.content[lang]}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

