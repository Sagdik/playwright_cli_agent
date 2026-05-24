# Playwright BDD Test Framework Guide

## Overview

This is a complete **Playwright + Cucumber BDD Test Automation Framework** that automatically converts user stories into executable BDD scenarios and test automation code.

## Framework Architecture

```
Playwright_cli/
├── features/                          # Cucumber feature files
│   ├── checkout.feature              # Gherkin scenarios from stories
│   └── step_definitions/
│       └── checkout.steps.ts          # Step implementations
├── stories/                            # User stories (input)
│   └── stories.md                     # Raw user stories
├── tests/                              # Playwright tests
│   ├── checkout.spec.ts               # Test specifications
│   ├── example.spec.ts
│   └── api.spec.ts
├── playwright.config.ts               # Playwright configuration
├── cucumber.js                         # Cucumber configuration
├── package.json                        # Dependencies & scripts
├── tsconfig.json                       # TypeScript config
├── cucumber-report.html                # Test report (auto-generated)
└── testframework.md                    # This file
```

## Core Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.48.0+ | Browser automation & E2E testing |
| **Cucumber** | 12.9.0+ | BDD framework & Gherkin parser |
| **TypeScript** | 5.0.0+ | Type-safe test code |
| **ts-node** | 10.9.2+ | Execute TypeScript directly |
| **Node.js** | 18+ | Runtime environment |

## Installation & Setup

### 1. Prerequisites
```bash
- macOS/Linux/Windows
- Node.js 18+
- npm or yarn
- Git
```

### 2. Initial Project Setup
```bash
# Create project directory
mkdir playwright-cli-project
cd playwright-cli-project

# Initialize npm project
npm init -y

# Install Playwright
npm install --save-dev @playwright/test

# Install Cucumber & BDD dependencies
npm install --save-dev \
  @cucumber/cucumber \
  @cucumber/pretty-formatter \
  @types/cucumber \
  @cucumber/gherkin-utils

# Install TypeScript support
npm install --save-dev \
  typescript \
  ts-node \
  @types/node

# Install Playwright browsers
npx playwright install
```

### 3. Configuration Files Setup

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Create `cucumber.js`:
```javascript
module.exports = {
  default: {
    require: ['features/step_definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
```

Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

Update `package.json` scripts:
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed",
    "test:chrome": "playwright test --project=chromium",
    "bdd": "cucumber-js",
    "bdd:report": "open cucumber-report.html",
    "codegen": "playwright codegen",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

## Workflow: Story → Feature → Tests → Automation

### Step 1: Write User Story

Create a new story file in `stories/` folder:

**File: `stories/payment-flow.md`**
```markdown
# User Story: SCRUM-102 - Payment Processing

## Story Title
As a customer, I want to process payment securely so that I can complete my purchase.

## Story Description
Implement a secure payment flow that validates card information and processes transactions.

## Application URL
https://www.saucedemo.com

## Acceptance Criteria

### AC1: Payment Form Validation
- GIVEN I am on the payment page
- WHEN I enter invalid card details
- THEN I should see validation error messages
- AND I should not be able to submit the form

### AC2: Successful Payment Processing
- GIVEN I am on the payment page
- WHEN I enter valid card details
- AND I click Process Payment
- THEN I should see a success confirmation
- AND my order should be processed

### AC3: Payment Security
- GIVEN I am entering payment information
- WHEN data is transmitted
- THEN all data should be encrypted
- AND PCI compliance should be maintained
```

### Step 2: Convert Story to Cucumber Scenarios

Create a feature file: `features/payment-flow.feature`

```gherkin
Feature: Payment Processing (SCRUM-102)
  As a customer
  I want to process payment securely
  So that I can complete my purchase

  Background:
    Given I am on the payment page

  Scenario: Validate payment form with invalid card number
    When I enter card number "1234567890123456"
    And I enter expiry "12/20"
    And I click Process Payment
    Then I should see error "Invalid card number"

  Scenario: Process valid payment successfully
    When I enter card number "4532015112830366"
    And I enter expiry "12/25"
    And I enter CVV "123"
    And I click Process Payment
    Then I should see success message "Payment processed successfully"

  Scenario: Payment form security validation
    Given I am on the payment page
    When I inspect the payment form
    Then payment fields should be encrypted
    And form should use HTTPS connection
```

