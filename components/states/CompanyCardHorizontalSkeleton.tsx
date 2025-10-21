import React from "react";
import { Card, CardBody } from "@heroui/react";

export default function CompanyCardHorizontalSkeleton() {
  return (
    <Card className="min-h-[200px] animate-pulse">
      <CardBody className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Logo Skeleton */}
          <div className="shrink-0">
            <div className="w-[100px] h-[70px] bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 flex flex-col justify-between gap-4">
            {/* Top Section */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                {/* Company Name */}
                <div className="flex-1">
                  <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-2" />
                </div>
                {/* Category Chip */}
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>

              {/* Description Lines */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6" />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Rating Section */}
              <div className="space-y-2">
                {/* Stars */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
                      />
                    ))}
                  </div>
                  <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                </div>
                {/* Reviews Count */}
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>

              {/* Button */}
              <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

