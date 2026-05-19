# Playwright CLI Testing Framework

A complete Playwright testing framework setup with TypeScript support for end-to-end testing across Chromium, Firefox, and WebKit browsers.

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

Install all dependencies:

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing library
- `typescript` - TypeScript support
- `eslint` - Code linting
- `prettier` - Code formatting

## Project Structure

```
├── tests/                  # Test files
│   └── example.spec.ts    # Example test suite
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chrome      # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # WebKit only
```

### View test report
```bash
npm run test:report
```

## Writing Tests

Tests are located in the `tests/` directory with `.spec.ts` extension.

Example test structure:
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
