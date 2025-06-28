import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
    readonly title: Locator;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.completeHeader = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async verifyOrderComplete() {
        await expect(this.page).toHaveURL('/checkout-complete.html');
        await expect(this.title).toHaveText('Checkout: Complete!');
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    async backToHome() {
        await this.backHomeButton.click();
    }
}