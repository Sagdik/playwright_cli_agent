# Test Framework Workflow Guide

## 📋 Step-by-Step Workflow

This document provides a practical checklist for converting user stories into automated tests.

## Phase 1: Story Creation

### ✅ Checklist: Create User Story

**File Location**: `stories/[story-name].md`

- [ ] Story ID (e.g., SCRUM-101)
- [ ] Clear title describing the feature
- [ ] "As a [user] I want [action] so that [benefit]"
- [ ] Application URL specified
- [ ] Test credentials provided (if needed)
- [ ] 2-5 acceptance criteria in GIVEN-WHEN-THEN format
- [ ] Each AC is independent and testable
- [ ] No technical implementation details
- [ ] Business rules documented
- [ ] Definition of Done checklist

### Example Story Template

```markdown
# User Story: [SCRUM-XXX] - [Feature Name]

## Story Title
[Clear, concise title]

## Story Description
[What we're building and why]

## Application URL
https://[app-url]

## Test Credentials
- Username: [test-user]
- Password: [test-password]

## Acceptance Criteria

### AC1: [Criterion Name]
- GIVEN [initial state]
- WHEN [user action]
- THEN [expected result]
- AND [additional assertion]

### AC2: [Another Criterion]
- GIVEN [initial state]
- WHEN [user action]
- THEN [expected result]

## Business Rules
1. [Business rule 1]
2. [Business rule 2]

## Definition of Done
- [ ] All acceptance criteria have test cases
- [ ] Tests are automated
- [ ] Test results documented
- [ ] Code committed to repository
```

---

## Phase 2: Feature File Creation

### ✅ Checklist: Convert Story to Gherkin Feature

**File Location**: `features/[feature-name].feature`

- [ ] Feature name matches story ID and title
- [ ] Background section contains common setup steps
- [ ] One scenario per acceptance criterion
- [ ] Scenario names are descriptive (based on AC)
- [ ] Steps follow GIVEN-WHEN-THEN order
- [ ] Use parameterized steps (e.g., `{string}`, `{int}`)
- [ ] No selectors or technical details in feature file
- [ ] All steps are reusable
- [ ] Feature file is valid Gherkin syntax

### Example Feature File

```gherkin
Feature: Checkout Process (SCRUM-101)
  As a customer
  I want to complete my purchase
  So that I can order products

  Background:
    Given I am on the Saucedemo application
    And I login with username "standard_user" and password "secret_sauce"

  Scenario: Review items in cart
    Given I have added items to my cart
    When I navigate to the cart page
    Then I should see all added items with their details

  Scenario: Enter valid checkout information
    Given I have items in my cart
    And I am on the checkout information page
    When I enter valid checkout information
      | firstName | lastName | postalCode |
      | John      | Smith    | 12345      |
    And I click Continue
    Then I should be redirected to the checkout overview page
```

---

## Phase 3: Step Definition Implementation

### ✅ Checklist: Write Step Definitions

**File Location**: `features/step_definitions/[feature-name].steps.ts`

- [ ] File matches feature file name
- [ ] All imports included (Given, When, Then, etc.)
- [ ] Before hook initializes browser/page
- [ ] After hook cleans up resources
- [ ] Each step is independently functional
- [ ] Proper error handling and timeouts
- [ ] Uses data-testid attributes for selectors
- [ ] Meaningful variable/function names
- [ ] Comments on complex logic
- [ ] TypeScript types are correct
- [ ] No hardcoded values (parameterized)
- [ ] Waits for elements properly
- [ ] Proper expect() assertions

### Step Definition Template

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

// Background steps
Given('I am on {string}', async function(url: string) {
  await context.page?.goto(url);
});

// Scenario steps
When('I fill {string} with {string}', async function(field: string, value: string) {
  const selector = `[data-testid="${field}"]`;
  await context.page?.fill(selector, value);
});

Then('I should see {string}', async function(text: string) {
  const page = context.page!;
  await expect(page.locator('text=' + text)).toBeVisible();
});
```

---

## Phase 4: Testing & Validation

### ✅ Checklist: Run Tests

- [ ] Feature file syntax is valid
  ```bash
  npm run bdd -- features/[feature-name].feature --dry-run
  ```

- [ ] All step definitions are found
  ```bash
  npm run bdd -- features/[feature-name].feature
  ```

- [ ] Tests execute without errors
  ```bash
  npm run bdd
  ```

- [ ] Check test report
  ```bash
  npm run bdd:report
  ```

- [ ] All required selectors exist on the application
- [ ] Waits are sufficient (not flaky)
- [ ] Error messages are clear
- [ ] Pass rate is >= 80%

---

## Phase 5: Code Review & Commit

### ✅ Checklist: Quality Assurance

**Code Quality**
- [ ] No hardcoded values or credentials
- [ ] Meaningful variable names
- [ ] Consistent formatting (run `npm run format`)
- [ ] No linting errors (run `npm run lint`)
- [ ] TypeScript compiles without errors
- [ ] No commented-out code

**Test Quality**
- [ ] All acceptance criteria are covered
- [ ] Test scenarios are independent
- [ ] Proper setup/teardown in Before/After
- [ ] Clear assertion messages
- [ ] Meaningful scenario names

**Documentation**
- [ ] Story is well documented
- [ ] Feature file explains intent
- [ ] Step definitions have comments where complex
- [ ] README updated if needed

### ✅ Checklist: Git Commit

```bash
# Stage all changes
git add .

