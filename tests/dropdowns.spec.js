import { test, expect} from '@playwright/test';

test('Testing dropdowns', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator('svg').first().click();
    await page.getByText('Widgets').click();
    await page.getByRole('listitem').getByText('Select Menu').click();
    await expect(page.locator('h1')).toContainText('Select Menu');

    // Dropdowns with the select tag
    const options = page.locator('#oldSelectMenu option');
    await expect(options).toHaveCount(11);
    const content = await page.locator('#oldSelectMenu').textContent();
    expect(content.includes("White")).toBeTruthy();
    await page.locator('#oldSelectMenu').selectOption('White');

    // Standard multi select
    await page.locator('#cars').selectOption(['volvo', 'audi']);

    // Multi select without the select tag
    let dropDownText = 'Select...';
    await page.locator(`//div[text()='${dropDownText}']`).click();
    await page.locator('//div[text()="Green"]').click();
    await page.locator('//div[text()="Black"]').click();

    await expect(page.locator('div[class*="multiValue"]')).toHaveCount(2);

    await page.close();
});