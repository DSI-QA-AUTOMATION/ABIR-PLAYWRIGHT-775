import { expect } from '@playwright/test';

class FramesPage {
    // Locators
    frame1Locator = "#frame1";
    sampleHeadingLocator = "#sampleHeading";

    // Methods
    async getFrame(page) {
        const frame1 = page.frameLocator(this.frame1Locator);
        return frame1;
    }

    async verifyFrameText(frame, expectedText) {
        const frameText = await frame.locator(this.sampleHeadingLocator).textContent();
        expect(frameText).toBe(expectedText);
    }
}

export default FramesPage;