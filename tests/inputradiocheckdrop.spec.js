import { test, expect } from '@playwright/test';

test('Testing inbox fields, radio buttons, che', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  await page.locator('svg').first().click();
  await page.getByText('Forms').click();
  await page.getByRole('listitem').getByText('Practice Form').click();
  await expect(page.locator('h1')).toContainText('Practice Form');

  // Input fields
  await page.getByPlaceholder('First Name' ).fill('Hello');
  await page.getByPlaceholder('Last Name' ).fill('There');
  await page.locator('#userEmail').fill('hello@there.com');
  await page.locator('#userNumber').fill('0123456789');

  // Radio button
  const maleRadio = page.locator('input[value="Male"]');
  await expect(await maleRadio.isChecked()).toBeFalsy();
  await maleRadio.click({force: true});
  await expect(await maleRadio.isChecked()).toBeTruthy();

  // Checkboxes
  await page.getByLabel('Sports').check({force: true});
  await page.locator('#hobbies-checkbox-3').check({force: true});
  await expect(await page.locator('#hobbies-checkbox-1')).toBeChecked();
  await expect(await page.locator('#hobbies-checkbox-3')).toBeChecked();

  // Dropdowns (without the select tag)
  await page.locator('//div[text()="Select State"]').click();
  await page.getByText('Uttar Pradesh', {exact: true}).click();
  await page.locator('#city svg').click();
  await page.getByText('Agra', { exact: true }).click();

  await page.getByRole('button', { name: 'Submit' }).click();

  // Assertions
  const submittedHeader = page.locator('#example-modal-sizes-title-lg');
  await expect(submittedHeader).toContainText('Thanks for submitting the form');
  await expect(page.locator('tbody')).toContainText('Hello There');

  await page.locator('#closeLargeModal').click({force: true});

  await page.close();
});