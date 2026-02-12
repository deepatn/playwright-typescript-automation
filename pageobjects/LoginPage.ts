class LoginPage{

    signInButton:any;
    username: any;
    password: any;
    page:any;

    constructor(page:any){
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword")
    }

    async validLogin(username:string, password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
export {LoginPage};