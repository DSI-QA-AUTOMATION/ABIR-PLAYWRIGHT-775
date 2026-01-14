import { test, expect } from '@playwright/test';

test("Testing mouse hover actions", async ({ page }) => {
    await page.goto("https://demoqa.com/");

    // Navigate to Buttons section
    await page.locator("svg").first().click();
    await page.getByText("Elements").click();
    await page.getByRole("listitem").getByText("Buttons").click();
    await expect(page.locator("h1")).toContainText("Buttons");

    const doubleClickBtn = page.locator("#doubleClickBtn");
    const rightClickBtn = page.locator("#rightClickBtn");
    const dynamicClickBtn = page.getByRole("button", { name: "Click Me", exact: true });
    const doubleClickMessage = page.locator("#doubleClickMessage");
    const rightClickMessage = page.locator("#rightClickMessage");
    const dynamicClickMessage = page.locator("#dynamicClickMessage");

    // Perform click action
    await doubleClickBtn.dblclick();
    expect(await doubleClickMessage.textContent()).toBe("You have done a double click");

    await rightClickBtn.click({ button: "right" });
    expect(await rightClickMessage.textContent()).toBe("You have done a right click");

    await dynamicClickBtn.click();
    expect(await dynamicClickMessage.textContent()).toBe("You have done a dynamic click");

    // Navigate to Tool Tips section
    await page.locator("svg").first().click();
    await page.getByText("Widgets").click();
    await page.getByRole("listitem").getByText("Tool Tips").click();
    await expect(page.locator("h1")).toContainText("Tool Tips");

    const hoverMeBtn = page.locator("#toolTipButton");
    const hoverMeInput = page.locator("#toolTipTextField");
    const hoverMeLink = page.locator("//a[text()='Contrary']");

    // Hover over button and verify tooltip
    await hoverMeBtn.hover();
    const toolTip = page.getByRole("tooltip");
    await page.waitForTimeout(2000);
    await expect(toolTip).toBeVisible();
    expect(await toolTip.textContent()).toBe("You hovered over the Button");

    // Hover over input field and verify tooltip
    await hoverMeInput.hover();
    await page.waitForTimeout(2000);
    await expect(toolTip).toBeVisible();
    expect(await toolTip.textContent()).toBe("You hovered over the text field");

    // Hover over link and verify tooltip
    await hoverMeLink.hover();
    await page.waitForTimeout(2000);
    await expect(toolTip).toBeVisible();
    expect(await toolTip.textContent()).toBe("You hovered over the Contrary");


    page.close();

});