import { expect } from '@playwright/test';

class DatePickerPage {
    // Locators
    datePickerInput = "#datePickerMonthYearInput";
    dateTimePickerInput = "#dateAndTimePickerInput";
    yearInput = ".react-datepicker__year-select";
    monthInput = ".react-datepicker__month-select";

    // Roles
    dayOptionRole = "option";

    // Helper
    getDayOptionLocator(day) {
        return `div[class*='react-datepicker__day--0${day}']`;
    }

    // Methods
    async selectDate(page, dateValue) {
        await page.locator(this.datePickerInput).click();
        await page.locator(this.datePickerInput).fill(dateValue);
        await page.locator(this.datePickerInput).press("Enter");
    }

    async selectDateTime(page, dateTimeValue) {
        await page.locator(this.dateTimePickerInput).click();
        await page.locator(this.dateTimePickerInput).fill(dateTimeValue);
        await page.locator(this.dateTimePickerInput).press("Enter");
    }

    async selectDateUsingPickerUI(page, year, month, day) {
        await page.locator(this.datePickerInput).click();
        await page.locator(this.yearInput).selectOption(year);
        await page.locator(this.monthInput).selectOption(month);
        await page.locator(this.getDayOptionLocator(day)).click();
    }

    async verifyDate(page, expectedDate, type) {
        let loc;
        if (type === "Date"){
            loc = this.datePickerInput;
        } else{
            loc = this.dateTimePickerInput;
        }
        expect(await page.locator(loc).inputValue()).toBe(expectedDate);
    }
}

export default DatePickerPage;