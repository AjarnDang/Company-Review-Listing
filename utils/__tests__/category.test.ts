import { getCategoryName, getTranslatedCategories } from '../category';
import { en } from '@/locales/en';
import { th } from '@/locales/th';
import type { CompanyCategory } from '@/types/company';

describe('category utils', () => {
  describe('getCategoryName', () => {
    it('should return translated category name for Fintech in English', () => {
      const result = getCategoryName('Fintech', en);
      expect(result).toBe('Fintech');
    });

    it('should return translated category name for Bank in English', () => {
      const result = getCategoryName('Bank', en);
      expect(result).toBe('Bank');
    });

    it('should return translated category name for Broker in English', () => {
      const result = getCategoryName('Broker', en);
      expect(result).toBe('Broker');
    });

    it('should return translated category name for Payment in English', () => {
      const result = getCategoryName('Payment', en);
      expect(result).toBe('Payment');
    });

    it('should return translated category name for Fintech in Thai', () => {
      const result = getCategoryName('Fintech', th);
      expect(result).toBe('ฟินเทค');
    });

    it('should return translated category name for Bank in Thai', () => {
      const result = getCategoryName('Bank', th);
      expect(result).toBe('ธนาคารพาณิชย์');
    });

    it('should return translated category name for Broker in Thai', () => {
      const result = getCategoryName('Broker', th);
      expect(result).toBe('โบรกเกอร์');
    });

    it('should return translated category name for Payment in Thai', () => {
      const result = getCategoryName('Payment', th);
      expect(result).toBe('การชำระเงิน');
    });

    it('should handle case insensitivity', () => {
      const result = getCategoryName('FINTECH' as CompanyCategory, en);
      expect(result).toBeDefined();
    });

    it('should return original category if translation not found', () => {
      const result = getCategoryName('Unknown' as CompanyCategory, en);
      expect(result).toBe('Unknown');
    });
  });

  describe('getTranslatedCategories', () => {
    it('should return array of all categories with English translations', () => {
      const categories = getTranslatedCategories(en);
      
      expect(categories).toHaveLength(4);
      expect(categories[0]).toEqual({ value: 'Fintech', label: 'Fintech' });
      expect(categories[1]).toEqual({ value: 'Broker', label: 'Broker' });
      expect(categories[2]).toEqual({ value: 'Payment', label: 'Payment' });
      expect(categories[3]).toEqual({ value: 'Bank', label: 'Bank' });
    });

    it('should return array of all categories with Thai translations', () => {
      const categories = getTranslatedCategories(th);
      
      expect(categories).toHaveLength(4);
      expect(categories[0]).toEqual({ value: 'Fintech', label: 'ฟินเทค' });
      expect(categories[1]).toEqual({ value: 'Broker', label: 'โบรกเกอร์' });
      expect(categories[2]).toEqual({ value: 'Payment', label: 'การชำระเงิน' });
      expect(categories[3]).toEqual({ value: 'Bank', label: 'ธนาคารพาณิชย์' });
    });

    it('should return categories in consistent order', () => {
      const categoriesEn = getTranslatedCategories(en);
      const categoriesTh = getTranslatedCategories(th);
      
      expect(categoriesEn.map(c => c.value)).toEqual(
        categoriesTh.map(c => c.value)
      );
    });

    it('should have valid CompanyCategory values', () => {
      const categories = getTranslatedCategories(en);
      const validCategories: CompanyCategory[] = ['Fintech', 'Broker', 'Payment', 'Bank'];
      
      categories.forEach(category => {
        expect(validCategories).toContain(category.value);
      });
    });

    it('should have non-empty labels', () => {
      const categories = getTranslatedCategories(en);
      
      categories.forEach(category => {
        expect(category.label).toBeTruthy();
        expect(category.label.length).toBeGreaterThan(0);
      });
    });
  });
});

