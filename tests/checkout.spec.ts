import { test, expect } from '@playwright/test';

test.describe('Saucedemo Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('Login with valid credentials', async ({ page }) => {
    // Fill in username
    await page.fill('input[data-test="username"]', 'standard_user');
    
    // Fill in password
    await page.fill('input[data-test="password"]', 'secret_sauce');
    
    // Click login button
    await page.click('input[data-test="login-button"]');
    
    // Verify successful login by checking for products page
    await expect(page.locator('span.title')).toContainText('Products');
  });

  test('Add item to cart and proceed to checkout', async ({ page }) => {
    // Login
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
    
    // Wait for products to load
    await page.waitForSelector('span.title');
    
    // Add first item to cart
    const addToCartButtons = page.locator('button:has-text("Add to cart")');
    await addToCartButtons.first().click();
    
    // Click shopping cart
    await page.click('a[data-test="shopping-cart-link"]');
    
    // Verify item is in cart
    await expect(page.locator('div.cart_item')).toHaveCount(1);
    
    // Click checkout
    await page.click('button[data-test="checkout"]');
    
    // Verify checkout page loaded
    await expect(page).toHaveURL(/.*checkout-step-one/);
  });

  test('Complete checkout with shipping information', async ({ page }) => {
    // Login
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
    
    // Add item to cart
    await page.waitForSelector('span.title');
    const addToCartButtons = page.locator('button:has-text("Add to cart")');
    await addToCartButtons.first().click();
    
    // Navigate to cart and checkout
    await page.click('a[data-test="shopping-cart-link"]');
    await page.click('button[data-test="checkout"]');
    
    // Fill in checkout information
    await page.fill('input[data-test="firstName"]', 'John');
    await page.fill('input[data-test="lastName"]', 'Doe');
    await page.fill('input[data-test="postalCode"]', '12345');
    
    // Continue to next step
    await page.click('input[data-test="continue"]');
    
    // Verify checkout step two
    await expect(page).toHaveURL(/.*checkout-step-two/);
  });

  test('Complete full checkout flow', async ({ page }) => {
    // Login
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
    
    // Add item to cart
    await page.waitForSelector('span.title');
    const addToCartButtons = page.locator('button:has-text("Add to cart")');
    await addToCartButtons.first().click();
    
    // Navigate to cart and checkout
    await page.click('a[data-test="shopping-cart-link"]');
    await page.click('button[data-test="checkout"]');
    
    // Fill in checkout info
    await page.fill('input[data-test="firstName"]', 'Jane');
    await page.fill('input[data-test="lastName"]', 'Smith');
    await page.fill('input[data-test="postalCode"]', '54321');
    
    // Continue
    await page.click('input[data-test="continue"]');
    
    // Finish checkout
    await page.click('button[data-test="finish"]');
    
    // Verify order complete
    await expect(page).toHaveURL(/.*checkout-complete/);
  });

  test('Cancel checkout process', async ({ page }) => {
    // Login
    await page.fill('input[data-test="username"]', 'standard_user');
    await page.fill('input[data-test="password"]', 'secret_sauce');
    await page.click('input[data-test="login-button"]');
    
    // Add item to cart
    await page.waitForSelector('span.title');
    const addToCartButtons = page.locator('button:has-text("Add to cart")');
    await addToCartButtons.first().click();
    
    // Navigate to cart and checkout
    await page.click('a[data-test="shopping-cart-link"]');
    await page.click('button[data-test="checkout"]');
    
    // Click cancel
    await page.click('button[data-test="cancel"]');
    
    // Verify back on cart page
    await expect(page).toHaveURL(/.*cart/);
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    // Fill in invalid credentials
    await page.fill('input[data-test="username"]', 'invalid_user');
    await page.fill('input[data-test="password"]', 'wrong_password');
    await page.click('input[data-test="login-button"]');
    
    // Verify error message appears
    await expect(page.locator('h3[data-test="error"]')).toBeVisible();
  });
});
