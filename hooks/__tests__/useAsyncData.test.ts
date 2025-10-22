import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsyncData } from '../useAsyncData';

describe('useAsyncData', () => {
  it('should initialize with loading state', () => {
    const fetchFn = jest.fn(() => Promise.resolve('data'));
    
    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeNull();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const fetchFn = jest.fn(() => Promise.resolve(mockData));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(result.current.isEmpty).toBe(false);
  });

  it('should handle fetch errors', async () => {
    const mockError = new Error('Fetch failed');
    const fetchFn = jest.fn(() => Promise.reject(mockError));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });

  it('should call onSuccess callback', async () => {
    const mockData = { id: 1 };
    const fetchFn = jest.fn(() => Promise.resolve(mockData));
    const onSuccess = jest.fn();

    renderHook(() =>
      useAsyncData({
        fetchFn,
        onSuccess,
      })
    );

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockData);
    });
  });

  it('should call onError callback', async () => {
    const mockError = new Error('Failed');
    const fetchFn = jest.fn(() => Promise.reject(mockError));
    const onError = jest.fn();

    renderHook(() =>
      useAsyncData({
        fetchFn,
        onError,
      })
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(mockError);
    });
  });

  it('should refetch data', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };
    const fetchFn = jest
      .fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should reset data', async () => {
    const mockData = { id: 1 };
    const fetchFn = jest.fn(() => Promise.resolve(mockData));
    const initialData = { id: 0 };

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
        initialData,
      })
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toEqual(initialData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should detect empty array data', async () => {
    const fetchFn = jest.fn(() => Promise.resolve([]));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isEmpty).toBe(true);
    });
  });

  it('should detect empty object data', async () => {
    const fetchFn = jest.fn(() => Promise.resolve({}));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isEmpty).toBe(true);
    });
  });

  it('should detect null data as empty', async () => {
    const fetchFn = jest.fn(() => Promise.resolve(null));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isEmpty).toBe(true);
    });
  });

  it('should not be empty with valid data', async () => {
    const fetchFn = jest.fn(() => Promise.resolve({ id: 1 }));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.isEmpty).toBe(false);
    });
  });

  it('should refetch when dependencies change', async () => {
    const mockData1 = { id: 1 };
    const mockData2 = { id: 2 };
    const fetchFn = jest
      .fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    const { result, rerender } = renderHook(
      ({ deps }) =>
        useAsyncData({
          fetchFn,
          dependencies: deps,
        }),
      { initialProps: { deps: [1] } }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    rerender({ deps: [2] });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });

    expect(fetchFn).toHaveBeenCalledTimes(2);
  });

  it('should handle string errors', async () => {
    const fetchFn = jest.fn(() => Promise.reject('String error'));

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
      })
    );

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe('String error');
    });
  });

  it('should use initial data before fetch completes', () => {
    const initialData = { id: 0 };
    const fetchFn = jest.fn(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() =>
      useAsyncData({
        fetchFn,
        initialData,
      })
    );

    expect(result.current.data).toEqual(initialData);
    expect(result.current.isLoading).toBe(true);
  });
});

