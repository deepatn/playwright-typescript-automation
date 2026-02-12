import {test, expect, Locator} from '@playwright/test';

test.skip('Browser Context Validations', async ({page})=>{
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
    const titles:String[] = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count:number = await productCards.count();
    for(let i=0;i<count;i++){
        if(await productCards.nth(i).locator("b").textContent()==="ZARA COAT 3"){
            await productCards.nth(i).locator("text = Add to Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    expect(await page.locator("h3:has-text('"+productName+"')").isVisible()).toBeTruthy;
    await page.locator("text=Checkout").click();
    await expiry.first().selectOption("06");
    await expiry.last().selectOption("30");
    await cvv.fill("123");
    await cardName.fill("Ansika Roy");
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
    const dropdown:Locator = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount:number = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++){
        const text:string | null= await dropdown.locator("button").nth(i).textContent();
        if(text?.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name label")).toHaveText("ansika@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId:string | null = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderIdTrimmed:string | undefined = orderId?.replaceAll("|","").trim();
     console.log(orderIdTrimmed);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows:Locator = page.locator("tbody tr");
    const rowCount:number = await rows.count();
    for(let i=0;i<rowCount;i++){
        const rowOrderId:string | null = await rows.nth(i).locator("th").textContent();
        if(rowOrderId?.trim() === orderIdTrimmed?.trim()){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails:string | null = await page.locator("div.col-text").textContent();
    expect(orderIdTrimmed?.trim().includes(orderDetails?.trim() || "")).toBeTruthy();
});