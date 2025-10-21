import React from "react";
import { Card, CardBody } from "@heroui/react";

export default function CompanyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button Skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        {/* Company Header Card Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Company Logo Skeleton */}
            <div className="shrink-0">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>

            {/* Company Info Skeleton */}
            <div className="flex-1 w-full">
              {/* Company Name and Category */}
              <div className="mb-3">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-3" />
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>

              {/* TrustScore Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-4">
                {/* Rating */}
                <div className="w-full sm:w-auto">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    <div>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"
                          />
                        ))}
                      </div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
            <div className="h-14 w-32 bg-gray-200 dark:bg-gray-700 mr-2 flex items-center justify-center">
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
            <div className="h-14 w-32 flex items-center justify-center">
              <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* Tab Content - Overview */}
          <div className="p-6">
            {/* Company Description Skeleton */}
            <div className="mb-6">
              <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
              </div>
            </div>

            {/* Rating Distribution Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rating Bars Card */}
              <Card className="lg:col-span-2">
                <CardBody className="p-6">
                  <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardBody className="p-6">
                  <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
