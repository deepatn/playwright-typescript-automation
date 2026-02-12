import { expect } from '@playwright/test';
class CartPage {

    page:any;
    checkoutButton: any;

    constructor(page:any) {
        this.page = page;
        this.checkoutButton = page.locator("text=Checkout")
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }

    getProductLocator(productName:string){
        return this.page.locator("h3:has-text('"+productName+"')");
    }

    async validateProductInCart(productName:string){
        expect(await this.getProductLocator(productName)).toBeVisible();
    }
}
export {CartPage};