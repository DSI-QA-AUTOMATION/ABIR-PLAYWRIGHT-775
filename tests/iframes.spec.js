import { test, expect } from '@playwright/test';

test('Testing iframes', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    // Navigate to Frames section
    await page.locator('svg').first().click();
    await page.getByText('Alerts, Frame & Windows').click();
    await page.getByRole('listitem').getByText('Frames', {exact: true}).click();
    await expect(page.locator('h1')).toContainText('Frames');

    const allFrames = page.frames();
    console.log(`Total number of frames: ${allFrames.length}`);

    const frame1 = await page.frameLocator('#frame1');;
    const frameText = await frame1.locator('#sampleHeading').textContent();
    expect(frameText).toBe('This is a sample page');

    await page.close();
});