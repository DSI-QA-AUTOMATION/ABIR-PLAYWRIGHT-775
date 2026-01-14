import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  console.log('This is executed before each test');
  await page.goto('https://demoqa.com');
});

test('Sample test to verify page title', async ({page}) => {
  await expect(page).toHaveTitle('DEMOQA');
});

test('Another sample test to check URL', async ({page}) => {
  await expect(page).toHaveURL('https://demoqa.com');
});

test.afterEach(async ({page}) => {
  console.log('This is executed after each test');
  await page.close();
});