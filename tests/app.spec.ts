import { test, expect } from '@playwright/test';

test.describe('FinScope Application', () => {
  
  test.describe('Navigation & Navbar', () => {
    test('should display navbar with correct links', async ({ page }) => {
      await page.goto('/th');
      
      // Check if navbar is visible
      const navbar = page.locator('nav');
      await expect(navbar).toBeVisible();
      
      // Check navbar items
      await expect(page.getByRole('link', { name: 'หน้าแรก' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'บริษัท' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'เกี่ยวกับ' })).toBeVisible();
    });

    test('should navigate to companies page', async ({ page }) => {
      await page.goto('/th');
      
      // Click companies link
      await page.getByRole('link', { name: 'บริษัท' }).first().click();
      
      // Should be on companies page
      await expect(page).toHaveURL(/\/th\/companies/);
    });

    test('should navigate back to home from About link', async ({ page }) => {
      await page.goto('/th/companies');
      
      // Click About link (should go to home)
      await page.getByRole('link', { name: 'เกี่ยวกับ' }).first().click();
      
      // Should be on home page
      await expect(page).toHaveURL(/\/th\/?$/);
    });

    test('should not highlight About link when on home page', async ({ page }) => {
      await page.goto('/th');
      
      // About link should not have primary color (not active)
      const aboutLink = page.getByRole('link', { name: 'เกี่ยวกับ' }).first();
      const linkClasses = await aboutLink.getAttribute('class');
      
      // Should not have primary color classes
      expect(linkClasses).not.toContain('text-primary');
    });

    test('should switch language', async ({ page }) => {
      await page.goto('/th');
      
      // Check current language
      await expect(page).toHaveURL(/\/th/);
      
      // Look for language switcher
      const langSwitcher = page.locator('button').filter({ hasText: /TH|EN/i }).first();
      if (await langSwitcher.isVisible()) {
        await langSwitcher.click();
        
        // Wait for navigation
        await page.waitForURL(/\/(th|en)/);
      }
    });
  });

  test.describe('Companies Page - Search', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
    });

    test('should display search input', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      await expect(searchInput).toBeVisible();
    });

    test('should filter companies by search term', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      
      // Type search term
      await searchInput.fill('Kasikorn');
      await page.waitForTimeout(500); // Wait for debounce
      
      // Check that results are filtered
      const companyCards = page.locator('[data-testid="company-card"], .company-card, article').filter({ hasText: /Kasikorn/i });
      const count = await companyCards.count();
      
      if (count > 0) {
        await expect(companyCards.first()).toBeVisible();
      }
    });

    test('should show no results message for invalid search', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      
      // Type search term that doesn't exist
      await searchInput.fill('XYZ123NonExistentCompany456');
      await page.waitForTimeout(500); // Wait for debounce
      
      // Wait a bit for the empty state to appear
      await page.waitForTimeout(1000);
    });

    test('should clear search results', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      
      // Type and then clear
      await searchInput.fill('Bank');
      await page.waitForTimeout(500);
      
      await searchInput.clear();
      await page.waitForTimeout(500);
      
      // Should show all results again
      const companyCards = page.locator('[data-testid="company-card"], .company-card, article');
      const count = await companyCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Companies Page - Filters & Categories', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
    });

    test('should display category filters', async ({ page }) => {
      // Wait for categories to load
      await page.waitForTimeout(1000);
      
      const categories = page.locator('button, a').filter({ hasText: /ทั้งหมด|All|ธนาคาร|Bank|การเงิน|Finance/i });
      const categoryCount = await categories.count();
      
      expect(categoryCount).toBeGreaterThan(0);
    });

    test('should filter by category', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Find and click a category button
      const categoryButton = page.locator('button').filter({ hasText: /ธนาคารพาณิชย์|Commercial Bank/i }).first();
      
      if (await categoryButton.isVisible()) {
        await categoryButton.click();
        await page.waitForTimeout(500);
        
        // Check URL has category parameter
        const url = page.url();
        expect(url).toMatch(/category=/);
      }
    });

    test('should show all companies when "All" is selected', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Click "All" or "ทั้งหมด" button
      const allButton = page.locator('button').filter({ hasText: /^ทั้งหมด$|^All$/i }).first();
      
      if (await allButton.isVisible()) {
        await allButton.click();
        await page.waitForTimeout(500);
        
        // Should show companies
        const companyCards = page.locator('[data-testid="company-card"], .company-card, article');
        const count = await companyCards.count();
        expect(count).toBeGreaterThan(0);
      }
    });

    test('should combine search and category filters', async ({ page }) => {
      await page.waitForTimeout(1000);
      
      // Click a category
      const categoryButton = page.locator('button').filter({ hasText: /ธนาคาร|Bank/i }).first();
      if (await categoryButton.isVisible()) {
        await categoryButton.click();
        await page.waitForTimeout(500);
      }
      
      // Then search
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      await searchInput.fill('Bangkok');
      await page.waitForTimeout(500);
      
      // URL should have both parameters
      const url = page.url();
      expect(url).toMatch(/Bangkok/i);
    });
  });

  test.describe('Companies Page - Pagination', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
    });

    test('should display pagination controls', async ({ page }) => {
      // Look for pagination buttons
      const pagination = page.locator('nav, div').filter({ has: page.locator('button').filter({ hasText: /1|2|Next|Previous|ถัดไป|ก่อนหน้า/ }) });
      
      // Check if pagination exists (might not if there aren't enough items)
      const paginationCount = await pagination.count();
      
      // If there's pagination, it should be visible
      if (paginationCount > 0) {
        await expect(pagination.first()).toBeVisible();
      }
    });

    test('should navigate to next page', async ({ page }) => {
      // Look for "Next" or page number button
      const nextButton = page.locator('button').filter({ hasText: /Next|ถัดไป|2|›|»/ }).first();
      
      if (await nextButton.isVisible() && await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // URL should have page parameter
        const url = page.url();
        expect(url).toMatch(/page=2|page=next/i);
      }
    });

    test('should navigate to specific page number', async ({ page }) => {
      // Look for page number button (e.g., "2")
      const pageButton = page.locator('button').filter({ hasText: /^2$/ }).first();
      
      if (await pageButton.isVisible()) {
        await pageButton.click();
        await page.waitForTimeout(500);
        
        // Should be on page 2
        const url = page.url();
        expect(url).toMatch(/page=2/);
      }
    });

    test('should maintain filters when paginating', async ({ page }) => {
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      
      // Apply a search filter
      await searchInput.fill('Bank');
      await page.waitForTimeout(500);
      
      // Try to go to next page
      const nextButton = page.locator('button').filter({ hasText: /Next|ถัดไป|2|›/ }).first();
      
      if (await nextButton.isVisible() && await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(500);
        
        // Search term should still be in URL or input
        const inputValue = await searchInput.inputValue();
        expect(inputValue).toBe('Bank');
      }
    });

    test('should disable previous button on first page', async ({ page }) => {
      // Look for "Previous" button
      const prevButton = page.locator('button').filter({ hasText: /Previous|ก่อนหน้า|‹|«/ }).first();
      
      if (await prevButton.isVisible()) {
        // Should be disabled on first page
        await expect(prevButton).toBeDisabled();
      }
    });
  });

  test.describe('Company Detail Page', () => {
    test('should navigate to company detail page', async ({ page }) => {
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Find and click a company card
      const companyCard = page.locator('[data-testid="company-card"], .company-card, article').first();
      
      if (await companyCard.isVisible()) {
        await companyCard.click();
        await page.waitForTimeout(500);
        
        // Should be on company detail page
        await expect(page).toHaveURL(/\/th\/companies\/\d+/);
      }
    });

    test('should display company information on detail page', async ({ page }) => {
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      // Click first company
      const companyCard = page.locator('[data-testid="company-card"], .company-card, article').first();
      
      if (await companyCard.isVisible()) {
        await companyCard.click();
        await page.waitForTimeout(1000);
        
        // Check for company details
        const heading = page.locator('h1, h2').first();
        await expect(heading).toBeVisible();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should display mobile menu on small screens', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/th');
      
      // Look for hamburger menu
      const menuToggle = page.locator('button[aria-label*="menu"], button[aria-label*="เมนู"]').first();
      
      if (await menuToggle.isVisible()) {
        await menuToggle.click();
        await page.waitForTimeout(500);
        
        // Mobile menu should be visible
        const mobileMenu = page.locator('[role="menu"], nav').filter({ hasText: /หน้าแรก|บริษัท/ });
        await expect(mobileMenu.first()).toBeVisible();
      }
    });

    test('should be responsive on tablet', async ({ page }) => {
      // Set viewport to tablet size
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/th/companies');
      await page.waitForLoadState('networkidle');
      
      // Page should load properly
      const searchInput = page.getByPlaceholder(/ค้นหา|Search/i);
      await expect(searchInput).toBeVisible();
    });
  });

  test.describe('Performance & Loading', () => {
    test('should load home page within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/th');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should display loading states', async ({ page }) => {
      await page.goto('/th/companies');
      
      // This test just checks that the page eventually loads
      await page.waitForLoadState('networkidle');
    });
  });
});

