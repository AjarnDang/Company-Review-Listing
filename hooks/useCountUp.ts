import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  start?: number;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  start = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - percentage, 3);
    const currentCount = start + (end - start) * easeOut;

    setCount(currentCount);

    if (percentage < 1) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      setCount(end);
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    startTimeRef.current = undefined;
    frameRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    setCount(start);
    setIsAnimating(false);
    startTimeRef.current = undefined;
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Format the number with separator
  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    if (separator) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }
    
    const formatted = parts.join('.');
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    count,
    formattedCount: formatNumber(count),
    isAnimating,
    startAnimation,
    reset,
  };
}

