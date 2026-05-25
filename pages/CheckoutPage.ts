import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Page - Page Object Model
 * Contains all locators and methods for checkout page interactions
 */
export class CheckoutPage extends BasePage {
  // Cart Page Locators
  private readonly SHOPPING_CART_LINK = 'a[data-test="shopping-cart-link"]';
  private readonly CART_ITEM = 'div.cart_item';
  private readonly CHECKOUT_BUTTON = 'button[data-test="checkout"]';
  private readonly CONTINUE_SHOPPING_BUTTON = 'button[data-test="continue-shopping"]';
  private readonly PAGE_TITLE = 'span.title';

  // Checkout Information Page Locators
  private readonly FIRST_NAME_INPUT = 'input[data-test="firstName"]';
  private readonly LAST_NAME_INPUT = 'input[data-test="lastName"]';
  private readonly POSTAL_CODE_INPUT = 'input[data-test="postalCode"]';
  private readonly CONTINUE_BUTTON = 'input[data-test="continue"]';
  private readonly CANCEL_BUTTON = 'button[data-test="cancel"]';
  private readonly ERROR_MESSAGE = 'h3[data-test="error"]';

  // Checkout Overview Page Locators
  private readonly FINISH_BUTTON = 'button[data-test="finish"]';
  private readonly SUMMARY_SUBTOTAL = 'div.summary_subtotal';
  private readonly SUMMARY_TAX = 'div.summary_tax';
  private readonly SUMMARY_TOTAL = 'div.summary_total';
  private readonly SUMMARY_INFO_LABEL = 'div.summary_info_label';

  // Order Confirmation Page Locators
  private readonly COMPLETE_HEADER = 'h2.complete-header';
  private readonly BACK_TO_PRODUCTS_BUTTON = 'button[data-test="back-to-products"]';

  constructor(page: Page) {
    super(page);
  }

  // ========== CART PAGE ==========

  /**
   * Navigate to shopping cart
   */
  async navigateToCart(): Promise<void> {
    await this.click(this.SHOPPING_CART_LINK);
    await this.waitForElement(this.PAGE_TITLE);
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount(): Promise<number> {
    return await this.getElementsCount(this.CART_ITEM);
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return (await this.getCartItemsCount()) === 0;
  }

  /**
   * Click checkout button
   */
  async clickCheckout(): Promise<void> {
    await this.click(this.CHECKOUT_BUTTON);
    await this.waitForElement(this.PAGE_TITLE);
  }

  /**
   * Click continue shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.click(this.CONTINUE_SHOPPING_BUTTON);
  }

  // ========== CHECKOUT INFORMATION PAGE ==========

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    await this.fill(this.FIRST_NAME_INPUT, firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    await this.fill(this.LAST_NAME_INPUT, lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    await this.fill(this.POSTAL_CODE_INPUT, postalCode);
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Click continue button on checkout info page
   */
  async clickContinueOnCheckout(): Promise<void> {
    await this.click(this.CONTINUE_BUTTON);
    await this.waitForElement(this.PAGE_TITLE);
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await this.click(this.CANCEL_BUTTON);
    await this.waitForElement(this.PAGE_TITLE);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.ERROR_MESSAGE);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.ERROR_MESSAGE);
  }

  // ========== CHECKOUT OVERVIEW PAGE ==========

  /**
   * Check if all price details are visible
   */
  async arePriceDetailsVisible(): Promise<boolean> {
    const subtotal = await this.isElementVisible(this.SUMMARY_SUBTOTAL);
    const tax = await this.isElementVisible(this.SUMMARY_TAX);
    const total = await this.isElementVisible(this.SUMMARY_TOTAL);
    return subtotal && tax && total;
  }

  /**
   * Check if payment and shipping info is visible
   */
  async isPaymentInfoVisible(): Promise<boolean> {
    return await this.isElementVisible(this.SUMMARY_INFO_LABEL);
  }

  /**
   * Click finish button to complete order
   */
  async clickFinish(): Promise<void> {
    await this.click(this.FINISH_BUTTON);
    await this.waitForElement(this.PAGE_TITLE);
  }

  // ========== ORDER CONFIRMATION PAGE ==========

  /**
   * Check if order completion message is displayed
   */
  async isOrderConfirmationDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.COMPLETE_HEADER);
  }

  /**
   * Get order confirmation message
   */
  async getConfirmationMessage(): Promise<string> {
    return await this.getElementText(this.COMPLETE_HEADER);
  }

  /**
   * Click back to products button
   */
  async clickBackToProducts(): Promise<void> {
    await this.click(this.BACK_TO_PRODUCTS_BUTTON);
    await this.waitForElement('div.inventory_item');
  }

  // ========== UTILITY METHODS ==========

  /**
   * Get current page title
   */
  async getCurrentPageTitle(): Promise<string> {
    return await this.getElementText(this.PAGE_TITLE);
  }

  /**
   * Complete full checkout flow
   */
  async completeCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.clickContinueOnCheckout();
    await this.clickFinish();
  }
}
