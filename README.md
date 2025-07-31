# Limehome QA Framework

Automated testing framework for Limehome booking platform using Playwright + TypeScript.

## Quick Start

```bash
# Install dependencies
npm install
npx playwright install

# Run all tests
npx playwright test

# Run with browser visible
npx playwright test --headed

# View reports
npx playwright show-report
```

## Test Coverage

### Frontend Tests (E2E)
- ✅ Complete booking flow - Full user journey
- ✅ Search functionality - City/date/guest filters
- ✅ Form validation - Required fields, errors
- ✅ Cart operations - Add to cart, checkout
- ✅ Date selection - Various date ranges

### API Tests (Website Endpoints)
- ✅ Property page status - 200 OK responses  
- ✅ HTML content validation - Page loads correctly
- ✅ Invalid property handling - Error scenarios
- ✅ Response time testing - Performance checks
- ✅ HTTP headers validation - Content types
- ✅ Search parameters - Different URL params

## Structure

```
├── tests/
│   ├── frontend/booking-flow.spec.ts    # E2E user journey tests
│   └── api/property-api.spec.ts          # Website API tests
├── pages/booking-page.ts                 # Page Object Model
├── config/test-data.ts                   # Test data & configuration
├── utils/                                # Test utilities
└── docs/                                 # Documentation
```

## Key Commands

```bash
npx playwright test                       # All tests
npx playwright test tests/frontend/       # Frontend only
npx playwright test tests/api/            # API only
npx playwright test --headed              # With browser visible
npx playwright test --ui                  # Interactive mode
```

## Test Results
- **HTML Report**: Auto-opens after test run
- **Screenshots**: Captured on failures
- **Videos**: Recorded for failed tests
- **Performance**: DataDog integration

## Test Data
All test data centralized in `config/test-data.ts`:
- Default search: Aachen, Aug 13-15, 2 guests
- User details: Test user with valid info
- Configurable URLs and endpoints

## Documentation
- Test strategy and approach in `/docs`
- Setup guide for new contributors
- Troubleshooting common issues