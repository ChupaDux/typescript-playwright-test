import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly sidebarMenu: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;
    readonly closeSideBar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('//*[@id="react-burger-menu-btn"]');
        this.sidebarMenu = page.locator('.bm-menu');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
        this.closeSideBar = page.getByRole('button', { name: 'Close Menu' })
    }

    async openMenu() {
        await this.menuButton.evaluate((button: HTMLButtonElement) => {
            button.click();
        });
        await this.closeSideBar.waitFor({ state: 'visible' });
    }

    async logout() {
        await this.openMenu();
        await this.logoutLink.click();
    }

    async resetAppState() {
        // await this.resetAppStateLink.hover()
        // await this.closeSideBar.waitFor({ state: 'visible', timeout: 10000 });
        await this.resetAppStateLink.click()
    }
}
