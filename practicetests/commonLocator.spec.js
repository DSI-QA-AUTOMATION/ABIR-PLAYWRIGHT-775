import {test, expect} from '@playwright/test';

test('Common Locator Strategies', async ({page}) => {
    await page.goto('https://demoqa.com/');

    //CSS Selector
    const banner = page.locator('.banner-image');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveCount(1);

    //XPath Selector
    const pageHeading = page.locator("//header/a/img");
    await expect(pageHeading).toBeVisible();

    const cardGroup = page.locator("//div[@class='category-cards']/div");
    await expect(cardGroup).toHaveCount(6);
    await cardGroup.first().click();

    // CSS Selector
    const elementGroup = page.locator('.element-group').first();
    const elementText = elementGroup.locator('span > div > div.header-text');
    await expect(elementText).toContainText('Elements');

    await expect(page).toHaveURL('https://demoqa.com/elements');

    await page.close();
});