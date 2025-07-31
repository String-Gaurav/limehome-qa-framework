import { test, expect } from '@playwright/test';
import { DataDogReporter } from '@utils/datadog';

test.describe('Limehome Website API Tests', () => {
  const ddReporter = DataDogReporter.getInstance();
  const BASE_URL = 'https://www.limehome.com';

  test('should return 200 OK for property page', async ({ request }) => {
    const startTime = await ddReporter.reportTestStart('api.property_page');
    
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
    
    ddReporter.reportTestEnd(startTime, 'passed');
  });

  test('should return HTML content for property page', async ({ request }) => {
    const startTime = await ddReporter.reportTestStart('api.html_content');
    
    try {
      const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
      expect(response.status()).toBe(200);
      
      const content = await response.text();
      expect(content).toContain('limehome');
      expect(content).toContain('<!DOCTYPE html>');
      
      ddReporter.reportTestEnd(startTime, 'passed');
    } catch (error) {
      ddReporter.reportTestEnd(startTime, 'failed');
      throw error;
    }
  });

  test('should handle invalid property ID', async ({ request }) => {
    const startTime = await ddReporter.reportTestStart('api.invalid_property');
    
    const response = await request.get(`${BASE_URL}/suites?property=99999&guests=1&rooms=1`);
    
    // Website should still return 200 but might redirect or show error page
    expect([200, 301, 302, 404]).toContain(response.status());
    
    ddReporter.reportTestEnd(startTime, 'passed');
  });

  test('should return response within reasonable time', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    const duration = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(10000); // 10 seconds max
    
    ddReporter.reportTestEnd(startTime, 'passed');
  });

  test('should have proper HTML response headers', async ({ request }) => {
    const startTime = await ddReporter.reportTestStart('api.headers');
    
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('text/html');
    
    ddReporter.reportTestEnd(startTime, 'passed');
  });

  // Bonus: Test search functionality via URL parameters
  test('should handle different search parameters', async ({ request }) => {
    const startTime = await ddReporter.reportTestStart('api.search_params');
    
    const searchParams = [
      '?property=129&guests=1&rooms=1',
      '?property=129&guests=2&rooms=1', 
      '?property=129&guests=4&rooms=2'
    ];
    
    for (const params of searchParams) {
      const response = await request.get(`${BASE_URL}/suites${params}`);
      expect(response.status()).toBe(200);
    }
    
    ddReporter.reportTestEnd(startTime, 'passed');
  });
});