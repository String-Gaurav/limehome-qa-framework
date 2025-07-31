import { test, expect } from '@playwright/test';

test.describe('Limehome Website API Tests', () => {
  const BASE_URL = 'https://www.limehome.com';

  test('should return 200 OK for property page', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
  });

  test('should return HTML content for property page', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
    
    const content = await response.text();
    expect(content).toContain('limehome');
    expect(content).toContain('<!DOCTYPE html>');
  });

  test('should handle invalid property ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=99999&guests=1&rooms=1`);
    expect([200, 301, 302, 404]).toContain(response.status());
  });

  test('should return response within reasonable time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    const duration = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(10000);
  });

  test('should have proper response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('text/html');
  });

  test('should handle different city searches', async ({ request }) => {
    const cities = ['berlin', 'munich', 'hamburg'];
    
    for (const city of cities) {
      const response = await request.get(`${BASE_URL}/search?city=${city}`);
      // Should either return results or redirect
      expect([200, 301, 302]).toContain(response.status());
    }
  });
});