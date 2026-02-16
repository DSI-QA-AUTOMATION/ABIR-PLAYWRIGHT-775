import { expect } from "@playwright/test";

class CheckBoxPage {
    // Locators
    expandSpan = "span[class*='rc-tree-switcher']";
    checkBoxSpan = "span[class*='rc-tree-checkbox']";
    resultText = "#result";

    // Methods
    async expandFolder(page, folderName) {
        const expandButton = page.getByTitle(folderName).locator("..").locator(this.expandSpan);
        await expandButton.click();
    }

    async checkFolderOrFile(page, name) {
        const checkBox = page.getByTitle(name).locator("..").locator(this.checkBoxSpan);
        await checkBox.click();
    }

    async verifyResultContains(page, expectedText) {
        await expect(page.locator(this.resultText)).toContainText(expectedText);
    }

}

export default CheckBoxPage;