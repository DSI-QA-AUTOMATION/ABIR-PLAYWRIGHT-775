import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import WidgetsPage from '../../pages/WidgetsPage';
import common from '../../test-data/common.json';

test("Testing mouse hover actions using POM", async ({ page }) => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const widgetsPage = new WidgetsPage();
    
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 4);
    await basePage.clickOnWidgetsMenuItem(page, 7);
    await basePage.verifyPageHeader(page, "Tool Tips");

    const toolTipMessage = common.toolTipMessage;
    const toolTip = await widgetsPage.getTooltipElement(page);

    await widgetsPage.hoverOverButton(page);
    await widgetsPage.waitForTooltipVisibility(toolTip);
    await widgetsPage.verifyTooltipIsVisible(toolTip);
    await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.button);

    await widgetsPage.hoverOverInput(page);
    await widgetsPage.waitForTooltipVisibility(toolTip);
    await widgetsPage.verifyTooltipIsVisible(toolTip);
    await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.input);

    await widgetsPage.hoverOverLink(page);
    await widgetsPage.waitForTooltipVisibility(toolTip);
    await widgetsPage.verifyTooltipIsVisible(toolTip);
    await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.link);

    page.close();
});