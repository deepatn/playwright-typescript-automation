import { Given, When, Then } from "@cucumber/cucumber";
import { POManager } from '../../pageobjects/POManager';
import { Locator, expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given("Login to ecommerce application with {string} and {string}", async function (this: CustomWorld, email: string, password: string) {
    const page = this.page;
    this.poManager = new POManager(page);
    const poManager: POManager = this.poManager;
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
});

When("Add {string} to the cart", async function (this: CustomWorld, productName: string) {
    const page = this.page;
    const dashBoardPage = this.poManager.getDashBoardPage();
    await page.locator(".card-body b").first().waitFor();
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.goToCart();
});

Then("Verify {string} is present in the cart", async function (this: CustomWorld, productName: string) {   
    const page = this.page;
    const cartPage = this.poManager.getCartPage();
    await page.locator("div li").first().waitFor();
    await cartPage.getProductLocator(productName);
    await cartPage.validateProductInCart(productName);
    await cartPage.clickCheckout();
});

When("Enter valid details and submit the order for {string}", async function (this: CustomWorld, email: string) {  
    const page = this.page;  
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.fillCardDetails("06","30","123","Ansika Roy");
    await orderReviewPage.selectCountry("Ind");
    await orderReviewPage.placeOrder(email);
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId:string | null = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderIdTrimmed = await orderReviewPage.verifyOrderSuccess();
    this.orderIdTrimmed = orderIdTrimmed;
    console.log(orderIdTrimmed);
});

Then("Verify the order is present in the order history", async function (this: CustomWorld) {   
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.myOrdersPageClick();
    await orderHistoryPage.getOrderIdFromOrders(this.orderIdTrimmed);
    await orderHistoryPage.verifyOrderInOrderDetails(this.orderIdTrimmed);
});

 Given('login to ecommerce2 application with {string} and {string}', async function (this: CustomWorld, email: string, password: string) {
    const page = this.page;
    const username:Locator = page.locator('#username');
	const signInBtn:Locator = page.locator('#signInBtn');
	const productCards:Locator = page.locator('.card-body a');
	page.on('request', request => console.log(request.url()));
	page.on('response', response => console.log(response.url(), response.status()));
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	await username.fill(email);
 	await page.locator('#password').fill(password);
    await signInBtn.click();
         });

Then('Verify error message is displayed', async function (this: CustomWorld) {
           const page = this.page;
           console.log(await page.locator('[style*="block"]').textContent());
	       await expect(page.locator('[style*="block"]')).toContainText("Incorrect");
         });