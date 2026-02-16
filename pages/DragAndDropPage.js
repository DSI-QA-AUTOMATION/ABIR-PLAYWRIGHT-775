import { expect } from '@playwright/test';

class DragAndDropPage {
    // Locators
    sourceBox = "#draggable";
    targetBox = "#droppable";
    targetBoxText = "p";

    // Methods
    async performDragAndDrop(page) {
        const sourceBox = page.locator(this.sourceBox);
        const targetBox = page.locator(this.targetBox).first();
        const tries = 3;
        // await sourceBox.dragTo(targetBox);

        for (let i = 0; i < tries; i++) {
            try {
                // const s = await sourceBox.boundingBox();
                // const t = await targetBox.boundingBox();

                // if (!s || !t) {
                //     throw new Error("Could not retrieve bounding boxes for source or target elements.");
                // }
                
                // await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2);
                // await page.mouse.down();
                // await page.waitForTimeout(200);
                // await page.mouse.move(t.x + t.width / 2, t.y + t.height / 2, { steps: 20 });
                // await page.mouse.up();
                await sourceBox.dragTo(targetBox);

                await expect(page.locator(this.targetBox).first().locator(this.targetBoxText)).toHaveText("Dropped!");
                return;
            } catch (error) {
                if (i === tries - 1) {
                    console.error(`Attempt ${i + 1} failed: ${error.message}`);
                    throw error;
                }
                await page.waitForTimeout(500);
            }
        }
    }

    async verifyDragAndDrop(page, dropBoxText) {
        await expect(page.locator(this.targetBox).first().locator(this.targetBoxText)).toHaveText(dropBoxText);
    }
}

export default DragAndDropPage;