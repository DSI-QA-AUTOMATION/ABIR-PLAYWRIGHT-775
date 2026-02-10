import { test, expect } from '@playwright/test';

test("Testing datepicker", async ({ page }) => {
    await page.goto("https://demoqa.com/");
    // Navigate to Datepicker section
    await page.locator("svg").first().click();
    await page.getByText("Widgets").click();
    await page.getByRole("listitem").getByText("Date Picker").click();
    await expect(page.locator("h1")).toContainText("Date Picker");

    // Interact with the date picker
    const dateValue = "05/15/2023";
    const dateInput = page.locator("#datePickerMonthYearInput");
    await dateInput.click();
    await dateInput.fill(dateValue);
    await dateInput.press("Enter");
    expect(await dateInput.inputValue()).toBe(dateValue);

    // Interact with the date and time picker
    const dateTimeValue = "June 20, 2024 10:30 AM";
    const dateTimeInput = page.locator("#dateAndTimePickerInput");
    await dateTimeInput.click();
    await dateTimeInput.fill(dateTimeValue);
    await dateTimeInput.press("Enter");
    expect(await dateTimeInput.inputValue()).toBe(dateTimeValue);

    // Insert date using the picker UI
    const year = "2024";
    const month = "March";
    const day = "8";
    await dateInput.click();
    await page.locator(".react-datepicker__year-select").selectOption(year);
    await page.locator(".react-datepicker__month-select").selectOption(month);
    // await page.locator(`div[class*='react-datepicker__day--0${day}']`).click();
    await page.getByRole("option", { name: `Choose Friday, ${month} ${day}th, ${year}` }).click();

    expect(await dateInput.inputValue()).toBe("03/08/2024");

    await page.close();
});