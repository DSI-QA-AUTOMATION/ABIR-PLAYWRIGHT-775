import { expect } from '@playwright/test';

class WidgetsPage {
    // Locators
    hoverMeBtn = "#toolTipButton";
    hoverMeInput = "#toolTipTextField";
    hoverMeLink = "#texToolTopContainer a:nth-child(1)";

    // Roles 
    tooltipRole = "tooltip";

    // Methods
    async hoverOverButton(page) {
        await page.hover(this.hoverMeBtn);
    }

    async hoverOverInput(page) {
        await page.hover(this.hoverMeInput);
    }

    async hoverOverLink(page) {
        await page.hover(this.hoverMeLink);
    }

    async getTooltipElement(page) {
        return page.getByRole(this.tooltipRole);
    }

    async waitForTooltipVisibility(tooltip) {
        await tooltip.waitFor({ state: 'visible' });
        await tooltip.page().waitForTimeout(2000);
    }

    async verifyTooltipIsVisible(tooltip) {
        await expect(tooltip).toBeVisible();
    }

    async verifyTooltipText(tooltip, expectedText) {
        expect(await tooltip.textContent()).toBe(expectedText);
    }

}

export default WidgetsPage;