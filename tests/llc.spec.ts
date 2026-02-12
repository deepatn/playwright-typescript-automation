import {test, expect, Locator} from '@playwright/test';

test('Playwright special locators', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.locator("[name='email']").fill("deepa@gmail.com");
    await page.getByPlaceholder("Password").fill("Hello123");
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully.").isVisible();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button", ({ name: "Add" })).click();
    
});