import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { TestConfig } from '../config/TestConfig';

// Load test data from environment variables
const TEST_CREDENTIALS = TestConfig.getCredentials();
const CHECKOUT_INFO = TestConfig.getCheckoutInfo();
const TEST_PRODUCTS = TestConfig.getTestProducts();


test.describe('SauceDemo E-Commerce Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);

        await loginPage.goto();
    });

    test('Should successfully login with valid credentials', async () => {
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.verifyInventoryPage();
    });

    test('Should add products to cart and verify cart functionality', async () => {
        // Login
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.verifyInventoryPage();

        // Add first product
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product1);
        await inventoryPage.verifyCartItemCount(1);

        // Add second product
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product2);
        await inventoryPage.verifyCartItemCount(2);

        // Go to cart and verify products
        await inventoryPage.goToCart();
        await cartPage.verifyCartPage();
        await cartPage.verifyProductInCart(TEST_PRODUCTS.product1);
        await cartPage.verifyProductInCart(TEST_PRODUCTS.product2);
        await cartPage.verifyCartItemCount(2);
    });

    test('Should complete the entire checkout process', async () => {
        // Login and add products
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product1);
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product2);

        // Go to cart and proceed to checkout
        await inventoryPage.goToCart();
        await cartPage.verifyCartPage();
        await cartPage.proceedToCheckout();

        // Fill checkout information
        await checkoutPage.verifyCheckoutStepOne();
        await checkoutPage.fillShippingInformation(
            CHECKOUT_INFO.firstName,
            CHECKOUT_INFO.lastName,
            CHECKOUT_INFO.zipCode
        );

        // Verify checkout overview and pricing
        await checkoutPage.verifyCheckoutStepTwo();
        await checkoutPage.verifyPricingTotals();

        // Complete the order
        await checkoutPage.finishOrder();
        await checkoutCompletePage.verifyOrderComplete();

        // Return home and verify cart is empty
        await checkoutCompletePage.backToHome();
        await inventoryPage.verifyInventoryPage();
        await inventoryPage.verifyCartItemCount(0);
    });

    test('Should reset app state and clear cart', async () => {
        // Login and add products
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product1);
        await inventoryPage.verifyCartItemCount(1);

        // Reset app state
        await inventoryPage.openMenu();
        await inventoryPage.resetAppState();

        // Verify cart is empty
        await inventoryPage.verifyCartItemCount(0);
    });

    test('Should logout successfully', async () => {
        // Login
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.verifyInventoryPage();

        // Logout
        await inventoryPage.logout();

        // Verify back on login page
        await loginPage.verifyLoginPage();
    });

    test('Should handle complete user journey', async () => {
        // Complete login flow
        await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);
        await inventoryPage.verifyInventoryPage();

        // Add products and verify cart
        await inventoryPage.addProductToCart(TEST_PRODUCTS.product1);
        await inventoryPage.goToCart();
        await cartPage.verifyProductInCart(TEST_PRODUCTS.product1);

        // Complete checkout
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingInformation(
            CHECKOUT_INFO.firstName,
            CHECKOUT_INFO.lastName,
            CHECKOUT_INFO.zipCode
        );
        await checkoutPage.finishOrder();
        await checkoutCompletePage.verifyOrderComplete();

        // Return home and logout
        await checkoutCompletePage.backToHome();
        await inventoryPage.logout();
        await loginPage.verifyLoginPage();
    });
});