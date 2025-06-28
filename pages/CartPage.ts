import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly title: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async verifyCartPage() {
        await expect(this.page).toHaveURL('/cart.html');
        await expect(this.title).toHaveText('Your Cart');
    }

    async verifyProductInCart(productName: string) {
        const cartItem = this.cartItems.filter({ hasText: productName });
        await expect(cartItem).toBeVisible();
    }

    async verifyCartItemCount(expectedCount: number) {
        if (expectedCount === 0) {
            const emptyCartMessage = this.page.locator('.cart_item').first();
            await expect(emptyCartMessage).not.toBeVisible();
        } else {
            await expect(this.cartItems).toHaveCount(expectedCount);
        }
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}