import {test, expect} from '@playwright/test';

test('Testing alerts', async ({page}) => {
    await page.goto('https://demoqa.com/');

    // Navigate to Alerts section
    await page.locator('svg').first().click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByRole('listitem').getByText('Alerts').click();
    await expect(page.locator('h1')).toContainText('Alerts');

    // alert dialog
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('You clicked a button');
        await dialog.accept();
    });
    await page.getByText('Click me').nth(0).click();
    await page.waitForTimeout(2000);

    await page.close();
});

test('Testing confirm alert', async ({page}) => {
    await page.goto('https://demoqa.com/');

    // Navigate to Alerts section
    await page.locator('svg').first().click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByRole('listitem').getByText('Alerts').click();
    await expect(page.locator('h1')).toContainText('Alerts');

    // confirm dialog
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toContain('Do you confirm action?');
        await dialog.dismiss();
    });
    await page.getByText('Click me').nth(2).click();
    await page.waitForTimeout(2000);
    const confirmResult = await page.locator('#confirmResult').textContent();
    expect(confirmResult).toContain('Cancel');

    await page.close();
});

test('Testing prompt alert', async ({page}) => {
    const promptInput = 'Playwright Test';
    await page.goto('https://demoqa.com/');

    // Navigate to Alerts section
    await page.locator('svg').first().click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByRole('listitem').getByText('Alerts').click();
    await expect(page.locator('h1')).toContainText('Alerts');

    // prompt dialog
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');
        expect(dialog.message()).toContain('Please enter your name');
        await dialog.accept(promptInput);
    });
    await page.getByText('Click me').nth(3).click();
    await page.waitForTimeout(2000);
    const confirmResult = await page.locator('#promptResult').textContent();
    expect(confirmResult).toContain(promptInput);

    await page.close();
});