import{type Page, Locator} from "@playwright/test";
import { Logoutpage } from "./Logoutpage";

export class MyAccount{
    private readonly page:Page;
    private readonly myAccHeading:Locator;
    private readonly logoutLink:Locator;
constructor(page:Page){
    this.page= page;
    this.myAccHeading = this.page.locator("h2:has-text('My Account')");
    this.logoutLink = this.page.locator("a.list-group-item[href*='account/logout']");
}

async isMyaccountExsist(): Promise<boolean | undefined>{
try{
    const myAcc= await this.myAccHeading.isVisible();
    return myAcc;

}catch(err){
    console.log(`Error description is : ${err}`)
    return false;
}
}
async ClickLogout(){
    await this.logoutLink.click();
    return new Logoutpage(this.page);

}

}