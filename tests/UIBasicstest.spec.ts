import { test, expect, Locator } from '@playwright/test';

test('@web First Playwright Test', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	//await page.route("**/*.{jpg,png}", route => {
	//	route.abort();
	//});
	const username:Locator = page.locator('#username');
	const signInBtn:Locator = page.locator('#signInBtn');
	const productCards:Locator = page.locator('.card-body a');
	page.on('request', request => console.log(request.url()));
	page.on('response', response => console.log(response.url(), response.status()));
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	await username.fill("rahulshettyacadem");
 	await page.locator('#password').fill("Learning@830$3mK2");
    await signInBtn.click();
	console.log(await page.locator('[style*="block"]').textContent());
	await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

	await username.fill("");
	await username.fill("rahulshettyacademy");
	await signInBtn.click();
	console.log(await productCards.first().textContent());
	console.log(await productCards.nth(1).textContent());
	const allTitles:string[] = await productCards.allTextContents();
	console.log(allTitles);
});

test('@web Page Playwright Test', async ({ page }) => {
  await page.goto("https:www.google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test('Ui Controls', async({page}) => {
	const dropdown: Locator = page.locator("select.form-control");
	const blinkingTest: Locator = page.locator("[href*='documents-request']");
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	await dropdown.selectOption("Consultant");
	await page.locator('.radiotextsty').last().click();
	await page.locator('#okayBtn').click();
	console.log(await page.locator('.radiotextsty').last().isChecked());
	await expect(page.locator('.radiotextsty').last()).toBeChecked();
	await page.locator('#terms').click();
	await expect(page.locator('#terms')).toBeChecked();
	await page.locator('#terms').uncheck();
	expect(await page.locator('#terms').isChecked()).toBeFalsy();
	await expect(blinkingTest).toHaveAttribute("class","blinkingText");
})

test('Handling Child Tabs', async({browser}) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
	const blinkingTest: Locator = page.locator("[href*='documents-request']");
	
	const [newPage] = await Promise.all([
		context.waitForEvent('page'),
		blinkingTest.click()
	]);
	let text: string|null = await newPage.locator(".red").textContent();
	console.log(text);
	let arrayText: string[] = text ? text.split("@") : [];
	const domain = arrayText.length > 1 ? arrayText[1].trim().split(" ")[0] : "";
	console.log(domain);
	await page.locator("#username").fill(domain);
	//await page.pause();
	console.log( await page.locator("#username").inputValue());
});
