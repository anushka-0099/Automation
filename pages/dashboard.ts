import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import fs from 'fs';

export class DashboardPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async getAdminMeetings(): Promise<string[]> {
        return await this.page.locator("xpath=//small[contains(text(),'/admin-0') and not(following-sibling::span[text()='Hidden'])]").allInnerTexts();
    }

    saveMeetingsToFile(path: string, meetings: string[]) {
        fs.writeFileSync(path, meetings.join('\n'), 'utf-8');
    }

    async toggleMeetingSwitchFor30min() {
        // await this.page.click("xpath=//small[contains(text(),'/30min')]//ancestor::div[@class='group flex w-full max-w-full items-center justify-between overflow-hidden px-4 py-4 sm:px-6']//button[@role='switch']");
        await this.page.click("xpath=//small[contains(text(),'/30min')]//ancestor::div[@class='group flex w-full max-w-full items-center justify-between overflow-hidden px-4 py-4 sm:px-6']//button[@role='switch']")
    }

    async createEvent(name: string, description: string) {
        await this.page.click("xpath=//button[@data-testid='new-event-type']");
        await this.page.fill("xpath=//input[@placeholder='Quick chat']", name);
        await this.page.fill("xpath=//p[@class='editor-paragraph']", description);
        await this.page.click("xpath=//div[text()='Continue']//parent::button");
        await this.page.waitForSelector(`xpath=//span[text()='${name}']`, { state: 'visible' });
    }

    async addAvailability(hours: string) {
        await this.page.click("xpath=//span[text()='Availability']//ancestor::a[@data-test-id='availability']");
        await this.page.waitForTimeout(10000);
        await this.page.click("xpath=//div[text()='New']//parent::button");
        await this.page.fill("xpath=//input[@placeholder='Working hours']", hours);
        await this.page.click("xpath=//div[text()='Continue']//parent::button");
        await this.page.waitForSelector("xpath=//input[@name='name']", { state: 'visible' });
    }

    async openProfileAndEditName(newName: string) {
        // await this.page.click("xpath=//span[text()='John do']");
        // // await this.page.waitForTimeout(10000);
        // await this.page.click("xpath=//*[text()='My profile']");
        // await this.page.waitForTimeout(10000);
        // await this.page.fill("xpath=//input[@name='name']", newName);
        // await this.page.click("xpath=//button[@type='submit']");
        // // await this.page.waitForSelector("xpath=//p[text()='Settings updated successfully']", { state: 'visible' });
        // await expect(this.page.locator("xpath=//p[text()='Settings updated successfully']")).toBeVisible()
        await this.page.click("xpath=//span[text()='John do']")
        await this.page.click("xpath=//*[text()='Sign out']")
        // await expect(this.page.locator("xpath=//a[text()='Sign in']")).toBeVisible()
    }
}