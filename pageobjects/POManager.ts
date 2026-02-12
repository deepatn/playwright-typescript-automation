import { LoginPage } from './LoginPage';
import { DashBoardPage } from './DashBoardPage';
import { CartPage } from './CartPage';
import { OrderReviewPage } from './OrderReviewPage';
import { OrderHistoryPage } from './OrderHistoryPage';

class POManager {
    private page: any;
    private loginPage: any;
    private dashBoardPage: any; 
    private cartPage: any; 
    private orderReviewPage: any;
    private orderHistoryPage: any;
    
    constructor(page:any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
    }  
    getLoginPage(): LoginPage {
        return this.loginPage;
    }
    getDashBoardPage(): DashBoardPage {
        return this.dashBoardPage;
    }   
    getCartPage(): CartPage {
        return this.cartPage;
    }
    getOrderHistoryPage(): OrderHistoryPage {
        return this.orderHistoryPage;
    }
    getOrderReviewPage(): OrderReviewPage { 
        return this.orderReviewPage;
    }
}
export {POManager};