# 🚀 Getting Started with Playwright CLI Agent Framework

Welcome to the **Playwright CLI Agent Framework** - A complete BDD test automation solution that converts user stories into executable tests!

## 📚 Documentation Overview

| Document | Purpose | Audience |
|----------|---------|----------|
| **[README.md](./README.md)** | Quick start & overview | Everyone |
| **[testframework.md](./testframework.md)** | Complete framework guide | Developers |
| **[WORKFLOW.md](./WORKFLOW.md)** | Step-by-step workflow | QA Engineers |
| **.github/copilot-instructions.md** | AI integration guide | Power Users |

## ⚡ Quick Start (5 Minutes)

### 1. Clone & Setup
```bash
git clone https://github.com/Sagdik/playwright_cli_agent.git
cd playwright_cli_agent
npm install
npx playwright install
```

### 2. Run Existing Tests
```bash
# Run BDD scenarios
npm run bdd

# Run Playwright tests
npm test

# View results
npm run bdd:report
```

### 3. View the Framework
```bash
# The framework includes:
ls stories/                         # User stories
ls features/                        # Cucumber features
ls tests/                          # Playwright tests
cat testframework.md               # Framework guide
cat WORKFLOW.md                    # Workflow guide
```

---

## 🎯 What This Framework Does

### ✅ Converts Stories to Tests

```
Story (Markdown)
     ↓
Feature (Gherkin)
     ↓
Step Definitions (TypeScript)
     ↓
Test Execution (Playwright)
     ↓
HTML Report
```

### ✅ Example: SCRUM-101 Checkout Process

**Input**: `stories/stories.md`
```markdown
# User Story: SCRUM-101 - E-commerce Checkout Process

## Acceptance Criteria

### AC1: Cart Review
- GIVEN I am a logged-in user with items in my cart
- WHEN I navigate to the cart page
- THEN I should see all added items
```

**Output**: `features/checkout.feature`
```gherkin
Feature: E-commerce Checkout Process (SCRUM-101)
  
  Scenario: Review items in cart
    Given I am a logged-in user with items in my cart
    When I navigate to the cart page
    Then I should see all added items
```

**Implementation**: `features/step_definitions/checkout.steps.ts`
```typescript
Given('I am a logged-in user with items in my cart', async function() {
  // Browser automation code
  await page.goto('https://saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  // ... more steps
});
```

**Results**: `cucumber-report.html` (Auto-generated!)

---

## 🔄 How to Add a New Story & Tests

### Step 1: Write Story (5 min)
```bash
# Create stories/my-feature.md
# Follow template in testframework.md
```

### Step 2: Create Feature File (5 min)
```bash
# Create features/my-feature.feature
# Convert story to Gherkin syntax
```

### Step 3: Write Step Definitions (10 min)
```bash
# Create features/step_definitions/my-feature.steps.ts
# Implement each step from feature file
```

### Step 4: Run Tests (2 min)
```bash
npm run bdd
npm run bdd:report
```

### Step 5: Commit (1 min)
```bash
git add .
git commit -m "feat: SCRUM-XXX - [Feature Name]"
git push origin master
```

**Total Time**: ~25 minutes per story!

---

## 📦 What's Included

### Framework Files
```
├── testframework.md          ← 📖 Read this first!
├── WORKFLOW.md               ← 📋 Step-by-step guide
├── README.md                 ← Quick start
└── GETTING_STARTED.md        ← This file
```

### Example Implementation
```
├── stories/
│   └── stories.md            ← Example user story (SCRUM-101)
├── features/
│   ├── checkout.feature      ← Example feature file (12 scenarios)
│   └── step_definitions/
│       └── checkout.steps.ts ← Example step definitions (330 lines)
└── tests/
    ├── checkout.spec.ts      ← Playwright tests
    ├── example.spec.ts
    └── api.spec.ts
```

### Configuration Files
```
├── playwright.config.ts      ← Browser config
├── cucumber.js              ← BDD config
├── tsconfig.json            ← TypeScript config
├── package.json             ← Dependencies
└── .github/copilot-instructions.md
```

