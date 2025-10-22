"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";

interface SearchInputProps {
  placeholder: string;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  value?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  showKeyboardHint?: boolean;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  placeholder,
  onClick,
  onChange,
  onKeyDown,
  onClear,
  value,
  autoFocus = false,
  readOnly = true,
  showKeyboardHint: _showKeyboardHint = true,
  className = ""
}, ref) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !readOnly) {
      onChange(e.target.value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleContainerClick = () => {
    if (readOnly && onClick) {
      onClick();
    }
  };

  const handleContainerKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  };

  const containerProps = readOnly
    ? {
        onClick: handleContainerClick,
        onKeyDown: handleContainerKeyDown,
        tabIndex: 0,
        role: "button" as const,
        "aria-label": placeholder,
      }
    : {
        role: "search" as const,
      };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: readOnly ? 0.3 : 0 }}
      whileHover={readOnly ? { scale: 1.02 } : undefined}
      whileTap={readOnly ? { scale: 0.98 } : undefined}
    >
      <div
        {...containerProps}
        className={`relative flex items-center gap-3 h-14 px-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${readOnly ? 'cursor-pointer' : ''}`}
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Search Icon */}
        <motion.div
          className="relative z-10"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </motion.div>

        {/* Input Field or Placeholder Text */}
        <div className="relative z-10 flex-1">
          {readOnly ? (
            <motion.span
              className="text-base text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {placeholder}
            </motion.span>
          ) : (
            <input
              ref={ref}
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              autoFocus={autoFocus}
              className="w-full bg-transparent text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none border-none focus:outline-none focus:ring-0"
            />
          )}
        </div>

        {/* Clear Button (for editable mode) */}
        {!readOnly && value && onClear && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClear}
            className="relative z-10 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}

        {/* Shimmer effect (only for read-only) */}
        {readOnly && (
          <motion.div
            className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent"
            animate={{
              translateX: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear"
            }}
            aria-hidden="true"
          />
        )}

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50 transition-all duration-300" aria-hidden="true" />
      </div>

      {/* Floating particles on hover (only for read-only) */}
      {readOnly && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: "50%",
              }}
              initial={{ opacity: 0, y: 0 }}
              whileHover={{ 
                opacity: [0, 1, 0],
                y: [-20, -40],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
