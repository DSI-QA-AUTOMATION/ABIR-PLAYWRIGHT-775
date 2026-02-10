import { test } from '@playwright/test';
import common from '../../test-data/common.json';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';

const url = common.url;
const basePage = new BasePage();
const homePage = new HomePage();

test.beforeEach(async ({ page }) => {
    console.log("This is before each hook");
    await basePage.goto(page, url);
});

test("Verify header and banner image is visible", async ({ page }) => {
        console.log("This is first test case");
        await homePage.verifyHeaderImage(page);
        await homePage.verifyBannerImage(page);
    });

test("Verify category cards", async ({ page }) => {
    console.log("This is second test case");
    await homePage.verifyCategoryCardsCount(page);
    await homePage.verifyCategoryCardsVisibility(page, 1, "Elements");
    await homePage.verifyCategoryCardsVisibility(page, 4, "Widgets");
});


// test.describe("Verify all main categories are visible", () => {
    
// });