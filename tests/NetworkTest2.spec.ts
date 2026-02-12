import { test, request, Locator, expect } from '@playwright/test';

test("@api Network Test 2", async ({page}) => {

    const productName:string = "ZARA COAT 3"; 
    const productCards:Locator = page.locator(".card-body");
    const expiry:Locator = page.locator("[class='input ddl']");
    const cvv:Locator = page.locator("xpath=//div[contains(.,'CVV Code ') and @class='title']/..//input");
    const cardName:Locator = page.locator("xpath=//div[contains(.,'Name on Card') and @class='title']/..//input");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ansika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
   // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => {
        route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'})
        
    });
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});