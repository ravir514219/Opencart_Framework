import{test, expect, type Locator, Page } from "@playwright/test";

export class Loginpage{
    private readonly page:Page;
    private readonly email:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly errorMsg:Locator;

    constructor(page:Page){
        this.page = page;
        this.email = this.page.locator("#input-email");
        this.password= this.page.locator("#input-password");
        this.loginBtn = this.page.locator("input[type='submit']");
        this.errorMsg = this.page.locator('.alert.alert-danger.alert-dismissible');
    }

    async enterEmail(email:string){
        try{
        await this.email.fill(email);
        }catch(err){
            console.log(`Error is ${err}`);
        }
    }

    async enterPassword(pass:string){
        try{
        await this.password.fill(pass);
        }catch(err){
            console.log(`Error is ${err}`);
        }

    }
    async clickLogin(){
        await this.loginBtn.click();
    }

    async LoginAction(
        
            email:string,
            password:string)
        {
            await this.enterEmail(email);
            await this.enterPassword(password);
            await this.clickLogin();
    }

    async captureErrorMsg(){
        const errorMsg = await this.errorMsg.textContent() ?? ''.trim();
        return errorMsg;
    }

}