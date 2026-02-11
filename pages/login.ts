import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://cal.com/');
    }

    // Clicks "Sign in" and returns the popup Page instance
    async openSignIn(): Promise<Page> {
        await this.page.click("//a[text()='Sign in']");
        // wait a moment for popup/tab to open
        await this.page.waitForTimeout(2000);
        const pages = this.page.context().pages();
        return pages[pages.length - 1];
    }
}