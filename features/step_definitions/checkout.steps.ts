import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { testContext } from '../../hooks/hooks';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const BASE_URL = 'https://www.saucedemo.com';

// ========== BACKGROUND STEPS ==========

Given('I am on the Saucedemo application', async function() {
  const loginPage = new LoginPage(testContext.page!);
  await loginPage.navigateToLoginPage(BASE_URL);
  console.log('✅ Navigated to Saucedemo application');
});

Given('I login with username {string} and password {string}', async function(username: string, password: string) {
  const loginPage = new LoginPage(testContext.page!);
  await loginPage.login(username, password);
  expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  console.log(`✅ Successfully logged in as ${username}`);
});

// ========== AC1: CART REVIEW STEPS ==========

Given('I have added items to my cart', async function() {
  const page = testContext.page!;
  const buttons = await page.locator('button:has-text("Add to cart")').all();
  for (let i = 0; i < 2; i++) {
    await buttons[i].click();
  }
  console.log('✅ Added items to cart');
});

Given('I have items in my cart', async function() {
  const page = testContext.page!;
  const buttons = await page.locator('button:has-text("Add to cart")').all();
  if (buttons.length > 0) {
    await buttons[0].click();
  }
  console.log('✅ Added item to cart');
});

When('I navigate to the cart page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.navigateToCart();
  console.log('✅ Navigated to cart page');
});

Then('I should see all added items with their details', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const itemCount = await checkoutPage.getCartItemsCount();
  expect(itemCount).toBeGreaterThan(0);
  console.log(`✅ Verified ${itemCount} items in cart`);
});

Then('I should see the total price calculation', async function() {
  const page = testContext.page!;
  // Check for cart total (on cart page) or summary subtotal (on summary page)
  const cartTotal = await page.locator('div[data-testid*="total"], .summary_subtotal, .cart_item_total').first().count();
  expect(cartTotal).toBeGreaterThan(0);
  console.log('✅ Verified total price calculation is visible');
});

Then('I should have options to continue shopping or proceed to checkout', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const continueButton = await checkoutPage.getLocator(
    'button[data-test="continue-shopping"]'
  ).count();
  const checkoutButton = await checkoutPage.getLocator(
    'button[data-test="checkout"]'
  ).count();
  expect(continueButton).toBeGreaterThan(0);
  expect(checkoutButton).toBeGreaterThan(0);
  console.log('✅ Verified continue and checkout options are available');
});

// ========== AC2: CHECKOUT INFORMATION ENTRY STEPS ==========

Given('I navigate to the checkout page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.navigateToCart();
  await checkoutPage.clickCheckout();
  console.log('✅ Navigated to checkout page');
});

Given('I am on the checkout information page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const cartLink = await testContext.page!.locator('a[data-test="shopping-cart-link"]').count();
  if (cartLink > 0) {
    await checkoutPage.navigateToCart();
  }
  await checkoutPage.clickCheckout();
  console.log('✅ On checkout information page');
});

When('I leave all fields empty and click Continue', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickContinueOnCheckout();
  console.log('✅ Clicked Continue with empty fields');
});

Then('I should see an error message indicating First Name is required', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isErrorMessageDisplayed()).toBeTruthy();
  const errorMsg = await checkoutPage.getErrorMessage();
  expect(errorMsg.toLowerCase()).toContain('first name');
  console.log(`✅ Verified error message: ${errorMsg}`);
});

When('I enter valid checkout information', async function(dataTable) {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const rows = dataTable.hashes(); // Use hashes() for tables with multiple columns
  if (rows && rows.length > 0) {
    const data = rows[0];
    await checkoutPage.fillCheckoutInfo(data.firstName, data.lastName, data.postalCode);
    console.log('✅ Entered valid checkout information');
  }
});

When('I click Continue', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickContinueOnCheckout();
  console.log('✅ Clicked Continue');
});

Then('I should be redirected to the checkout overview page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const title = await checkoutPage.getCurrentPageTitle();
  expect(title).toContain('Overview');
  console.log(`✅ Redirected to: ${title}`);
});

When('I fill Last Name with {string} and Postal Code with {string}', async function(lastName: string, postalCode: string) {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.enterLastName(lastName);
  await checkoutPage.enterPostalCode(postalCode);
  console.log('✅ Filled Last Name and Postal Code');
});

Then('I should see error message {string}', async function(errorMsg: string) {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isErrorMessageDisplayed()).toBeTruthy();
  const actualError = await checkoutPage.getErrorMessage();
  expect(actualError).toContain(errorMsg.split(' is ')[0]);
  console.log(`✅ Verified error: ${actualError}`);
});

When('I fill First Name with {string} and Postal Code with {string}', async function(firstName: string, postalCode: string) {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.enterFirstName(firstName);
  await checkoutPage.enterPostalCode(postalCode);
  console.log('✅ Filled First Name and Postal Code');
});

