import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import FramesPage from '../../pages/FramesPage';
import common from '../../test-data/common.json';

const basePage = new BasePage();
const homePage = new HomePage();
const framesPage = new FramesPage();

test('Testing frames', async ({ page }) => {
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 3);
    await basePage.clickOnAlertsMenuItem(page, 3);
    await basePage.verifyPageHeader(page, 'Frames');

    const iFrameMsg = common.frameMessage;
    const iFrame = await framesPage.getFrame(page);
    await framesPage.verifyFrameText(iFrame, iFrameMsg);

    await page.close();
});