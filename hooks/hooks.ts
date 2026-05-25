import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import * as fs from 'fs';

/**
 * Test Context - Global context shared across all steps
 */
export interface TestContext {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}

// Global context
export const testContext: TestContext = {};

/**
 * Before Hook - Initialize browser before each scenario
 */
Before(async function() {
  console.log('🚀 Starting test scenario...');
  
  // Launch browser
  testContext.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
  });

  // Create context with additional settings
  testContext.context = await testContext.browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  // Enable console logging
  testContext.context.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('❌ Browser Error:', msg.text());
    }
  });

  // Create page
  testContext.page = await testContext.context.newPage();

  // Add listener for page crashes (optional - comment out if not needed)
  testContext.page.on('close', () => {
    console.log('📄 Page closed');
  });

  console.log('✅ Browser initialized');
});

/**
 * After Hook - Take screenshot on failure and clean up
 */
After(async function(scenario) {
  if (scenario.result?.status === Status.FAILED) {
    console.log('❌ Scenario failed. Taking screenshot...');
    
    // Create screenshots directory if it doesn't exist
    if (!fs.existsSync('test-output/screenshots')) {
      fs.mkdirSync('test-output/screenshots', { recursive: true });
    }

    // Take screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = `${scenario.pickle.name}_${timestamp}.png`;
    const screenshotPath = `test-output/screenshots/${screenshotName}`;

    try {
      if (testContext.page) {
        await testContext.page.screenshot({ path: screenshotPath });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
      }
    } catch (error) {
      console.error('Failed to take screenshot:', error);
    }
  }

  // Close page
  if (testContext.page) {
    await testContext.page.close();
    console.log('🔒 Page closed');
  }

  // Close context
  if (testContext.context) {
    await testContext.context.close();
    console.log('🔒 Context closed');
  }

  // Close browser
  if (testContext.browser) {
    await testContext.browser.close();
    console.log('🔒 Browser closed');
  }

  console.log(`✅ Test scenario completed - Status: ${scenario.result?.status}`);
  console.log('-------------------------------------------');
});

/**
 * Before Step Hook - Log each step execution
 */
Before(function() {
  // This runs before each step
});

/**
 * After Step Hook - Take screenshot after each step (optional)
 * Uncomment to enable step-by-step screenshots
 */
// AfterStep(async function() {
//   if (testContext.page) {
//     const timestamp = new Date().getTime();
//     await testContext.page.screenshot({ path: `test-output/screenshots/step_${timestamp}.png` });
//   }
// });
