import {test,expect} from '@playwright/test'
import fs from 'fs'
test.describe('cal.com',()=>{
    test('login',async({page})=>{
        await page.goto('https://cal.com/')
        await page.click("//a[text()='Sign in']")
        // opens in the new tab handle this-
        // await page.
        await page.waitForTimeout(2000)
        const pages=page.context().pages()
        const page1=pages[pages.length-1]
        await page1.fill("xpath=//input[@id='email']",'testintern73@gmail.com')
        await page1.fill("xpath=//input[@id='password']",'.NdL7Wr7vX:Dy8f')
        await page1.click("xpath=//span[text()='Sign in']")
        await page1.click("xpath=//div[contains(text(),'update')]//parent::button")
        await expect(page1.locator("xpath=//h3[text()='Event types']")).toBeVisible()
    // })
    // test('create event and disable meeting',async({page})=>{
        const val=await page1.locator("xpath=//small[contains(text(),'/admin-0') and not(following-sibling::span[text()='Hidden'])]").allInnerTexts()
        console.log(val)
        fs.writeFileSync('C:\\Users\\Admin\\Downloads\\js_practice\\js_practice\\data\\meetings.txt',val.join('\n'),'utf-8')
        await page1.click("xpath=//small[contains(text(),'/30min')]//ancestor::div[@class='group flex w-full max-w-full items-center justify-between overflow-hidden px-4 py-4 sm:px-6']//button[@role='switch']")
        await page1.click("xpath=//button[@data-testid='new-event-type']")
        await page1.fill("xpath=//input[@placeholder='Quick chat']",'meet1')
        await page1.fill("xpath=//p[@class='editor-paragraph']",'new meet')
        await page1.click("xpath=//div[text()='Continue']//parent::button")
        await expect(page1.locator("xpath=//span[text()='meet1']")).toBeVisible()
        // await page.waitForTimeout(1000)
        // await page.fill("xpath=//p[@class='editor-paragraph']",'quick meetingg')
        // // await page1.click("xpath=//button[@role='switch' and @id='radix-_r_pf_']")
        // await page1.click("xpath=//div[text()='Save']//parent::button")
        // adding availability
        await page1.click("xpath=//span[text()='Availability']//ancestor::a[@data-test-id='availability']")
        await page1.click("xpath=//div[text()='New']//parent::button")
        await page1.fill("xpath=//input[@placeholder='Working hours']",'6')
        await page1.click("xpath=//div[text()='Continue']//parent::button")
        await expect(page1.locator("xpath=//input[@name='name']")).toBeVisible()
        // await page1.click("xpath=//div[@class='text-default css-g56vrd-indicatorContainer']")
        // await page1.click()
        // edit name
        await page1.click("xpath=//span[text()='John do']")
        await page1.click("xpath=//*[text()='My profile']")
        // const details=await page1.locator("xpath=//input").allInnerTexts()
        // console.log(details)
        // fs.writeFileSync('C:/Users/Anushka/playwright_final/data/meetings.txt',details.join('\n'),'utf-8')
        await page1.fill("xpath=//input[@name='name']",'John doe1')
        await page1.click("xpath=//button[@type='submit']")
        await expect(page1.locator("xpath=//p[text()='Settings updated successfully']")).toBeVisible()
        
    })
})