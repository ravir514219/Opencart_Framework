import{type Locator, Page} from "@playwright/test";
import { ShoppingCartpage } from "./ShoppingCartpage";


export class Productpage{
    private readonly page:Page;
    private readonly prodQty:Locator;
    private readonly Addcart:Locator;
    private readonly cnfMsg:Locator;
    private readonly cartBtn:Locator;
    private readonly viewCart:Locator;

    constructor(page:Page){
        this.page = page;
        this.prodQty= this.page.locator('#input-quantity');
        this.Addcart = this.page.locator('#button-cart');
        this.cnfMsg = this.page.locator('.alert.alert-success.alert-dismissible');
        this.cartBtn = this.page.locator('#cart-total');
        this.viewCart = this.page.locator('strong:has-text("View Cart")');
    }

    async setQunantity(qty:string){
        await this.prodQty.fill(qty);
    }

    async ClickAddToCart(){
        await this.Addcart.click();
    }

    async VerifyCnfMsg(){
        if(this.cnfMsg != null){
            return true;
        }else{
            return false;
        }
    }
    async ClickAddcart(){
        await this.cartBtn.click();
    }

    async ClickViewCart(){
        await this.viewCart.click();
        return new ShoppingCartpage(this.page);  //this.page => used to stay in the same browser tab for Shopping cart page also.
    }

    async AddProduct(qty:string){
        await this.setQunantity(qty);
        await this.ClickAddToCart();
        await this.VerifyCnfMsg();
    }


    
}