### Step 3: Create Step Definitions

Create: `features/step_definitions/payment-flow.steps.ts`

```typescript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page, BrowserContext } from '@playwright/test';

interface TestContext {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

const context: TestContext = {};

Before(async function() {
  context.browser = await chromium.launch();
  context.context = await context.browser.newContext();
  context.page = await context.context.newPage();
});

After(async function() {
  await context.page?.close();
  await context.context?.close();
  await context.browser?.close();
});

Given('I am on the payment page', async function() {
  await context.page?.goto('https://payment-demo.example.com/checkout');
});

When('I enter card number {string}', async function(cardNumber: string) {
  const page = context.page!;
  await page.fill('[data-testid="card-number"]', cardNumber);
});

When('I enter expiry {string}', async function(expiry: string) {
  const page = context.page!;
  await page.fill('[data-testid="expiry"]', expiry);
});

When('I enter CVV {string}', async function(cvv: string) {
  const page = context.page!;
  await page.fill('[data-testid="cvv"]', cvv);
});

When('I click Process Payment', async function() {
  const page = context.page!;
  await page.click('button[data-testid="process-payment"]');
  await page.waitForSelector('[data-testid="payment-result"]', { timeout: 5000 });
});

Then('I should see error {string}', async function(errorMsg: string) {
  const page = context.page!;
  await expect(page.locator('[data-testid="error-message"]')).toContainText(errorMsg);
});

Then('I should see success message {string}', async function(successMsg: string) {
  const page = context.page!;
  await expect(page.locator('[data-testid="success-message"]')).toContainText(successMsg);
});

Given('I inspect the payment form', async function() {
  const page = context.page!;
  const form = await page.locator('form[data-testid="payment-form"]');
  await expect(form).toBeVisible();
});

Then('payment fields should be encrypted', async function() {
  const page = context.page!;
  const cardField = await page.locator('[data-testid="card-number"]');
  const type = await cardField.getAttribute('type');
  expect(type).toBe('password');
});

Then('form should use HTTPS connection', async function() {
  const page = context.page!;
  const url = page.url();
  expect(url.startsWith('https://')).toBeTruthy();
});
```

### Step 4: Run Tests

```bash
# Run BDD scenarios
npm run bdd

# View report
npm run bdd:report

# Run Playwright tests
npm test

# Run in UI mode (interactive)
npm run test:ui

# Run specific test
npm run bdd -- features/payment-flow.feature
```

## Conversion Guide: Story → Feature → Tests

### Story Structure Template

```markdown
# User Story: [SCRUM-XXX] - [Feature Name]

## Story Title
As a [user type]
I want to [action]
So that [benefit]

## Application URL
[URL to test]

## Test Credentials
- Username: [test-user]
- Password: [test-pass]

## Acceptance Criteria

### AC1: [Criteria Name]
- GIVEN [initial state]
- WHEN [user action]
- THEN [expected result]
- AND [additional assertion]

### AC2: [Another Criteria]
- GIVEN [initial state]
- WHEN [user action]
- THEN [expected result]
```

### Feature File Structure

```gherkin
Feature: [Feature Name] ([SCRUM-XXX])
  As a [user type]
  I want to [action]
  So that [benefit]

  Background:
    Given [common setup step]

  Scenario: [AC1 Name]
    Given [initial state]
    When [user action]
    Then [expected result]

  Scenario: [AC2 Name]
    Given [initial state]
    When [user action]
    And [additional action]
    Then [expected result]
```

### Step Definition Template

```typescript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, chromium } from '@playwright/test';

const context = {};

Before(async function() {
  // Setup browser
});

After(async function() {
  // Cleanup
});

Given('I am on {string}', async function(page: string) {
  // Navigate to page
});

When('I {string}', async function(action: string) {
  // Perform action
});

Then('I should see {string}', async function(expectedText: string) {
  // Assert visibility
});
```

## Best Practices

### 1. Story Writing
- ✅ Use clear, concise language
- ✅ Follow Given-When-Then format
- ✅ One acceptance criterion per scenario
- ✅ Include test credentials
- ✅ Specify application URL
- ❌ Avoid technical jargon
- ❌ Don't write implementation details

