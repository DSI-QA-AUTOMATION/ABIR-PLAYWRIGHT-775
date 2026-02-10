import { test, expect } from '@playwright/test';

test("Testing drag and drop functionality", async ({ page }) => {
    await page.goto("https://demoqa.com/");

    // Navigate to Drag and Drop section
    await page.locator("svg").first().click();
    await page.getByText("Interactions").click();
    await page.getByRole("listitem").getByText("Droppable").click();
    await expect(page.locator("h1")).toContainText("Droppable");

    const sourceBox = page.locator("#draggable");
    const targetBox = page.locator("#droppable").first();
    const targetBoxText = targetBox.locator("p");

    // Perform drag and drop

    // Method 1
    // await sourceBox.hover();
    // await page.mouse.down();

    // await targetBox.hover();
    // await page.mouse.up();

    // Method 2
    await sourceBox.dragTo(targetBox);

    // Verify the drag and drop action
    expect(await targetBoxText.textContent()).toBe("Dropped!");
    await page.close();
});