import { Page, Locator } from '@playwright/test';

/**
 * Base Page class for Page Object Model pattern
 * Provides common methods used across all page objects
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get page URL
   */
  getPageUrl(): string {
    return this.page.url();
  }

  /**
   * Fill text in an input field
   */
  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  /**
   * Click an element
   */
  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  /**
   * Get element locator
   */
  getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    const count = await this.page.locator(selector).count();
    return count > 0;
  }

  /**
   * Get element text
   */
  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() ?? '';
  }

  /**
   * Get input value
   */
  async getInputValue(selector: string): Promise<string | null> {
    return await this.page.inputValue(selector);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename: string): Promise<Buffer> {
    return await this.page.screenshot({ path: `test-output/screenshots/${filename}` });
  }

  /**
   * Accept alert/dialog
   */
  async acceptAlert(): Promise<void> {
    this.page.on('dialog', dialog => dialog.accept());
  }

  /**
   * Get all elements count
   */
  async getElementsCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  /**
   * Hover over element
   */
  async hover(selector: string): Promise<void> {
    await this.page.hover(selector);
  }

  /**
   * Get page source
   */
  async getPageSource(): Promise<string> {
    return await this.page.content();
  }

  /**
   * Clear input field
   */
  async clearInput(selector: string): Promise<void> {
    await this.page.locator(selector).clear();
  }
}
