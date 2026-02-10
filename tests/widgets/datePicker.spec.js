import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import DatePickerPage from '../../pages/DatePickerPage';
import common from '../../test-data/common.json';

const basePage = new BasePage();
const homePage = new HomePage();
const datePickerPage = new DatePickerPage();
const datePickerInputValue = common.datePickerInput;

test.beforeEach(async ({ page }) => {
    const url = common.url;
    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 4);
    await basePage.clickOnWidgetsMenuItem(page, 3);
    await basePage.verifyPageHeader(page, "Date Picker");
});

test("Testing datepicker", async ({ page }) => {
    await datePickerPage.selectDate(page, datePickerInputValue.date);
    await datePickerPage.verifyDate(page, datePickerInputValue.date, "Date");

    await datePickerPage.selectDateTime(page, datePickerInputValue.dateTime);
    await datePickerPage.verifyDate(page, datePickerInputValue.dateTime, "DateTime");
});

test("Testing datepicker using picker UI", async ({ page }) => {
    await datePickerPage.selectDateUsingPickerUI(page, datePickerInputValue.year, datePickerInputValue.month, datePickerInputValue.day);
    await datePickerPage.verifyDate(page, datePickerInputValue.expectedDate, "Date");
});
