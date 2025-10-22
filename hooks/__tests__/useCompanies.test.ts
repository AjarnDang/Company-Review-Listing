import { renderHook, act } from '@testing-library/react';
import { useCompanies } from '../useCompanies';
import type { Company } from '@/types/company';

describe('useCompanies', () => {
  const mockCompanies: Company[] = [
    {
      id: 1,
      name: 'ABC Bank',
      logo: '/logo1.png',
      category: 'Bank',
      averageScore: 4.5,
      reviewCount: 100,
      description: { en: 'ABC Bank desc', th: 'ธนาคาร ABC' },
      website: 'https://abc.com',
      founded: 2000,
    },
    {
      id: 2,
      name: 'XYZ Fintech',
      logo: '/logo2.png',
      category: 'Fintech',
      averageScore: 4.8,
      reviewCount: 50,
      description: { en: 'XYZ Fintech desc', th: 'XYZ ฟินเทค' },
      website: 'https://xyz.com',
      founded: 2010,
    },
    {
      id: 3,
      name: 'DEF Payment',
      logo: '/logo3.png',
      category: 'Payment',
      averageScore: 3.5,
      reviewCount: 200,
      description: { en: 'DEF Payment desc', th: 'DEF การชำระเงิน' },
      website: 'https://def.com',
      founded: 2015,
    },
    {
      id: 4,
      name: 'GHI Broker',
      logo: '/logo4.png',
      category: 'Broker',
      averageScore: 4.2,
      reviewCount: 75,
      description: { en: 'GHI Broker desc', th: 'GHI โบรกเกอร์' },
      website: 'https://ghi.com',
      founded: 2005,
    },
  ];

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedCategories).toEqual([]);
    expect(result.current.sortBy).toBe('highestRated');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalCount).toBe(4);
    expect(result.current.filteredCount).toBe(4);
  });

  it('should filter companies by search term', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    act(() => {
      result.current.setSearchTerm('ABC');
    });

    expect(result.current.filteredCount).toBe(1);
    expect(result.current.displayedCompanies[0].name).toBe('ABC Bank');
  });

  it('should filter companies by category', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    act(() => {
      result.current.setSelectedCategories(['Fintech']);
    });

    expect(result.current.filteredCount).toBe(1);
    expect(result.current.displayedCompanies[0].category).toBe('Fintech');
  });

  it('should filter by multiple categories', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    act(() => {
      result.current.setSelectedCategories(['Fintech', 'Bank']);
    });

    expect(result.current.filteredCount).toBe(2);
  });

  it('should sort by highest rated', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.setSortBy('highestRated');
    });

    expect(result.current.displayedCompanies[0].name).toBe('XYZ Fintech');
    expect(result.current.displayedCompanies[0].averageScore).toBe(4.8);
  });

  it('should sort by lowest rated', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.setSortBy('lowestRated');
    });

    expect(result.current.displayedCompanies[0].name).toBe('DEF Payment');
    expect(result.current.displayedCompanies[0].averageScore).toBe(3.5);
  });

  it('should sort by most reviews', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.setSortBy('mostReviews');
    });

    expect(result.current.displayedCompanies[0].name).toBe('DEF Payment');
    expect(result.current.displayedCompanies[0].reviewCount).toBe(200);
  });

  it('should sort alphabetically', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 10,
      })
    );

    act(() => {
      result.current.setSortBy('alphabetical');
    });

    expect(result.current.displayedCompanies[0].name).toBe('ABC Bank');
  });

  it('should paginate correctly', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 2,
      })
    );

    expect(result.current.totalPages).toBe(2);
    expect(result.current.displayedCompanies).toHaveLength(2);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.displayedCompanies).toHaveLength(2);
    expect(result.current.currentPage).toBe(2);
  });

  it('should reset to page 1 when search term changes', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 2,
      })
    );

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.setSearchTerm('ABC');
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should reset to page 1 when category changes', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 2,
      })
    );

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.setSelectedCategories(['Fintech']);
    });

    expect(result.current.currentPage).toBe(1);
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    act(() => {
      result.current.setSearchTerm('ABC');
      result.current.setSelectedCategories(['Fintech']);
      result.current.setSortBy('lowestRated');
      result.current.setCurrentPage(2);
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.selectedCategories).toEqual([]);
    expect(result.current.sortBy).toBe('highestRated');
    expect(result.current.currentPage).toBe(1);
  });

  it('should handle initial values', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        initialSearchTerm: 'XYZ',
        initialCategories: ['Fintech'],
        initialSortBy: 'alphabetical',
      })
    );

    expect(result.current.searchTerm).toBe('XYZ');
    expect(result.current.selectedCategories).toEqual(['Fintech']);
    expect(result.current.sortBy).toBe('alphabetical');
  });

  it('should combine search and category filters', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
      })
    );

    act(() => {
      result.current.setSearchTerm('XYZ');
      result.current.setSelectedCategories(['Fintech']);
    });

    expect(result.current.filteredCount).toBe(1);
    expect(result.current.displayedCompanies[0].name).toBe('XYZ Fintech');
  });

  it('should calculate start and end indices correctly', () => {
    const { result } = renderHook(() =>
      useCompanies({
        companies: mockCompanies,
        itemsPerPage: 2,
      })
    );

    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(2);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.startIndex).toBe(2);
    expect(result.current.endIndex).toBe(4);
  });
});

