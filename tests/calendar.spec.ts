import {test, expect, Locator} from '@playwright/test';

test('Calendar UI', async ({page})=>{

    const month:string = "12";
    const year:string = "2026";
    const date:string = "30";
    const expectedList:string[] = [month, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("[class*='react-date-picker__calendar-button react-date-picker__button']").click();
    await page.locator("[class*='react-calendar__navigation__label_']").click();
    await page.locator("[class*='react-calendar__navigation__label__labelText']").click();
    await page.getByText(year).click();
    await page.locator("[class*='react-calendar__year-view__months']").nth(Number(month)).click();
    await page.locator("//button[@class='react-calendar__tile react-calendar__month-view__days__day']//abbr[.='"+date+"']").click();
    	const dateInput: Locator = page.locator("[class*='react-date-picker__inputGroup__input']");
	for(let i=0;i<expectedList.length;i++){
		const dateValue:string | null = await dateInput.nth(i).getAttribute("value");
		expect(dateValue).toEqual(expectedList[i]);
	}
})