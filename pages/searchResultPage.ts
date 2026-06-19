import{type Page, Locator} from "@playwright/test";
import { Productpage } from "./Productpage";

export class searchResultPage{
    private readonly page:Page;
    private readonly productHeader:Locator;
    private readonly productTitle:Locator;

    constructor(page:Page){
        this.page = page;
        this.productHeader = this.page.locator('#content h1');
        this.productTitle = this.page.locator('h4>a');
            
        }
        async productHeaderExsist(){
            const header= await this.productHeader.textContent();
           return header?.includes('Search -')??false;
        }

        async isProductExsist(prodName:string){
            const count = await this.productTitle.count();
            for(let i=0; i<count ; i++){
                const productName = this.productTitle.nth(i);
                const product = await productName.textContent();
                if(product === prodName){
                    return true;
                }
                return false;
            }
        }

        async selectProduct(prodName:string):Promise<Productpage | null>{
             const count = await this.productTitle.count();
            for(let i=0; i<count ; i++){
                const productName = this.productTitle.nth(i);
                const product = await productName.textContent();
                if(product === prodName){
                    await productName.click();
                    return new Productpage(this.page);
                }
            }
            return null;

        }

    }
