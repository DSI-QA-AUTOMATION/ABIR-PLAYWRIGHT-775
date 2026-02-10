import { test } from '@playwright/test';
import common from '../../test-data/common.json';
import userInfo from '../../test-data/userInfo.json';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import TextBoxPage from '../../pages/TextBoxPage';

// test.beforeEach(async ({ page }) => {
//     console.log("This is before each hook");
    
// });

test("Fill Text Box form and verify submitted data", async ({ page }) => {
    const url = common.url;
    const textBoxPage = new TextBoxPage();
    const basePage = new BasePage();
    const homePage = new HomePage();

    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 1);
    await basePage.clickOnElementsMenuItem(page, 1);
    await basePage.verifyPageHeader(page, "Text Box");

    const fullName = userInfo.textBoxUser.fullName;
    const email = userInfo.textBoxUser.email;
    const currentAddress = userInfo.textBoxUser.currentAddress;
    const permanentAddress = userInfo.textBoxUser.permanentAddress;

    await textBoxPage.fillTextBoxForm(page, fullName, email, currentAddress, permanentAddress);
    await textBoxPage.submitForm(page);
    await textBoxPage.verifySubmittedData(page, fullName, email, currentAddress, permanentAddress);
});
