import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.limehome.com';
const API_URL = 'https://api.limehome.com/properties/v1/public/properties/129';

test.describe('Limehome Website Page Tests', () => {
  
  test('should return 200 OK for property page', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);
  });

  test('should return valid HTML content for property page', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);

    const content = await response.text();
    expect(content).toContain('limehome');
    expect(content).toContain('<!DOCTYPE html>');
  });

  test('should handle invalid property ID gracefully', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=99999&guests=1&rooms=1`);
    expect([200, 301, 302, 404]).toContain(response.status());
  });

  test('should respond within acceptable time limit', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(10000); // under 10 seconds
  });

  test('should return correct response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/suites?property=129&guests=1&rooms=1`);
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['content-type']).toContain('text/html');
  });
});

test.describe('Limehome Public Property API Tests', () => {

  test('should return 200 OK status code', async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status(), 'Expected status code 200').toBe(200);
  });

  test('should contain expected property details in response body', async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.status()).toBe(200);

    const { payload } = await response.json();

    //  Validate top-level property metadata
    expect(payload.id).toBe(129);
    expect(payload.external_id).toBe('VER2');
    expect(payload.name.toLowerCase()).toContain('vereinsstraße');
    expect(payload.description).toContain('Aachen');
    expect(payload.city).toBe('aachen');
    expect(payload.street.toLowerCase()).toContain('vereins');

    // Validate nested location object
    expect(payload.location).toBeDefined();
    expect(payload.location).toMatchObject({
      city: 'Aachen',
      postalCode: '52062',
      countryCode: 'DE',
      countryName: 'Germany',
      addressLine1: expect.any(String),
    });

    expect(payload.review_widget_id).toContain('elfsight-app');
    expect(payload.house_rules).toMatch(/no smoking|quiet hours/i);
  });
});