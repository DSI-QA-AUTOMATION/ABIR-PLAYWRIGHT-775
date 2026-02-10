import { expect } from "@playwright/test";

class CheckBoxPage {
    // Locators
    expandAllButton = "button[title='Expand all']";
    notesCheckBox = "#tree-node-notes + span";
    publicCheckBox = "#tree-node-public + span";
    resultText = "#result";

    // Methods
    async clickExpandAllButton(page) {
        await page.locator(this.expandAllButton).click();
    }

    async selectNotesCheckBox(page) {
        await page.locator(this.notesCheckBox).click();
    }

    async selectPublicCheckBox(page) {
        await page.locator(this.publicCheckBox).click();
    }

    async verifyResultContains(page, expectedText) {
        await expect(page.locator(this.resultText)).toContainText(expectedText);
    }

}

export default CheckBoxPage;