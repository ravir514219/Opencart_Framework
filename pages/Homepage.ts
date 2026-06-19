import { type Locator,type Page, expect } from "@playwright/test";
import { Registation } from "./Registration";

export class Homepage{
    private readonly page:Page;
    private readonly myAccount:Locator;
    private readonly Register:Locator;
    private readonly login:Locator;
    private readonly searchBox:Locator;
    private readonly searchBtn:Locator;

    constructor(page:Page){
        this.page=page;
        this.myAccount = this.page.locator("a[title='My Account'] span[class='hidden-xs hidden-sm hidden-md']");
        this.Register = this.page.getByText('Register',{exact:true});
        this.login = this.page.getByRole('link',{name:'Login'});
        this.searchBox = this.page.locator("input[name='search']");
        this.searchBtn = this.page.locator('.fa.fa-search');
    }
    
    async isHomePageExsist(){
       let title = await this.page.title();
       if(title){
        return true;
       }
       return false;
    }
    async myAccountClk(){
        try{
            await this.myAccount.click();
        }catch(err){
            console.log(`error description, ${err}`)
            throw err;
        }
    }
    async RegisterClk(){
        try{
            await this.Register.click();
            return new Registation(this.page);
        }catch(err){
            console.log(`error description, ${err}`)
            throw err;
        }
    }
    async LoginClk(){
        try{
            await this.login.click();
        }catch(err){
            console.log(`error description, ${err}`)
            throw err;
        }
    }
    async searchBoxEnter(prodName:string){
        try{
        await this.searchBox.fill(prodName);
        }catch(err){
            console.log(`error description, ${err}`)
            throw err;
        }

    }
    async searchBtnClk(){
        try{
            await this.searchBtn.click();
        }catch(err){
            console.log(`error description, ${err}`)
            throw err;
        }
    }
}