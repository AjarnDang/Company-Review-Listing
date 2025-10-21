"use client";

import React, { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import { useAsyncData } from "@/hooks/useAsyncData";
import type { Company } from "@/types/company";
import type { Review } from "@/types/review";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Select,
  SelectItem,
  Tabs,
  Tab,
} from "@heroui/react";
import { CompanyDetailSkeleton } from "@/components/states";
import { ReviewCard } from "@/components/review";
import { StateWrapper } from "@/components/states";
import CompanyPagination from "@/components/company/CompanyPagination";
import CompanyCard from "@/components/company/CompanyCard";
import Image from "next/image";

// Fetch companies data
async function fetchCompanies(): Promise<Company[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const companies = await import("@/data/companies.json");
  return companies.default as Company[];
}

// Fetch reviews data
async function fetchReviews(): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const reviews = await import("@/data/reviews.json");
  return reviews.default as Review[];
}

interface CompanyDetailPageProps {
  params: Promise<{ lang: Locale; id: string }>;
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { lang, id } = use(params);
  const t = getDictionary(lang);
  const router = useRouter();
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  // Fetch companies data
  const {
    data: companies,
    isLoading: companiesLoading,
    error: companiesError,
    refetch: refetchCompanies,
  } = useAsyncData({
    fetchFn: fetchCompanies,
    dependencies: [],
  });

