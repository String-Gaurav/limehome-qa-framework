import { Page, expect, BrowserContext } from '@playwright/test';
import testData from '../config/test-data';

export class BookingPage {
  constructor(private page: Page) {}

  async selectCity(city: string = testData.search.city) {
    await this.page.locator('#qa_city-picker-name').click();
    await this.page.getByRole('textbox', { name: /select or type location/i }).fill(city);
    await this.page.getByText(city, { exact: true }).click();
  }

  async selectDates(startDate: string = testData.search.startDate, endDate: string = testData.search.endDate) {
    await this.page.locator('#qa_open-datepicker-overlay').click();
    await this.page.getByLabel(new RegExp(`${startDate}.*8`)).getByText(startDate).click();
    await this.page.getByLabel(new RegExp(`${endDate}.*8`)).getByText(endDate).click();
  }

  async incrementGuests() {
    await this.page.locator('#qa_open-guests-overlay').click();
    await this.page.locator('#qa_increment-guests-mobile').nth(0).click();
  }

async clickSearch() {
  // Check if we're already on results page
  const isOnResultsPage = await this.page.locator('h1:has-text("Limehomes in")').isVisible({ timeout: 2000 });
  
  if (isOnResultsPage) {
    console.log('Already on results page, no need to click search');
    return;
  }
  
  // Only click search if we're still on search form
  const searchButton = this.page.getByRole('button', { name: 'Search' });
  if (await searchButton.isVisible({ timeout: 3000 })) {
    await searchButton.click();
  }
}

  async openNewTabFromExplore(context: BrowserContext) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.getByRole('button', { name: /explore/i }).click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    console.log('✅ New tab opened:', newPage.url());
    return newPage;
  }

  async selectUnitAndAddToCart(newPage: Page) {
  const bookNowBtn = newPage.locator('#qa_unit-0-book-now');
  await bookNowBtn.waitFor({ state: 'visible', timeout: 15000 });
  await bookNowBtn.click({ timeout: 5000, force: true });
    await newPage.getByRole('button', { name: " Add & review " }).click();
  }

  async closeModalAndProceedToReserve(newPage: Page) {
    await Promise.all([
      newPage.locator("svg[height='1em']").waitFor({ state: 'visible' }),
      newPage.locator("svg[height='1em']").click()
    ]);
    
    await newPage.getByTestId('qa-goto-checkout-button').waitFor({ state: 'visible' });
    await newPage.getByTestId('qa-goto-checkout-button').click();
  }

  async fillGuestDetails(newPage: Page) {
    await newPage.getByRole('textbox', { name: 'First name *' }).fill(testData.guest.firstName);
    await newPage.getByRole('textbox', { name: 'Last name *' }).fill(testData.guest.lastName);
    await newPage.getByRole('textbox', { name: 'Email *' }).fill(testData.guest.email);
    await newPage.getByRole('textbox', { name: 'Phone number *' }).fill(testData.guest.phone);
    await newPage.getByRole('textbox', { name: 'Create password *' }).fill(testData.guest.password);
  }

  async fillAddressDetails(newPage: Page) {
    await newPage.getByTestId('qa-checkout-guest-info-street-address').locator('div').nth(1).click();
    await newPage.getByRole('textbox', { name: 'Street address *' }).fill(testData.address.street);
    await newPage.getByRole('textbox', { name: 'Postal code *' }).fill(testData.address.postalCode);
    await newPage.getByRole('textbox', { name: 'City *' }).fill(testData.address.city);
    await newPage.getByRole('textbox', { name: 'Country *' }).fill(testData.address.country);
  }

  async proceedToNextSteps(newPage: Page) {
    await newPage.getByRole('button', { name: ' Continue ' }).click();
    await newPage.getByRole('button', { name: ' Continue ' }).click();
  }

  async completeBookingFlow(context: BrowserContext) {
    await this.selectCity();
    await this.selectDates();
    await this.incrementGuests();
    await this.clickSearch();

    const newPage = await this.openNewTabFromExplore(context);
    await this.selectUnitAndAddToCart(newPage);
    await this.closeModalAndProceedToReserve(newPage);
    
    await this.fillGuestDetails(newPage);
    await this.fillAddressDetails(newPage);
    await this.proceedToNextSteps(newPage);

    return newPage;
  }
}