# Quick Setup Guide

## Installation
```bash
git clone <repo-url>
cd limehome-qa-framework
npm install
npx playwright install
```

## Run Tests
```bash
# All tests (11 total)
npx playwright test

# Frontend only (5 tests)
npx playwright test tests/frontend/

# API only (6 tests)  
npx playwright test tests/api/

# With browser visible
npx playwright test --headed

# View reports
npx playwright show-report
```

## Package.json Scripts
```json
{
  "scripts": {
    "test": "playwright test",
    "test:frontend": "playwright test tests/frontend/",
    "test:api": "playwright test tests/api/",
    "test:headed": "playwright test --headed",
    "report": "playwright show-report"
  }
}
```

## Project Structure
```
limehome-qa-framework/
├── tests/
│   ├── frontend/booking-flow.spec.ts    # E2E tests (5)
│   └── api/property-api.spec.ts         # Website API tests (6)
├── pages/booking-page.ts                # Page Object Model
├── config/test-data.ts                  # Centralized test data
├── utils/                               # Test utilities
└── docs/TEST_STRATEGY.md                # Strategy document
```

## Test Data Configuration

### config/test-data.ts
```typescript
const testData = {
  urls: {
    property: 'https://www.limehome.com/suites?property=129&guests=1&rooms=1',
    api: 'https://www.limehome.com'
  },
  search: {
    city: 'aachen',
    startDate: '13',
    endDate: '15'
  },
  guest: {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test345@mailsac.com',
    phone: '7854102552',
    password: 'Test@123'
  }
};
```

## Quick Validation
```bash
# Verify setup works
npx playwright test --grep "Complete booking flow"

# Should see: 1 passed test
```