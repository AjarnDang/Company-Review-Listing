import { renderHook, act } from '@testing-library/react';
import { useSearchFilter } from '../useSearchFilter';

describe('useSearchFilter', () => {
  const mockData = [
    { id: 1, name: 'Apple', description: 'A fruit', price: 100 },
    { id: 2, name: 'Banana', description: 'Yellow fruit', price: 50 },
    { id: 3, name: 'Cherry', description: 'Red fruit', price: 200 },
    { id: 4, name: 'Date', description: 'Sweet fruit', price: 150 },
  ];

  it('should return all data when search term is empty', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name', 'description'],
      })
    );

    expect(result.current.filteredData).toHaveLength(4);
    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.isEmpty).toBe(false);
  });

  it('should filter data by search term (case insensitive)', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name', 'description'],
      })
    );

    act(() => {
      result.current.setSearchTerm('apple');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Apple');
  });

  it('should filter by multiple search keys', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name', 'description'],
      })
    );

    act(() => {
      result.current.setSearchTerm('yellow');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Banana');
  });

  it('should filter by number fields', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['price'],
      })
    );

    act(() => {
      result.current.setSearchTerm('100');
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Apple');
  });

  it('should return empty array when no matches found', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name'],
      })
    );

    act(() => {
      result.current.setSearchTerm('xyz123');
    });

    expect(result.current.filteredData).toHaveLength(0);
    expect(result.current.isEmpty).toBe(true);
  });

  it('should clear search term', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name'],
      })
    );

    act(() => {
      result.current.setSearchTerm('Apple');
    });

    expect(result.current.filteredData).toHaveLength(1);

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.filteredData).toHaveLength(4);
  });

  it('should handle initial search term', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name'],
        initialSearch: 'Cherry',
      })
    );

    expect(result.current.searchTerm).toBe('Cherry');
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Cherry');
  });

  it('should ignore whitespace in search term', () => {
    const { result } = renderHook(() =>
      useSearchFilter({
        data: mockData,
        searchKeys: ['name'],
      })
    );

    act(() => {
      result.current.setSearchTerm('   ');
    });

    expect(result.current.filteredData).toHaveLength(4);
  });

  it('should update filtered data when data changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) =>
        useSearchFilter({
          data,
          searchKeys: ['name'],
        }),
      { initialProps: { data: mockData } }
    );

    expect(result.current.filteredData).toHaveLength(4);

    const newData = [
      { id: 5, name: 'Elderberry', description: 'Purple fruit', price: 300 },
    ];

    rerender({ data: newData });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Elderberry');
  });
});

