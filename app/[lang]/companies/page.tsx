import type { Locale } from '@/i18n.config';
import CompaniesClient from './CompaniesClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface CompaniesPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ query?: string; category?: string }>;
}

export default async function CompaniesPage({ params, searchParams }: CompaniesPageProps) {
  const { lang } = await params;
  const { query, category } = await searchParams;

  return <CompaniesClient lang={lang} initialQuery={query} initialCategory={category} />;
}