# Commit with meaningful message
git commit -m "feat: [STORY-ID] - [Short description]

- Added [story].md user story
- Created features/[feature].feature with X scenarios
- Implemented [X] step definitions
- Test pass rate: Y%"

# Push to repository
git push origin master
```

**Commit Message Format**:
```
feat: [STORY-ID] - [Feature Name]

Description of changes:
- Created story file
- Added Gherkin scenarios
- Implemented step definitions
- Test results: X passed, Y failed

Closes #[issue-number]
```

---

## Phase 6: CI/CD Integration

### ✅ Checklist: Automation Pipeline

- [ ] GitHub Actions workflow configured
- [ ] Tests run on push/PR
- [ ] Artifacts uploaded on failure
- [ ] Slack notifications (if configured)
- [ ] Email reports (if configured)

---

## Troubleshooting Guide

### Scenario: Tests Fail with "Element Not Found"

**Steps to fix:**
1. Use `npm run codegen` to record interaction
2. Verify selector is correct in codegen output
3. Add explicit `waitForSelector()` before interaction
4. Check if element is inside iframe
5. Use data-testid attributes instead of complex selectors

### Scenario: Cucumber Can't Find Steps

**Steps to fix:**
1. Verify step definition file is in `features/step_definitions/`
2. Check filename ends with `.steps.ts`
3. Verify `cucumber.js` has correct path
4. Ensure step wording matches exactly
5. Run `npm run bdd -- --dry-run` to see issues

### Scenario: Tests Time Out

**Steps to fix:**
1. Increase timeout in configuration
2. Add explicit waits before assertions
3. Reduce parallel workers
4. Check network connectivity
5. Verify test server is running

### Scenario: Tests Are Flaky

**Steps to fix:**
1. Add proper waits instead of sleeps
2. Use visible waits: `waitForVisible()`
3. Avoid race conditions with explicit waits
4. Use retry logic for transient issues
5. Check for async/await issues

---

## Performance Optimization

### Tips for Fast Tests
- ✅ Run tests in headless mode (faster)
- ✅ Parallelize test execution
- ✅ Use page reuse when possible
- ✅ Minimize network calls
- ✅ Cache static resources
- ✅ Avoid long sleeps (use waits)
- ✅ Use data-testid for fast selectors

### Commands for Performance
```bash
# Run in parallel (faster)
npm run bdd

# Run single-threaded (slower, debugging)
npm run bdd -- --format-options='{"colorsEnabled":false}'

# Headless mode (faster)
HEADLESS=true npm run bdd
```

---

## Best Practices Summary

### ✅ DO's
- ✅ Use GIVEN-WHEN-THEN format consistently
- ✅ Write independent scenarios
- ✅ Use data-testid attributes
- ✅ Add explicit waits
- ✅ Use meaningful names
- ✅ Test one thing per scenario
- ✅ Run tests regularly
- ✅ Keep stories updated
- ✅ Document complex steps
- ✅ Review test failures

### ❌ DON'Ts
- ❌ Don't hardcode URLs or credentials
- ❌ Don't use complex CSS selectors
- ❌ Don't skip waits
- ❌ Don't test implementation details
- ❌ Don't create dependent tests
- ❌ Don't ignore flaky tests
- ❌ Don't commit broken tests
- ❌ Don't skip reviewing changes
- ❌ Don't test too many things per scenario
- ❌ Don't forget to update documentation

---

## Quick Reference Commands

```bash
# Setup
npm install                           # Install deps
npx playwright install               # Install browsers
npm run format                        # Format code

# BDD Testing
npm run bdd                          # Run all scenarios
npm run bdd -- --tags @smoke        # Run by tag
npm run bdd -- features/file.feature # Run specific file
npm run bdd:report                   # View report

# Playwright Testing
npm test                             # Run all tests
npm run test:ui                      # UI mode
npm run test:headed                  # Headed mode
npm run test:debug                   # Debug mode

# Development
npm run codegen                      # Generate test code
npm run lint                         # Lint code
npm run format                       # Format code

# Git
git add .                            # Stage changes
git commit -m "message"              # Commit
git push origin master               # Push
git log --oneline -n 5              # View history
```

---

## File Checklist

### For Each New Story

- [ ] `stories/[story-name].md` - Story file
- [ ] `features/[feature-name].feature` - Feature file
- [ ] `features/step_definitions/[feature-name].steps.ts` - Step definitions
- [ ] `package.json` - Updated if new deps added
- [ ] `testframework.md` - Referenced in commit
- [ ] `cucumber-report.html` - Generated after test run
- [ ] `.github/workflows/test.yml` - CI/CD updated (if needed)

### Verification Steps

```bash
# 1. Verify syntax
npm run bdd -- --dry-run

# 2. Run tests
npm run bdd

# 3. Check report
npm run bdd:report

# 4. Lint code
npm run lint

# 5. Format code
npm run format

# 6. Commit
git add .
git commit -m "feat: [STORY-ID] - Description"
git push
```

---

## Support

- **Playwright Docs**: https://playwright.dev
- **Cucumber Docs**: https://cucumber.io/docs
- **Gherkin Guide**: https://cucumber.io/docs/gherkin
- **Framework Guide**: See [testframework.md](./testframework.md)

---

**Last Updated**: May 24, 2026  
**Framework Version**: 1.0.0
