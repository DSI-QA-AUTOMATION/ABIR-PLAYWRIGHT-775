import { expect } from "@playwright/test";

class RadioButtonPage {
    // Locators
    yesLabel = "Yes";
    impressiveLabel = "Impressive";
    // yesRadioButton = "#yesRadio";
    // impressiveRadioButton = "#impressiveRadio";
    resultText = "p span";

    // Methods
    async selectYesRadioButton(page) {
        // await page.getByLabel(this.yesLabel).click({ force: true });
        // await page.locator(this.yesRadioButton).check({ force: true });
        await page.getByLabel(this.yesLabel).check({ force: true });
    }

    async selectImpressiveRadioButton(page) {
        await page.getByLabel(this.impressiveLabel).check({ force: true });
    }

    async verifySelectedRadioButtonResult(page, expectedText) {
        await expect(page.locator(this.resultText)).toHaveText(expectedText);
    }

}

export default RadioButtonPage;