import { test, expect, Locator, request } from '@playwright/test';
import { APIUtil } from '../Utils/APIUtil';

const payload = { userEmail: "ansika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = {"orders":[{"country":"India","productOrderedId":"6960eac0c941646b7a8b3e68"}]};
let token: any;
let apiContext: any;
let response: { token?: any, orderId?: any } = {};
test.beforeAll(async () => {
    apiContext = await request.newContext();
    const aPIUtil = new APIUtil(apiContext, payload);
    response = await aPIUtil.createOrder(orderPayload);
   
});

test.beforeEach(() => {

});

test('@api Browser Context Validations', async ({ page }) => {
    const productName: string = "ZARA COAT 3";
    const productCards: Locator = page.locator(".card-body");
    const expiry: Locator = page.locator("[class='input ddl']");
    const cvv: Locator = page.locator("xpath=//div[contains(.,'CVV Code ') and @class='title']/..//input");
    const cardName: Locator = page.locator("xpath=//div[contains(.,'Name on Card') and @class='title']/..//input");
    
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.locator("tbody").waitFor();
    await page.locator("tbody tr").filter({ hasText: response.orderId }).getByRole("button", { name: "View" }).click();
    const orderDetails: string | null = await page.locator("div.col-text").textContent();
    expect(response.orderId?.trim().includes(orderDetails?.trim() || "")).toBeTruthy();
});


//Verify if order created is showing in history page

