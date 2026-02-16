import { test } from '@playwright/test';
import BasePage from '../../pages/base/BasePage';
import HomePage from '../../pages/HomePage';
import common from '../../test-data/common.json';
import userInfo from '../../test-data/userInfo.json';
import TextBoxPage from '../../pages/TextBoxPage';
import CheckBoxPage from '../../pages/CheckBoxPage';
import RadioButtonPage from '../../pages/RadioButtonPage';
import WebTablesPage from '../../pages/WebTablesPage';
import ButtonsPage from '../../pages/ButtonsPage';
import LinksPage from '../../pages/LinksPage';
import UploadAndDownloadPage from '../../pages/UploadAndDownloadPage';
import PracticeFormPage from '../../pages/PracticeFormPage';
import AlertPage from '../../pages/AlertPage';
import FramesPage from '../../pages/FramesPage';
import DatePickerPage from '../../pages/DatePickerPage';
import WidgetsPage from '../../pages/WidgetsPage';
import DragAndDropPage from '../../pages/DragAndDropPage';

test.describe('DemoQA E2E Tests', () => {
    const basePage = new BasePage();
    const homePage = new HomePage();
    const url = common.url;

    test.beforeEach(async ({ page }) => {
        await basePage.goto(page, url);
    });

    test.describe('Verify Elements Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 1);
        });

        test('Verify Text Box Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 1);
            await basePage.verifyPageHeader(page, "Text Box");

            const textBoxPage = new TextBoxPage();
            const fullName = userInfo.textBoxUser.fullName;
            const email = userInfo.textBoxUser.email;
            const currentAddress = userInfo.textBoxUser.currentAddress;
            const permanentAddress = userInfo.textBoxUser.permanentAddress;

            await textBoxPage.fillTextBoxForm(page, fullName, email, currentAddress, permanentAddress);
            await textBoxPage.submitForm(page);
            await textBoxPage.verifySubmittedData(page, fullName, email, currentAddress, permanentAddress);
        });

        test('Verify Check Box Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 2);
            await basePage.verifyPageHeader(page, "Check Box");

            const checkBoxPage = new CheckBoxPage();

            await checkBoxPage.expandFolder(page, "Home");
            await checkBoxPage.expandFolder(page, "Desktop");
            await checkBoxPage.checkFolderOrFile(page, "Notes");
            await checkBoxPage.verifyResultContains(page, "notes");

            await checkBoxPage.expandFolder(page, "Documents");
            await checkBoxPage.expandFolder(page, "Office");
            await checkBoxPage.checkFolderOrFile(page, "Public");
            await checkBoxPage.verifyResultContains(page, "public");
        });

        test('Verify Radio Button Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Radio Button");

            const radioButtonPage = new RadioButtonPage();
            await radioButtonPage.selectYesRadioButton(page);
            await radioButtonPage.verifySelectedRadioButtonResult(page, "Yes");
            await radioButtonPage.selectImpressiveRadioButton(page);
            await radioButtonPage.verifySelectedRadioButtonResult(page, "Impressive");
        });

        test('Verify Web Tables Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 4);
            await basePage.verifyPageHeader(page, "Web Tables");

            const webTablesPage = new WebTablesPage();
            const userData = userInfo.webTableUser;

            // Add new record
            await webTablesPage.clickAddNewRecordButton(page);
            await webTablesPage.fillNewRecordForm(page, userData);
            await webTablesPage.submitForm(page);
            await webTablesPage.verifyRecordInTable(page, userData);

            // Edit existing record
            const newSalary = "75000";
            await webTablesPage.clickEditButton(page, userData.firstName);
            await webTablesPage.editAnItem(page, webTablesPage.salaryPH, newSalary);
            await webTablesPage.verifyEditedItem(page, userData.firstName, newSalary);

            // Delete record
            await webTablesPage.deleteRecord(page, userData.firstName);
        });

        test('Verify Buttons Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 5);
            await basePage.verifyPageHeader(page, "Buttons");

            const buttonsPage = new ButtonsPage();
            const clickMessages = common.clickMessages;
            await buttonsPage.clickDoubleClickBtn(page);
            await buttonsPage.verifyDoubleClickMessage(page, clickMessages.dbClickMsg);
            await buttonsPage.clickRightClickBtn(page);
            await buttonsPage.verifyRightClickMessage(page, clickMessages.rightClickMsg);
            await buttonsPage.clickDynamicClickBtn(page);
            await buttonsPage.verifyDynamicClickMessage(page, clickMessages.dynamicClickMsg);
        });

        test('Verify Links Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 6);
            await basePage.verifyPageHeader(page, "Links");

            const linksPage = new LinksPage();
            const homeLinkTab = await linksPage.clickHomeLink(page);
            await linksPage.verifyHomeLinkTabURL(homeLinkTab, url);
        });

        test('Verify Upload and Download Menu', async ({ page }) => {
            await basePage.clickOnElementsMenuItem(page, 8);
            await basePage.verifyPageHeader(page, "Upload and Download");

            const uploadAndDownloadPage = new UploadAndDownloadPage();
            const uploadedFilePath = common.resources.fileToUpload;
            const uploadedFileName = common.resources.fileName;
            await uploadAndDownloadPage.uploadFile(page, uploadedFilePath);
            await uploadAndDownloadPage.verifyUploadedFile(page, uploadedFileName);
        });

    });

    test.describe('Verify Forms Menu Items', async () => {
        
        test('Verify Practice Form Menu', async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 2);
            await basePage.clickOnFormsMenuItem(page, 1);
            await basePage.verifyPageHeader(page, "Practice Form");

            const practiceFormPage = new PracticeFormPage();
            const studentInfo = userInfo.practiceFormUser;

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
        });

    });

    test.describe('Verify Alerts Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 3);
        });

        test.describe('Verify Alerts Menu', async () => {
            const alertPage = new AlertPage();

            test.beforeEach(async ({ page }) => {
                await basePage.clickOnAlertsMenuItem(page, 2);
                await basePage.verifyPageHeader(page, "Alerts");
            });

            test('Verify Confirm Alerts', async ({ page }) => {
                await alertPage.triggerConfirmAlert(page);
                await alertPage.verifyConfirmResult(page);
            });

            test('Verify Confirm Alert', async ({ page }) => {
                const promptInput = common.promptMessage;
                await alertPage.triggerPromptAlert(page, promptInput);
                await alertPage.verifyPromptResult(page, promptInput);
            });
 
        });

        test('Verify Frame Menu', async ({ page }) => {
            await basePage.clickOnAlertsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Frames");

            const framesPage = new FramesPage();
            const iFrameMsg = common.frameMessage;

            const iFrame = await framesPage.getFrame(page);
            await framesPage.verifyFrameText(iFrame, iFrameMsg);
        });

    });

    test.describe('Verify Widgets Menu Items', async () => {

        test.beforeEach(async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 4);
        });

        test('Verify Date Picker Menu', async ({ page }) => {
            await basePage.clickOnWidgetsMenuItem(page, 3);
            await basePage.verifyPageHeader(page, "Date Picker");

            const datePickerPage = new DatePickerPage();
            const datePickerInputValue = common.datePickerInput;

            // With direct input
            await datePickerPage.selectDate(page, datePickerInputValue.date);
            await datePickerPage.verifyDate(page, datePickerInputValue.date, "Date");
            await datePickerPage.selectDateTime(page, datePickerInputValue.dateTime);
            await datePickerPage.verifyDate(page, datePickerInputValue.dateTime, "DateTime");

            // With Picker UI
            await datePickerPage.selectDateUsingPickerUI(page, datePickerInputValue.year, datePickerInputValue.month, datePickerInputValue.day);
            await datePickerPage.verifyDate(page, datePickerInputValue.expectedDate, "Date");
        });

        test('Verify Tool Tips Menu', async ({ page }) => {
            await basePage.clickOnWidgetsMenuItem(page, 7);
            await basePage.verifyPageHeader(page, "Tool Tips");

            const widgetsPage = new WidgetsPage();
            const toolTipMessage = common.toolTipMessage;

            const toolTip = await widgetsPage.getTooltipElement(page);
            await widgetsPage.hoverOverButton(page);
            await widgetsPage.verifyTooltipIsVisible(toolTip);
            await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.button);
            await widgetsPage.moveMouse(page, 0, 0);

            await widgetsPage.waitForTooltipToDisappear(toolTip);
            await widgetsPage.hoverOverInput(page);
            await widgetsPage.verifyTooltipIsVisible(toolTip);
            await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.input);
            await widgetsPage.moveMouse(page, 0, 0);

            await widgetsPage.waitForTooltipToDisappear(toolTip);
            await widgetsPage.hoverOverLink(page);
            await widgetsPage.verifyTooltipIsVisible(toolTip);
            await widgetsPage.verifyTooltipText(toolTip, toolTipMessage.link);
        });

    }); 

    test.describe('Verify Interactions Menu Items', async () => {

        test('Verify Drag and Drop Menu', async ({ page }) => {
            await homePage.clickOnCategoryCard(page, 5);
            await basePage.clickOnInteractionsMenuItem(page, 4);
            await basePage.verifyPageHeader(page, "Droppable");

            const dragAndDropPage = new DragAndDropPage();
            const dropBoxText = common.dropBoxText;

            await dragAndDropPage.performDragAndDrop(page);
            await dragAndDropPage.verifyDragAndDrop(page, dropBoxText);
        });

    });
});