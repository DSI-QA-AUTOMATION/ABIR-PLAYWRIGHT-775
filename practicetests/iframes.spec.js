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

    const frame1 = page.frameLocator('#frame1');
    const frameText = await frame1.locator('#sampleHeading').textContent();
    expect(frameText).toBe('This is a sample page');

    // Nested frames
    await page.getByRole('listitem').getByText('Nested Frames', {exact: true}).click();
    await expect(page.locator('h1')).toContainText('Nested Frames');

    const parentFrame = await page.frame({ url: /sampleiframe/ });
    await page.waitForTimeout(2000);
    expect(parentFrame).not.toBeNull();

    const parentText = await parentFrame.locator('body').textContent();
    expect(parentText).toContain('Parent frame');

    const childFrames = parentFrame.childFrames();
    console.log(`Number of child frames in parent frame: ${childFrames.length}`);

    const childText = await childFrames[0].locator('body').textContent();
    expect(childText).toBe('Child Iframe');

    await page.close();
});