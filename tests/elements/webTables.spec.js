import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import BasePage from '../../pages/base/BasePage';
import WebTablesPage from '../../pages/WebTablesPage';
import userInfo from '../../test-data/userInfo.json';
import common from '../../test-data/common.json';

const url = common.url;
const basePage = new BasePage();
const homePage = new HomePage();
const webTablesPage = new WebTablesPage();

test.beforeEach(async ({ page }) => {
    console.log("This is before each hook");
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 4);
    await basePage.verifyPageHeader(page, "Web Tables");
});

test("Add new record to web table and verify", async ({ page }) => {
    console.log("This is web table test case");
    const userData = userInfo.webTableUser;

    await webTablesPage.clickAddNewRecordButton(page);
    await webTablesPage.fillNewRecordForm(page, userData);
    await webTablesPage.submitForm(page);
    await webTablesPage.verifyRecordInTable(page, userData);
});

test("Edit existing record in web table", async ({ page }) => {
    console.log("This is edit web table test case");
    const firstName = "Alden";
    const itemValue = "55000";

    await webTablesPage.clickEditButton(page, firstName);
    await webTablesPage.editAnItem(page, webTablesPage.salaryPH, itemValue);
    await webTablesPage.verifyEditedItem(page, firstName, itemValue);
});

test("Delete record from web table", async ({ page }) => {
    console.log("This is delete web table test case");
    const firstName = "Kierra"; 

    await webTablesPage.deleteRecord(page, firstName);
});