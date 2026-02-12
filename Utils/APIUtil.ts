import { expect } from '@playwright/test';

class APIUtil {
    private apiContext: any;
    private payLoad: any;

    constructor(apiContext: any, payLoad: any) {
        this.apiContext = apiContext;
        this.payLoad = payLoad;
    }

    async getToken(): Promise<any> {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.payLoad
            });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log("Token fetched: " + token);
        return token;
    }

    async createOrder(orderPayload: any): Promise<any> {
        let response: { token?: any, orderId?:any } = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            })
        const orderResponseJson = await orderResponse.json();
        console.log("Order Response: " + JSON.stringify(orderResponseJson));
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

export { APIUtil };