### 2. Feature File Creation
- ✅ Match story's Gherkin format exactly
- ✅ Use parameterized steps (e.g., `{string}`, `{int}`)
- ✅ Create Background for common setup
- ✅ One feature per story
- ✅ Use descriptive scenario names
- ❌ Don't include locators in feature files
- ❌ Don't hardcode values

### 3. Step Definitions
- ✅ Use proper error handling
- ✅ Add explicit waits for element loading
- ✅ Use data-testid attributes
- ✅ Create reusable steps
- ✅ Add meaningful logs/comments
- ❌ Don't create brittle selectors
- ❌ Don't skip waits
- ❌ Don't hardcode timeouts

### 4. Test Execution
- ✅ Run tests regularly (CI/CD)
- ✅ Generate HTML reports
- ✅ Monitor test metrics
- ✅ Fix flaky tests immediately
- ✅ Use headless mode for CI
- ❌ Don't ignore test failures
- ❌ Don't commit broken tests

## Useful Commands Reference

```bash
# Setup
npm install                    # Install dependencies
npx playwright install         # Install browsers
npm run format                 # Format code

# BDD Testing
npm run bdd                    # Run all Cucumber scenarios
npm run bdd -- --tags @smoke  # Run specific tag
npm run bdd -- features/[file] # Run specific feature
npm run bdd:report             # Open HTML report

# Playwright Testing
npm test                       # Run all tests
npm run test:ui                # Interactive UI
npm run test:headed            # Watch in browser
npm run test:debug             # Debug mode
npm run test:chrome            # Chrome only
npm run codegen                # Generate test code

# Git
git add .                      # Stage changes
git commit -m "[message]"      # Commit
git push origin master         # Push to GitHub
```

## Directory Structure Best Practices

```
project/
├── features/
│   ├── feature-name.feature       # One feature per story
│   └── step_definitions/
│       └── feature-name.steps.ts  # Matching step file
├── stories/
│   ├── story1.md
│   ├── story2.md
│   └── story3.md
├── tests/
│   ├── feature1.spec.ts
│   ├── feature2.spec.ts
│   └── api.spec.ts
├── playwright.config.ts
├── cucumber.js
├── tsconfig.json
├── package.json
└── .gitignore
```

## Continuous Integration Setup

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run BDD tests
        run: npm run bdd
      
      - name: Run Playwright tests
        run: npm test
      
      - name: Upload reports
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: |
            cucumber-report.html
            playwright-report/
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Tests fail with "element not found" | Check selectors, add waits, use data-testid |
| Cucumber not finding steps | Verify path in cucumber.js matches files |
| TypeScript errors | Run `npx tsc --noEmit` to check |
| Browser crashes | Increase timeout, reduce parallel workers |
| Network timeouts | Increase wait times, check internet connection |

## File Examples

### Example: Checkout Story
See `stories/stories.md` for the complete checkout story that was converted to:
- ✅ `features/checkout.feature` (12 scenarios)
- ✅ `features/step_definitions/checkout.steps.ts` (330 lines)
- ✅ `tests/checkout.spec.ts` (30+ tests)
- ✅ `cucumber-report.html` (visual results)

## Key Files in This Framework

| File | Purpose |
|------|---------|
| `features/*.feature` | Gherkin scenario definitions |
| `features/step_definitions/*.ts` | Step implementations |
| `stories/*.md` | User stories (input) |
| `tests/*.spec.ts` | Playwright test cases |
| `cucumber.js` | Cucumber configuration |
| `playwright.config.ts` | Browser automation config |
| `package.json` | Dependencies & npm scripts |
| `tsconfig.json` | TypeScript configuration |
| `cucumber-report.html` | Test results (auto-generated) |

## Next Steps

1. **Add New Story**: Create file in `stories/` folder
2. **Convert to Feature**: Create corresponding `.feature` file
3. **Write Steps**: Create step definitions in `step_definitions/`
4. **Run Tests**: Execute `npm run bdd` to validate
5. **Commit**: Push changes to GitHub
6. **Monitor**: Check `cucumber-report.html` for results

## Support & Documentation

- [Playwright Docs](https://playwright.dev)
- [Cucumber Docs](https://cucumber.io/docs)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin)
- [Best Practices](https://cucumber.io/docs/bdd)

---

**Version**: 1.0.0  
**Last Updated**: May 24, 2026  
**Framework**: Playwright + Cucumber BDD
