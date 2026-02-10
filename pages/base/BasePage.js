import { expect } from '@playwright/test';

class BasePage {

    // Locators
    headerSelector = "h1";

    // Helper
    getElementsMenuLocatorByIndex(index) {
        return `.element-group:nth-child(1) li[id='item-${index}']`;
    }

    getFormsMenuLocatorByIndex(index) {
        return `.element-group:nth-child(2) li[id='item-${index}']`;
    }

    getAlertsMenuLocatorByIndex(index) {
        return `.element-group:nth-child(3) li[id='item-${index}']`;
    }

    getWidgetsMenuLocatorByIndex(index) {
        return `.element-group:nth-child(4) li[id='item-${index}']`;
    }

    getInteractionsMenuLocatorByIndex(index) {
        return `.element-group:nth-child(5) li[id='item-${index}']`;
    }

    // Methods
    async goto(page, url) {
        await page.goto(`${url}`);
    }

    async clickOnElementsMenuItem(page, index) {
        await page.locator(this.getElementsMenuLocatorByIndex(index-1)).click();
    }

    async clickOnFormsMenuItem(page, index) {
        await page.locator(this.getFormsMenuLocatorByIndex(index-1)).click();
    }

    async clickOnAlertsMenuItem(page, index) {
        await page.locator(this.getAlertsMenuLocatorByIndex(index-1)).click();
    }

    async clickOnWidgetsMenuItem(page, index) {
        await page.locator(this.getWidgetsMenuLocatorByIndex(index-1)).click();
    }

    async clickOnInteractionsMenuItem(page, index) {
        await page.locator(this.getInteractionsMenuLocatorByIndex(index-1)).click();
    }

    async verifyPageHeader(page, expectedHeaderText) {
        await expect(page.locator(this.headerSelector)).toContainText(expectedHeaderText);
    }
}

export default BasePage;