"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@heroui/react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onLoadComplete?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

/**
 * LazyImage Component
 * 
 * Lazy loads images with loading skeleton and error handling
 * Automatically shows loading state while image is loading
 * Falls back to placeholder on error
 * 
 * @example
 * ```tsx
 * <LazyImage
 *   src="/img/company-logo.png"
 *   alt="Company Logo"
 *   width={100}
 *   height={50}
 *   className="rounded-lg"
 * />
 * ```
 */
export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  objectFit = "contain",
  onLoadComplete,
  onError,
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E",
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoadComplete = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setImageSrc(fallbackSrc);
    onError?.();
  };

  const imageProps = fill
    ? { fill: true }
    : { width: width || 100, height: height || 50 };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <Skeleton 
          className={`absolute inset-0 rounded-lg ${className}`}
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}

      {/* Image */}
      <Image
        {...imageProps}
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ objectFit }}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoadComplete}
        onError={handleError}
        unoptimized={hasError} // Don't optimize fallback images
      />

      {/* Error Indicator (optional) */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {/* You can add an icon here */}
          </span>
        </div>
      )}
    </div>
  );
}

