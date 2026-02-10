import { expect } from '@playwright/test';

class DragAndDropPage {
    // Locators
    sourceBox = "#draggable";
    targetBox = "#droppable";
    targetBoxText = "p";

    // Methods
    async performDragAndDrop(page) {
        await page.locator(this.sourceBox).dragTo(page.locator(this.targetBox).first());
    }

    async verifyDragAndDrop(page, dropBoxText) {
        await expect(page.locator(this.targetBox).first().locator(this.targetBoxText)).toHaveText(dropBoxText);
    }
}

export default DragAndDropPage;