import { expect } from "@playwright/test";

class WebTablesPage {
    // Locators
    addNewRecordButton = "#addNewRecordButton";
    submitButton = "button[type='submit']";
    rowsLoc = "table > tbody > tr";
    columnsHeaders = "table > thead > tr > th";
    editIcon = "span[title='Edit']";
    deleteIcon = "span[title='Delete']";

    // Placeholders
    firstNamePH = "First Name";
    lastNamePH = "Last Name";
    emailPH = "name@example.com";
    agePH = "Age";
    salaryPH = "Salary";
    departmentPH = "Department";

    // Helpers
    async findUserIndexByFirstName(page, firstName) {
        const rows = page.locator(this.rowsLoc);
        const rowCount = await rows.count();

        for (let i = 0; i < rowCount; i++) {
            const rowText = await rows.nth(i).textContent();
            if (rowText.includes(firstName)) {
                return i;
            }
        }
        return -1;
    }

    // Methods
    async clickAddNewRecordButton(page) {
        await page.locator(this.addNewRecordButton).click();
    }

    async fillNewRecordForm(page, userData) {
        await page.getByPlaceholder(this.firstNamePH).fill(userData.firstName);
        await page.getByPlaceholder(this.lastNamePH).fill(userData.lastName);
        await page.getByPlaceholder(this.emailPH).fill(userData.email);
        await page.getByPlaceholder(this.agePH).fill(userData.age);
        await page.getByPlaceholder(this.salaryPH).fill(userData.salary);
        await page.getByPlaceholder(this.departmentPH).fill(userData.department);
    }

    async submitForm(page) {
        await page.locator(this.submitButton).click();
    }

    async verifyRecordInTable(page, userData) {
        const newUserData = await page.locator(this.rowsLoc).last().textContent();
        expect(newUserData).toContain(userData.firstName);
        expect(newUserData).toContain(userData.lastName);
        expect(newUserData).toContain(userData.email);
        expect(newUserData).toContain(userData.age);
        expect(newUserData).toContain(userData.salary);
        expect(newUserData).toContain(userData.department);
    }

    async clickEditButton(page, firstName) {
        const userIndex = await this.findUserIndexByFirstName(page, firstName);
        if (userIndex === -1) {
            throw new Error(`User with first name '${firstName}' not found`);
        }
        await page.locator(this.editIcon).nth(userIndex).click();
    }

    async editAnItem(page, placeHolder, newItemValue) {
        await page.getByPlaceholder(placeHolder).fill(newItemValue);
        await this.submitForm(page);
    }

    async verifyEditedItem(page, firstName, expectedValue) {
        const userIndex = await this.findUserIndexByFirstName(page, firstName);
        if (userIndex === -1) {
            throw new Error(`User with first name '${firstName}' not found`);
        }

        const tableContent = await page.locator(this.rowsLoc).nth(userIndex).textContent();
        expect(tableContent).toContain(expectedValue);
    }

    async deleteRecord(page, firstName) {
        const userIndex = await this.findUserIndexByFirstName(page, firstName);
        if (userIndex === -1) {
            throw new Error(`User with first name '${firstName}' not found`);
        }
        await page.locator(this.deleteIcon).nth(userIndex).click();
    }

}

export default WebTablesPage;