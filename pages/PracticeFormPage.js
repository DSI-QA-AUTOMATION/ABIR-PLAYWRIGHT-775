import { expect } from "@playwright/test";

class PracticeFormPage {
    // Locators
    firstNameInput = "input#firstName";
    lastNameInput = "input#lastName";
    emailInput = "input#userEmail";
    mobileNumberInput = "input#userNumber";
    subjectsInput = "#subjectsInput";
    subjectOptions = "div[id^='react-select'][id$='option-0']";
    stateDropdown = "div#state";
    cityDropdown = "div#city";
    submitButton = "button#submit";
    submittedHeader = "div[class *= 'modal-title']";
    submittedDataTable = "tbody";
    closeModalButton = "#closeLargeModal";
    modal = ".modal-content";

    // Methods
    async fillFirstName(page, firstName) {
        await page.locator(this.firstNameInput).fill(firstName);
    }

    async fillLastName(page, lastName) {
        await page.locator(this.lastNameInput).fill(lastName);
    }

    async fillEmail(page, email) {
        await page.locator(this.emailInput).fill(email);
    }

    async fillMobileNumber(page, mobileNumber) {
        await page.locator(this.mobileNumberInput).fill(mobileNumber);
    }

    async selectRadioButton(page, gender) {
        await page.getByLabel(gender).check({force: true});
    }

    async selectHobbiesCheckbox(page, hobbies) {
        for (const hobby of hobbies) {
            await page.getByLabel(hobby).check({force: true});
        }
    }

    async fillSubjects(page, subjects) {
        for (const subject of subjects) {
            await page.locator(this.subjectsInput).fill(subject);
            await page.locator(this.subjectOptions).click();
        }
    }

    async selectState(page, state) {
        await page.locator(this.stateDropdown).click();
        await page.getByText(state, {exact: true}).click();
    }

    async selectCity(page, city) {
        await page.locator(this.cityDropdown).click();
        await page.getByText(city, { exact: true }).click();
    }

    async clickSubmitButton(page) {
        await page.locator(this.submitButton).click();
    }

    async verifySubmissionModalIsVisible(page) {
        const modal = page.locator(this.modal);
        await expect(modal).toBeVisible();
    }

    async verifyFormSubmission(page, expectedName) {
        await expect(page.locator(this.submittedHeader)).toContainText('Thanks for submitting the form');
        await expect(page.locator(this.submittedDataTable)).toContainText(expectedName);
    }

    async closeSubmissionModal(page) {
        await page.locator(this.closeModalButton).click({force: true});
    }

}

export default PracticeFormPage;