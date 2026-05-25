# Playwright Cucumber BDD Framework with Page Object Model

A professional **Test Automation Framework** combining:
- 🎭 **Playwright** - Cross-browser automation
- 🥒 **Cucumber** - BDD test runner
- 📄 **Gherkin** - Business-readable scenarios
- 🏗️ **Page Object Model (POM)** - Maintainable test code

## 📖 Quick Navigation

| Document | Purpose |
|----------|---------|
| **[FRAMEWORK_ARCHITECTURE.md](./FRAMEWORK_ARCHITECTURE.md)** | 🏗️ Complete architecture & layer design |
| **[testframework.md](./testframework.md)** | 📚 Framework guide with examples |
| **[WORKFLOW.md](./WORKFLOW.md)** | 🔄 Story → Feature → Test workflow |
| **[GETTING_STARTED.md](./GETTING_STARTED.md)** | 🚀 Step-by-step setup guide |

## ⚡ Quick Start

### Installation
```bash
npm install
npx playwright install
```

### Run Tests
```bash
npm run bdd              # Run all BDD tests
npm run bdd:smoke       # Run smoke tests (@smoke tag)
npm run bdd:debug       # Debug mode (single-threaded)
npm run bdd:ci          # CI/CD pipeline mode
npm run bdd:report      # View HTML test report
```

### Test Results
```
test-output/
├── cucumber-report.html      # Interactive test report
├── cucumber-report.json      # JSON results
└── screenshots/              # Failure screenshots
```

## 📁 Project Structure

```
├── features/                          # BDD scenarios
│   ├── checkout.feature              # Gherkin feature files
│   └── step_definitions/
│       └── checkout-refactored.steps.ts    # POM-based steps
│
├── pages/                             # Page Object Model
│   ├── BasePage.ts                   # Base class
│   ├── LoginPage.ts                  # Login page object
│   ├── CheckoutPage.ts               # Checkout page object
│   └── index.ts                      # Exports
│
├── hooks/                             # Cucumber lifecycle
│   └── hooks.ts                      # Before/After hooks
│
├── stories/                           # SCRUM stories
│   └── stories.md                    # Story definitions
│
├── test-output/                       # Test results
│   ├── cucumber-report.html
│   ├── cucumber-report.json
│   └── screenshots/
│
├── cucumber.js                        # Cucumber config
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── README.md                          # This file
```

## 🏗️ Architecture Overview

### Page Object Model (POM) Pattern

Separates test logic from UI interactions:

```
Step Definition          →    Page Object        →    Playwright
(Business Logic)              (Selectors/Methods)     (Browser API)
  
"User logs in"      →    LoginPage.login()     →    click(), fill()
                         ├─ username input
                         ├─ password input
                         └─ login button
```

### Execution Flow

```
Gherkin Scenario (checkout.feature)
         ↓
   Cucumber Runner
         ↓
Step Definition (checkout.steps.ts)
         ↓
Page Object (CheckoutPage, LoginPage)
         ↓
Hooks (Before → Test → After)
         ↓
Playwright (Browser Automation)
         ↓
Test Report (HTML + JSON)
```

## 🚀 Running Tests

### Default Profile (All Tests, 4 Parallel)
```bash
npm run bdd
```

### Smoke Tests (@smoke tag)
```bash
npm run bdd:smoke
```

### Debug Mode (Single-threaded, visible logs)
```bash
npm run bdd:debug
```

### CI/CD Mode (Single-threaded, optimal for pipelines)
```bash
npm run bdd:ci
```

### View Test Report
```bash
npm run bdd:report
```

## ✅ Test Coverage

The framework includes 12 BDD scenarios covering:

### ✔️ AC1: Cart Review
- Add items to cart
- Review cart contents
- View total price calculation
- Continue shopping or proceed to checkout

### ✔️ AC2: Checkout Information
- Enter delivery address (First Name, Last Name, Postal Code)
- Validate required fields (error handling)
- Proceed to checkout overview

### ✔️ AC3: Order Overview
- Review order summary
- Verify payment/shipping info
- Check price breakdown (subtotal, tax, total)
- Cancel or finish order

### ✔️ AC4: Order Completion
- Complete order with Finish button
- View order confirmation
- Navigate back to products
- Verify cart is empty

### ✔️ Utility Tests
- Empty cart handling
- Login validation
- Error message verification

## 💻 Test Application

**E-commerce Demo Site**: https://www.saucedemo.com

**Credentials:**
| User | Password |
|------|----------|
| standard_user | secret_sauce |
| locked_out_user | secret_sauce |
| problem_user | secret_sauce |

## 📝 Writing a New Test

