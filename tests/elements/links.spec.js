import { test } from "@playwright/test";
import BasePage from "../../pages/base/BasePage";
import HomePage from "../../pages/HomePage";
import LinksPage from "../../pages/LinksPage";
import common from "../../test-data/common.json";

test("Testing Links section", async ({ page }) => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const linksPage = new LinksPage();
    const url = common.url;

    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 6);
    await basePage.verifyPageHeader(page, "Links");

    // Test Home Link

    const homeLinkTab = await linksPage.clickHomeLink(page);
    await linksPage.verifyHomeLinkTabURL(homeLinkTab, url);
});

