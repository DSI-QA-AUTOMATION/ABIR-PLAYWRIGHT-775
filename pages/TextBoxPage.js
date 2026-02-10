import { expect } from '@playwright/test';

class TextBoxPage {
    // Locators
    fullNamePH = "Full Name";
    emailPH = "name@example.com";
    currentAddressPH = "Current Address";
    permanentAddressID = "#permanentAddress";

    submitBtn = "#submit";

    outputName = "#output #name";
    outputEmail = "#output #email";
    outputCurrentAddress = "#output #currentAddress";
    outputPermanentAddress = "#output #permanentAddress";

    // Methods
    async fillTextBoxForm(page, fullName, email, currentAddress, permanentAddress) {
        await page.getByPlaceholder(this.fullNamePH).fill(fullName);
        await page.getByPlaceholder(this.emailPH).fill(email);
        await page.getByPlaceholder(this.currentAddressPH).fill(currentAddress);
        await page.locator(this.permanentAddressID).fill(permanentAddress);
    }

    async submitForm(page) {
        await page.locator(this.submitBtn).click();
    }

    async verifySubmittedData(page, fullName, email, currentAddress, permanentAddress) {
        await expect(page.locator(this.outputName)).toContainText(fullName);
        await expect(page.locator(this.outputEmail)).toContainText(email);
        await expect(page.locator(this.outputCurrentAddress)).toContainText(currentAddress);
        await expect(page.locator(this.outputPermanentAddress)).toContainText(permanentAddress);
    }

}

export default TextBoxPage;