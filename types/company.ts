export interface Company {
  id: string;
  name: string;
  logo: string;
  category: CompanyCategory;
  averageScore: number;
  description: {
    en: string;
    th: string;
  };
  website: string;
  reviewCount: number;
}

export type CompanyCategory = "Fintech" | "Broker" | "Payment" | "Bank";

export const COMPANY_CATEGORIES: CompanyCategory[] = ["Fintech", "Broker", "Payment", "Bank"];

export interface CompanyFilters {
  search: string;
  categories: CompanyCategory[];
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

