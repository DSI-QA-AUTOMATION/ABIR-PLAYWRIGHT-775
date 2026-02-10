import { expect } from "@playwright/test";

class ButtonsPage {
    // Locators
    doubleClickBtn = "#doubleClickBtn";
    rightClickBtn = "#rightClickBtn";
    // dynamicClickBtn = "button:has-text('Click Me')";
    doubleClickMessage = "#doubleClickMessage";
    rightClickMessage = "#rightClickMessage";
    dynamicClickMessage = "#dynamicClickMessage";

    // Xpath locators
    dynamicClickBtn = "//button[@id='rightClickBtn']//parent::div//following-sibling::div/button";

    // Methods
    async clickDoubleClickBtn(page) {
        await page.locator(this.doubleClickBtn).dblclick();
    }

    async clickRightClickBtn(page) {
        await page.locator(this.rightClickBtn).click({ button: "right" });
    }

    async clickDynamicClickBtn(page) {
        await page.locator(this.dynamicClickBtn).click();
    }

    async verifyDoubleClickMessage(page, expectedMessage) {
        await expect(page.locator(this.doubleClickMessage)).toHaveText(expectedMessage);
    }

    async verifyRightClickMessage(page, expectedMessage) {
        await expect(page.locator(this.rightClickMessage)).toHaveText(expectedMessage);
    }

    async verifyDynamicClickMessage(page, expectedMessage) {
        await expect(page.locator(this.dynamicClickMessage)).toHaveText(expectedMessage);
    }

}

export default ButtonsPage;