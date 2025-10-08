import {test, expect} from '@playwright/test';

/*
    getByRole
    getByLabel
    getByPlaceholder
    getByText
    getByAltText
    getByTitle 
    getByTestId
*/

test('Built-in Locator Strategies', async ({page}) => {
    await page.goto('https://demoqa.com/');

    const downArrow = page.getByTitle('Ad.Plus Advertising');
    await expect(downArrow).toBeVisible();

    const banner = page.getByAltText('Selenium Online Training');
    await expect(banner).toBeVisible();

    await page.getByText('Elements').click();
    await expect(page).toHaveURL('https://demoqa.com/elements');

    await page.close();
});