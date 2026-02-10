import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import common from '../../test-data/common.json';

test.describe('DemoQA E2E Tests', () => {
    const basePage = new BasePage();
    const homePage = new HomePage();

    test.beforeEach(async ({ page }) => {
        const url = common.url;
        await basePage.goto(page, url);
    });

    test.describe('Verify Elements Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 1);
        });

        test('Verify Text Box Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 1);
            await basePage.verifyPageHeader(page, "Text Box");
        });

        test('Verify Check Box Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 2);
            await basePage.verifyPageHeader(page, "Check Box");
        });

        test('Verify Radio Button Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Radio Button");
        });

        test('Verify Web Tables Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 4);
            await basePage.verifyPageHeader(page, "Web Tables");
        });

        test('Verify Buttons Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 5);
            await basePage.verifyPageHeader(page, "Buttons");
        });

        test('Verify Links Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 6);
            await basePage.verifyPageHeader(page, "Links");
        });

        test('Verify Upload and Download Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 8);
            await basePage.verifyPageHeader(page, "Upload and Download");
        });

    });

    test.describe('Verify Forms Menu Items', async () => {
        
        test('Verify Practice Form Menu', async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 2);
            await basePage.clickOnFormsMenuItem(page, 1);
            await basePage.verifyPageHeader(page, "Practice Form");
        });

    });

    test.describe('Verify Alerts Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 3);
        });

        test('Verify Alerts Menu', async ({ page }) => {
            await basePage.clickOnAlertsMenuItem(page, 2);
            await basePage.verifyPageHeader(page, "Alerts");
        });

        test('Verify Frame Menu', async ({ page }) => {
            await basePage.clickOnAlertsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Frames");
        });

    });

    test.describe('Verify Widgets Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 4);
        });

        test('Verify Date Picker Menu', async ({ page }) => {
            await basePage.clickOnWidgetsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Date Picker");
        });

        test('Verify Tool Tips Menu', async ({ page }) => {
            await basePage.clickOnWidgetsMenuItem(page, 7);
            await basePage.verifyPageHeader(page, "Tool Tips");
        });

    }); 

    test.describe('Verify Interactions Menu Items', async () => {

        test('Verify Drag and Drop Menu', async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 5);
            await basePage.clickOnInteractionsMenuItem(page, 4);
            await basePage.verifyPageHeader(page, "Droppable");
        });

    });
});