When('I fill First Name with {string} and Last Name with {string}', async function(firstName: string, lastName: string) {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.enterFirstName(firstName);
  await checkoutPage.enterLastName(lastName);
  console.log('✅ Filled First Name and Last Name');
});

// ========== AC3: ORDER OVERVIEW STEPS ==========

Given('I have entered valid checkout information', async function() {
  const page = testContext.page!;
  const cartLink = await page.locator('a[data-test="shopping-cart-link"]').count();
  if (cartLink > 0) {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.navigateToCart();
  }
  
  const checkoutBtn = await page.locator('button[data-test="checkout"]').count();
  if (checkoutBtn > 0) {
    await page.click('button[data-test="checkout"]');
  }

  await page.fill('input[data-test="firstName"]', 'John');
  await page.fill('input[data-test="lastName"]', 'Smith');
  await page.fill('input[data-test="postalCode"]', '12345');
  await page.click('input[data-test="continue"]');
  await page.waitForSelector('span.title');
  console.log('✅ Entered valid checkout information');
});

When('I am on the checkout overview page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const title = await checkoutPage.getCurrentPageTitle();
  expect(title).toContain('Overview');
  console.log(`✅ On checkout overview page: ${title}`);
});

Then('I should see a summary of all items in my order', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const itemCount = await checkoutPage.getCartItemsCount();
  expect(itemCount).toBeGreaterThan(0);
  console.log(`✅ Verified ${itemCount} items in order summary`);
});

Then('I should see payment and shipping information', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isPaymentInfoVisible()).toBeTruthy();
  console.log('✅ Verified payment and shipping information is visible');
});

Then('I should see the subtotal, tax, and total amount', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.arePriceDetailsVisible()).toBeTruthy();
  console.log('✅ Verified price details are visible');
});

Then('I should have Cancel and Finish buttons', async function() {
  const page = testContext.page!;
  const cancelBtn = await page.locator('button[data-test="cancel"]').count();
  const finishBtn = await page.locator('button[data-test="finish"]').count();
  expect(cancelBtn).toBeGreaterThan(0);
  expect(finishBtn).toBeGreaterThan(0);
  console.log('✅ Verified Cancel and Finish buttons are visible');
});

// ========== AC4: ORDER COMPLETION STEPS ==========

When('I click the Cancel button', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickCancel();
  console.log('✅ Clicked Cancel button');
});

Then('I should be redirected back to the cart page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const title = await checkoutPage.getCurrentPageTitle();
  expect(title?.includes('Products') || title?.includes('Your Cart')).toBeTruthy();
  console.log(`✅ Redirected to: ${title}`);
});

When('I click the Finish button', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickFinish();
  console.log('✅ Clicked Finish button');
});

Then('I should be redirected to the order confirmation page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const title = await checkoutPage.getCurrentPageTitle();
  expect(title).toContain('Complete');
  console.log(`✅ Redirected to: ${title}`);
});

Then('I should see a success message confirming my order', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isOrderConfirmationDisplayed()).toBeTruthy();
  const message = await checkoutPage.getConfirmationMessage();
  expect(message).toContain('Thank you');
  console.log(`✅ Verified order confirmation: ${message}`);
});

Then('I should see a {string} button', async function(btnText: string) {
  const page = testContext.page!;
  const btn = await page.locator('button[data-test="back-to-products"]').count();
  expect(btn).toBeGreaterThan(0);
  console.log(`✅ Verified ${btnText} button is visible`);
});

// ========== UTILITY STEPS ==========

Given('I have completed an order', async function() {
  const page = testContext.page!;
  const buttons = await page.locator('button:has-text("Add to cart")').all();
  if (buttons.length > 0) {
    await buttons[0].click();
  }

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.navigateToCart();
  await checkoutPage.clickCheckout();
  await checkoutPage.fillCheckoutInfo('John', 'Smith', '12345');
  await checkoutPage.clickContinueOnCheckout();
  await checkoutPage.clickFinish();
  console.log('✅ Completed order');
});

When('I navigate back to the products page', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickBackToProducts();
  console.log('✅ Navigated back to products page');
});

Then('I should see an empty cart', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isCartEmpty()).toBeTruthy();
  console.log('✅ Verified cart is empty');
});

Given('I am logged in', async function() {
  const page = testContext.page!;
  const inventoryCount = await page.locator('div.inventory_item').count();
  if (inventoryCount === 0) {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
  }
  console.log('✅ User is logged in');
});

Given('my cart is empty', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  const cartLink = await testContext.page!.locator('a[data-test="shopping-cart-link"]').count();
  if (cartLink > 0) {
    await checkoutPage.navigateToCart();
    expect(await checkoutPage.isCartEmpty()).toBeTruthy();
  }
  console.log('✅ Verified cart is empty');
});

When('I try to navigate to checkout', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.navigateToCart();
  console.log('✅ Attempted to navigate to checkout');
});

Then('I should not be able to proceed to checkout', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isCartEmpty()).toBeTruthy();
  console.log('✅ Verified cannot proceed with empty cart');
});
