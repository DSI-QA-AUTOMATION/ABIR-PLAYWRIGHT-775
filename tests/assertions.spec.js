import {test, expect} from '@playwright/test';

test('Hard and Soft Assertions', async ({page}) => {
    await page.goto('https://demoqa.com/');

    //Soft Assertion
    await expect.soft(page).toHaveTitle('DemoQA');
    await expect.soft(page).toHaveURL('https://demoqa.com/');

    // Hard Assertion
    await expect(page).toHaveTitle('DEMOQA');

    await page.close();
});