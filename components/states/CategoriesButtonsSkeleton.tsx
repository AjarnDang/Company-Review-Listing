import React from "react";

export default function CategoriesButtonsSkeleton() {
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 justify-center items-center flex-wrap max-w-3xl mx-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="px-6 py-4 rounded-2xl shadow-md bg-gray-200 dark:bg-gray-700 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

