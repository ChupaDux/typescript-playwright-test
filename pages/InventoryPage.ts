import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly cartIcon: Locator;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.inventoryItems = page.locator('.inventory_item');
    }

    async verifyInventoryPage() {
        await expect(this.page).toHaveURL('/inventory.html');
        await expect(this.title).toHaveText('Products');
    }

    async addProductToCart(productName: string) {
        const productItem = this.inventoryItems.filter({ hasText: productName });
        const addButton = this.page.locator(
            `xpath=//div[@class='inventory_item'][.//div[text()='${productName}']]//button[contains(@class,'btn_inventory')]`
        )
        await addButton.click();
    }

    async getCartItemCount(): Promise<string | null> {
        if (await this.cartBadge.isVisible()) {
            return await this.cartBadge.textContent();
        }
        return null;
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async verifyCartItemCount(expectedCount: number) {
        if (expectedCount === 0) {
            await expect(this.cartBadge).not.toBeVisible();
        } else {
            await expect(this.cartBadge).toBeVisible();
            await expect(this.cartBadge).toHaveText(expectedCount.toString());
        }
    }
}
