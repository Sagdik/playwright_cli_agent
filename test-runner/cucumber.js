module.exports = {
  default: {
    // Hooks will be loaded automatically
    require: [
      'hooks/**/*.ts',
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    
    // Format options for reports
    format: [
      'progress-bar',
      'html:test-output/cucumber-report.html',
      'json:test-output/cucumber-report.json'
    ],
    
    formatOptions: {
      snippetInterface: 'async-await',
      colorsEnabled: true
    },
    
    // Feature paths
    features: ['features/**/*.feature'],
    
    // Parallel execution
    parallel: 4,
    
    // Retry failed scenarios (optional)
    // retry: 1,
    
    // Tags filter (optional)
    // tags: '@smoke and not @skip',
    
    // Dry run (no actual execution)
    // dryRun: false,
    
    // Fail on pending steps
    strict: true,
    
    // Publish results to Cucumber Cloud (optional)
    // publish: false,
    // publishQuiet: true
  },

  // Configuration for specific test runs
  smoke: {
    require: [
      'hooks/**/*.ts',
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress-bar', 'html:test-output/smoke-report.html'],
    features: ['features/**/*.feature'],
    tags: '@smoke',
    parallel: 2
  },

  ci: {
    require: [
      'hooks/**/*.ts',
      'features/step_definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:test-output/cucumber-report.html',
      'json:test-output/cucumber-report.json'
    ],
    features: ['features/**/*.feature'],
    parallel: 1,
    strict: true,
    dryRun: false
  }
};
