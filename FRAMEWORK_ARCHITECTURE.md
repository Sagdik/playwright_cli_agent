# Playwright Cucumber BDD Framework with Page Object Model

## 📋 Project Overview

A professional test automation framework combining:
- **Playwright** - Cross-browser automation library
- **Cucumber** - BDD test runner and scenario language  
- **Page Object Model (POM)** - Design pattern for maintainable tests
- **TypeScript** - Type-safe test implementation

## 📁 Framework Structure

```
playwright-cucumber-pom/
├── features/                          # Feature files and steps
│   ├── checkout.feature              # Gherkin scenario definitions
│   └── step_definitions/
│       ├── checkout-refactored.steps.ts    # POM-based step implementations
│       └── support/
│           └── helpers.ts             # Utility functions (optional)
│
├── pages/                             # Page Object Model layer
│   ├── BasePage.ts                   # Base class with common methods
│   ├── LoginPage.ts                  # Login page object
│   ├── CheckoutPage.ts               # Checkout flow page object
│   └── index.ts                      # Export all page objects
│
├── hooks/                             # Cucumber lifecycle hooks
│   └── hooks.ts                      # Before/After hooks for browser mgmt
│
├── test-output/                       # Test results & artifacts
│   ├── screenshots/                  # Failure screenshots
│   ├── cucumber-report.html          # Test report
│   └── cucumber-report.json          # Report data
│
├── stories/                           # SCRUM stories & requirements
│   └── stories.md                    # Story definitions (SCRUM-101, etc)
│
├── test-runner/                       # Test configuration
│   └── cucumber.js                   # Alternative config file (reference)
│
├── cucumber.js                        # Main Cucumber configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
├── playwright.config.ts               # Playwright config (reference only)
└── README.md                          # Project documentation
```

## 🏗️ Architecture Layers

### 1. **Page Object Model (POM) Layer** (`pages/`)

Encapsulates page-specific selectors and interactions:

#### **BasePage.ts** - Foundation Class
```typescript
class BasePage {
  protected page: Page;
  
  // Navigation
  goto(url): Promise<void>
  getCurrentUrl(): Promise<string>
  
  // Element Interactions
  click(selector): Promise<void>
  fill(selector, text): Promise<void>
  selectOption(selector, value): Promise<void>
  
  // Element Queries
  getElementText(selector): Promise<string>
  getInputValue(selector): Promise<string | null>
  getElementsCount(selector): Promise<number>
  
  // Visibility & Waiting
  waitForElement(selector, timeout): Promise<void>
  isElementVisible(selector): Promise<boolean>
  
  // Utilities
  takeScreenshot(filename): Promise<void>
  getLocator(selector): Locator
}
```

#### **LoginPage.ts** - Login Page Object
```typescript
class LoginPage extends BasePage {
  // Locators
  USERNAME_INPUT = 'input[data-test="username"]'
  PASSWORD_INPUT = 'input[data-test="password"]'
  LOGIN_BUTTON = 'input[data-test="login-button"]'
  
  // High-level methods
  navigateToLoginPage(baseUrl): Promise<void>
  login(username, password): Promise<void>
  isLoginSuccessful(): Promise<boolean>
  getErrorMessage(): Promise<string>
}
```

#### **CheckoutPage.ts** - Checkout Flow Page Object
```typescript
class CheckoutPage extends BasePage {
  // Organized by page section
  
  // Cart page methods
  navigateToCart(): Promise<void>
  getCartItemsCount(): Promise<number>
  clickCheckout(): Promise<void>
  
  // Checkout info page methods
  fillCheckoutInfo(firstName, lastName, postalCode): Promise<void>
  clickContinueOnCheckout(): Promise<void>
  getErrorMessage(): Promise<string>
  
  // Overview page methods
  getCartItemsCount(): Promise<number>
  isPaymentInfoVisible(): Promise<boolean>
  arePriceDetailsVisible(): Promise<boolean>
  
  // Confirmation page methods
  clickFinish(): Promise<void>
  isOrderConfirmationDisplayed(): Promise<boolean>
}
```

**Benefits of POM:**
- ✅ Single source of truth for selectors
- ✅ Easy to maintain when UI changes
- ✅ Reusable methods across tests
- ✅ Clear separation of concerns

### 2. **Hooks Layer** (`hooks/`)

Manages browser lifecycle and test infrastructure:

```typescript
@Before(function(scenario))
  ├─ Launch browser
  ├─ Create context with viewport
  ├─ Create page instance
  └─ Store in testContext for step definitions

@After(function(scenario))
  ├─ If scenario fails:
  │  └─ Take screenshot (test-output/screenshots/)
  ├─ Close page
  ├─ Close browser context
  └─ Close browser
```

**testContext Object** - Shared across all step definitions
```typescript
export const testContext: TestContext = {
  browser?: Browser,
  context?: BrowserContext,
  page?: Page
};
```

### 3. **Step Definitions Layer** (`features/step_definitions/`)

Implements Gherkin steps using POM:

```typescript
Given('I am on the Saucedemo application', async function() {
  const loginPage = new LoginPage(testContext.page!);
  await loginPage.navigateToLoginPage(BASE_URL);
});

When('I click the Finish button', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  await checkoutPage.clickFinish();
});

Then('I should see a success message', async function() {
  const checkoutPage = new CheckoutPage(testContext.page!);
  expect(await checkoutPage.isOrderConfirmationDisplayed()).toBeTruthy();
});
```

