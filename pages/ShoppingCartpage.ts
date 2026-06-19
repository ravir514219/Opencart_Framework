import{type Locator, Page} from "@playwright/test";

export class ShoppingCartpage{
    private readonly page:Page;
    private readonly totalPrice:Locator;
    private readonly checkoutBtn:Locator;
    private readonly shoppingCartlnk:Locator;



    constructor(page:Page){
        this.page = page;
        this.totalPrice = this.page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]');
        this.checkoutBtn = this.page.locator("a[class='btn btn-primary']");
        this.shoppingCartlnk = this.page.locator("ul.breadcrumb a[href*='checkout/cart']");
    }

    async verifyShoppingCartpageExsist(){
        return await this.shoppingCartlnk.isVisible();
    }

    async getTotalPrice(): Promise<string | null>{
        return await this.totalPrice.textContent();
    }
    async isCheckoutBtnVisible(){
        try{
        return await this.checkoutBtn.isVisible();
        }catch(err){
            console.log(`Error description is ${err}`);
            return false;
        }
    }
    async clickCheckoutBtn(){
        await this.checkoutBtn.click();
    }
}