import { test } from "@playwright/test";
import BasePage from "../../pages/base/BasePage";
import HomePage from "../../pages/HomePage";
import UploadAndDownloadPage from "../../pages/UploadAndDownloadPage";
import common from "../../test-data/common.json";

test("Testing Upload and Download section", async ({ page }) => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const uploadAndDownloadPage = new UploadAndDownloadPage();
    const url = common.url;

    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 8);
    await basePage.verifyPageHeader(page, "Upload and Download");

    const uploadedFilePath = common.resources.fileToUpload;
    const uploadedFileName = common.resources.fileName;

    await uploadAndDownloadPage.uploadFile(page, uploadedFilePath);
    await uploadAndDownloadPage.verifyUploadedFile(page, uploadedFileName);
});