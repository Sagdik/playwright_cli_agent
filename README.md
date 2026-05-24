# Playwright CLI Testing Framework

A complete **Playwright + Cucumber BDD Test Automation Framework** that converts user stories into executable BDD scenarios and test automation code.

## 📖 Documentation

- **[testframework.md](./testframework.md)** - Complete framework guide with workflow, best practices, and examples
- **[README.md](./README.md)** - This file (quick start)
- **.github/copilot-instructions.md** - Copilot AI integration guide

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

Install all dependencies:

```bash
npm install
npx playwright install
```

This will install:
- `@playwright/test` - Playwright testing library
- `@cucumber/cucumber` - BDD framework
- `typescript` - TypeScript support
- `ts-node` - TypeScript runtime
- `eslint` - Code linting
- `prettier` - Code formatting

### Project Structure

```
├── stories/                        # User stories (source)
│   └── stories.md                 # Story input files
├── features/                       # Cucumber BDD features
│   ├── checkout.feature           # Gherkin scenarios
│   └── step_definitions/
│       └── checkout.steps.ts      # Step implementations
├── tests/                          # Playwright tests
│   ├── checkout.spec.ts           # Test specifications
│   ├── example.spec.ts
│   └── api.spec.ts
├── playwright.config.ts            # Playwright configuration
├── cucumber.js                     # Cucumber configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
├── cucumber-report.html            # Test report (auto-generated)
├── testframework.md                # Framework guide (READ THIS!)
└── README.md                       # This file
```

## Running Tests

### Playwright Tests
```bash
npm test                   # Run all tests
npm run test:ui            # Interactive UI mode
npm run test:headed        # Watch in browser
npm run test:debug         # Debug mode
npm run test:chrome        # Chromium only
npm run test:firefox       # Firefox only
npm run test:webkit        # WebKit only
npm run test:report        # View HTML report
```

### BDD Tests (Cucumber/Gherkin)
```bash
npm run bdd                # Run all Cucumber scenarios
npm run bdd -- features/[file].feature  # Run specific feature
npm run bdd:report         # Open HTML report
```

## Workflow: Story → Feature → Tests

### 1. Create a User Story
Create a file in `stories/` folder following the format in [testframework.md](./testframework.md).

### 2. Convert Story to Cucumber Feature
Create a `.feature` file in `features/` folder with Gherkin scenarios.

### 3. Write Step Definitions
Implement step definitions in `features/step_definitions/*.steps.ts`.

### 4. Run BDD Tests
```bash
npm run bdd
npm run bdd:report
```

## Writing Tests

### Playwright Tests
Tests are located in the `tests/` directory with `.spec.ts` extension.

Example:
```typescript
import { test, expect } from '@playwright/test';

test.describe('My Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('should pass', async ({ page }) => {
    await expect(page).toHaveTitle(/Example/);
  });
});
```

### BDD Tests (Cucumber)
See [testframework.md](./testframework.md) for complete BDD workflow with examples.

## Code Generation

Generate test code by recording interactions:
```bash
npm run codegen
```

This opens an interactive browser where you can click elements to generate test code.

## Linting & Formatting

Lint code:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## Configuration

Edit `playwright.config.ts` to:
- Change test directory
- Configure browsers
- Set up base URL
- Configure reporters
- Adjust retry and timeout settings

## Browser Support

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