---

## 💻 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | 1.48.0+ | Browser automation |
| **Cucumber** | 12.9.0+ | BDD framework |
| **TypeScript** | 5.0.0+ | Type safety |
| **Node.js** | 18+ | Runtime |

---

## 📖 Reading Order

### For First-Time Users
1. **This file** (GETTING_STARTED.md) - You are here! ✅
2. [README.md](./README.md) - Overview & quick commands
3. [WORKFLOW.md](./WORKFLOW.md) - Step-by-step checklist
4. [testframework.md](./testframework.md) - Deep dive

### For Story Writers
1. [WORKFLOW.md](./WORKFLOW.md) - Phase 1: Story Creation
2. [testframework.md](./testframework.md) - Story Structure section

### For Test Automation Engineers
1. [testframework.md](./testframework.md) - Full technical guide
2. [WORKFLOW.md](./WORKFLOW.md) - Phases 2-5 (Feature to Tests)
3. Example code in `features/` and `tests/` folders

### For DevOps/CI-CD
1. [testframework.md](./testframework.md) - CI/CD Setup section
2. `.github/workflows/test.yml` (template included)

---

## 🎓 Example Walkthrough

### See the Complete Story → Test Flow

**1. Story Input**
```bash
cat stories/stories.md
# Shows SCRUM-101 checkout story with ACs
```

**2. Feature Output**
```bash
cat features/checkout.feature
# Shows 12 Gherkin scenarios converted from ACs
```

**3. Step Implementation**
```bash
cat features/step_definitions/checkout.steps.ts
# Shows step definitions (330 lines)
```

**4. Run Tests**
```bash
npm run bdd
# 9 scenarios passing, 3 failing
# Test execution time: 20 seconds
```

**5. View Report**
```bash
npm run bdd:report
# Opens HTML report with results
```

---

## 🛠️ Common Commands

### Development
```bash
npm install              # Install dependencies
npm run format          # Format code
npm run lint            # Check for errors
npm run codegen         # Generate test code (interactive)
```

### Testing
```bash
npm run bdd             # Run BDD tests
npm test                # Run Playwright tests
npm run test:ui         # Interactive mode
npm run test:headed     # Watch in browser
npm run test:debug      # Debug mode
```

### CI/CD
```bash
npm run bdd             # Run BDD tests
npm run test            # Run all tests
npm run bdd:report      # Generate report
```

### Git
```bash
git add .
git commit -m "feat: SCRUM-XXX - Feature description"
git push origin master
```

---

## 🎯 Your First Story

### Task: Add a New Feature

**1. Choose a feature** (e.g., Login functionality)

**2. Create story file**
```bash
cat > stories/login.md << 'EOF'
# User Story: SCRUM-103 - User Login

## Story Title
As a user, I want to login securely so that I can access my account.

## Acceptance Criteria

### AC1: Login with valid credentials
- GIVEN I am on the login page
- WHEN I enter valid username and password
- THEN I should be logged in

### AC2: Reject invalid credentials  
- GIVEN I am on the login page
- WHEN I enter invalid password
- THEN I should see error message
EOF
```

**3. Create feature file**
```bash
cat > features/login.feature << 'EOF'
Feature: User Login (SCRUM-103)
  As a user
  I want to login securely
  So that I can access my account

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    Then I should be logged in

  Scenario: Reject invalid credentials
    Given I am on the login page
    When I enter invalid password
    Then I should see error message
EOF
```

**4. Create step definitions**
```bash
# Create features/step_definitions/login.steps.ts
# Implement each step (see testframework.md for template)
```

**5. Run tests**
```bash
npm run bdd -- features/login.feature
```

**6. Commit**
```bash
git add .
git commit -m "feat: SCRUM-103 - User Login"
git push origin master
```

---

## 📊 Current Framework Status