**Pattern:**
1. Create page object with testContext.page
2. Call high-level methods from page object
3. Use expect() for assertions
4. Add descriptive console logs

### 4. **Feature Files Layer** (`features/`)

Gherkin scenario definitions:

```gherkin
Feature: E-commerce Checkout Process
  
  Background:
    Given I am on the Saucedemo application
    Given I login with username "standard_user" and password "secret_sauce"
  
  Scenario: User adds items to cart and reviews
    Given I have added items to my cart
    When I navigate to the cart page
    Then I should see all added items with their details
```

## 🔧 Configuration

### **cucumber.js** - Main Configuration
```javascript
module.exports = {
  default: {
    require: ['hooks/**/*.ts', 'features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:test-output/cucumber-report.html'],
    features: ['features/**/*.feature'],
    parallel: 4,
    strict: true
  }
};
```

### **Execution Profiles**

| Profile | Command | Purpose |
|---------|---------|---------|
| default | `npm run bdd` | Run all BDD tests |
| smoke | `npm run bdd:smoke` | Run @smoke tagged tests only |
| debug | `npm run bdd:debug` | Single-threaded for debugging |
| ci | `npm run bdd:ci` | CI/CD optimized (single parallel) |

## 📊 Test Results

All test results stored in `test-output/`:

```
test-output/
├── cucumber-report.html      # Interactive HTML report
├── cucumber-report.json      # Machine-readable results
└── screenshots/              # Failure screenshots
    └── scenario-name-1234.png
```

## 🚀 Running Tests

```bash
# Install dependencies
npm install

# Run all BDD tests
npm run bdd

# Run smoke tests only
npm run bdd:smoke

# Debug mode (single-threaded, see logs)
npm run bdd:debug

# CI/CD pipeline
npm run bdd:ci

# View test report
npm run bdd:report
```

## 📝 Writing New Tests

### Step 1: Create Feature File
```gherkin
# features/example.feature
Scenario: Example scenario
  Given I am on the Saucedemo application
  When I perform an action
  Then I verify the result
```

### Step 2: Create/Use Page Object
```typescript
// pages/ExamplePage.ts
class ExamplePage extends BasePage {
  async performAction(): Promise<void> {
    await this.click('button.action');
  }
}
```

### Step 3: Implement Step Definitions
```typescript
// features/step_definitions/example.steps.ts
When('I perform an action', async function() {
  const page = new ExamplePage(testContext.page!);
  await page.performAction();
});
```

## 🛠️ Common Tasks

### Add a New Page Object
1. Create `pages/NewPage.ts` extending `BasePage`
2. Define locators as class properties
3. Implement page-specific methods
4. Export from `pages/index.ts`
5. Use in step definitions

### Add a New Feature
1. Create `.feature` file in `features/`
2. Write Gherkin scenarios
3. Implement step definitions referencing POM
4. Run with `npm run bdd`

### Debug a Failing Test
1. Add `@debug` tag to scenario
2. Run `npm run bdd:debug`
3. Check `test-output/screenshots/` for failure images
4. Review Cucumber report HTML

### Handle Element Waits
```typescript
// In page object
async waitForElement(selector: string, timeout = 5000): Promise<void> {
  await this.page.waitForSelector(selector, { timeout });
}
```

## 📚 Best Practices

### ✅ DO
- Keep page objects focused on a single page/section
- Use descriptive method names that reflect business actions
- Parameterize common values (URLs, test data)
- Add JSDoc comments to complex methods
- Use meaningful log messages with emojis
- Always handle nulls and errors gracefully

### ❌ DON'T
- Mix Playwright calls with step definitions (use POM)
- Use generic method names like `click()` or `fill()`
- Hard-code selectors in step definitions
- Create brittle XPath locators (prefer CSS)
- Skip assertions
- Commit failing tests

## 🌍 Browser Support

Configured for:
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 📖 Test Application

- **URL**: https://www.saucedemo.com
- **Standard User**: `standard_user` / `secret_sauce`
- **Locked User**: `locked_out_user` / `secret_sauce`
- **Problem User**: `problem_user` / `secret_sauce`

## 🔗 Useful Resources

- [Playwright Documentation](https://playwright.dev)
- [Cucumber-js Documentation](https://cucumber.io/docs/cucumber)
- [Page Object Model Pattern](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models)
- [BDD Best Practices](https://cucumber.io/docs/bdd)

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Steps undefined | Check step_definitions are in `require` array in cucumber.js |
| Browser not launching | Ensure hooks are loaded before steps |
| Timeout errors | Increase timeout in `waitForElement()` or `page.goto()` |
| Selector not found | Update selector in page object, check with `npm run codegen` |
| Report not generated | Verify `test-output/` directory exists and is writable |

## 📞 Support

For questions or issues:
1. Check the Cucumber reports: `npm run bdd:report`
2. Review screenshots in `test-output/screenshots/`
3. Consult BDD best practices documentation
4. Check step definitions for matching Gherkin text

---

**Framework Status**: ✅ Production Ready

**Last Updated**: 2024
**Playwright Version**: 1.48.0+
**Cucumber Version**: 12.9.0+
**TypeScript Version**: 5.0.0+
