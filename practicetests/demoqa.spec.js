import {test, expect} from '@playwright/test';

test('DemoQA Homepage', async ({page}) => {
    await page.goto('https://demoqa.com/');

    const pageTitle = page.title();
    console.log('Page Title:', pageTitle);

    const pageURL = page.url();
    console.log('Page URL:', pageURL);

    await expect(page).toHaveTitle('DEMOQA');
    await expect(page).toHaveURL('https://demoqa.com/');

    await page.close();
});