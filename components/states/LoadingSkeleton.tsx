"use client";

import React from "react";
import { Skeleton, Card, CardBody } from "@heroui/react";
import type { TranslationKeys } from "@/locales/th";

interface LoadingSkeletonProps {
  translations: TranslationKeys;
  type?: "list" | "card" | "table" | "default";
  count?: number;
  message?: string;
}

export default function LoadingSkeleton({ 
  translations: t, 
  type = "default",
  count = 3,
  message
}: LoadingSkeletonProps) {
  if (type === "card") {
    return (
      <div className="space-y-4">
        {message && (
          <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardBody className="space-y-3">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-2">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {message && (
          <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
            {message}
          </div>
        )}
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="w-full">
            <CardBody>
              <div className="flex items-center gap-4">
                <Skeleton className="flex rounded-full w-12 h-12" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-2">
        {message && (
          <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
            {message}
          </div>
        )}
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700">
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        ))}
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {message || t.states.loading.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t.states.loading.message}
        </p>
      </div>
    </div>
  );
}

