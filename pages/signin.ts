import { Page } from '@playwright/test';

export class SignInPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async signIn(email: string, password: string) {
        await this.page.fill("xpath=//input[@id='email']", email);
        await this.page.fill("xpath=//input[@id='password']", password);
        await this.page.click("xpath=//span[text()='Sign in']");
        // dismiss update prompt if present
        try {
            // await this.page.click("xpath=//div[contains(text(),'update')]//parent::button", { timeout: 2000 });
            await this.page.click("xpath=//div[contains(text(),'update')]//parent::button")
        } catch (e) {
            // ignore if not present
        }
        await this.page.waitForSelector("xpath=//h3[text()='Event types']", { state: 'visible' });
    }
}