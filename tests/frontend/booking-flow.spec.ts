import { test, expect } from '@playwright/test';
import testData from '@config/test-data';
import { BookingPage } from '../../pages/booking-page';

test.describe('Limehome Search and Shopping Flow Tests', () => {
  let bookingPage: BookingPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.property);
    await page.waitForLoadState('networkidle');

    try {
      await page.getByText('Accept All').click({ timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch (error) {
      console.log('No cookie consent modal or already handled');
    }

    bookingPage = new BookingPage(page);
  });

  test('Complete booking flow', async ({ page, context }) => {
    const checkoutPage = await bookingPage.completeBookingFlow(context);
    expect(checkoutPage.url()).toContain('checkout');
  });

  test('Search different cities', async ({ page }) => {
    await bookingPage.selectCity('berlin');
    await bookingPage.selectDates('20', '22');
    await expect(page.locator('h1:has-text("Limehomes in berlin")')).toBeVisible();
  });

  test('Add to cart functionality', async ({ page, context }) => {
    await bookingPage.selectCity();
    await bookingPage.selectDates();
    await bookingPage.incrementGuests();
    await bookingPage.clickSearch();

    const newPage = await bookingPage.openNewTabFromExplore(context);
    await bookingPage.selectUnitAndAddToCart(newPage);
    await expect(newPage.getByTestId('qa-cart-details-modal')).toBeVisible({ timeout: 10000 });
  });

  test('Navigate to checkout form', async ({ page, context }) => {
    await bookingPage.selectCity();
    await bookingPage.selectDates();
    await bookingPage.incrementGuests();
    await bookingPage.clickSearch();

    const newPage = await bookingPage.openNewTabFromExplore(context);
    await bookingPage.selectUnitAndAddToCart(newPage);
    await bookingPage.closeModalAndProceedToReserve(newPage);

    await expect(newPage.getByRole('textbox', { name: 'First name *' })).toBeVisible();
  });

  test('Date selection with different ranges', async ({ page }) => {
    await bookingPage.selectCity();

    await bookingPage.selectDates();
    await expect(page.locator('#qa_open-datepicker-overlay')).toBeVisible();

    await bookingPage.selectDates(testData.search.alternativeDates.startDate, testData.search.alternativeDates.endDate);
    await expect(page.locator('#qa_open-datepicker-overlay')).toBeVisible();

    await bookingPage.selectDates(testData.search.extendedStay.startDate, testData.search.extendedStay.endDate);
    await expect(page.locator('#qa_open-datepicker-overlay')).toBeVisible();
  });
});
