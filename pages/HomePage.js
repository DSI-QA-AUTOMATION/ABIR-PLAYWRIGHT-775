import { expect } from '@playwright/test';

class HomePage {

    // constructor(page) {
    //     this.page = page;
    //     this.headerImg = "header a img";
    // }

    // Selectors
    headerImg = "header a img";
    bannerImg = ".banner-image";
    categoryCards = ".category-cards > div";

    // Methods
    async verifyHeaderImage(page) {
        await page.locator(this.headerImg).isVisible();
    }

    async verifyBannerImage(page) {
        await page.locator(this.bannerImg).isVisible();
    }

    async verifyCategoryCardsCount(page) {
        await expect(page.locator(this.categoryCards)).toHaveCount(6);
    }

    async verifyCategoryCardsVisibility(page, elementNo, categoryName) {
        await expect(page.locator(this.categoryCards).nth(elementNo - 1)).toContainText(categoryName);
    }

    async clickOnCategoryCard(page, elementNo) {
        await page.locator(this.categoryCards).nth(elementNo - 1).click();
    }

}

export default HomePage;