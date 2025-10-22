"use client";

import React from "react";
import { Pagination } from "@heroui/react";
import type { TranslationKeys } from "@/locales/th";

interface CompanyPaginationProps {
  translations: TranslationKeys;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export default function CompanyPagination({
  translations: t,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage: _itemsPerPage,
  totalItems,
  startIndex,
  endIndex,
}: CompanyPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
      {/* Results info */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t.pagination.showing}{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {startIndex + 1}
        </span>{" "}
        {t.pagination.to}{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {Math.min(endIndex, totalItems)}
        </span>{" "}
        {t.pagination.of}{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {totalItems}
        </span>{" "}
        {t.pagination.results}
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={onPageChange}
          showControls
          classNames={{
            wrapper: "gap-2",
            item: "w-10 h-10",
            cursor: "bg-primary text-white",
          }}
        />
      </div>
    </div>
  );
}