### Implemented
✅ Playwright + Cucumber BDD framework  
✅ Example checkout story (SCRUM-101)  
✅ 12 Gherkin scenarios  
✅ Step definitions (TypeScript)  
✅ HTML test reports  
✅ Cross-browser support (Chrome, Firefox, Safari)  
✅ Mobile testing (Pixel 5, iPhone 12)  
✅ Complete documentation  

### Test Results
```
✅ 9 Scenarios Passing (75%)
❌ 3 Scenarios Failing (25%) - Known issues
📊 73/82 Steps Passing (89%)
⏱️ Execution Time: 20 seconds
```

### Stories
- ✅ SCRUM-101: E-commerce Checkout Process

### Browsers Tested
- ✅ Chromium (Chrome)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome
- ✅ Mobile Safari

---

## 🚀 Next Steps

### Immediate (Today)
1. [ ] Read [README.md](./README.md)
2. [ ] Run `npm install && npx playwright install`
3. [ ] Run `npm run bdd` to see tests execute
4. [ ] View `npm run bdd:report`

### Short-term (This Week)
1. [ ] Read [WORKFLOW.md](./WORKFLOW.md)
2. [ ] Read [testframework.md](./testframework.md)
3. [ ] Create your first story
4. [ ] Convert it to features
5. [ ] Write step definitions
6. [ ] Run tests

### Medium-term (This Month)
1. [ ] Setup CI/CD pipeline
2. [ ] Add more stories
3. [ ] Achieve 80%+ pass rate
4. [ ] Document team processes
5. [ ] Train team members

---

## 🤝 Contributing

When adding new stories:
1. Follow template in [testframework.md](./testframework.md)
2. Use checklist in [WORKFLOW.md](./WORKFLOW.md)
3. Run tests locally before pushing
4. Keep documentation updated
5. Use meaningful commit messages

---

## 📞 Support

- **Playwright Docs**: https://playwright.dev
- **Cucumber Docs**: https://cucumber.io
- **Gherkin Guide**: https://cucumber.io/docs/gherkin
- **Framework Guide**: [testframework.md](./testframework.md)

---

## 📄 Repository Structure

```
https://github.com/Sagdik/playwright_cli_agent

├── 📖 Documentation
│   ├── README.md
│   ├── testframework.md
│   ├── WORKFLOW.md
│   └── GETTING_STARTED.md (this file)
│
├── 📝 Stories
│   └── stories/
│       └── stories.md
│
├── 🧪 BDD Tests
│   └── features/
│       ├── checkout.feature
│       └── step_definitions/
│           └── checkout.steps.ts
│
├── ▶️ Playwright Tests
│   └── tests/
│       ├── checkout.spec.ts
│       ├── example.spec.ts
│       └── api.spec.ts
│
├── ⚙️ Configuration
│   ├── playwright.config.ts
│   ├── cucumber.js
│   ├── tsconfig.json
│   └── package.json
│
└── 📊 Reports (Auto-generated)
    └── cucumber-report.html
```

---

## ✨ Key Features

✅ **Story-Driven**: Start with user stories, not code  
✅ **BDD Format**: Gherkin syntax for non-technical readability  
✅ **Automated Conversion**: Easy story → feature → tests flow  
✅ **Type-Safe**: Full TypeScript support  
✅ **Cross-Browser**: Test on Chrome, Firefox, Safari, Mobile  
✅ **Visual Reports**: HTML reports with detailed results  
✅ **CI/CD Ready**: GitHub Actions template included  
✅ **Well Documented**: Comprehensive guides & examples  

---

## 🎉 You're Ready!

You now have everything needed to:
- ✅ Write user stories
- ✅ Create BDD scenarios
- ✅ Implement test automation
- ✅ Run tests & generate reports
- ✅ Integrate with CI/CD

**Next Action**: Read [README.md](./README.md) and run `npm run bdd`!

---

**Framework Version**: 1.0.0  
**Last Updated**: May 24, 2026  
**Repository**: https://github.com/Sagdik/playwright_cli_agent

Happy Testing! 🚀
