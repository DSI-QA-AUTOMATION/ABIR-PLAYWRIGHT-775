import { expect } from "@playwright/test";

class LinksPage {
    // Locators
    homeLink = "#simpleLink";

    // Methods
    async clickHomeLink(page) {
        const [newPage] = await Promise.all([
            page.waitForEvent("popup"),
            page.locator(this.homeLink).click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async verifyHomeLinkTabURL(page, expectedURL) {
        await expect(page).toHaveURL(expectedURL);
    }
}

export default LinksPage;