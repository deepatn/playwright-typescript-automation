import { expect } from "@playwright/test";
class OrderReviewPage {

    page: any;
    expiryDropdownMonth: any;
    expiryDropdownYear: any;
    cvvInput: any;
    cardName: any;
    selectCountryInput: any;
    userNameLabel: any;
    placeOrderButton: any;
    thankYouMessage: any;
    orderIdLocator: any;
    dropdownResults: any;


    constructor(page: any) {
        this.page = page;
        this.expiryDropdownMonth = page.locator("[class='input ddl']").first();
        this.expiryDropdownYear = page.locator("[class='input ddl']").last();
        this.cvvInput = page.locator("xpath=//div[contains(.,'CVV Code ') and @class='title']/..//input");
        this.cardName = page.locator("xpath=//div[contains(.,'Name on Card') and @class='title']/..//input");
        this.selectCountryInput = page.locator("[placeholder='Select Country']");
        this.dropdownResults = page.locator(".ta-results");
        this.userNameLabel = page.locator(".user__name label");
        this.placeOrderButton = page.locator(".action__submit");
        this.thankYouMessage = page.locator('.hero-primary');
        this.orderIdLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async fillCardDetails(expiryMonth: string, expiryYear: string, cvv: string, cardName: string) {
        await this.expiryDropdownMonth.selectOption(expiryMonth);
        await this.expiryDropdownYear.selectOption(expiryYear);
        await this.cvvInput.fill(cvv);
        await this.cardName.fill(cardName);
    }

    async selectCountry(countryName: string) {
        await this.selectCountryInput.pressSequentially(countryName);
        await this.dropdownResults.waitFor();
        const optionsCount: number = await this.dropdownResults.locator("button").count();
        for (let i = 0; i < optionsCount; i++) {
            const text: string | null = await this.dropdownResults.locator("button").nth(i).textContent();
            if (text?.trim() === "India") {
                await this.dropdownResults.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrder(expectedUserName: string) {
        await expect(this.userNameLabel).toHaveText(expectedUserName);
        await this.placeOrderButton.click();
    }

    async verifyOrderSuccess(): Promise<String|undefined> {
        await expect(this.thankYouMessage).toHaveText(" Thankyou for the order. ");
        const orderId: string | null = await this.orderIdLocator.textContent();
        const orderIdTrimmed: string | undefined = orderId?.replaceAll("|", "").trim();
        return orderIdTrimmed;
    }
}
export { OrderReviewPage };