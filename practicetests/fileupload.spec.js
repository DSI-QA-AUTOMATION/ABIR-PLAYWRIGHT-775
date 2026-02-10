import {test, expect} from '@playwright/test';

test("Testing file uploads", async ({page}) => {
    await page.goto("https://demoqa.com/");

    // Navigate to Upload and Download section
    await page.locator("svg").first().click();
    await page.getByText("Elements").click();
    await page.getByRole("listitem").getByText("Upload and Download").click();
    await expect(page.locator("h1")).toContainText("Upload and Download");

    const uploadInput = page.locator("#uploadFile");
    const uploadedFilePath = "resources/sampleFile.txt";
    const uploadedFileName = "sampleFile.txt";
    const uploadedFilePathDisplay = page.locator("#uploadedFilePath");

    // Upload the file
    await uploadInput.setInputFiles(uploadedFilePath);

    // for multiple files upload
    // await uploadInput.setInputFiles(['path/to/firstFile.txt', 'path/to/secondFile.txt']);

    // for removing uploaded files
    // await uploadInput.setInputFiles([]);

    // Verify the uploaded file
    expect(await uploadedFilePathDisplay.textContent()).toContain(uploadedFileName);
    await page.close();
});