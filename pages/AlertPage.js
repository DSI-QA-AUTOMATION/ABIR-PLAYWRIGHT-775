import { expect } from '@playwright/test';

class AlertPage {
    // Locators
    // alertButton = "#alertButton";
    // timerAlertButton = "#timerAlertButton";
    confirmButton = "#confirmButton";
    confirmResultText = "#confirmResult";
    promptButton = "#promtButton";
    promptResultText = "#promptResult";

    // Methods
    // async triggerAlert(page) {
    //     page.on('dialog', async dialog => {
    //         expect(dialog.type()).toBe('alert');
    //         expect(dialog.message()).toBe('You clicked a button');
    //         await dialog.accept();
    //     });
    //     await page.locator(this.alertButton).click();
    // }

    // async triggerTimerAlert(page) {
    //     page.on('dialog', async dialog => {
    //         expect(dialog.type()).toBe('alert');
    //         expect(dialog.message()).toBe('This alert appeared after 5 seconds');
    //         await dialog.accept();
    //     });
    //     await page.locator(this.timerAlertButton).click();
    // }

    async triggerConfirmAlert(page) {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toContain('Do you confirm action?');
            await dialog.dismiss();
        });
        await page.locator(this.confirmButton).click();
    }

    async verifyConfirmResult(page) {
        const confirmResult = await page.locator(this.confirmResultText).textContent();
        expect(confirmResult).toContain('Cancel');
    }

    async triggerPromptAlert(page, promptInput) {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toContain('Please enter your name');
            await dialog.accept(promptInput);
        });
        await page.locator(this.promptButton).click();
    }

    async verifyPromptResult(page, promptInput) {
        const promptResult = await page.locator(this.promptResultText).textContent();
        expect(promptResult).toContain(promptInput);
    }
}

export default AlertPage;