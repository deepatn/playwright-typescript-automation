import { expect } from "playwright/test";
class OrderHistoryPage {
    page: any;
    myOrdersButton: any;
    ordersTable: any;
    orderRows: any;
    orderIdLocator: any;

    constructor(page: any) {
        this.page = page;
        this.myOrdersButton = this.page.locator("button[routerlink*='myorders']");
        this.ordersTable = this.page.locator("tbody");
        this.orderRows = this.page.locator("tbody tr");
        this.orderIdLocator = this.page.locator("div.col-text");
    }

    async myOrdersPageClick(){
        await this.myOrdersButton.click();
    }

    async getOrderIdFromOrders(orderIdTrimmed:any){
        await this.ordersTable.waitFor();
            const rowCount:number = await this.orderRows.count();
            for(let i=0;i<rowCount;i++){
                const rowOrderId:string | null = await this.orderRows.nth(i).locator("th").textContent();
                if(rowOrderId?.trim() === orderIdTrimmed?.trim()){
                    await this.orderRows.nth(i).locator("button").first().click();
                    break;
                }
            }
    }

    async verifyOrderInOrderDetails(orderIdTrimmed:any){
        const orderDetails:string | null = await this.orderIdLocator.textContent();
            expect(orderIdTrimmed?.trim().includes(orderDetails?.trim() || "")).toBeTruthy();
    }
}
export { OrderHistoryPage };