import type { Locale } from '@/i18n.config';
import { translations } from '@/locales';

export const getDictionary = (locale: Locale) => {
  return translations[locale];
};

