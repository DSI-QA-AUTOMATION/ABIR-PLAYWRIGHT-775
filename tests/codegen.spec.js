import { test, expect } from '@playwright/test';

test('Tests with codegen', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Selenium Online Training' })).toBeVisible();
  
  await page.locator('svg').first().click();
  await expect(page.locator('#app')).toContainText('Elements');
  
  await page.getByText('Radio Button').click();
  await page.locator('div').filter({ hasText: /^Yes$/ }).click();
  await expect(page.getByRole('paragraph')).toContainText('Yes');
  await page.locator('div').filter({ hasText: /^Impressive$/ }).click();
  await expect(page.getByRole('paragraph')).toContainText('Impressive');

  await page.getByText('Check Box').click();
  await page.getByRole('button', { name: 'Toggle' }).click();
  await page.getByRole('listitem').filter({ hasText: /^Desktop$/ }).getByLabel('Toggle').click();
  await page.locator('label').filter({ hasText: 'Notes' }).getByRole('img').first().click();
  await expect(page.locator('#result')).toContainText('notes');

  await page.close();
});