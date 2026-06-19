import{type Locator, Page} from "@playwright/test";
import { Homepage } from "./Homepage";

export class Logoutpage{
    private readonly page:Page;
    private readonly logoutTitle:Locator;
    private readonly continueBtn:Locator;


    constructor(page:Page){
        this.page=  page;
        this.logoutTitle = this.page.locator("h1:has-text('Account Logout')");
        this.continueBtn = this.page.locator(".btn.btn-primary");
    }

   async isLogoutTitleExsist(): Promise<boolean>{
    const isVisible = await this.logoutTitle.isVisible();
    return isVisible;

    }
    async clickContinueBtn(){
        await this.continueBtn.click();
        return new Homepage(this.page);

    }
}