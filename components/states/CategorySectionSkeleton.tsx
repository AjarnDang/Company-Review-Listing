import React from "react";
import { Card, CardBody } from "@heroui/react";

export default function CategorySectionSkeleton() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse" />
            <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Company Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardBody className="p-6">
                {/* Logo Skeleton */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                </div>

                {/* Company Name Skeleton */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse" />

                {/* Category Chip Skeleton */}
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 animate-pulse" />

                {/* Stars Skeleton */}
                <div className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>

                {/* Reviews Count Skeleton */}
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 mx-auto animate-pulse" />

                {/* Button Skeleton */}
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

