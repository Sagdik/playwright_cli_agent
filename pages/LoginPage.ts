import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page - Page Object Model
 * Contains all locators and methods for login page interactions
 */
export class LoginPage extends BasePage {
  // Locators
  private readonly USERNAME_INPUT = 'input[data-test="username"]';
  private readonly PASSWORD_INPUT = 'input[data-test="password"]';
  private readonly LOGIN_BUTTON = 'input[data-test="login-button"]';
  private readonly ERROR_MESSAGE = 'h3[data-test="error"]';
  private readonly INVENTORY_CONTAINER = 'div.inventory_item';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(baseUrl: string): Promise<void> {
    await this.goto(baseUrl);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.USERNAME_INPUT, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.PASSWORD_INPUT, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.LOGIN_BUTTON);
  }

  /**
   * Login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.waitForElement(this.INVENTORY_CONTAINER, 10000);
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

  /**
   * Check if login was successful (inventory items visible)
   */
  async isLoginSuccessful(): Promise<boolean> {
    return await this.isElementVisible(this.INVENTORY_CONTAINER);
  }
}
