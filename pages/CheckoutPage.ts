import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly title: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly itemTotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.locator('.title');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
    }

    async verifyCheckoutStepOne() {
        await expect(this.page).toHaveURL('/checkout-step-one.html');
        await expect(this.title).toHaveText('Checkout: Your Information');
    }

    async fillShippingInformation(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async verifyCheckoutStepTwo() {
        await expect(this.page).toHaveURL('/checkout-step-two.html');
        await expect(this.title).toHaveText('Checkout: Overview');
    }

    async verifyPricingTotals() {
        // Verify that all pricing elements are visible and contain expected format
        await expect(this.itemTotal).toBeVisible();
        await expect(this.tax).toBeVisible();
        await expect(this.total).toBeVisible();

        // Extract and verify pricing calculation
        const itemTotalText = await this.itemTotal.textContent();
        const taxText = await this.tax.textContent();
        const totalText = await this.total.textContent();

        const itemAmount = parseFloat(itemTotalText?.replace('Item total: $', '') || '0');
        const taxAmount = parseFloat(taxText?.replace('Tax: $', '') || '0');
        const totalAmount = parseFloat(totalText?.replace('Total: $', '') || '0');

        // Verify that total = item total + tax (with small tolerance for floating point)
        expect(Math.abs(totalAmount - (itemAmount + taxAmount))).toBeLessThan(0.01);
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}