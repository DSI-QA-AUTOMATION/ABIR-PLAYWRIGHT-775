import { test } from "@playwright/test";
import BasePage from "../../pages/base/BasePage";
import HomePage from "../../pages/HomePage";
import ButtonsPage from "../../pages/ButtonsPage";
import common from "../../test-data/common.json";

const url = common.url;
const clickMessages = common.clickMessages;
const basePage = new BasePage();
const homePage = new HomePage();
const buttonsPage = new ButtonsPage();

test("Testing button interactions", async ({ page }) => {
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 5);
    await basePage.verifyPageHeader(page, "Buttons");

    await buttonsPage.clickDoubleClickBtn(page);
    await buttonsPage.verifyDoubleClickMessage(page, clickMessages.dbClickMsg);

    await buttonsPage.clickRightClickBtn(page);
    await buttonsPage.verifyRightClickMessage(page, clickMessages.rightClickMsg);

    await buttonsPage.clickDynamicClickBtn(page);
    await buttonsPage.verifyDynamicClickMessage(page, clickMessages.dynamicClickMsg);
});