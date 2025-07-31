# Limehome Test Strategy

## Test Approach
**Goal**: Validate critical booking journey and website functionality

**Coverage**: 5 Frontend E2E Tests + 6 Website API Tests

## Test Cases

### Frontend Tests (5 cases)
1. **Complete Booking Flow** (P0) - Search → Add to cart → Checkout
2. **Search Functionality** (P0) - City selection and filters
3. **Form Validation** (P1) - Required field validation
4. **Cart Operations** (P1) - Add to cart functionality
5. **Date Selection** (P1) - Different date ranges

### Website API Tests (6 cases)
1. **Property Page Status** (P0) - 200 OK responses
2. **HTML Content Validation** (P0) - Page loads correctly
3. **Invalid Property Handling** (P1) - Error scenarios
4. **Response Time Testing** (P1) - Performance checks
5. **HTTP Headers Validation** (P2) - Content types
6. **Search Parameters** (P2) - Different URL parameters
7. Search parameters - Filter Validations

## Implementation
- **Test Data**: Centralized in `config/test-data.ts`
- **Page Objects**: `pages/booking-page.ts` with reusable methods
- **Real Endpoints**: Tests actual website URLs, not mock APIs

## Success Criteria
- All P0 tests: 100% pass rate
- P1 tests: 95% pass rate
- Total execution: < 2 minutes
- Clear HTML reports with screenshots

## Tech Stack
- **Framework**: Playwright + TypeScript
- **Structure**: Page Object Model
- **Reports**: HTML + Screenshots + Videos
- **Monitoring**: DataDog integration