### Step 1: Create Feature File
```gherkin
# features/example.feature
Scenario: Example test
  Given I am on the Saucedemo application
  When I perform an action
  Then I verify the result
```

### Step 2: Create/Update Page Object
```typescript
// pages/ExamplePage.ts
class ExamplePage extends BasePage {
  async performAction(): Promise<void> {
    await this.click('button.action');
  }
}
```

### Step 3: Implement Step Definition
```typescript
// features/step_definitions/example.steps.ts
When('I perform an action', async function() {
  const page = new ExamplePage(testContext.page!);
  await page.performAction();
});
```

### Step 4: Run Test
```bash
npm run bdd
```

## 🔧 Key Features

✅ **Page Object Model** - Maintainable, reusable code
✅ **BDD Scenarios** - Business-readable tests
✅ **Automatic Screenshots** - On failure for debugging
✅ **HTML Reports** - Beautiful, detailed test reports
✅ **Parallel Execution** - Faster test runs (configurable)
✅ **TypeScript** - Type-safe, IDE auto-completion
✅ **Browser Support** - Chrome, Firefox, Safari, Mobile
✅ **Retry Logic** - Configurable test retries
✅ **CI/CD Ready** - Optimized for pipelines

## 🎯 Best Practices

### ✅ DO
- Use Page Objects for all UI interactions
- Write descriptive Gherkin scenarios
- Keep step definitions focused on business logic
- Use meaningful method names in page objects
- Add JSDoc comments to complex methods
- Parameterize test data
- Handle errors gracefully

### ❌ DON'T
- Hard-code selectors in step definitions
- Mix Playwright calls with Gherkin steps
- Create overly complex page objects
- Use brittle XPath locators
- Skip error handling
- Commit failing tests

## 🌍 Browser Support

All major browsers supported:
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🔍 Debugging Tests

### View Test Report
```bash
npm run bdd:report
```

### Run Single Feature
```bash
npm run bdd features/checkout.feature
```

### Debug Mode (Single-threaded)
```bash
npm run bdd:debug
```

### Check Failure Screenshots
```
test-output/screenshots/
```

## 📊 Test Results

Test reports are automatically generated:

```
✅ test-output/cucumber-report.html      # Interactive HTML report
✅ test-output/cucumber-report.json      # Machine-readable JSON
✅ test-output/screenshots/*.png         # Failure screenshots
```

## 🧹 Maintenance

### Clean test output
```bash
npm run clean
```

### Update dependencies
```bash
npm install
npm update
npx playwright install
```

### Format code
```bash
npm run format
```

### Lint code
```bash
npm run lint
```

## 📚 Resources

- [Playwright Docs](https://playwright.dev) - Browser automation guide
- [Cucumber.js Docs](https://cucumber.io/docs/cucumber) - BDD framework
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/reference) - Writing scenarios
- [POM Best Practices](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models)

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Steps undefined" | Check step text matches Gherkin exactly |
| Browser not launching | Ensure hooks are loaded in cucumber.js |
| Timeout errors | Increase timeout or check element visibility |
| Report not generated | Verify test-output directory exists |
| Selector not found | Use codegen to identify correct selector |

## 📞 Support

For help:
1. 📖 Check [FRAMEWORK_ARCHITECTURE.md](./FRAMEWORK_ARCHITECTURE.md)
2. 📺 Review test report: `npm run bdd:report`
3. 📸 Check failure screenshots in `test-output/screenshots/`
4. 🔍 Read [WORKFLOW.md](./WORKFLOW.md) for workflow patterns

---

**Framework Version**: 2.0.0 (POM + BDD)
**Playwright**: 1.48.0+
**Cucumber**: 12.9.0+
**TypeScript**: 5.0.0+
**Status**: ✅ Production Ready


By default, tests run on:
- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)
- ✅ WebKit (Safari - Desktop)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## Debugging

- **UI Mode**: Best for development and debugging
  ```bash
  npm run test:ui
  ```
- **Debug Mode**: Step through tests
  ```bash
  npm run test:debug
  ```
- **Headed Mode**: Watch tests run
  ```bash
  npm run test:headed
  ```
- **Trace Viewer**: View detailed traces of failed tests
  ```bash
  npx playwright show-trace trace.zip
  ```

## Environment Variables

Create a `.env` file for environment-specific settings:
```
BASE_URL=https://your-app.com
API_TOKEN=your-token
```

Load in tests using `process.env.BASE_URL`, etc.

## CI/CD Integration

Tests are configured to run with specific settings for CI environments (set via `CI` environment variable).

## Documentation

- [Playwright Documentation](https://playwright.dev)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [API Reference](https://playwright.dev/docs/api/class-test)

## License

MIT
