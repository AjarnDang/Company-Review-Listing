import React from "react";
import { Card, CardBody } from "@heroui/react";

export default function CompanyDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>

      {/* Company Header Card Skeleton */}
      <Card className="mb-8">
        <CardBody className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo Skeleton */}
            <div className="shrink-0">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>

            {/* Company Info Skeleton */}
            <div className="flex-1 space-y-4 w-full">
              {/* Title */}
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
              
              {/* Category Chip */}
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />

              {/* Rating */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>

              {/* Website Button */}
              <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />

              {/* Description Lines */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-11/12" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Additional Information Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Stats Card */}
        <Card>
          <CardBody className="p-6">
            <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Reviews Card */}
        <Card>
          <CardBody className="p-6">
            <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="text-center py-8 space-y-2">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto" />
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* CTA Card Skeleton */}
      <Card>
        <CardBody className="p-8 text-center space-y-4">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto max-w-full" />
          <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </CardBody>
      </Card>
    </div>
  );
}

