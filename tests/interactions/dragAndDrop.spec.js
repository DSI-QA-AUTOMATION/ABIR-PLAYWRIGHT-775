import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import DragAndDropPage from '../../pages/DragAndDropPage';
import common from '../../test-data/common.json';

test("Testing drag and drop functionality", async ({ page }) => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const dragAndDropPage = new DragAndDropPage();

    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 5);
    await basePage.clickOnInteractionsMenuItem(page, 4);
    await basePage.verifyPageHeader(page, "Droppable");

    await dragAndDropPage.performDragAndDrop(page);
    await dragAndDropPage.verifyDragAndDrop(page, common.dropBoxText);
    await page.close();
});