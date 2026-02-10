import { expect } from "@playwright/test";

class UploadAndDownloadPage {
    // Locators
    uploadFileInput = "#uploadFile";
    uploadedFilePathDisplay = "#uploadedFilePath";

    // Methods
    async uploadFile(page, filePath) {
        await page.locator(this.uploadFileInput).setInputFiles(filePath);
    }

    async verifyUploadedFile(page, expectedFileName) {
        await expect(page.locator(this.uploadedFilePathDisplay)).toContainText(expectedFileName);
    }
}

export default UploadAndDownloadPage;