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

    await checkBoxPage.clickExpandAllButton(page);
    await checkBoxPage.selectNotesCheckBox(page);
    await checkBoxPage.selectPublicCheckBox(page);
    await checkBoxPage.verifyResultContains(page, "notes");
    await checkBoxPage.verifyResultContains(page, "public");
});