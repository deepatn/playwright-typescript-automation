class DashBoardPage {

    page: any;
    productTitles: any;
    products: any;
    addToCartButton: any;

    constructor(page:any) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productTitles = page.locator(".card-body b");
        this.addToCartButton = page.locator("[routerlink*='cart']");
    }

    async searchProduct(productName: string) {
        const titles:String[] = await this.productTitles.allTextContents();
    console.log(titles);
    const count:number = await this.products.count();
    for(let i=0;i<count;i++){
        if(await this.products.nth(i).locator("b").textContent()===productName){
            await this.products.nth(i).locator("text = Add to Cart").click();
            break;
        }
    }
    }

    async goToCart() {
        await this.addToCartButton.click();
    }
}
export {DashBoardPage};