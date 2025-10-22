import { renderHook, act, waitFor } from '@testing-library/react';
import { useCountUp } from '../useCountUp';

describe('useCountUp', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with start value', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 0,
      })
    );

    expect(result.current.count).toBe(0);
    expect(result.current.isAnimating).toBe(false);
  });

  it('should format number with default separator', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 1000,
        start: 1000,
      })
    );

    expect(result.current.formattedCount).toBe('1,000');
  });

  it('should format number with custom separator', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 1000,
        start: 1000,
        separator: '.',
      })
    );

    expect(result.current.formattedCount).toBe('1.000');
  });

  it('should add prefix and suffix', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 100,
        prefix: '$',
        suffix: ' USD',
      })
    );

    expect(result.current.formattedCount).toBe('$100 USD');
  });

  it('should format with decimals', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100.5,
        start: 100.5,
        decimals: 2,
      })
    );

    expect(result.current.formattedCount).toBe('100.50');
  });

  it('should start animation when startAnimation is called', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 0,
        duration: 1000,
      })
    );

    expect(result.current.isAnimating).toBe(false);

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toBe(true);
  });

  it('should not start animation if already animating', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 0,
        duration: 1000,
      })
    );

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toBe(true);

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toBe(true);
  });

  it('should reset count and animation state', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 0,
      })
    );

    act(() => {
      result.current.startAnimation();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isAnimating).toBe(false);
  });

  it('should handle different start and end values', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 200,
        start: 50,
      })
    );

    expect(result.current.count).toBe(50);
  });

  it('should format large numbers correctly', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 1000000,
        start: 1000000,
      })
    );

    expect(result.current.formattedCount).toBe('1,000,000');
  });

  it('should handle zero values', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 0,
        start: 0,
      })
    );

    expect(result.current.count).toBe(0);
    expect(result.current.formattedCount).toBe('0');
  });

  it('should handle custom duration', () => {
    const { result } = renderHook(() =>
      useCountUp({
        end: 100,
        start: 0,
        duration: 5000,
      })
    );

    act(() => {
      result.current.startAnimation();
    });

    expect(result.current.isAnimating).toBe(true);
  });
});

