import { test, expect } from '@playwright/test';

test("Testing webtables", async ({ page }) => {
    await page.goto("https://demoqa.com/");

    // Navigate to Webtables section
    await page.locator("svg").first().click();
    await page.getByText("Elements").click();
    await page.getByRole("listitem").getByText("Web Tables").click();
    await expect(page.locator("h1")).toContainText("Web Tables");

    // Add a new record
    const firstName = "John";
    const lastName = "Doe";
    const email = "john@doe.com";
    const age = "30";
    const salary = "50000";
    const department = "Engineering";
    await page.locator("#addNewRecordButton").click();
    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.getByPlaceholder("name@example.com").fill(email);
    await page.getByPlaceholder("Age").fill(age);
    await page.getByPlaceholder("Salary").fill(salary);
    await page.getByPlaceholder("Department").fill(department);
    await page.getByRole("button", { name: "Submit" }).click();

    // Verify the new record is added
    const table = page.locator(".rt-table");
    const tableContent = await table.textContent();
    expect(tableContent).toContain("John");
    expect(tableContent).toContain("Doe");
    expect(tableContent).toContain("john@doe.com");

    // Column and Row Count Verification
    const columns = await page.locator("div[role='columnheader']").count();
    expect(columns).toBe(7);

    // Edit the newly added record
    const newlyAddedSalary = page.locator(`//div[@class='rt-table']//div[text()='${firstName}']//following-sibling::div[4]`);
    expect(await newlyAddedSalary.textContent()).toBe(salary);
    const editRowButton = page.locator(`//div[@class='rt-table']//div[text()='${firstName}']//following-sibling::div//span[@title='Edit']`);
    await editRowButton.click();

    const newSalary = "60000";
    await page.getByPlaceholder("Salary").fill(newSalary);
    await page.getByRole("button", { name: "Submit" }).click();
    expect(await newlyAddedSalary.textContent()).toBe(newSalary);

    // Delete the newly added record
    const deleteRowButton = page.locator(`//div[@class='rt-table']//div[text()='${firstName}']//following-sibling::div//span[@title='Delete']`);
    await deleteRowButton.click();

    expect(await table.textContent()).not.toContain(firstName);

    await page.close();
});