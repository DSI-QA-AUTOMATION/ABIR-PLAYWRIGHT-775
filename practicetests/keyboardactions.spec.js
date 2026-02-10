import {test, expect} from '@playwright/test';

test("Testing keyboard actions", async ({page}) => {
    await page.goto("https://demoqa.com/");

    // Navigate to Text Box section
    await page.locator("svg").first().click();
    await page.getByText("Elements").click();
    await page.getByRole("listitem").getByText("Text Box").click();
    await expect(page.locator("h1")).toContainText("Text Box");

    const name = "John Doe";
    const email = "john.doe@example.com";
    const address = "123 Main Street";

    const fullNameInput = page.locator("#userName");

    // Fill the form using keyboard actions
    await fullNameInput.click();
    await page.keyboard.type(name);
    await page.keyboard.press("Tab");
    await page.keyboard.type(email);
    await page.keyboard.press("Tab");
    await page.keyboard.type(address);
    await page.keyboard.press("Control+KeyA");
    await page.keyboard.press("Control+KeyC");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Control+KeyV");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    const outputName = page.locator("#name");
    const outputEmail = page.locator("#email");
    const outputCurrentAddress = page.locator("#output #currentAddress");
    const outputPermanentAddress = page.locator("#output #permanentAddress");   

    // Verify the submitted data
    expect(await outputName.textContent()).toContain(name);
    expect(await outputEmail.textContent()).toContain(email);
    expect(await outputCurrentAddress.textContent()).toContain(address);
    expect(await outputPermanentAddress.textContent()).toContain(address);

    await page.close();
});