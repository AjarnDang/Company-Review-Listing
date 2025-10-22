import type { CompanyCategory } from '@/types/company';
import type { TranslationKeys } from '@/locales/th';

/**
 * Get translated category name
 * @param category - The company category
 * @param translations - Translation keys object
 * @returns Translated category name
 */
export function getCategoryName(
  category: CompanyCategory,
  translations: TranslationKeys
): string {
  const categoryKey = category.toLowerCase() as keyof typeof translations.companies.categories;
  return translations.companies.categories[categoryKey] || category;
}

/**
 * Get all categories with translations
 * @param translations - Translation keys object
 * @returns Array of objects with category value and translated label
 */
export function getTranslatedCategories(
  translations: TranslationKeys
): Array<{ value: CompanyCategory; label: string }> {
  return [
    { value: 'Fintech', label: translations.companies.categories.fintech },
    { value: 'Broker', label: translations.companies.categories.broker },
    { value: 'Payment', label: translations.companies.categories.payment },
    { value: 'Bank', label: translations.companies.categories.bank },
  ];
}

