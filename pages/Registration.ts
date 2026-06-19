import{type Page, type Locator, test,expect} from "@playwright/test";
import { MyAccount } from "./MyAccount";

export class Registation{
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly eMail:Locator;
    private readonly telePhone:Locator;
    private readonly password:Locator;
    private readonly cnfPassword:Locator;
    private readonly privacyPolicy:Locator;
    private readonly submitBtn:Locator;
    private readonly cnfMsg:Locator;
    private readonly continueBtn:Locator;


    constructor(page:Page){
        this.page = page;
        this.firstName= this.page.locator('#input-firstname');
        this.lastName = this.page.locator('#input-lastname');
        this.eMail = this.page.locator('#input-email');
        this.telePhone = this.page.locator('#input-telephone');
        this.password = this.page.locator('#input-password');
        this.cnfPassword = this.page.locator('#input-confirm');
        this.privacyPolicy = this.page.locator("input[type='checkbox']");
        this.submitBtn = this.page.locator("input[type='submit']");
        this.cnfMsg = this.page.locator("div[id='content'] h1");
        this.continueBtn  = this.page.locator("a.btn.btn-primary");
    }

    async fillFName(fname:string){
        try{
            await this.firstName.fill(fname);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async fillLstName(lname:string){
        try{
            await this.lastName.fill(lname);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async fillEmail(email:string){
        try{
            await this.eMail.fill(email);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async fillPhoneNum(number:string){
        try{
            await this.telePhone.fill(number);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }

    }
    async fillPass(pass:string){
        try{
            await this.password.fill(pass);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async fillCnfPass(cnfPass:string){
        try{
            await this.cnfPassword.fill(cnfPass);
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async checkPolicy(){
        try{
            await this.privacyPolicy.check();
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async submitClk(){
        try{
            await this.submitBtn.click();
        }catch(err){
            console.log(`Error description : ${err}`);
            throw err;
        }
    }
    async VerifyCnfMsg(){
       return await this.cnfMsg.textContent() ?? '';
    }

    async ClickContinueBtn(){
        await this.continueBtn.click();
        return new MyAccount(this.page);
    }

    async userRegistration(userData:{
        fname:string;
        lname:string;
        email:string;
        phoneNum:string;
        password:string;

    }){
        await this.fillFName(userData.fname);
        await this.fillLstName(userData.lname);
        await this.fillEmail(userData.email);
        await this.fillPhoneNum(userData.phoneNum);
        await this.fillPass(userData.password);
        await this.fillCnfPass(userData.password);
        await this.checkPolicy();
        await this.submitClk();
        await expect (this.cnfMsg).toHaveText("Your Account Has Been Created!");
    }
}