// ...existing code...
import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.js'
import { SignInPage } from '../pages/signin.js'
import { DashboardPage } from '../pages/dashboard.js'

test.describe('cal.com', () => {
    test('login and manage events', async ({ page }) => {
        const login = new LoginPage(page)
        await login.goto()

        const popup = await login.openSignIn()
        const signIn = new SignInPage(popup)
        await signIn.signIn('testintern73@gmail.com', '.NdL7Wr7vX:Dy8f')

        const dashboard = new DashboardPage(popup)
        const meetings = await dashboard.getAdminMeetings()
        console.log(meetings)
        dashboard.saveMeetingsToFile('C:/Users/Admin/Downloads/for_git/Automation/data/meetings.txt', meetings)

        await dashboard.toggleMeetingSwitchFor30min()
        await dashboard.createEvent('meet1', 'new meet')
        await expect(popup.locator("xpath=//span[text()='meet1']")).toBeVisible()

        await dashboard.addAvailability('6')
        await dashboard.openProfileAndEditName('John doe1')
        // await expect(popup.locator("xpath=//p[text()='Settings updated successfully']")).toBeVisible()
        
    })
   
})

