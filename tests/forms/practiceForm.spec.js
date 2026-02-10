import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import PracticeFormPage from '../../pages/PracticeFormPage';
import common from '../../test-data/common.json';
import userInfo from '../../test-data/userInfo.json';

test('Testing inbox fields, radio buttons, checkboxes and dropdowns on Practice Form', async ({ page }) => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const practiceFormPage = new PracticeFormPage();
    const url = common.url;
    const studentInfo = userInfo.practiceFormUser;

    await basePage.goto(page, url);
    await homePage.clickOnCategoryCard(page, 2);
    await basePage.clickOnFormsMenuItem(page, 1);
    await basePage.verifyPageHeader(page, 'Practice Form');

    await practiceFormPage.fillFirstName(page, studentInfo.firstName);
    await practiceFormPage.fillLastName(page, studentInfo.lastName);
    await practiceFormPage.fillEmail(page, studentInfo.email);
    await practiceFormPage.fillMobileNumber(page, studentInfo.mobile);
    await practiceFormPage.selectRadioButton(page, studentInfo.gender);
    await practiceFormPage.selectHobbiesCheckbox(page, studentInfo.hobbies);
    await practiceFormPage.fillSubjects(page, studentInfo.subjects);
    await practiceFormPage.selectState(page, studentInfo.state);
    await practiceFormPage.selectCity(page, studentInfo.city);
    await practiceFormPage.clickSubmitButton(page);

    await practiceFormPage.verifySubmissionModalIsVisible(page);
    await practiceFormPage.verifyFormSubmission(page, `${studentInfo.firstName} ${studentInfo.lastName}`);
    await practiceFormPage.closeSubmissionModal(page);
    await page.close();
});