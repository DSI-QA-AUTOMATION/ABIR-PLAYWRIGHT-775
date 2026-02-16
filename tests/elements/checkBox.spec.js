import { test } from '@playwright/test';
import common from '../../test-data/common.json';
import HomePage from '../../pages/HomePage.js';
import BasePage from '../../pages/base/BasePage.js';
import CheckBoxPage from '../../pages/CheckBoxPage.js';

const basePage = new BasePage();
const homePage = new HomePage();
const checkBoxPage = new CheckBoxPage();

test("Verify Check Box functionality", async ({ page }) => {
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 2);
    await basePage.verifyPageHeader(page, "Check Box");

    await checkBoxPage.expandFolder(page, "Home");
    await checkBoxPage.expandFolder(page, "Desktop");
    await checkBoxPage.checkFolderOrFile(page, "Notes");
    await checkBoxPage.verifyResultContains(page, "notes");

    await checkBoxPage.expandFolder(page, "Documents");
    await checkBoxPage.expandFolder(page, "Office");
    await checkBoxPage.checkFolderOrFile(page, "Public");
    await checkBoxPage.verifyResultContains(page, "public");
});