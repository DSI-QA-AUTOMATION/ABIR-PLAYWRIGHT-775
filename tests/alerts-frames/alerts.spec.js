import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import AlertPage from '../../pages/AlertPage';
import common from '../../test-data/common.json';

const basePage = new BasePage();
const homePage = new HomePage();
const alertPage = new AlertPage();

test.beforeEach(async ({ page }) => {
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 3);
    await basePage.clickOnAlertsMenuItem(page, 2);
    await basePage.verifyPageHeader(page, 'Alerts');
});

test.describe('Testing JavaScript Alerts', async () => {
    
    // await alertPage.triggerAlert(page);
    // await alertPage.triggerTimerAlert(page);
    
    test("Testing confirm alert", async ({ page }) => {
        await alertPage.triggerConfirmAlert(page);
        await alertPage.verifyConfirmResult(page);
    });

    test("Testing prompt alert", async ({ page }) => {
        const promptInput = common.promptMessage;
        await alertPage.triggerPromptAlert(page, promptInput);
        await alertPage.verifyPromptResult(page, promptInput);
    });

});