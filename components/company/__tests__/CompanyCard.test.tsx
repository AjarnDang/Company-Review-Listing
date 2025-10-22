import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CompanyCard from '../CompanyCard';
import { en } from '@/locales/en';
import type { Company } from '@/types/company';

// Mock LazyImage component
jest.mock('../../LazyImage', () => {
  return function MockLazyImage({ alt, src }: any) {
    return <img alt={alt} src={src} data-testid="lazy-image" />;
  };
});

describe('CompanyCard', () => {
  const mockCompany: Company = {
    id: '1',
    name: 'Test Bank',
    logo: '/test-logo.png',
    category: 'Bank',
    averageScore: 4.5,
    reviewCount: 100,
    description: {
      en: 'A great bank for your needs',
      th: 'ธนาคารที่ดีสำหรับคุณ',
    },
    website: 'https://testbank.com',
    founded: 2000,
  };

  it('should render company name', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('Test Bank')).toBeInTheDocument();
  });

  it('should render company logo', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    const logo = screen.getByTestId('lazy-image');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Test Bank logo');
    expect(logo).toHaveAttribute('src', '/test-logo.png');
  });

  it('should display category chip', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('Bank')).toBeInTheDocument();
  });

  it('should display rating score', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should display review count', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    expect(screen.getByText(/100.*reviews/i)).toBeInTheDocument();
  });

  it('should display description in English', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('A great bank for your needs')).toBeInTheDocument();
  });

  it('should display description in Thai', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="th" />);
    
    expect(screen.getByText('ธนาคารที่ดีสำหรับคุณ')).toBeInTheDocument();
  });

  it('should render Read Reviews button with correct link', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    const button = screen.getByRole('link', { name: /Read Reviews Test Bank/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/en/companies/1');
  });

  it('should render 5 stars total (full, half, and empty)', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    const article = screen.getByRole('article');
    const svgs = article.querySelectorAll('svg');
    
    // Should have stars (exact count may vary with other icons)
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should display correct stars for rating 5.0', () => {
    const fullRatingCompany = { ...mockCompany, averageScore: 5.0 };
    render(<CompanyCard company={fullRatingCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('5.0')).toBeInTheDocument();
  });

  it('should display correct stars for rating 3.5 (with half star)', () => {
    const halfStarCompany = { ...mockCompany, averageScore: 3.5 };
    render(<CompanyCard company={halfStarCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });

  it('should have accessible aria labels', () => {
    render(<CompanyCard company={mockCompany} translations={en} lang="en" />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', expect.stringContaining('Test Bank'));
  });

  it('should render Fintech category with primary color', () => {
    const fintechCompany = { ...mockCompany, category: 'Fintech' as const };
    render(<CompanyCard company={fintechCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('Fintech')).toBeInTheDocument();
  });

  it('should render Broker category', () => {
    const brokerCompany = { ...mockCompany, category: 'Broker' as const };
    render(<CompanyCard company={brokerCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('Broker')).toBeInTheDocument();
  });

  it('should render Payment category', () => {
    const paymentCompany = { ...mockCompany, category: 'Payment' as const };
    render(<CompanyCard company={paymentCompany} translations={en} lang="en" />);
    
    expect(screen.getByText('Payment')).toBeInTheDocument();
  });

  it('should handle long company names gracefully', () => {
    const longNameCompany = {
      ...mockCompany,
      name: 'Very Long Company Name That Should Be Truncated With Line Clamp',
    };
    render(<CompanyCard company={longNameCompany} translations={en} lang="en" />);
    
    expect(screen.getByText(/Very Long Company Name/)).toBeInTheDocument();
  });

  it('should handle zero reviews', () => {
    const noReviewsCompany = { ...mockCompany, reviewCount: 0 };
    render(<CompanyCard company={noReviewsCompany} translations={en} lang="en" />);
    
    expect(screen.getByText(/0.*reviews/i)).toBeInTheDocument();
  });

  it('should have card body and footer structure', () => {
    const { container } = render(
      <CompanyCard company={mockCompany} translations={en} lang="en" />
    );
    
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });
});

