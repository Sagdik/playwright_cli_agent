import { test, expect } from '@playwright/test';

test.describe('Example Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to example.com before each test
    await page.goto('https://example.com');
  });

  test('should have title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should have heading', async ({ page }) => {
    // Locate by role
    await expect(page.locator('h1')).toContainText('Example Domain');
  });

  test('should have link', async ({ page }) => {
    // Click a link with specific text
    await expect(page.locator('a')).toContainText('More information...');
  });
});