  // Fetch reviews data
  const {
    data: allReviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useAsyncData({
    fetchFn: fetchReviews,
    dependencies: [],
  });

  // Find the specific company
  const company = companies?.find((c) => c.id === id);

  // Filter reviews for this company
  const companyReviews = useMemo(() => {
    if (!allReviews || !company) return [];
    return allReviews.filter((review) => review.companyId === company.id);
  }, [allReviews, company]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...companyReviews];

    // Filter by rating
    if (filterRating !== "all") {
      const ratingNum = parseInt(filterRating);
      filtered = filtered.filter((review) => review.rating === ratingNum);
    }

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "mostHelpful":
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    return filtered;
  }, [companyReviews, sortBy, filterRating]);

  // Calculate pagination
  const totalReviews = filteredAndSortedReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = Math.min(startIndex + reviewsPerPage, totalReviews);
  const displayedReviews = filteredAndSortedReviews.slice(startIndex, endIndex);

  // Reset to page 1 when filters or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, filterRating]);

  // Calculate rating distribution
  const ratingDistribution = useMemo(() => {
    if (!companyReviews.length) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    companyReviews.forEach((review) => {
      dist[review.rating as keyof typeof dist]++;
    });
    return dist;
  }, [companyReviews]);

  // Get similar companies (same category, random 4, excluding current company)
  const similarCompanies = useMemo(() => {
    if (!companies || !company) return [];
    
    // Filter companies in same category, excluding current company
    const sameCategory = companies.filter(
      (c) => c.category === company.category && c.id !== company.id
    );
    
    // Shuffle array and take first 4
    const shuffled = [...sameCategory].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [companies, company]);

  const isLoading = companiesLoading || reviewsLoading;
  const error = companiesError || reviewsError;
  const isEmpty = !isLoading && !company;

  // Render large stars for overall rating
  const renderLargeStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-8 h-8 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg className="w-8 h-8 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-8 h-8 text-gray-300 dark:text-gray-600 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <CompanyDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <StateWrapper
          translations={t}
          lang={lang}
          isLoading={false}
          error={error}
          isEmpty={false}
          loadingType="card"
          loadingCount={1}
          loadingMessage={t.states.loading.companies}
          emptyTitle={t.states.empty.companies}
          onRetry={refetchCompanies}
          showClearButton={false}
        >
          <></>
        </StateWrapper>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <StateWrapper
          translations={t}
          lang={lang}
          isLoading={false}
          error={null}
          isEmpty={true}
          loadingType="card"
          loadingCount={1}
          loadingMessage={t.states.loading.companies}
          emptyTitle={t.states.empty.companyNotFound}
          emptyMessage={t.states.empty.companyNotFoundMessage}
          onRetry={refetchCompanies}
          onClearFilters={() => router.push(`/${lang}/companies`)}
          showClearButton={true}
        >
          <></>
        </StateWrapper>
      </div>
    );
  }

  if (!company) return null;

  return (
    <div className="min-h-fit bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="light"
            onPress={() => router.push(`/${lang}/companies`)}
            startContent={
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          >
            {t.states.empty.goBack}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Company Logo */}
            <div className="shrink-0">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center p-3">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {company.name}
                  </h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Chip color="primary" variant="flat" size="sm">
                      {company.category}
                    </Chip>
                  </div>
                </div>
              </div>

              {/* TrustScore Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-4">
                {/* Rating */}
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t.reviews.trustScore}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-bold text-gray-900 dark:text-gray-100">
                      {company.averageScore.toFixed(1)}
                    </span>
                    <div>
                      {renderLargeStars(company.averageScore)}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {t.reviews.basedOn.replace(
                          "{{count}}",
                          companyReviews.length.toString()
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                as="a"
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="bordered"
                startContent={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                }
              >
                {t.companies.visitWebsite}
              </Button>
              <Button
                color="primary"
                variant="solid"
                startContent={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                }
              >
                {t.reviews.writeReview}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs
          variant="underlined"
          aria-label="Company information tabs"
          size="lg"
          classNames={{
            base: "border-b border-gray-200 dark:border-gray-700 w-full",
            tabList: "p-0 gap-4 relative flex h-fit items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-transparent dark:bg-transparent rounded-none",
            cursor: "bg-primary border-b-2 border-primary",
          }}
        >
          {/* Overview Tab */}
          <Tab key="overview" title={t.reviews.overview}>
            {/* Company Description */}
            <div className="my-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lang === "en"
                  ? company.description.en
                  : company.description.th}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rating Bars */}
              <Card className="lg:col-span-2">
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t.reviews.reviewSummary}
                  </h2>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count =
                        ratingDistribution[
                          rating as keyof typeof ratingDistribution
                        ];
                      const percentage =
                        companyReviews.length > 0
                          ? (count / companyReviews.length) * 100
                          : 0;

                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-16">
                            {rating}{" "}
                            {rating === 1 ? t.reviews.star : t.reviews.stars}
                          </span>
                          <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                              style={
                                {
                                  width: `${percentage}%`,
                                } as React.CSSProperties
                              }
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardBody className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t.companies.statistics}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t.companies.category}
                      </span>
                      <Chip color="primary" variant="flat" size="sm">
                        {company.category}
                      </Chip>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t.companies.rating}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {company.averageScore.toFixed(1)} / 5.0
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t.companies.totalReviews}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {companyReviews.length}
                      </span>
                    </div>
                  </div>
                 </CardBody>
               </Card>
              </div>

              {/* Similar Companies Section */}
              {similarCompanies.length > 0 && (
                <div className="lg:mt-12 mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    {t.reviews.similarCompanies}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {similarCompanies.map((similarCompany) => (
                      <CompanyCard
                        key={similarCompany.id}
                        company={similarCompany}
                        translations={t}
                        lang={lang}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Tab>

          {/* Reviews Tab */}
          <Tab key="reviews" title={t.reviews.reviewsTab}>
            {/* Reviews Header with Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t.reviews.title}
              </h2>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                {/* Sort Select */}
                <Select
                  size="sm"
                  label={t.reviews.sortBy}
                  selectedKeys={[sortBy]}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-48"
                >
                  <SelectItem key="newest">{t.reviews.newest}</SelectItem>
                  <SelectItem key="highest">{t.reviews.highest}</SelectItem>
                  <SelectItem key="lowest">{t.reviews.lowest}</SelectItem>
                  <SelectItem key="mostHelpful">
                    {t.reviews.mostHelpful}
                  </SelectItem>
                </Select>

                {/* Filter Select */}
                <Select
                  size="sm"
                  label={t.reviews.filterBy}
                  selectedKeys={[filterRating]}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="w-full sm:w-48"
                >
                  <SelectItem key="all">{t.reviews.allRatings}</SelectItem>
                  <SelectItem key="5">5 {t.reviews.stars}</SelectItem>
                  <SelectItem key="4">4 {t.reviews.stars}</SelectItem>
                  <SelectItem key="3">3 {t.reviews.stars}</SelectItem>
                  <SelectItem key="2">2 {t.reviews.stars}</SelectItem>
                  <SelectItem key="1">1 {t.reviews.star}</SelectItem>
                </Select>
              </div>
            </div>

            {/* Reviews List */}
            {companyReviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t.reviews.noReviews}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t.reviews.noReviewsMessage}
                </p>
                <Button color="primary">{t.reviews.writeReview}</Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {displayedReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      translations={t}
                      lang={lang}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <CompanyPagination
                    translations={t}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={reviewsPerPage}
                    totalItems={totalReviews}
                    startIndex={startIndex + 1}
                    endIndex={endIndex}
                  />
                )}
              </>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
