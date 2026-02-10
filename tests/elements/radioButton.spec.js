import { test } from '@playwright/test';
import common from '../../test-data/common.json';
import HomePage from '../../pages/HomePage.js';
import BasePage from '../../pages/base/BasePage.js';
import RadioButtonPage from '../../pages/RadioButtonPage.js';

const basePage = new BasePage();
const homePage = new HomePage();
const radioButtonPage = new RadioButtonPage();

test("Verify Radio Button functionality", async ({ page }) => {
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 3);
    await basePage.verifyPageHeader(page, "Radio Button");

    await radioButtonPage.selectYesRadioButton(page);
    await radioButtonPage.verifySelectedRadioButtonResult(page, "Yes");

    await radioButtonPage.selectImpressiveRadioButton(page);
    await radioButtonPage.verifySelectedRadioButtonResult(page, "Impressive");

});